/**
 * GeoVoto - Rotas de Persistência de Dobradinhas Salvas
 * Berlim Co.
 */

import { Router, Request, Response } from 'express';
import { CANDIDATOS_OFICIAIS } from '../data/realDataStore';
import { DobradinhaSalva } from '../types';

const router = Router();

// Armazenamento em memória para dobradinhas salvas (persistidas em banco em prod)
const dobradinhasSalvas: DobradinhaSalva[] = [
  {
    id: 1,
    nome: 'Parceria Frente Popular (João Campos + Ster Vilela)',
    candidato_a_id: 201,
    candidato_b_id: 139,
    eleicao_referencia_id: 1,
    criado_por: 'Coordenador Geral',
    criado_em: '2026-07-27T14:30:00Z',
  },
  {
    id: 2,
    nome: 'Dobradinha Federal/Municipal (Pedro Campos + Ster Vilela)',
    candidato_a_id: 101,
    candidato_b_id: 139,
    eleicao_referencia_id: 1,
    criado_por: 'Gestor de Mídia',
    criado_em: '2026-07-27T16:00:00Z',
  },
];

/**
 * GET /api/dobradinhas
 * Retorna a lista de dobradinhas salvas com os detalhes dos candidatos.
 */
router.get('/', (_req: Request, res: Response): void => {
  const comDetalhes = dobradinhasSalvas.map((d) => ({
    ...d,
    candidatoA: CANDIDATOS_OFICIAIS.find((c) => c.id === d.candidato_a_id),
    candidatoB: CANDIDATOS_OFICIAIS.find((c) => c.id === d.candidato_b_id),
  }));

  res.json(comDetalhes);
});

/**
 * POST /api/dobradinhas
 * Salva uma nova combinação de dobradinha nomeada.
 */
router.post('/', (req: Request, res: Response): void => {
  const { nome, candidatoAId, candidatoBId, criadoPor } = req.body;

  if (!nome || !candidatoAId || !candidatoBId) {
    res.status(400).json({ error: 'Faltam dados obrigatórios (nome, candidatoAId, candidatoBId)' });
    return;
  }

  const nova: DobradinhaSalva = {
    id: dobradinhasSalvas.length + 1,
    nome: String(nome),
    candidato_a_id: Number(candidatoAId),
    candidato_b_id: Number(candidatoBId),
    eleicao_referencia_id: 1,
    criado_por: criadoPor ? String(criadoPor) : 'Usuário Autenticado',
    criado_em: new Date().toISOString(),
  };

  dobradinhasSalvas.push(nova);

  res.status(201).json({
    message: 'Dobradinha salva com sucesso',
    dobradinha: {
      ...nova,
      candidatoA: CANDIDATOS_OFICIAIS.find((c) => c.id === nova.candidato_a_id),
      candidatoB: CANDIDATOS_OFICIAIS.find((c) => c.id === nova.candidato_b_id),
    },
  });
});

/**
 * DELETE /api/dobradinhas/:id
 * Remove uma dobradinha salva.
 */
router.delete('/:id', (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const idx = dobradinhasSalvas.findIndex((d) => d.id === id);

  if (idx === -1) {
    res.status(404).json({ error: 'Dobradinha não encontrada' });
    return;
  }

  dobradinhasSalvas.splice(idx, 1);
  res.json({ message: 'Dobradinha removida com sucesso', id });
});

export default router;
