/**
 * GeoVoto - Motor de Cálculo de Estatísticas da Dobradinha
 * Berlim Co.
 *
 * Implementa as fórmulas matemáticas da seção 5 da especificação GeoVoto.
 */

import { TerritorioCalculado, CamadaGeografica } from '../types';
import { classificarTerritorios, ParametrosQuantilCampanha } from './territoryClassifier';

export interface UnidadeBruta {
  id: string;
  camada: CamadaGeografica;
  nome: string;
  uf: string;
  mesorregiao: string;
  microrregiao: string;
  cod_municipio_ibge?: number;
  cod_municipio_tse?: number;
  nome_municipio?: string;
  bairro?: string;
  latitude?: number;
  longitude?: number;
  geometria_aproximada?: boolean;

  votos_A: number | null;
  votos_B: number | null;
  aptos: number | null;
  comparecimento: number | null;
  total_secoes: number;
  sem_comparabilidade_historica?: boolean;
}

/**
 * Processa um conjunto de unidades geográficas brutas para um par de candidatos (A, B)
 * e gera o dataset com métricas calculadas e territórios classificados.
 */
export function calcularEstatisticasDobradinha(
  unidades: UnidadeBruta[],
  eleicaoReferencia: string,
  dataAtualizacao: string,
  paramsCampanha?: ParametrosQuantilCampanha
): TerritorioCalculado[] {
  // 1. Calcula a soma total de votos da dobradinha no recorte ativo
  let totalVotosDobradinhaRecorte = 0;
  for (const u of unidades) {
    const vA = u.votos_A ?? 0;
    const vB = u.votos_B ?? 0;
    totalVotosDobradinhaRecorte += vA + vB;
  }

  // Se o total for zero (ex: nenhum voto no recorte), evita divisão por zero
  if (totalVotosDobradinhaRecorte === 0) {
    totalVotosDobradinhaRecorte = 1;
  }

  // 2. Calcula as métricas individuais por unidade geográfica
  const territoriosSemClassificacao = unidades.map((u) => {
    const temDadosNulos =
      u.votos_A === null || u.votos_B === null || u.comparecimento === null || u.aptos === null;

    const vA = u.votos_A ?? 0;
    const vB = u.votos_B ?? 0;
    const comp = u.comparecimento && u.comparecimento > 0 ? u.comparecimento : Math.max(vA + vB, 1);
    const aptos = u.aptos ?? 0;

    // Fórmulas da especificação
    const aderencia_A = vA / comp;
    const aderencia_B = vB / comp;
    const forca_dobradinha = aderencia_A + aderencia_B;

    const maxAderencia = Math.max(aderencia_A, aderencia_B);
    const minAderencia = Math.min(aderencia_A, aderencia_B);
    const sobreposicao = maxAderencia > 0 ? minAderencia / maxAderencia : 0;
    const complementaridade = Math.abs(aderencia_A - aderencia_B);

    const peso_absoluto = (vA + vB) / totalVotosDobradinhaRecorte;

    return {
      id: u.id,
      camada: u.camada,
      nome: u.nome,
      uf: u.uf,
      mesorregiao: u.mesorregiao,
      microrregiao: u.microrregiao,
      cod_municipio_ibge: u.cod_municipio_ibge,
      cod_municipio_tse: u.cod_municipio_tse,
      nome_municipio: u.nome_municipio,
      bairro: u.bairro,
      latitude: u.latitude,
      longitude: u.longitude,
      geometria_aproximada: u.geometria_aproximada ?? false,

      votos_A: vA,
      votos_B: vB,
      aptos,
      comparecimento: comp,
      total_secoes: u.total_secoes,

      aderencia_A,
      aderencia_B,
      forca_dobradinha,
      sobreposicao,
      complementaridade,
      peso_absoluto,

      eleicao_referencia: eleicaoReferencia,
      data_atualizacao: dataAtualizacao,
      tem_dados_nulos: temDadosNulos,
      sem_comparabilidade_historica: u.sem_comparabilidade_historica ?? false,
    };
  });

  // 3. Aplica o classificador territorial estrategico
  return classificarTerritorios(territoriosSemClassificacao, paramsCampanha);
}
