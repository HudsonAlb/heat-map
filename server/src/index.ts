/**
 * Entry point do servidor — Dashboard Eleitoral PE
 *
 * Inicia o Express na porta 3001 com CORS configurado
 * para aceitar requisições do Vite dev server (porta 5173).
 */

import express from 'express';
import cors from 'cors';
import eleitorRoutes from './routes/eleitores';

const app = express();
const PORT = process.env.PORT ?? 3001;

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET'],
  })
);

// ─── JSON Parser ──────────────────────────────────────────────────────────────
app.use(express.json());

// ─── Rotas ────────────────────────────────────────────────────────────────────
app.use('/api/eleitores', eleitorRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🗳️  Dashboard Eleitoral PE — Backend`);
  console.log(`   Servidor rodando em http://localhost:${PORT}`);
  console.log(`   API GeoJSON:  http://localhost:${PORT}/api/eleitores/geojson`);
  console.log(`   Resumo:       http://localhost:${PORT}/api/eleitores/resumo`);
  console.log(`   Health:       http://localhost:${PORT}/api/health\n`);
});
