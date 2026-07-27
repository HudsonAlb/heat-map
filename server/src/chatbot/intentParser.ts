/**
 * GeoVoto - Parser de Intenções de Linguagem Natural (NL -> Intent Schema)
 * Berlim Co.
 *
 * Transforma frases em português do usuário em objetos de intenção estritamente
 * validados, impedindo a geração ou execução de SQL inseguro.
 */

import { ChatbotIntent, CamadaGeografica } from '../types';
import { CANDIDATOS_OFICIAIS } from '../data/realDataStore';

export function parseIntentFromText(mensagem: string): ChatbotIntent {
  const texto = mensagem.trim().toLowerCase();

  // 1. Identifica Candidatos Mencionados
  const candIdsEncontrados: number[] = [];
  CANDIDATOS_OFICIAIS.forEach((cand) => {
    const nomeUrnaLower = cand.nome_urna.toLowerCase();
    const partesNome = nomeUrnaLower.split(' ');
    // Verifica se a frase contém o nome de urna ou partes marcantes do nome
    if (texto.includes(nomeUrnaLower) || partesNome.every((p) => p.length > 2 && texto.includes(p))) {
      candIdsEncontrados.push(cand.id);
    }
  });

  // Se nenhum for mencionado explicitamente, assume por padrão a dobradinha principal (Pedro Campos 101 + Sileno Gouveia 102)
  const candidatos = candIdsEncontrados.length >= 2
    ? candIdsEncontrados.slice(0, 2)
    : candIdsEncontrados.length === 1
      ? [candIdsEncontrados[0], 102]
      : [101, 102];

  // 2. Identifica Camada Geográfica
  let camada: CamadaGeografica = 'municipio';
  if (texto.includes('bairro') || texto.includes('bairros')) {
    camada = 'bairro';
  } else if (texto.includes('secao') || texto.includes('seções') || texto.includes('local de votação')) {
    camada = 'secao';
  } else if (texto.includes('mesorregiao') || texto.includes('região metropolitana') || texto.includes('zona da mata') || texto.includes('agreste') || texto.includes('sertão')) {
    camada = 'mesorregiao';
  }

  // 3. Identifica Municípios / Regiões no texto
  const municipios: string[] = [];
  if (texto.includes('recife')) municipios.push('Recife');
  if (texto.includes('olinda')) municipios.push('Olinda');
  if (texto.includes('caruaru')) municipios.push('Caruaru');
  if (texto.includes('petrolina')) municipios.push('Petrolina');
  if (texto.includes('garanhuns')) municipios.push('Garanhuns');
  if (texto.includes('jaboatão') || texto.includes('jaboatao')) municipios.push('Jaboatão dos Guararapes');
  if (texto.includes('serra talhada')) municipios.push('Serra Talhada');

  let mesorregiao: string | undefined;
  if (texto.includes('zona da mata')) mesorregiao = 'Zona da Mata';
  if (texto.includes('agreste')) mesorregiao = 'Agreste';
  if (texto.includes('sertão') || texto.includes('sertao')) mesorregiao = 'Sertão';
  if (texto.includes('metropolitana') || texto.includes('rmr')) mesorregiao = 'Região Metropolitana do Recife';

  // 4. Identifica Intenção e Métrica
  let intencao: ChatbotIntent['intencao'] = 'comparar_candidatos';
  let metrica: ChatbotIntent['metrica'] = 'forca';

  if (texto.includes('oportunidade') || texto.includes('oportunidades')) {
    intencao = 'ranking_territorios';
    metrica = 'classificacao';
  } else if (texto.includes('mais forte') || texto.includes('forte') || texto.includes('desempenho') || texto.includes('maior')) {
    intencao = 'ranking_territorios';
    metrica = 'forca';
  } else if (texto.includes('quantos eleitores') || texto.includes('total de eleitores') || texto.includes('resumo') || texto.includes('eleitorado')) {
    intencao = 'resumo_metricas';
    metrica = 'votos_absolutos';
  } else if (texto.includes('fraco') || texto.includes('complementar') || texto.includes('diferença')) {
    intencao = 'ranking_territorios';
    metrica = 'complementaridade';
  }

  return {
    intencao,
    candidatos,
    recorte: {
      camada,
      uf: 'PE',
      mesorregiao,
      municipios: municipios.length > 0 ? municipios : undefined,
    },
    eleicao: {
      ano: 2022,
      turno: 1,
      cargo: 'DEPUTADO FEDERAL',
    },
    metrica,
    ordenacao: 'desc',
    limite: 10,
  };
}
