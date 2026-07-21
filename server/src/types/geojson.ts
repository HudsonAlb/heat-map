/**
 * Tipos GeoJSON para dados de eleitores — Backend
 *
 * Seguem a spec RFC 7946 (GeoJSON) com propriedades customizadas
 * para o domínio eleitoral de Pernambuco.
 */

/** Microrregiões geográficas de Pernambuco */
export type MicrorregiãoPE =
  | 'Região Metropolitana do Recife'
  | 'Zona da Mata'
  | 'Agreste'
  | 'Sertão';

/** Propriedades de cada ponto (Feature) de eleitor */
export interface EleitorFeatureProperties {
  /** Quantidade total de eleitores neste ponto */
  totalEleitores: number;
  /** Nome do município */
  municipio: string;
  /** Bairro ou localidade (quando aplicável) */
  bairro: string;
  /** Número da zona eleitoral */
  zonaEleitoral: number;
  /** Número da seção eleitoral */
  secaoEleitoral: number;
  /** Microrregião geográfica */
  microrregiao: MicrorregiãoPE;
}

/** Feature GeoJSON de ponto com propriedades de eleitor */
export interface EleitorFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    /** [longitude, latitude] — padrão GeoJSON */
    coordinates: [number, number];
  };
  properties: EleitorFeatureProperties;
}

/** FeatureCollection de eleitores */
export interface EleitorFeatureCollection {
  type: 'FeatureCollection';
  features: EleitorFeature[];
}
