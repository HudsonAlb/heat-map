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

import { candidatosRouter } from './collectionsEleitoral/candidatos';
import { comparacaoRouter } from './collectionsEleitoral/dobradinhas';
import eleitorRoutes from './routes/eleitores';
import dobradinhaRoutes from './routes/dobradinha';
import chatbotRoutes from './routes/chatbot';
import revopsRoutes from './routes/revops';
import berlimGestaoRoutes from './routes/berlimGestao';
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

// ─── Rotas da API GeoVoto & B DASH (Estrutura Arquitetural Innovats) ─────────
app.use('/api/eleitores', eleitorRoutes);
app.use('/api/candidatos', candidatosRouter);
app.use('/api/comparacao', comparacaoRouter);
app.use('/api/dobradinhas', dobradinhaRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/revops', revopsRoutes);
app.use('/api/berlim-gestao', berlimGestaoRoutes);

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

// ─── Start (Se executado diretamente) ──────────────────────────────────────────
if (require.main === module || process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`\n🗳️  Plataforma Berlim Co. (GeoVoto + B DASH RevOps) — Backend Ativo`);
    console.log(`   Servidor rodando em http://localhost:${PORT}`);
    console.log(`   API GeoVoto: http://localhost:${PORT}/api/comparacao`);
    console.log(`   API B DASH RevOps: http://localhost:${PORT}/api/revops/dashboard\n`);
  });
}

export default app;
