import React from 'react';
import type { RevOpsDashboardData } from '../../types/revops';

interface MetasSectionProps {
  metas: RevOpsDashboardData['metas'];
}

export const MetasSection: React.FC<MetasSectionProps> = ({ metas }) => {
  const { anual, quarters, mensal } = metas;

  const formatCurrency = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  return (
    <div className="revops-metas-wrapper">
      <div className="metas-section-header">
        <span className="metas-badge">🎯 CRM INTEGRADO</span>
        <h2>Metas de Receita & Atingimento Comercial</h2>
        <span className="metas-sub">Valores extraídos em tempo real do CRM da empresa</span>
      </div>

      <div className="metas-cards-grid">
        {/* CARD 1: META ANUAL */}
        <div className="meta-card card-anual">
          <div className="card-top-row">
            <span className="meta-icon">📅</span>
            <div className="meta-card-title">
              <h4>Meta Anual ({anual.ano})</h4>
              <span className="meta-subtitle">Projeção: {formatCurrency(anual.projecaoAno)}</span>
            </div>
            <span className="pct-badge pct-anual">{anual.pctAtingido}% Atingido</span>
          </div>

          <div className="meta-main-values">
            <div className="val-block">
              <span className="val-lbl">Meta do Ano:</span>
              <strong className="val-amount">{formatCurrency(anual.metaTotal)}</strong>
            </div>
            <div className="val-block">
              <span className="val-lbl">Realizado Acumulado:</span>
              <strong className="val-amount val-success">{formatCurrency(anual.realizado)}</strong>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill fill-anual"
                style={{ width: `${Math.min(anual.pctAtingido, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* CARD 2: METAS POR QUARTER (Q1, Q2, Q3, Q4) */}
        <div className="meta-card card-quarters">
          <div className="card-top-row">
            <span className="meta-icon">📊</span>
            <div className="meta-card-title">
              <h4>Metas por Quarter (Trimestres)</h4>
              <span className="meta-subtitle">Meta base: R$ 3,0M por Quarter</span>
            </div>
          </div>

          <div className="quarters-list">
            {quarters.map((q) => (
              <div key={q.quarter} className="quarter-row-item">
                <div className="quarter-info">
                  <strong className="q-label">{q.quarter}:</strong>
                  <span className="q-val">{formatCurrency(q.realizado)} / {formatCurrency(q.meta)}</span>
                </div>
                <div className="quarter-progress-wrapper">
                  <div className="quarter-bar-track">
                    <div
                      className={`quarter-bar-fill ${q.status === 'EM_ANDAMENTO' ? 'fill-active' : 'fill-done'}`}
                      style={{ width: `${Math.min(q.pctAtingido, 100)}%` }}
                    ></div>
                  </div>
                  <span className="q-pct">{q.pctAtingido}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 3: META MENSAL */}
        <div className="meta-card card-mensal">
          <div className="card-top-row">
            <span className="meta-icon">⚡</span>
            <div className="meta-card-title">
              <h4>Meta Mensal ({mensal.mesNome})</h4>
              <span className="meta-subtitle">Projeção: {formatCurrency(mensal.projecao)}</span>
            </div>
            <span className="pct-badge pct-mensal">{mensal.pctAtingido}% Atingido</span>
          </div>

          <div className="meta-main-values">
            <div className="val-block">
              <span className="val-lbl">Meta do Mês:</span>
              <strong className="val-amount">{formatCurrency(mensal.meta)}</strong>
            </div>
            <div className="val-block">
              <span className="val-lbl">Realizado no Mês:</span>
              <strong className="val-amount val-accent">{formatCurrency(mensal.realizado)}</strong>
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill fill-mensal"
                style={{ width: `${Math.min(mensal.pctAtingido, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
