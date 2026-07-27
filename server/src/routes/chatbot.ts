/**
 * GeoVoto - Rota de Chatbot de Linguagem Natural
 * Berlim Co.
 */

import { Router, Request, Response } from 'express';
import { parseIntentFromText } from '../chatbot/intentParser';
import { executarConsultaChatbot } from '../chatbot/queryExecutor';
import { EscopoGeografico } from '../types';

const router = Router();

/**
 * POST /api/chatbot/mensagem
 *
 * Recebe uma pergunta em português e retorna a análise numérica rastreável com deep link.
 * Body: { mensagem: string, escopoUsuario?: EscopoGeografico }
 */
router.post('/mensagem', (req: Request, res: Response): void => {
  const { mensagem, escopoUsuario } = req.body;

  if (!mensagem || typeof mensagem !== 'string' || !mensagem.trim()) {
    res.status(400).json({ error: 'É necessário enviar a mensagem no corpo da requisição' });
    return;
  }

  const intent = parseIntentFromText(mensagem);
  const resposta = executarConsultaChatbot(intent, escopoUsuario as EscopoGeografico | undefined);

  res.json(resposta);
});

export default router;
