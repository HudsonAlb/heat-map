import { Router, Request, Response } from 'express';
import { DADOS_BERLIM_GESTAO } from '../data/berlimGestaoDataStore';

const router = Router();

/**
 * GET /api/berlim-gestao/municipios
 * Retorna os resultados das eleições municipais de Pernambuco
 */
router.get('/municipios', (req: Request, res: Response) => {
  const mesorregiao = req.query.mesorregiao ? String(req.query.mesorregiao).trim() : null;
  const q = req.query.q ? String(req.query.q).trim().toLowerCase() : null;

  let filtrados = DADOS_BERLIM_GESTAO;

  if (mesorregiao && mesorregiao.toLowerCase() !== 'todas') {
    filtrados = filtrados.filter(
      (m) => m.mesorregiao.toLowerCase() === mesorregiao.toLowerCase()
    );
  }

  if (q) {
    filtrados = filtrados.filter(
      (m) =>
        m.municipio.toLowerCase().includes(q) ||
        m.prefeito_eleito.toLowerCase().includes(q) ||
        (m.segundo_lugar && m.segundo_lugar.toLowerCase().includes(q)) ||
        (m.terceiro_lugar && m.terceiro_lugar.toLowerCase().includes(q))
    );
  }

  const mesorregioes = Array.from(new Set(DADOS_BERLIM_GESTAO.map((d) => d.mesorregiao))).sort();
  const totalEleitores = filtrados.reduce((acc, curr) => acc + curr.eleitores, 0);

  res.json({
    totalMunicipios: filtrados.length,
    totalEleitores,
    mesorregioes,
    dados: filtrados,
  });
});

/**
 * GET /api/berlim-gestao/resumo
 * Retorna estatísticas gerais por mesorregião
 */
router.get('/resumo', (_req: Request, res: Response) => {
  const mesorregioesMap: Record<string, { totalEleitores: number; totalMunicipios: number }> = {};

  DADOS_BERLIM_GESTAO.forEach((m) => {
    if (!mesorregioesMap[m.mesorregiao]) {
      mesorregioesMap[m.mesorregiao] = { totalEleitores: 0, totalMunicipios: 0 };
    }
    mesorregioesMap[m.mesorregiao].totalEleitores += m.eleitores;
    mesorregioesMap[m.mesorregiao].totalMunicipios += 1;
  });

  const totalEleitoresPernambuco = DADOS_BERLIM_GESTAO.reduce((a, b) => a + b.eleitores, 0);

  res.json({
    totalEleitoresPernambuco,
    totalMunicipios: DADOS_BERLIM_GESTAO.length,
    mesorregioes: Object.entries(mesorregioesMap).map(([nome, info]) => ({
      nome,
      ...info,
    })),
  });
});

export default router;
