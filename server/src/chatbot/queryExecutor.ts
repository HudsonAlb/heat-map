/**
 * GeoVoto - Executor Parametrizado de Consultas e Gerador de Respostas do Chatbot
 * Berlim Co.
 */

import { ChatbotIntent, ChatbotResponse, EscopoGeografico } from '../types';
import { CANDIDATOS_OFICIAIS, buscarUnidadesBrutasMulti, ELEICOES_OFICIAIS } from '../data/realDataStore';
import { calcularEstatisticasDobradinha, UnidadeBruta } from '../engine/dobradinhaCalculator';

export function executarConsultaChatbot(
  intent: ChatbotIntent,
  escopoUsuario?: EscopoGeografico
): ChatbotResponse {
  const candX = CANDIDATOS_OFICIAIS.find((c) => c.id === intent.candidatos[0]) || CANDIDATOS_OFICIAIS[0];
  const candY = CANDIDATOS_OFICIAIS.find((c) => c.id === intent.candidatos[1]) || CANDIDATOS_OFICIAIS[1];

  // 1. Busca unidades brutas na camada solicitada
  let unidadesBrutas = buscarUnidadesBrutasMulti([candX.id, candY.id], intent.recorte.camada, 2024);

  // 2. Aplica restrições de escopo do RBAC do usuário
  if (escopoUsuario) {
    if (escopoUsuario.mesorregioes && escopoUsuario.mesorregioes.length > 0) {
      unidadesBrutas = unidadesBrutas.filter((u: UnidadeBruta) => escopoUsuario.mesorregioes!.includes(u.mesorregiao));
    }
    if (escopoUsuario.municipios && escopoUsuario.municipios.length > 0) {
      unidadesBrutas = unidadesBrutas.filter((u: UnidadeBruta) => escopoUsuario.municipios!.includes(u.nome_municipio!));
    }
  }

  // 3. Aplica recortes específicos do prompt
  if (intent.recorte.mesorregiao) {
    unidadesBrutas = unidadesBrutas.filter((u: UnidadeBruta) => u.mesorregiao === intent.recorte.mesorregiao);
  }
  if (intent.recorte.municipios && intent.recorte.municipios.length > 0) {
    unidadesBrutas = unidadesBrutas.filter((u: UnidadeBruta) => intent.recorte.municipios!.includes(u.nome_municipio!));
  }

  const eleicaoRef = ELEICOES_OFICIAIS.find((e) => e.id === candX.eleicao_id)?.descricao ?? 'Eleições Municipais 2024';
  const dataAtualizacao = '2026-07-27';

  // 4. Executa o motor estatístico da dobradinha
  const resultados = calcularEstatisticasDobradinha(unidadesBrutas, eleicaoRef, dataAtualizacao);

  // 5. Constrói o texto da resposta baseado na intenção
  let textoResposta = '';

  if (intent.intencao === 'resumo_metricas') {
    const totalAptos = resultados.reduce((acc, r) => acc + r.aptos, 0);
    const totalSecoes = resultados.reduce((acc, r) => acc + r.total_secoes, 0);
    const totalVotosX = resultados.reduce((acc, r) => acc + r.votos_A, 0);
    const totalVotosY = resultados.reduce((acc, r) => acc + r.votos_B, 0);

    const recorteNome = intent.recorte.municipios?.join(', ') || intent.recorte.mesorregiao || 'Pernambuco (Estado Completo)';

    textoResposta = `No recorte **${recorteNome}**, identificamos um total de **${totalAptos.toLocaleString('pt-BR')} eleitores aptos** distribuídos em **${totalSecoes} seções eleitorais**.\n\n` +
      `**Performance da Dobradinha (${candX.nome_urna} + ${candY.nome_urna}):**\n` +
      `- **${candX.nome_urna}:** ${totalVotosX.toLocaleString('pt-BR')} votos\n` +
      `- **${candY.nome_urna}:** ${totalVotosY.toLocaleString('pt-BR')} votos\n` +
      `- **Total Combinado:** ${(totalVotosX + totalVotosY).toLocaleString('pt-BR')} votos`;
  } else if (intent.intencao === 'ranking_territorios' && intent.metrica === 'classificacao') {
    const oportunidades = resultados.filter((r) => r.classificacao === 'OPORTUNIDADE');
    const ordenadas = (oportunidades.length > 0 ? oportunidades : resultados)
      .sort((a, b) => b.aptos - a.aptos)
      .slice(0, intent.limite || 10);

    const listaMd = ordenadas
      .map(
        (t, idx) =>
          `**${idx + 1}. ${t.nome}** — ${t.aptos.toLocaleString('pt-BR')} eleitores aptos | Força da Dobradinha: **${(t.forca_dobradinha * 100).toFixed(1)}%** (Rótulo: \`${t.classificacao}\`)`
      )
      .join('\n');

    textoResposta = `Aqui estão os principais territórios de **OPORTUNIDADE** para a dobradinha **${candX.nome_urna} + ${candY.nome_urna}**:\n\n${listaMd}`;
  } else {
    // Comparação / Ranking de Força Padrão
    const ordenadas = [...resultados]
      .sort((a, b) => b.forca_dobradinha - a.forca_dobradinha)
      .slice(0, intent.limite || 10);

    const listaMd = ordenadas
      .map(
        (t, idx) =>
          `**${idx + 1}. ${t.nome}** — Votos X: **${t.votos_A}** | Votos Y: **${t.votos_B}** | Força Somada: **${(t.forca_dobradinha * 100).toFixed(1)}%**`
      )
      .join('\n');

    textoResposta = `Análise comparativa da dobradinha **${candX.nome_urna}** e **${candY.nome_urna}** na camada **${intent.recorte.camada.toUpperCase()}**:\n\n${listaMd}`;
  }

  // 6. Monta citação de fontes oficiais e Deep Link para ativação no mapa
  const municipiosString = intent.recorte.municipios?.join(', ') || 'Todos';
  const mesorregiaoString = intent.recorte.mesorregiao || 'Todas';

  return {
    texto: textoResposta,
    intent,
    dados: resultados.slice(0, 10),
    fonte: {
      eleicao_referencia: eleicaoRef,
      camada: intent.recorte.camada,
      filtros: `UF: PE | Meso: ${mesorregiaoString} | Município: ${municipiosString}`,
      data_atualizacao: dataAtualizacao,
    },
    deep_link: {
      candXId: candX.id,
      candYId: candY.id,
      camada: intent.recorte.camada,
      microrregiao: intent.recorte.mesorregiao,
      municipio: intent.recorte.municipios ? intent.recorte.municipios[0] : undefined,
      modo: 'soma',
    },
  };
}
