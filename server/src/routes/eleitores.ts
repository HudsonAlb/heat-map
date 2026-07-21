/**
 * Rotas da API de eleitores.
 *
 * GET /api/eleitores/geojson
 *   → Retorna FeatureCollection GeoJSON com dados de eleitores.
 *   → Query param opcional: ?microrregiao=Agreste (filtra por microrregião)
 */

import { Router, Request, Response } from 'express';
import { mockEleitoresGeoJSON } from '../data/mockEleitores';
import { EleitorFeatureCollection, MicrorregiãoPE } from '../types/geojson';

const router = Router();

/** Microrregiões válidas para validação de query param */
const MICRORREGIOES_VALIDAS: MicrorregiãoPE[] = [
  'Região Metropolitana do Recife',
  'Zona da Mata',
  'Agreste',
  'Sertão',
];

/**
 * GET /api/eleitores/geojson
 *
 * Retorna os dados georreferenciados de eleitores em formato GeoJSON.
 * Suporta filtro opcional por microrregião via query string.
 *
 * @example GET /api/eleitores/geojson
 * @example GET /api/eleitores/geojson?microrregiao=Agreste
 */
router.get('/geojson', (req: Request, res: Response): void => {
  const { microrregiao } = req.query;

  // Sem filtro → retorna tudo
  if (!microrregiao) {
    res.json(mockEleitoresGeoJSON);
    return;
  }

  // Valida a microrregião informada
  const microrregiaoStr = String(microrregiao);
  if (!MICRORREGIOES_VALIDAS.includes(microrregiaoStr as MicrorregiãoPE)) {
    res.status(400).json({
      error: 'Microrregião inválida',
      message: `Valores aceitos: ${MICRORREGIOES_VALIDAS.join(', ')}`,
    });
    return;
  }

  // Filtra features pela microrregião
  const filtered: EleitorFeatureCollection = {
    type: 'FeatureCollection',
    features: mockEleitoresGeoJSON.features.filter(
      (f) => f.properties.microrregiao === microrregiaoStr
    ),
  };

  res.json(filtered);
});

/**
 * GET /api/eleitores/resumo
 *
 * Retorna um resumo agregado por microrregião:
 * total de pontos e soma de eleitores.
 */
router.get('/resumo', (_req: Request, res: Response): void => {
  const resumo = MICRORREGIOES_VALIDAS.map((micro) => {
    const features = mockEleitoresGeoJSON.features.filter(
      (f) => f.properties.microrregiao === micro
    );
    const totalEleitores = features.reduce(
      (acc, f) => acc + f.properties.totalEleitores,
      0
    );
    return {
      microrregiao: micro,
      totalPontos: features.length,
      totalEleitores,
    };
  });

  res.json({
    totalGeral: mockEleitoresGeoJSON.features.reduce(
      (acc, f) => acc + f.properties.totalEleitores,
      0
    ),
    porMicrorregiao: resumo,
  });
});

export default router;
