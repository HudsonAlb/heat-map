/**
 * GeoVoto - Executor Parametrizado de Consultas e Gerador de Respostas do Chatbot
 * Berlim Co.
 */

import { ChatbotIntent, ChatbotResponse, EscopoGeografico } from '../types';
import { CANDIDATOS_OFICIAIS, ELEICOES_OFICIAIS } from '../data/realDataStore';
import { buscarUnidadesBrutasMultiTSE } from '../data/tseDataProvider';
import { calcularEstatisticasDobradinha, UnidadeBruta } from '../engine/dobradinhaCalculator';

export function executarConsultaChatbot(
  intent: ChatbotIntent,
  escopoUsuario?: EscopoGeografico
): ChatbotResponse {
  const candX = CANDIDATOS_OFICIAIS.find((c) => c.id === intent.candidatos[0]) || CANDIDATOS_OFICIAIS[0];
  const candY = CANDIDATOS_OFICIAIS.find((c) => c.id === intent.candidatos[1]) || CANDIDATOS_OFICIAIS[1];

  // 1. Busca unidades brutas na camada e ano solicitados
  const anoEleicao = intent.eleicao?.ano || 2024;
  let { unidades: unidadesBrutas } = buscarUnidadesBrutasMultiTSE(
    [candX.numero],
    candY?.numero,
    intent.recorte.camada,
    anoEleicao
  );

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

  // 5. Constrói o texto da resposta com tom fluido e conversacional
  let textoResposta = '';

  if (intent.intencao === 'voto_candidato_isolado') {
    const totalVotos = resultados.reduce((acc, r) => acc + r.votos_A, 0);
    const totalAptos = resultados.reduce((acc, r) => acc + r.aptos, 0);
    const pctEleitorado = totalAptos > 0 ? ((totalVotos / totalAptos) * 100).toFixed(2) : '0';
    const recorteNome = intent.recorte.municipios?.join(', ') || intent.recorte.mesorregiao || 'todo o estado de Pernambuco';

    textoResposta = `Analisando o desempenho do candidato **${candX.nome_urna}** (${candX.partido} ${candX.numero}), identificamos que ele conquistou um total de **${totalVotos.toLocaleString('pt-BR')} votos** em ${recorteNome}. Isso representa **${pctEleitorado}% do eleitorado apto** na região (que soma ${totalAptos.toLocaleString('pt-BR')} eleitores ao todo).`;

    // Se houver múltiplos municípios/locais no resultado, tece os destaques de forma conversacional
    if (resultados.length > 1) {
      const top3 = [...resultados].sort((a, b) => b.votos_A - a.votos_A).slice(0, 3);
      const destaquesFrase = top3.map((t) => `**${t.nome}** (onde somou ${t.votos_A.toLocaleString('pt-BR')} votos)`).join(', ');
      textoResposta += `\n\nOs principais redutos de votação nessa região foram ${destaquesFrase}. Se quiser, posso detalhar uma dessas localidades especificamente para você!`;
    }
  } else if (intent.intencao === 'voto_regiao_geral' || intent.intencao === 'resumo_metricas') {
    const totalAptos = resultados.reduce((acc, r) => acc + r.aptos, 0);
    const totalSecoes = resultados.reduce((acc, r) => acc + r.total_secoes, 0);
    const totalVotosX = resultados.reduce((acc, r) => acc + r.votos_A, 0);
    const totalVotosY = resultados.reduce((acc, r) => acc + r.votos_B, 0);

    const recorteNome = intent.recorte.municipios?.join(', ') || intent.recorte.mesorregiao || 'Pernambuco';

    textoResposta = `No recorte de **${recorteNome}**, temos um universo eleitoral de **${totalAptos.toLocaleString('pt-BR')} eleitores aptos** distribuídos em **${totalSecoes.toLocaleString('pt-BR')} seções**. Ao observar o desempenho dos nomes analisados, **${candX.nome_urna}** acumula **${totalVotosX.toLocaleString('pt-BR')} votos**, enquanto **${candY.nome_urna}** registra **${totalVotosY.toLocaleString('pt-BR')} votos** nessa mesma área.`;
  } else if (intent.intencao === 'ranking_territorios' && intent.metrica === 'classificacao') {
    const oportunidades = resultados.filter((r) => r.classificacao === 'OPORTUNIDADE');
    const ordenadas = (oportunidades.length > 0 ? oportunidades : resultados)
      .sort((a, b) => b.aptos - a.aptos)
      .slice(0, intent.limite || 5);

    const listaFrase = ordenadas
      .map((t) => `**${t.nome}** (com ${t.aptos.toLocaleString('pt-BR')} eleitores e força de ${(t.forca_dobradinha * 100).toFixed(1)}%)`)
      .join('; ');

    textoResposta = `Avaliando as melhores janelas de expansão para a parceria entre **${candX.nome_urna}** e **${candY.nome_urna}**, destacam-se como áreas de maior **OPORTUNIDADE** os territórios de ${listaFrase}. Esses locais têm grande potencial para ações conjuntas de campanha!`;
  } else {
    // Comparação / Ranking de Força
    const eCandidatoUnico = intent.candidatos.length === 1;
    
    if (eCandidatoUnico) {
      const ordenadas = [...resultados]
        .sort((a, b) => b.votos_A - a.votos_A)
        .slice(0, intent.limite || 5);

      const listaFrase = ordenadas
        .map((t) => `**${t.nome}** (${t.votos_A.toLocaleString('pt-BR')} votos)`)
        .join(', ');

      textoResposta = `Explorando os resultados por **${intent.recorte.camada}**, notamos que os pontos de maior votação de **${candX.nome_urna}** concentram-se em ${listaFrase}. Quer que eu filtre alguma cidade ou bairro em particular?`;
    } else {
      const ordenadas = [...resultados]
        .sort((a, b) => b.forca_dobradinha - a.forca_dobradinha)
        .slice(0, intent.limite || 5);

      const listaFrase = ordenadas
        .map((t) => `em **${t.nome}**, onde **${candX.nome_urna}** fez ${t.votos_A.toLocaleString('pt-BR')} votos e **${candY.nome_urna}** somou ${t.votos_B.toLocaleString('pt-BR')} (atingindo ${(t.forca_dobradinha * 100).toFixed(1)}% de força somada)`)
        .join('; ');

      textoResposta = `Ao analisar a dobradinha entre **${candX.nome_urna}** e **${candY.nome_urna}** na camada de **${intent.recorte.camada}**, observamos uma sinergia expressiva ${listaFrase}.`;
    }
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
      modo: intent.intencao === 'voto_candidato_isolado' ? 'isolado_x' : 'soma',
    },
  };
}
