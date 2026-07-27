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

  // Agrega por mesorregião (RMR, Mata, Agreste, Sertão)
  const mesorregioesList = ['RMR', 'Zona da Mata', 'Agreste', 'Sertão'];
  const diagnosticoMeso = mesorregioesList.map((meso) => {
    const doMeso = territorios.filter(
      (t) => t.mesorregiao === meso || (meso === 'RMR' && t.mesorregiao.includes('Metropolitana'))
    );

    const totalVotos = doMeso.reduce((acc, t) => acc + t.votos_A + (t.votos_B || 0), 0);
    const totalAptos = doMeso.reduce((acc, t) => acc + t.aptos, 0);
    const forcaMedia = doMeso.length > 0
      ? doMeso.reduce((acc, t) => acc + t.forca_dobradinha, 0) / doMeso.length
      : 0;

    let status = 'NEUTRO';
    let diretriz = 'Manter monitoramento de rotina.';

    if (forcaMedia >= 0.3) {
      status = 'FORÇA CONSOLIDADA';
      diretriz = 'Mobilização de base e consolidação de comitês locais de apoio.';
    } else if (totalAptos > 50000 && forcaMedia >= 0.15) {
      status = 'ALTA OPORTUNIDADE';
      diretriz = 'Intensificar presença física de agenda e campanhas de mídia regional concentradas.';
    } else if (totalVotos > 0 && forcaMedia < 0.15) {
      status = 'TERRITÓRIO DE RISCO';
      diretriz = 'Reavaliar parcerias locais e reforçar discurso regional específico.';
    }

    return {
      mesorregiao: meso,
      status,
      desempenho: `${totalVotos.toLocaleString('pt-BR')} votos em ${totalAptos.toLocaleString('pt-BR')} aptos (Força: ${(forcaMedia * 100).toFixed(1)}%)`,
      diretriz,
    };
  });

  const insightsDetalhados: InsightEstrategicoIA[] = [];

  // Insight 1: Territórios de Oportunidade
  const oportunidades = territorios.filter((t) => t.classificacao === 'OPORTUNIDADE');
  if (oportunidades.length > 0) {
    const topOp = oportunidades[0];
    insightsDetalhados.push({
      titulo: `Expansão Estratégica em ${topOp.nome}`,
      categoria: 'OPORTUNIDADE',
      descricao: `O município de ${topOp.nome} (${topOp.mesorregiao}) possui ${topOp.aptos.toLocaleString('pt-BR')} eleitores aptos com penetração média atual de ${(topOp.forca_dobradinha * 100).toFixed(1)}%.`,
      acaoRecomendada: `Agendar presença dos candidatos e reforçar cabos eleitorais nos bairros centrais de ${topOp.nome}.`,
      prioridade: 'ALTA',
      mesorregiaoAfetada: topOp.mesorregiao,
    });
  }

  // Insight 2: Complementaridade
  const altaComp = [...territorios].sort((a, b) => b.complementaridade - a.complementaridade)[0];
  if (altaComp && candidatoY) {
    insightsDetalhados.push({
      titulo: `Transferência de Votos Eficiente em ${altaComp.nome}`,
      categoria: 'RECOMENDACAO',
      descricao: `Alta complementaridade detectada em ${altaComp.nome}. Onde ${candidatoX.nome_urna} necessita de tração, ${candidatoY.nome_urna} apresenta base consolidada.`,
      acaoRecomendada: `Promover dobradinha explícita em peças de mídia física e digital em ${altaComp.nome}.`,
      prioridade: 'ALTA',
      mesorregiaoAfetada: altaComp.mesorregiao,
    });
  }

  // Insight 3: Risco de Canibalização
  const canibalizacao = [...territorios].sort((a, b) => b.sobreposicao - a.sobreposicao)[0];
  if (canibalizacao && canibalizacao.sobreposicao > 0.7 && candidatoY) {
    insightsDetalhados.push({
      titulo: `Atenção para Sobreposição em ${canibalizacao.nome}`,
      categoria: 'ALERTA',
      descricao: `Ambos os candidatos disputam o mesmo nicho de eleitores em ${canibalizacao.nome} com ${(canibalizacao.sobreposicao * 100).toFixed(1)}% de sobreposição.`,
      acaoRecomendada: `Segmentar discursos por bairro/comunidade para evitar atrito de base.`,
      prioridade: 'MEDIA',
      mesorregiaoAfetada: canibalizacao.mesorregiao,
    });
  }

  return {
    resumoExecutivo: `Análise da IA GeoVoto para a parceria ${nomeParceria}: Identificados ${oportunidades.length} territórios prioritários para investimento de campanha. A região de maior potencial de retorno em eleitores é a RMR e o Agreste.`,
    diagnosticoMesorregioes: diagnosticoMeso,
    insightsDetalhados,
    timestampGeracao: new Date().toISOString(),
  };
}
