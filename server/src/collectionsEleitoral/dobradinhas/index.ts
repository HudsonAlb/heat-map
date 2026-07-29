import { Router, Request, Response } from 'express';
import { CANDIDATOS_OFICIAIS, ELEICOES_OFICIAIS } from '../../data/realDataStore';
import { buscarUnidadesBrutasMultiTSE } from '../../data/tseDataProvider';
import { calcularEstatisticasDobradinha } from '../../engine/dobradinhaCalculator';
import { gerarInsightsEstrategicosIA } from '../../engine/strategicAiInsights';
import { CamadaGeografica } from '../../types';

export const comparacaoRouter = Router();

comparacaoRouter.get('/', (req: Request, res: Response): void => {
  const candXId = Number(req.query.candX || 201);
  const candYId = req.query.candY ? Number(req.query.candY) : undefined;
  const ano = req.query.ano ? Number(req.query.ano) : 2024;
  const camada = (String(req.query.camada || 'municipio')) as CamadaGeografica;
  const microrregiaoFiltro = String(req.query.microrregiao || 'Todas');
  const municipioFiltro = String(req.query.municipio || 'Todos');
  const bairroFiltro = String(req.query.bairro || 'Todos');

  const candX = CANDIDATOS_OFICIAIS.find((c) => c.id === candXId) || CANDIDATOS_OFICIAIS[0];
  const candY = candYId ? CANDIDATOS_OFICIAIS.find((c) => c.id === candYId) : undefined;

  // Usa o número de urna do candidato para consultar diretamente o CSV do TSE
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
