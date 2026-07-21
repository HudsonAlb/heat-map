/**
 * Tipos GeoJSON para dados de eleitores — Frontend
 *
 * Espelham os tipos do backend para garantir type-safety end-to-end.
 */

/** Microrregiões geográficas de Pernambuco */
export type MicrorregiãoPE =
  | 'Região Metropolitana do Recife'
  | 'Zona da Mata'
  | 'Agreste'
  | 'Sertão';

/** Propriedades de cada Feature de eleitor */
export interface EleitorFeatureProperties {
  totalEleitores: number;
  municipio: string;
  bairro: string;
  zonaEleitoral: number;
  secaoEleitoral: number;
  microrregiao: MicrorregiãoPE;
}

/** Feature GeoJSON de ponto com propriedades de eleitor */
export interface EleitorFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: EleitorFeatureProperties;
}

/** FeatureCollection de eleitores */
export interface EleitorFeatureCollection {
  type: 'FeatureCollection';
  features: EleitorFeature[];
}

/** Resumo por microrregião retornado pela API */
export interface ResumoMicrorregiao {
  microrregiao: MicrorregiãoPE;
  totalPontos: number;
  totalEleitores: number;
}

/** Resposta da API /api/eleitores/resumo */
export interface ResumoResponse {
  totalGeral: number;
  porMicrorregiao: ResumoMicrorregiao[];
}
