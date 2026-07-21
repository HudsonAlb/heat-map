/**
 * Configurações geográficas do mapa — Pernambuco (UF 26)
 *
 * Constantes centralizadas para o componente de mapa,
 * incluindo limites, centro, zoom e estilo.
 */

/** Bounding box de Pernambuco: [[oeste, sul], [leste, norte]] */
export const PE_BOUNDS: [[number, number], [number, number]] = [
  [-41.5, -9.5], // sudoeste (canto inferior esquerdo)
  [-34.7, -7.3], // nordeste (canto superior direito)
];

/** Centro padrão do mapa — Região do Agreste, centraliza o estado */
export const PE_CENTER = {
  latitude: -8.38,
  longitude: -37.86,
} as const;

/** Zoom inicial — visualiza todo o estado na tela */
export const PE_INITIAL_ZOOM = 7.2;

/** Zoom mínimo e máximo permitidos */
export const PE_MIN_ZOOM = 6.5;
export const PE_MAX_ZOOM = 14;

/**
 * Estilo base do mapa — CartoDB Positron
 * Fundo neutro/limpo, 100% open-source, sem API key.
 */
export const MAP_STYLE_URL =
  'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

/**
 * Configuração da camada de heatmap do MapLibre.
 *
 * A rampa de cores vai do azul frio (baixa densidade)
 * ao vermelho quente (alta densidade), passando por
 * ciano → verde → amarelo → laranja.
 */
export const HEATMAP_CONFIG = {
  /** Peso máximo para interpolação (valor de totalEleitores) */
  maxWeight: 50000,

  /** Raio do heatmap por nível de zoom */
  radius: {
    stops: [
      [7, 15],   // zoom 7 → raio 15px
      [9, 25],   // zoom 9 → raio 25px
      [12, 40],  // zoom 12 → raio 40px
      [14, 55],  // zoom 14 → raio 55px
    ] as [number, number][],
  },

  /** Intensidade do heatmap por nível de zoom */
  intensity: {
    stops: [
      [7, 0.6],
      [9, 1],
      [12, 1.8],
      [14, 2.5],
    ] as [number, number][],
  },

  /** Opacidade — fade-out suave em zooms altos */
  opacity: {
    stops: [
      [7, 0.85],
      [10, 0.7],
      [13, 0.5],
      [14, 0.3],
    ] as [number, number][],
  },

  /** Rampa de cores (0 → 1): transparente → azul → ciano → verde → amarelo → laranja → vermelho */
  colorRamp: [
    0,    'rgba(0,0,0,0)',
    0.1,  '#2166ac',  // azul profundo
    0.25, '#4393c3',  // azul médio
    0.4,  '#92c5de',  // ciano
    0.55, '#d1e5f0',  // azul claro
    0.65, '#fddbc7',  // pêssego
    0.75, '#f4a582',  // salmão
    0.85, '#d6604d',  // vermelho suave
    0.95, '#b2182b',  // vermelho escuro
    1,    '#67001f',  // bordô
  ] as (number | string)[],
} as const;

/**
 * Viewpoints predefinidos para as microrregiões de PE.
 * Usados para navegação rápida no dashboard.
 */
export const VIEWPOINTS = {
  'Estado Completo': {
    latitude: PE_CENTER.latitude,
    longitude: PE_CENTER.longitude,
    zoom: PE_INITIAL_ZOOM,
  },
  'Região Metropolitana do Recife': {
    latitude: -8.05,
    longitude: -34.9,
    zoom: 11,
  },
  'Zona da Mata': {
    latitude: -8.4,
    longitude: -35.4,
    zoom: 9,
  },
  'Agreste': {
    latitude: -8.3,
    longitude: -36.2,
    zoom: 9,
  },
  'Sertão': {
    latitude: -8.2,
    longitude: -39.0,
    zoom: 8,
  },
} as const;

export type ViewpointKey = keyof typeof VIEWPOINTS;
