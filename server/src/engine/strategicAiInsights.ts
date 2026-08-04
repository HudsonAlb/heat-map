/**
 * GeoVoto - Motor de Inteligência Artificial para Leitura e Direcionamentos Estratégicos
 * Berlim Co.
 *
 * Gera análises táticas automatizadas sobre o desempenho eleitoral nos territórios.
 */

import { TerritorioCalculado, Candidato } from '../types';

export interface InsightEstrategicoIA {
  titulo: string;
  categoria: 'DIAGNOSTICO' | 'RECOMENDACAO' | 'ALERTA' | 'OPORTUNIDADE';
  descricao: string;
  acaoRecomendada: string;
  prioridade: 'ALTA' | 'MEDIA' | 'BAIXA';
  mesorregiaoAfetada?: string;
}

export interface RelatorioInsightsIA {
  resumoExecutivo: string;
  diagnosticoMesorregioes: {
    mesorregiao: string;
    status: string;
    desempenho: string;
    diretriz: string;
  }[];
  insightsDetalhados: InsightEstrategicoIA[];
  timestampGeracao: string;
}

export function gerarInsightsEstrategicosIA(
  territorios: TerritorioCalculado[],
  candidatoX: Candidato,
  candidatoY?: Candidato
): RelatorioInsightsIA {
  const nomeParceria = candidatoY
    ? `${candidatoX.nome_urna} + ${candidatoY.nome_urna}`
    : candidatoX.nome_urna;

  // As 12 Regiões de Desenvolvimento (RDs) Oficiais de Pernambuco
  const rdsPE = [
    'RD 01 - RMR (Região Metropolitana)',
    'RD 02 - Mata Norte',
    'RD 03 - Mata Sul',
    'RD 04 - Agreste Central',
    'RD 05 - Agreste Setentrional',
    'RD 06 - Agreste Meridional',
    'RD 07 - Sertão do Moxotó',
    'RD 08 - Sertão do Pajeú',
    'RD 09 - Sertão do Araripe',
    'RD 10 - Sertão Central',
    'RD 11 - Sertão do São Francisco',
    'RD 12 - Sertão de Itaparica',
  ];

  const diagnosticoMeso = rdsPE.map((rd) => {
    const doRD = territorios.filter((t) => {
      if (!t.microrregiao) return false;
      const tNorm = t.microrregiao.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const rdNorm = rd.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return tNorm.includes(rdNorm.split('-')[0].trim()) || rdNorm.includes(tNorm);
    });

    const totalVotosX = doRD.reduce((acc, t) => acc + t.votos_A, 0);
    const totalVotosY = doRD.reduce((acc, t) => acc + (t.votos_B || 0), 0);
    const totalVotos = totalVotosX + totalVotosY;
    const totalAptos = doRD.reduce((acc, t) => acc + t.aptos, 0);

    const penPercent = totalAptos > 0 ? (totalVotos / totalAptos) * 100 : 0;

    let status = 'NEUTRO';
    let diretriz = 'Manter monitoramento e articulação política de rotina.';

    if (totalVotos > 0 && penPercent >= 25) {
      status = 'FORÇA CONSOLIDADA';
      diretriz = 'Mobilizar lideranças locais para defender base e garantir presença em comitês.';
    } else if (totalAptos > 40000 && penPercent < 25 && penPercent >= 10) {
      status = 'ALTA OPORTUNIDADE';
      diretriz = 'Intensificar agenda presencial e campanhas de mídia regional concentradas.';
    } else if (totalAptos > 50000 && penPercent < 10) {
      status = 'TERRITÓRIO DE RISCO';
      diretriz = 'Reavaliar alianças políticas locais e reforçar discurso com pautas regionais.';
    } else if (totalVotos > 0) {
      status = 'OPORTUNIDADE EM EXPANSÃO';
      diretriz = 'Mapear lideranças comunitárias e articular dobradinhas estratégicas.';
    }

    return {
      mesorregiao: rd,
      status,
      desempenho: `${totalVotos.toLocaleString('pt-BR')} votos em ${totalAptos.toLocaleString('pt-BR')} eleitores aptos (${penPercent.toFixed(1)}% de penetração)`,
      diretriz,
    };
  });

  const insightsDetalhados: InsightEstrategicoIA[] = [];

  // Insight 1: Reduto de Maior Força
  const topForca = [...territorios].sort((a, b) => b.votos_A - a.votos_A)[0];
  if (topForca && topForca.votos_A > 0) {
    insightsDetalhados.push({
      titulo: `Reduto de Força em ${topForca.nome}`,
      categoria: 'DIAGNOSTICO',
      descricao: `O município de ${topForca.nome} (${topForca.microrregiao || topForca.mesorregiao}) é o principal polo eleitoral de ${candidatoX.nome_urna}, somando ${topForca.votos_A.toLocaleString('pt-BR')} votos entre ${topForca.aptos.toLocaleString('pt-BR')} eleitores aptos.`,
      acaoRecomendada: `Manter comitê central ativo e mobilizar lideranças locais para blindagem da base.`,
      prioridade: 'ALTA',
      mesorregiaoAfetada: topForca.microrregiao || topForca.mesorregiao,
    });
  }

  // Insight 2: Polo de Oportunidade com Grande Eleitorado
  const opEleitorado = [...territorios]
    .filter((t) => t.aptos > 30000)
    .sort((a, b) => b.aptos - a.aptos)[0];

  if (opEleitorado) {
    insightsDetalhados.push({
      titulo: `Expansão Estratégica em ${opEleitorado.nome}`,
      categoria: 'OPORTUNIDADE',
      descricao: `O município de ${opEleitorado.nome} possui um grande universo eleitoral de ${opEleitorado.aptos.toLocaleString('pt-BR')} eleitores aptos (${opEleitorado.microrregiao || opEleitorado.mesorregiao}).`,
      acaoRecomendada: `Agendar presença dos candidatos e reforçar cabos eleitorais nos bairros centrais de ${opEleitorado.nome}.`,
      prioridade: 'ALTA',
      mesorregiaoAfetada: opEleitorado.microrregiao || opEleitorado.mesorregiao,
    });
  }

  // Insight 3: Complementaridade de Dobradinha
  if (candidatoY) {
    const altaComp = [...territorios].sort((a, b) => b.complementaridade - a.complementaridade)[0];
    if (altaComp) {
      insightsDetalhados.push({
        titulo: `Sinergia de Parceria em ${altaComp.nome}`,
        categoria: 'RECOMENDACAO',
        descricao: `Alta complementaridade detectada em ${altaComp.nome}. Onde ${candidatoX.nome_urna} necessita de ampliação, ${candidatoY.nome_urna} apresenta boa tração.`,
        acaoRecomendada: `Promover dobradinha explícita em peças de mídia física e digital em ${altaComp.nome}.`,
        prioridade: 'ALTA',
        mesorregiaoAfetada: altaComp.microrregiao || altaComp.mesorregiao,
      });
    }
  }

  const opsCount = diagnosticoMeso.filter((d) => d.status.includes('OPORTUNIDADE')).length;

  return {
    resumoExecutivo: `Análise da IA GeoVoto para ${nomeParceria}: Cruzamento de dados concluído em 185+ municípios e 12 RDs. Identificadas ${opsCount} Regiões de Desenvolvimento prioritárias para ampliação de base e ações de campanha.`,
    diagnosticoMesorregioes: diagnosticoMeso,
    insightsDetalhados,
    timestampGeracao: new Date().toISOString(),
  };
}
