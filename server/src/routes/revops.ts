/**
 * B DASH / Dash de RevOps - Rotas da API de Inteligência de Receita
 * Berlim Co.
 */

import { Router, Request, Response } from 'express';
import { obterDadosRevOps } from '../data/revopsDataStore';
import { FonteRevOps } from '../types/revops';

const router = Router();

/**
 * GET /api/revops/dashboard
 * Retorna metas, relatórios por canal e gráfico de oportunidades.
 * Query Params: ?fonte=crm | outras_fontes (default: crm)
 */
router.get('/dashboard', (req: Request, res: Response): void => {
  const fonte = (String(req.query.fonte || 'crm')) as FonteRevOps;
  const dados = obterDadosRevOps(fonte);
  res.json(dados);
});

/**
 * GET /api/revops/metas
 * Retorna as Metas do CRM (Anual, Quarters Q1..Q4 e Mensal)
 */
router.get('/metas', (_req: Request, res: Response): void => {
  const dados = obterDadosRevOps('crm');
  res.json({
    metas: dados.metas,
    timestamp: dados.timestampAtualizacao,
  });
});

export default router;
