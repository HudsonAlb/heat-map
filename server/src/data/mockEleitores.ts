/**
 * Dados mockados de eleitores distribuídos por Pernambuco.
 *
 * ~40 pontos GeoJSON cobrindo as 4 microrregiões do estado:
 * - Região Metropolitana do Recife (RMR)
 * - Zona da Mata
 * - Agreste
 * - Sertão
 *
 * Coordenadas baseadas em localizações reais das cidades.
 * Valores de totalEleitores simulam volumes proporcionais à população.
 */

import { EleitorFeature, EleitorFeatureCollection } from '../types/geojson';

/** Helper para criar um ponto GeoJSON de eleitor de forma concisa */
function criarPonto(
  lng: number,
  lat: number,
  totalEleitores: number,
  municipio: string,
  bairro: string,
  zonaEleitoral: number,
  secaoEleitoral: number,
  microrregiao: EleitorFeature['properties']['microrregiao']
): EleitorFeature {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [lng, lat],
    },
    properties: {
      totalEleitores,
      municipio,
      bairro,
      zonaEleitoral,
      secaoEleitoral,
      microrregiao,
    },
  };
}

// ─── REGIÃO METROPOLITANA DO RECIFE (RMR) ────────────────────────────────────

const rmr: EleitorFeature[] = [
  // Recife — múltiplos bairros com alta densidade
  criarPonto(-34.8711, -8.0476, 45200, 'Recife', 'Boa Viagem', 1, 101, 'Região Metropolitana do Recife'),
  criarPonto(-34.8784, -8.0631, 38700, 'Recife', 'Imbiribeira', 1, 102, 'Região Metropolitana do Recife'),
  criarPonto(-34.8812, -8.0539, 32100, 'Recife', 'Pina', 1, 103, 'Região Metropolitana do Recife'),
  criarPonto(-34.8710, -8.0343, 28500, 'Recife', 'Recife Antigo', 2, 201, 'Região Metropolitana do Recife'),
  criarPonto(-34.8900, -8.0500, 22300, 'Recife', 'Santo Amaro', 2, 202, 'Região Metropolitana do Recife'),
  criarPonto(-34.9100, -8.0200, 19800, 'Recife', 'Casa Amarela', 3, 301, 'Região Metropolitana do Recife'),
  criarPonto(-34.9350, -8.0150, 17600, 'Recife', 'Várzea', 3, 302, 'Região Metropolitana do Recife'),
  criarPonto(-34.8950, -8.0700, 25400, 'Recife', 'Ibura', 4, 401, 'Região Metropolitana do Recife'),
  criarPonto(-34.9200, -8.0900, 15200, 'Recife', 'Tejipió', 4, 402, 'Região Metropolitana do Recife'),
  criarPonto(-34.8650, -8.0100, 21000, 'Recife', 'Derby', 5, 501, 'Região Metropolitana do Recife'),

  // Olinda
  criarPonto(-34.8553, -7.9968, 18900, 'Olinda', 'Carmo', 10, 1001, 'Região Metropolitana do Recife'),
  criarPonto(-34.8690, -7.9850, 14200, 'Olinda', 'Casa Caiada', 10, 1002, 'Região Metropolitana do Recife'),
  criarPonto(-34.8480, -8.0050, 11500, 'Olinda', 'Bairro Novo', 11, 1101, 'Região Metropolitana do Recife'),

  // Jaboatão dos Guararapes
  criarPonto(-35.0150, -8.1130, 16800, 'Jaboatão dos Guararapes', 'Piedade', 15, 1501, 'Região Metropolitana do Recife'),
  criarPonto(-35.0500, -8.1800, 12400, 'Jaboatão dos Guararapes', 'Cavaleiro', 15, 1502, 'Região Metropolitana do Recife'),
  criarPonto(-34.9900, -8.1500, 9800, 'Jaboatão dos Guararapes', 'Candeias', 16, 1601, 'Região Metropolitana do Recife'),

  // Paulista
  criarPonto(-34.8730, -7.9380, 13500, 'Paulista', 'Maranguape', 20, 2001, 'Região Metropolitana do Recife'),
  criarPonto(-34.8860, -7.9150, 8900, 'Paulista', 'Pau Amarelo', 20, 2002, 'Região Metropolitana do Recife'),
];

// ─── ZONA DA MATA ─────────────────────────────────────────────────────────────

