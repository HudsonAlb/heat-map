/**
 * GeoVoto - Rotas de Comparação e Parcerias (Candidato A + B + C)
 * Berlim Co.
 */

import { Router, Request, Response } from 'express';
import { CANDIDATOS_OFICIAIS, buscarUnidadesBrutasMulti, ELEICOES_OFICIAIS } from '../data/realDataStore';
import { calcularEstatisticasDobradinha } from '../engine/dobradinhaCalculator';
import { gerarInsightsEstrategicosIA } from '../engine/strategicAiInsights';
import { CamadaGeografica } from '../types';

const router = Router();

/**
 * GET /api/comparacao
 *
 * Retorna o cálculo comparativo territorial entre Candidatos da Parceria.
 * Query Params:
 *  - candX: ID do Candidato A (obrigatório)
 *  - candY: ID do Candidato B (opcional)
 *  - candZ: ID do Candidato C (opcional)
 *  - ano: 2024 | 2022 (default: 2024)
 *  - camada: mesorregiao | municipio | bairro | secao (default: municipio)
 *  - microrregiao: filtro por mesorregião (RMR, Zona da Mata, Agreste, Sertão)
 *  - municipio: filtro por município/cidade
 */
router.get('/', (req: Request, res: Response): void => {
  const candXId = Number(req.query.candX || 201);
  const candYId = req.query.candY ? Number(req.query.candY) : undefined;
  const ano = req.query.ano ? Number(req.query.ano) : 2024;
  const camada = (String(req.query.camada || 'municipio')) as CamadaGeografica;
  const microrregiaoFiltro = String(req.query.microrregiao || 'Todas');
  const municipioFiltro = String(req.query.municipio || 'Todos');

  const candX = CANDIDATOS_OFICIAIS.find((c) => c.id === candXId) || CANDIDATOS_OFICIAIS[0];
  const candY = candYId ? CANDIDATOS_OFICIAIS.find((c) => c.id === candYId) : undefined;

  const candIds = [candXId];
  if (candYId) candIds.push(candYId);

  // Busca unidades brutas para o ano da eleição e candidatos
  let unidadesBrutas = buscarUnidadesBrutasMulti(candIds, camada, ano);

  // Aplica filtros geográficos
  if (microrregiaoFiltro !== 'Todas') {
    unidadesBrutas = unidadesBrutas.filter(
      (u) =>
        u.mesorregiao === microrregiaoFiltro ||
        (microrregiaoFiltro === 'RMR' && u.mesorregiao.includes('Metropolitana'))
    );
  }
  if (municipioFiltro !== 'Todos') {
    unidadesBrutas = unidadesBrutas.filter((u) => u.nome_municipio === municipioFiltro);
  }

  const eleicaoRef = ELEICOES_OFICIAIS.find((e) => e.ano === ano)?.descricao ?? `Eleições ${ano}`;
  const dataAtualizacao = new Date().toISOString().split('T')[0];

  const resultadosCalculados = calcularEstatisticasDobradinha(
    unidadesBrutas,
    eleicaoRef,
    dataAtualizacao
  );

  // Totais agregados
  const totalEleitores = resultadosCalculados.reduce((acc, r) => acc + r.aptos, 0);
  const totalSecoes = resultadosCalculados.reduce((acc, r) => acc + r.total_secoes, 0);
  const totalVotosX = resultadosCalculados.reduce((acc, r) => acc + r.votos_A, 0);
  const totalVotosY = resultadosCalculados.reduce((acc, r) => acc + r.votos_B, 0);

  // Rankings
  const rankingComplementaridade = [...resultadosCalculados]
    .sort((a, b) => b.complementaridade - a.complementaridade)
    .slice(0, 5);

  const rankingCanibalizacao = [...resultadosCalculados]
    .sort((a, b) => (b.sobreposicao * b.forca_dobradinha) - (a.sobreposicao * a.forca_dobradinha))
    .slice(0, 5);

  // Gerador de IA de Direcionamentos Estratégicos
  const aiInsights = gerarInsightsEstrategicosIA(resultadosCalculados, candX, candY);

  res.json({
    candidatoX: candX,
    candidatoY: candY || null,
    anoEleicao: ano,
    camada,
    timestamp: new Date().toISOString(),
    resumoGeral: {
      totalEleitores,
      totalSecoes,
      mediaEleitoresPorSecao: totalSecoes > 0 ? Math.round(totalEleitores / totalSecoes) : 0,
      totalVotosX,
      totalVotosY,
      totalVotosDobradinha: totalVotosX + totalVotosY,
    },
    rankings: {
      maiorComplementaridade: rankingComplementaridade,
      maiorCanibalizacao: rankingCanibalizacao,
    },
    aiInsights,
    territorios: resultadosCalculados,
  });
});

export default router;
