/**
 * Entry point do servidor — Plataforma GeoVoto & B DASH RevOps (Berlim Co.)
 *
 * Servidor HTTP Express com rotas de Geointeligência Eleitoral e RevOps.
 * Suporta execução autônoma (Single Process) e integração para apresentações/deploy.
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import eleitorRoutes from './routes/eleitores';
import candidatoRoutes from './routes/candidatos';
import comparacaoRoutes from './routes/comparacao';
import dobradinhaRoutes from './routes/dobradinha';
import chatbotRoutes from './routes/chatbot';
import revopsRoutes from './routes/revops';
import { middlewareAnexarUsuario, aplicarEscopoGeografico } from './middleware/rbac';

const app = express();
const PORT = process.env.PORT ?? 3001;

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Email', 'X-User-Role'],
  })
);

// ─── JSON Parser ──────────────────────────────────────────────────────────────
app.use(express.json());

// ─── Middlewares Globais ──────────────────────────────────────────────────────
app.use(middlewareAnexarUsuario as express.RequestHandler);
app.use(aplicarEscopoGeografico as express.RequestHandler);

// ─── Rotas da API GeoVoto & B DASH ────────────────────────────────────────────
app.use('/api/eleitores', eleitorRoutes);
app.use('/api/candidatos', candidatoRoutes);
app.use('/api/comparacao', comparacaoRoutes);
app.use('/api/dobradinhas', dobradinhaRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/revops', revopsRoutes);

// ─── Health & Status ──────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    plataforma: 'Plataforma Berlim Co. (GeoVoto + B DASH RevOps)',
    slogan: 'Dados que revelam intenções. Decisões que transformam.',
    versao: '2.1.0',
    banco_dados: 'Embedded RealDataStore (Sem necessidade de PostGIS externo para apresentações)',
    timestamp: new Date().toISOString(),
  });
});

// ─── Servir Aplicação Frontend Estática (Se a pasta client/dist existir) ──────
const clientDistPath = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🗳️  Plataforma Berlim Co. (GeoVoto + B DASH RevOps) — Backend Ativo`);
  console.log(`   Servidor rodando em http://localhost:${PORT}`);
  console.log(`   API GeoVoto: http://localhost:${PORT}/api/comparacao`);
  console.log(`   API B DASH RevOps: http://localhost:${PORT}/api/revops/dashboard\n`);
});
