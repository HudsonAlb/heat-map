/**
 * GeoVoto - Motor de Cálculo de Classificação de Território
 * Berlim Co.
 *
 * Implementa as regras formais da seção 5 da especificação GeoVoto.
 */

import { TerritorioCalculado, ClassificacaoTerritorio } from '../types';

export interface ParametrosQuantilCampanha {
  percentilForcaP75: number; // ex: 0.75 (75º percentil da distribuição de força)
  percentilPesoP50: number;  // ex: 0.50 (50º percentil da distribuição de peso)
  percentilForcaP25: number; // ex: 0.25 (25º percentil)
  percentilAptosP60: number; // ex: 0.60 (60º percentil da distribuição de aptos)
}

export const PARAMETROS_PADRAO_CAMPANHA: ParametrosQuantilCampanha = {
  percentilForcaP75: 0.75,
  percentilPesoP50: 0.50,
  percentilForcaP25: 0.25,
  percentilAptosP60: 0.60,
};

/**
 * Calcula o valor no percentil k (0 <= k <= 1) de um vetor numérico.
 */
export function calcularPercentil(valores: number[], percentil: number): number {
  if (valores.length === 0) return 0;
  const ordenados = [...valores].sort((a, b) => a - b);
  const index = (ordenados.length - 1) * percentil;
  const iBaixo = Math.floor(index);
  const iAlto = Math.ceil(index);
  if (iBaixo === iAlto) return ordenados[iBaixo];
  const peso = index - iBaixo;
  return ordenados[iBaixo] * (1 - peso) + ordenados[iAlto] * peso;
}

/**
 * Aplica a rotulagem estratégica nos territórios calculados com base nos percentis do recorte.
 */
export function classificarTerritorios(
  territorios: Omit<TerritorioCalculado, 'classificacao'>[],
  params: ParametrosQuantilCampanha = PARAMETROS_PADRAO_CAMPANHA
): TerritorioCalculado[] {
  if (territorios.length === 0) return [];

  // Extrai vetores de métricas para cálculo da mediana/percentis do recorte filtrado
  const forcas = territorios.map((t) => t.forca_dobradinha);
  const pesos = territorios.map((t) => t.peso_absoluto);
  const aptosList = territorios.map((t) => t.aptos);

  const p75Forca = calcularPercentil(forcas, params.percentilForcaP75);
  const p25Forca = calcularPercentil(forcas, params.percentilForcaP25);
  const p50Peso = calcularPercentil(pesos, params.percentilPesoP50);
  const p60Aptos = calcularPercentil(aptosList, params.percentilAptosP60);

  return territorios.map((t) => {
    let classificacao: ClassificacaoTerritorio = 'NEUTRO';

    const ehForca = t.forca_dobradinha >= p75Forca && t.peso_absoluto >= p50Peso;
    const ehOportunidade =
      t.forca_dobradinha >= p25Forca &&
      t.forca_dobradinha < p75Forca &&
      t.aptos >= p60Aptos;
    const ehRisco = t.forca_dobradinha <= p25Forca && t.peso_absoluto >= p50Peso;

    if (ehForca) {
      classificacao = 'FORÇA';
    } else if (ehOportunidade) {
      classificacao = 'OPORTUNIDADE';
    } else if (ehRisco) {
      classificacao = 'RISCO';
    } else {
      classificacao = 'NEUTRO';
    }

    return {
      ...t,
      classificacao,
    };
  });
}
