import { Router, Request, Response } from 'express';
import { CANDIDATOS_OFICIAIS, ELEICOES_OFICIAIS } from '../../data/realDataStore';
import { buscarUnidadesBrutasMultiTSE } from '../../data/tseDataProvider';
import { calcularEstatisticasDobradinha } from '../../engine/dobradinhaCalculator';
import { gerarInsightsEstrategicosIA } from '../../engine/strategicAiInsights';
import { obterTerritoriosBerlimGestao, obterCandidatosBerlimGestao } from '../../data/berlimGestaoDataStore';
import { CamadaGeografica } from '../../types';

export const comparacaoRouter = Router();

comparacaoRouter.get('/', (req: Request, res: Response): void => {
  const userEmail = (req.headers['x-user-email'] as string) || '';
  const isBerlimGestao = userEmail === 'berlim.gestao@campanha.com.br' || Number(req.query.candX) >= 9900;
  const ano = req.query.ano ? Number(req.query.ano) : 2024;
  const camada = (String(req.query.camada || 'municipio')) as CamadaGeografica;
  const microrregiaoFiltro = String(req.query.microrregiao || 'Todas');
  const municipioFiltro = String(req.query.municipio || 'Todos');
  const bairroFiltro = String(req.query.bairro || 'Todos');

  if (isBerlimGestao) {
    const todosCands = obterCandidatosBerlimGestao();
    const candXId = req.query.candX ? Number(req.query.candX) : todosCands[0]?.id;
    const candYId = req.query.candY ? Number(req.query.candY) : undefined;
    const candX = candXId ? todosCands.find((c) => c.id === candXId) : todosCands[0];
    const candY = candYId ? todosCands.find((c) => c.id === candYId) : undefined;

    let todosTerritorios = obterTerritoriosBerlimGestao(candX?.id, candY?.id);

    if (microrregiaoFiltro && microrregiaoFiltro.toLowerCase() !== 'todas') {
      todosTerritorios = todosTerritorios.filter(
        (t) =>
          t.microrregiao.toLowerCase() === microrregiaoFiltro.toLowerCase() ||
          t.mesorregiao.toLowerCase() === microrregiaoFiltro.toLowerCase()
      );
    }
    if (municipioFiltro && municipioFiltro.toLowerCase() !== 'todos') {
      todosTerritorios = todosTerritorios.filter(
        (t) => t.nome.toLowerCase() === municipioFiltro.toLowerCase()
      );
    }

    if (camada === 'mesorregiao') {
      const mesosMap = new Map<string, {
        meso: string;
        votosA: number;
        votosB: number;
        aptos: number;
        secoes: number;
        latSum: number;
        lngSum: number;
        count: number;
      }>();

      todosTerritorios.forEach((t) => {
        const mesoKey = t.mesorregiao || 'Outros';
        const existing = mesosMap.get(mesoKey) || {
          meso: mesoKey,
          votosA: 0,
          votosB: 0,
          aptos: 0,
          secoes: 0,
          latSum: 0,
          lngSum: 0,
          count: 0,
        };
        existing.votosA += t.votos_A;
        existing.votosB += t.votos_B;
        existing.aptos += t.aptos;
        existing.secoes += t.total_secoes || 10;
        existing.latSum += (t.latitude || -8.0476);
        existing.lngSum += (t.longitude || -34.8770);
        existing.count += 1;
        mesosMap.set(mesoKey, existing);
      });

      todosTerritorios = Array.from(mesosMap.values()).map((m, idx) => {
        const totalVotosLocal = m.votosA + m.votosB;
        const avgLat = m.count > 0 ? m.latSum / m.count : -8.0476;
        const avgLng = m.count > 0 ? m.lngSum / m.count : -34.8770;
        const aderenciaA = totalVotosLocal > 0 ? (m.votosA / totalVotosLocal) * 100 : 0;
        const aderenciaB = totalVotosLocal > 0 ? (m.votosB / totalVotosLocal) * 100 : 0;

        return {
          id: `berlim-meso-${idx + 1}`,
          camada: 'mesorregiao',
          nome: m.meso,
          nome_municipio: m.meso,
          uf: 'PE',
          mesorregiao: m.meso,
          microrregiao: m.meso,
          aptos: m.aptos,
          votos_A: m.votosA,
          votos_B: m.votosB,
          comparecimento: Math.round(m.aptos * 0.82),
          aderencia_A: Math.round(aderenciaA * 10) / 10,
          aderencia_B: Math.round(aderenciaB * 10) / 10,
          forca_dobradinha: totalVotosLocal,
          sobreposicao: Math.round(Math.min(aderenciaA, aderenciaB)),
          complementaridade: Math.round(Math.abs(aderenciaA - aderenciaB)),
          peso_absoluto: totalVotosLocal,
          classificacao: m.votosA > m.votosB * 1.5 ? 'FORÇA' : m.votosA > m.votosB ? 'OPORTUNIDADE' : 'NEUTRO',
          latitude: avgLat,
          longitude: avgLng,
          geometria_aproximada: true,
          total_secoes: m.secoes,
          eleicao_referencia: 'Eleições Municipais 2024 (Pernambuco - Berlim Gestão)',
          data_atualizacao: new Date().toISOString().split('T')[0],
          tem_dados_nulos: false,
        };
      });
    } else if (camada === 'bairro') {
      const bairrosList: typeof todosTerritorios = [];
      const zonas = [
        { nome: 'Centro Histórico', latOff: 0.008, lngOff: -0.005, pct: 0.35 },
        { nome: 'Bairro Novo / Zona Comercial', latOff: -0.009, lngOff: 0.008, pct: 0.28 },
        { nome: 'Zona Sul / Residencial', latOff: -0.014, lngOff: -0.011, pct: 0.22 },
        { nome: 'Distritos & Zona Rural', latOff: 0.016, lngOff: 0.014, pct: 0.15 },
      ];

      todosTerritorios.forEach((t, indexMun) => {
        zonas.forEach((z, zIdx) => {
          const vA = Math.round(t.votos_A * z.pct);
          const vB = Math.round(t.votos_B * z.pct);
          const aptosBairro = Math.round(t.aptos * z.pct);
          const totalLocal = vA + vB;
          const adA = totalLocal > 0 ? (vA / totalLocal) * 100 : 0;
          const adB = totalLocal > 0 ? (vB / totalLocal) * 100 : 0;

          bairrosList.push({
            id: `berlim-bairro-${indexMun + 1}-${zIdx + 1}`,
            camada: 'bairro',
            nome: `${z.nome} (${t.nome})`,
            nome_municipio: t.nome,
            bairro: z.nome,
            uf: 'PE',
            mesorregiao: t.mesorregiao,
            microrregiao: t.microrregiao,
            aptos: aptosBairro,
            votos_A: vA,
            votos_B: vB,
            comparecimento: Math.round(aptosBairro * 0.82),
            aderencia_A: Math.round(adA * 10) / 10,
            aderencia_B: Math.round(adB * 10) / 10,
            forca_dobradinha: totalLocal,
            sobreposicao: Math.round(Math.min(adA, adB)),
            complementaridade: Math.round(Math.abs(adA - adB)),
            peso_absoluto: totalLocal,
            classificacao: vA > vB * 1.5 ? 'FORÇA' : vA > vB ? 'OPORTUNIDADE' : 'NEUTRO',
            latitude: (t.latitude || -8.0476) + z.latOff,
            longitude: (t.longitude || -34.8770) + z.lngOff,
            geometria_aproximada: true,
            total_secoes: Math.max(1, Math.round((t.total_secoes || 10) * z.pct)),
            eleicao_referencia: 'Eleições Municipais 2024 (Pernambuco - Berlim Gestão)',
            data_atualizacao: new Date().toISOString().split('T')[0],
            tem_dados_nulos: false,
          });
        });
      });
      todosTerritorios = bairrosList;
    } else if (camada === 'secao') {
      const secoesList: typeof todosTerritorios = [];
      const secoesLocais = [
        { nome: 'Seção 001 - Escola Municipal Central', latOff: 0.003, lngOff: -0.002, pct: 0.20 },
        { nome: 'Seção 002 - Colégio Estadual', latOff: -0.004, lngOff: 0.003, pct: 0.18 },
        { nome: 'Seção 003 - Posto de Saúde Comunitário', latOff: 0.006, lngOff: 0.005, pct: 0.17 },
        { nome: 'Seção 004 - Ginásio Poliesportivo', latOff: -0.007, lngOff: -0.006, pct: 0.16 },
        { nome: 'Seção 005 - Associação de Moradores', latOff: 0.009, lngOff: -0.008, pct: 0.15 },
        { nome: 'Seção 006 - Creche Municipal', latOff: -0.008, lngOff: 0.007, pct: 0.14 },
      ];

      todosTerritorios.forEach((t, indexMun) => {
        secoesLocais.forEach((s, sIdx) => {
          const vA = Math.round(t.votos_A * s.pct);
          const vB = Math.round(t.votos_B * s.pct);
          const aptosSec = Math.round(t.aptos * s.pct);
          const totalLocal = vA + vB;
          const adA = totalLocal > 0 ? (vA / totalLocal) * 100 : 0;
          const adB = totalLocal > 0 ? (vB / totalLocal) * 100 : 0;

          secoesList.push({
            id: `berlim-secao-${indexMun + 1}-${sIdx + 1}`,
            camada: 'secao',
            nome: `${s.nome} (${t.nome})`,
            nome_municipio: t.nome,
            uf: 'PE',
            mesorregiao: t.mesorregiao,
            microrregiao: t.microrregiao,
            aptos: aptosSec,
            votos_A: vA,
            votos_B: vB,
            comparecimento: Math.round(aptosSec * 0.82),
            aderencia_A: Math.round(adA * 10) / 10,
            aderencia_B: Math.round(adB * 10) / 10,
            forca_dobradinha: totalLocal,
            sobreposicao: Math.round(Math.min(adA, adB)),
            complementaridade: Math.round(Math.abs(adA - adB)),
            peso_absoluto: totalLocal,
            classificacao: vA > vB * 1.5 ? 'FORÇA' : vA > vB ? 'OPORTUNIDADE' : 'NEUTRO',
            latitude: (t.latitude || -8.0476) + s.latOff,
            longitude: (t.longitude || -34.8770) + s.lngOff,
            geometria_aproximada: true,
            total_secoes: 1,
            eleicao_referencia: 'Eleições Municipais 2024 (Pernambuco - Berlim Gestão)',
            data_atualizacao: new Date().toISOString().split('T')[0],
            tem_dados_nulos: false,
          });
        });
      });
      todosTerritorios = secoesList;
    }

    const totalEleitores = todosTerritorios.reduce((acc, r) => acc + r.aptos, 0);
    const totalSecoes = todosTerritorios.reduce((acc, r) => acc + (r.total_secoes || 10), 0);
    const totalVotosX = todosTerritorios.reduce((acc, r) => acc + r.votos_A, 0);
    const totalVotosY = todosTerritorios.reduce((acc, r) => acc + r.votos_B, 0);

    const rankingComplementaridade = [...todosTerritorios]
      .sort((a, b) => b.complementaridade - a.complementaridade)
      .slice(0, 5);

    const rankingCanibalizacao = [...todosTerritorios]
      .sort((a, b) => (b.sobreposicao * b.forca_dobradinha) - (a.sobreposicao * a.forca_dobradinha))
      .slice(0, 5);

    const aiInsights = gerarInsightsEstrategicosIA(todosTerritorios, candX as any, candY as any);

    res.json({
      eleicaoRef: 'Eleições Municipais 2024 (Pernambuco - Berlim Gestão)',
      dataAtualizacao: new Date().toISOString().split('T')[0],
      candidatoX: candX,
      candidatoY: candY,
      anoEleicao: 2024,
      camada: camada,
      timestamp: new Date().toISOString(),
      resumoGeral: {
        totalEleitores,
        totalSecoes,
        mediaEleitoresPorSecao: totalSecoes > 0 ? Math.round(totalEleitores / totalSecoes) : 0,
        totalVotosX,
        totalVotosY,
        totalVotosDobradinha: totalVotosX + totalVotosY,
        votoMedioX: todosTerritorios.length ? Math.round(totalVotosX / todosTerritorios.length) : 0,
        votoMedioY: todosTerritorios.length ? Math.round(totalVotosY / todosTerritorios.length) : 0,
      },
      rankings: {
        maiorComplementaridade: rankingComplementaridade,
        maiorCanibalizacao: rankingCanibalizacao,
      },
      aiInsights,
      bairrosDisponiveis: [],
      territorios: todosTerritorios,
    });
    return;
  }

  const candXId = Number(req.query.candX || 201);
  const candYId = req.query.candY ? Number(req.query.candY) : undefined;
  const candX = CANDIDATOS_OFICIAIS.find((c) => c.id === candXId) || CANDIDATOS_OFICIAIS[0];
  const candY = candYId ? CANDIDATOS_OFICIAIS.find((c) => c.id === candYId) : undefined;

  const { unidades: unidadesBrutas, bairrosDisponiveis } = buscarUnidadesBrutasMultiTSE(
    [candX.numero],
    candY?.numero,
    camada,
    ano,
    {
      mesorregiao: microrregiaoFiltro,
      municipio: municipioFiltro,
      bairro: bairroFiltro
    }
  );

  const eleicaoRef = ano === 0
    ? 'Consolidado (Eleições 2022 & 2024)'
    : (ELEICOES_OFICIAIS.find((e) => e.ano === ano)?.descricao ?? `Eleições ${ano}`);
  const dataAtualizacao = new Date().toISOString().split('T')[0];

  const resultadosCalculados = calcularEstatisticasDobradinha(
    unidadesBrutas,
    eleicaoRef,
    dataAtualizacao
  );

  const totalEleitores = resultadosCalculados.reduce((acc, r) => acc + r.aptos, 0);
  const totalSecoes = resultadosCalculados.reduce((acc, r) => acc + r.total_secoes, 0);
  const totalVotosX = resultadosCalculados.reduce((acc, r) => acc + r.votos_A, 0);
  const totalVotosY = resultadosCalculados.reduce((acc, r) => acc + r.votos_B, 0);

  // Rankings
  const rankingComplementaridade = [...resultadosCalculados]
    .sort((a, b) => b.complementaridade - a.complementaridade)
    .slice(0, 5);

  const rankingCanibalizacao = [...resultadosCalculados]
    .sort((a, b) => (b.sobreposicao * b.forca_dobradinha) - (a.sobreposicao * a.forca_dobradinha))
    .slice(0, 5);

  // Gerador de IA de Direcionamentos Estratégicos
  const aiInsights = gerarInsightsEstrategicosIA(resultadosCalculados, candX, candY);

  res.json({
    eleicaoRef,
    dataAtualizacao,
    candidatoX: candX,
    candidatoY: candY || null,
    anoEleicao: ano,
    camada,
    timestamp: new Date().toISOString(),
    resumoGeral: {
      totalEleitores,
      totalSecoes,
      mediaEleitoresPorSecao: totalSecoes > 0 ? Math.round(totalEleitores / totalSecoes) : 0,
      totalVotosX,
      totalVotosY,
      totalVotosDobradinha: totalVotosX + totalVotosY,
      votoMedioX: resultadosCalculados.length ? Math.round(totalVotosX / resultadosCalculados.length) : 0,
      votoMedioY: resultadosCalculados.length ? Math.round(totalVotosY / resultadosCalculados.length) : 0,
    },
    rankings: {
      maiorComplementaridade: rankingComplementaridade,
      maiorCanibalizacao: rankingCanibalizacao,
    },
    aiInsights,
    bairrosDisponiveis,
    territorios: resultadosCalculados,
  });
});
