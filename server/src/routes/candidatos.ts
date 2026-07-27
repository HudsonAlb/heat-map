/**
 * GeoVoto - Rotas de Candidatos (Autocomplete e Detalhes)
 * Berlim Co.
 */

import { Router, Request, Response } from 'express';
import { CANDIDATOS_OFICIAIS } from '../data/realDataStore';

const router = Router();

/**
 * GET /api/candidatos
 * Autocomplete por nome de urna, nome completo, número, partido ou cargo.
 * Query params: ?q=pedro&cargo=DEPUTADO%20FEDERAL&ano=2022
 */
router.get('/', (req: Request, res: Response): void => {
  const q = String(req.query.q ?? '').trim().toLowerCase();
  const cargo = String(req.query.cargo ?? '').trim().toUpperCase();
  const ano = req.query.ano ? Number(req.query.ano) : null;

  let filtrados = CANDIDATOS_OFICIAIS;

  if (q) {
    filtrados = filtrados.filter(
      (c) =>
        c.nome_urna.toLowerCase().includes(q) ||
        c.nome_completo.toLowerCase().includes(q) ||
        c.partido.toLowerCase().includes(q) ||
        String(c.numero).includes(q)
    );
  }

  if (cargo) {
    filtrados = filtrados.filter((c) => c.cargo === cargo);
  }

  if (ano) {
    filtrados = filtrados.filter((c) => c.eleicao_id === (ano === 2022 ? 1 : 2));
  }

  res.json({
    total: filtrados.length,
    candidatos: filtrados,
  });
});

/**
 * GET /api/candidatos/:id
 * Detalhes de um candidato pelo ID.
 */
router.get('/:id', (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const candidato = CANDIDATOS_OFICIAIS.find((c) => c.id === id);

  if (!candidato) {
    res.status(404).json({ error: 'Candidato não encontrado' });
    return;
  }

  res.json(candidato);
});

export default router;
