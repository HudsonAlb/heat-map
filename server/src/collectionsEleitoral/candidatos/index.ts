import express, { Request, Response } from 'express';
import { Router } from 'express';
import { CANDIDATOS_OFICIAIS } from '../../data/realDataStore';
import { consultarCandidatoDivulgaCandTSE } from '../../data/tseApiClient';
import { obterCandidatosBerlimGestao } from '../../data/berlimGestaoDataStore';

export const candidatosRouter = Router();

candidatosRouter.get('/meta', (_req: Request, res: Response): void => {
  const cargos = Array.from(new Set(CANDIDATOS_OFICIAIS.map((c) => c.cargo))).sort();
  const partidos = Array.from(new Set(CANDIDATOS_OFICIAIS.map((c) => c.partido))).sort();
  const situacoes = Array.from(new Set(CANDIDATOS_OFICIAIS.map((c) => c.situacao))).sort();
  const anos = [2024, 2022, 2020, 2018];
  res.json({ cargos, partidos, situacoes, anos });
});

/**
 * GET /api/candidatos/:id/tse-sync
 * Consulta ao vivo na API REST oficial do TSE (DivulgaCandContas)
 */
candidatosRouter.get('/:id/tse-sync', async (req: Request, res: Response): Promise<void> => {
  const candId = Number(req.params.id);
  const cand = CANDIDATOS_OFICIAIS.find((c) => c.id === candId);

  if (!cand) {
    res.status(404).json({ erro: 'Candidato não encontrado' });
    return;
  }

  try {
    const dadosTseLive = await consultarCandidatoDivulgaCandTSE(
      cand.eleicao_id === 2 ? 2022 : 2024,
      '24570',
      cand.eleicao_id === 2 ? '2045202022' : '2045202024',
      String(cand.sq_candidato_tse)
    );

    res.json({
      fonte: 'API REST Oficial DivulgaCandContas (TSE / TRE-PE)',
      statusConexao: 'ONLINE 🟢',
      candidatoGeoVoto: cand,
      dadosOficiaisTseLive: dadosTseLive,
    });
  } catch (error) {
    res.status(500).json({
      erro: 'Falha ao sincronizar em tempo real com o TSE',
      detalhes: error instanceof Error ? error.message : String(error),
      fallbackGeoVoto: cand,
    });
  }
});

candidatosRouter.get('/', (req: Request, res: Response): void => {
  const q = String(req.query.q ?? '').trim().toLowerCase();
  const cargo = String(req.query.cargo ?? '').trim().toUpperCase();
  const partido = String(req.query.partido ?? '').trim().toUpperCase();
  const situacao = String(req.query.situacao ?? '').trim().toUpperCase();
  const ano = req.query.ano ? Number(req.query.ano) : null;
  const limite = req.query.limite ? Number(req.query.limite) : null;

  const userEmail = (req.headers['x-user-email'] as string) || '';
  const isBerlimGestao = userEmail === 'berlim.gestao@campanha.com.br';

  let filtrados = isBerlimGestao ? obterCandidatosBerlimGestao() : CANDIDATOS_OFICIAIS;

  if (q) {
    filtrados = filtrados.filter(
      (c) =>
        c.nome_urna.toLowerCase().includes(q) ||
        c.nome_completo.toLowerCase().includes(q) ||
        c.partido.toLowerCase().includes(q) ||
        String(c.numero).includes(q)
    );
  }
  if (cargo) filtrados = filtrados.filter((c) => c.cargo === cargo);
  if (partido) filtrados = filtrados.filter((c) => c.partido.toUpperCase() === partido);
  if (situacao) filtrados = filtrados.filter((c) => c.situacao.toUpperCase() === situacao);
  if (ano && !isBerlimGestao) filtrados = filtrados.filter((c) => c.eleicao_id === (ano === 2022 ? 2 : 1));

  const totalSemLimite = filtrados.length;
  if (limite && limite > 0) filtrados = filtrados.slice(0, limite);

  res.json({
    total: totalSemLimite,
    retornados: filtrados.length,
    candidatos: filtrados,
  });
});