const zonaDaMata: EleitorFeature[] = [
  criarPonto(-35.2980, -8.1200, 8200, 'Vitória de Santo Antão', 'Centro', 25, 2501, 'Zona da Mata'),
  criarPonto(-35.3100, -8.1350, 4100, 'Vitória de Santo Antão', 'Água Branca', 25, 2502, 'Zona da Mata'),
  criarPonto(-35.5890, -8.6830, 5400, 'Palmares', 'Centro', 28, 2801, 'Zona da Mata'),
  criarPonto(-35.5750, -8.6700, 2800, 'Palmares', 'São Sebastião', 28, 2802, 'Zona da Mata'),
  criarPonto(-35.2280, -8.2800, 6700, 'Cabo de Santo Agostinho', 'Centro', 30, 3001, 'Zona da Mata'),
  criarPonto(-35.1050, -8.3200, 4900, 'Escada', 'Centro', 32, 3201, 'Zona da Mata'),
  criarPonto(-35.7150, -8.8900, 3200, 'Barreiros', 'Centro', 34, 3401, 'Zona da Mata'),
];

// ─── AGRESTE ──────────────────────────────────────────────────────────────────

const agreste: EleitorFeature[] = [
  // Caruaru — maior cidade do Agreste
  criarPonto(-35.9761, -8.2784, 22800, 'Caruaru', 'Centro', 40, 4001, 'Agreste'),
  criarPonto(-35.9600, -8.2650, 14500, 'Caruaru', 'Boa Vista', 40, 4002, 'Agreste'),
  criarPonto(-35.9900, -8.2900, 9200, 'Caruaru', 'Universitário', 41, 4101, 'Agreste'),

  // Garanhuns
  criarPonto(-36.4936, -8.8912, 11200, 'Garanhuns', 'Centro', 45, 4501, 'Agreste'),
  criarPonto(-36.5100, -8.9050, 5800, 'Garanhuns', 'Heliópolis', 45, 4502, 'Agreste'),

  // Belo Jardim
  criarPonto(-36.4200, -8.3350, 6100, 'Belo Jardim', 'Centro', 48, 4801, 'Agreste'),

  // Gravatá
  criarPonto(-35.5650, -8.2000, 5400, 'Gravatá', 'Centro', 50, 5001, 'Agreste'),

  // Santa Cruz do Capibaribe
  criarPonto(-36.2050, -7.9550, 7800, 'Santa Cruz do Capibaribe', 'Centro', 52, 5201, 'Agreste'),
];

// ─── SERTÃO ───────────────────────────────────────────────────────────────────

const sertao: EleitorFeature[] = [
  // Petrolina — maior cidade do Sertão
  criarPonto(-40.5008, -9.3891, 19500, 'Petrolina', 'Centro', 60, 6001, 'Sertão'),
  criarPonto(-40.4850, -9.3750, 11200, 'Petrolina', 'Rio Corrente', 60, 6002, 'Sertão'),
  criarPonto(-40.5200, -9.4050, 7400, 'Petrolina', 'Areia Branca', 61, 6101, 'Sertão'),

  // Serra Talhada
  criarPonto(-38.2950, -7.9856, 9800, 'Serra Talhada', 'Centro', 65, 6501, 'Sertão'),
  criarPonto(-38.3100, -7.9700, 4500, 'Serra Talhada', 'AABB', 65, 6502, 'Sertão'),

  // Araripina
  criarPonto(-40.4986, -7.5765, 6200, 'Araripina', 'Centro', 70, 7001, 'Sertão'),
  criarPonto(-40.4800, -7.5900, 3100, 'Araripina', 'Alto do Cruzeiro', 70, 7002, 'Sertão'),

  // Salgueiro
  criarPonto(-39.1190, -8.0740, 5400, 'Salgueiro', 'Centro', 75, 7501, 'Sertão'),

  // Arcoverde
  criarPonto(-37.0540, -8.4180, 7200, 'Arcoverde', 'Centro', 78, 7801, 'Sertão'),

  // Ouricuri
  criarPonto(-40.0820, -7.8830, 3800, 'Ouricuri', 'Centro', 80, 8001, 'Sertão'),
];

// ─── FEATURE COLLECTION CONSOLIDADA ──────────────────────────────────────────

export const mockEleitoresGeoJSON: EleitorFeatureCollection = {
  type: 'FeatureCollection',
  features: [...rmr, ...zonaDaMata, ...agreste, ...sertao],
};
