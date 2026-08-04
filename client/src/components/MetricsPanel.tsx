import React from 'react';
import type { ResultadoComparacao, Candidato } from '../types/geovoto';
import geovotoSimbolo from '../assets/GeoVoto - Simbolo.svg';

interface MetricsPanelProps {
  resultado: ResultadoComparacao;
  candX: Candidato;
  candY?: Candidato;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({
  resultado,
  candX,
  candY,
}) => {
  const { resumoGeral, rankings, territorios, aiInsights } = resultado;

  // Maiores territórios por eleitorado
  const topTerritoriosEleitores = [...territorios]
    .sort((a, b) => b.aptos - a.aptos)
    .slice(0, 5);

  const maxEleitores = topTerritoriosEleitores[0]?.aptos || 1;
  const maxComp = rankings.maiorComplementaridade[0]?.complementaridade || 1;
  const maxCanib = rankings.maiorCanibalizacao[0]?.sobreposicao || 1;

  return (
    <div className="metrics-panel-container">
      {/* ── 1. KPI CARDS HEADER ───────────────────────────────────────────── */}
      <div className="kpi-cards-grid">
        <div className="kpi-card">
          <div className="kpi-icon-box icon-blue">👥</div>
          <div className="kpi-content">
            <span className="kpi-title">Eleitores Filtrados</span>
            <strong className="kpi-value">{resumoGeral.totalEleitores.toLocaleString('pt-BR')}</strong>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box icon-purple">🏢</div>
          <div className="kpi-content">
            <span className="kpi-title">Total de Seções</span>
            <strong className="kpi-value">{resumoGeral.totalSecoes.toLocaleString('pt-BR')}</strong>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-box icon-teal">📈</div>
          <div className="kpi-content">
            <span className="kpi-title">Média Eleitores / Seção</span>
            <strong className="kpi-value">{resumoGeral.mediaEleitoresPorSecao.toLocaleString('pt-BR')}</strong>
          </div>
        </div>

        <div className="kpi-card card-cand-x">
          <div className="kpi-icon-box icon-cand-x">🟦</div>
          <div className="kpi-content">
            <span className="kpi-title">Votos {candX.nome_urna}</span>
            <strong className="kpi-value text-cand-x">{resumoGeral.totalVotosX.toLocaleString('pt-BR')}</strong>
          </div>
        </div>

        {candY && (
          <div className="kpi-card card-cand-y">
            <div className="kpi-icon-box icon-cand-y">🟩</div>
            <div className="kpi-content">
              <span className="kpi-title">Votos {candY.nome_urna}</span>
              <strong className="kpi-value text-cand-y">{resumoGeral.totalVotosY.toLocaleString('pt-BR')}</strong>
            </div>
          </div>
        )}

        <div className="kpi-card card-soma">
          <div className="kpi-icon-box icon-soma">
            <img src={geovotoSimbolo} alt="Símbolo" className="kpi-logo-simbolo" />
          </div>
          <div className="kpi-content">
            <span className="kpi-title">Votos Parceria Total</span>
            <strong className="kpi-value text-soma">{resumoGeral.totalVotosDobradinha.toLocaleString('pt-BR')}</strong>
          </div>
        </div>
      </div>

      {/* ── 2. HERO CARD: IA GEOVOTO INSIGHTS ENGINE ───────────────────────── */}
      {aiInsights && (
        <div className="ai-insights-hero-card">
          <div className="ai-section-header">
            <div className="ai-header-top">
              <span className="ai-badge-chip">🤖 IA GEOVOTO INSIGHTS ENGINE</span>
              <span className="ai-timestamp">Gerado via IA • {new Date(aiInsights.timestampGeracao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <h2>Leitura e Direcionamentos Estratégicos de Campanha</h2>
            <p className="ai-exec-summary">{aiInsights.resumoExecutivo}</p>
          </div>

          {/* DIAGNÓSTICO POR RD (REGIÕES DE DESENVOLVIMENTO DE PERNAMBUCO) */}
          <div className="meso-diagnostics-wrapper">
            <h3 className="sub-heading-title">🗺️ Diagnóstico Estratégico por RD (Região de Desenvolvimento PE)</h3>
            <div className="meso-diagnostics-grid">
              {aiInsights.diagnosticoMesorregioes.map((d, idx) => (
                <div key={idx} className="meso-diag-card">
                  <div className="meso-card-top">
                    <span className="meso-title">{d.mesorregiao}</span>
                    <span className={`status-pill status-${d.status.toLowerCase().replace(/ /g, '-')}`}>
                      {d.status}
                    </span>
                  </div>
                  <div className="meso-stats">{d.desempenho}</div>
                  <div className="meso-directive">
                    <strong>Diretriz Tática:</strong> {d.diretriz}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECOMENDAÇÕES E AÇÕES DE CAMPO PRIORITÁRIAS */}
          <div className="insights-detailed-wrapper">
            <h3 className="sub-heading-title">🎯 Recomendações e Ações de Campo Prioritárias</h3>
            <div className="insights-cards-grid">
              {aiInsights.insightsDetalhados.map((ins, i) => (
                <div key={i} className={`insight-action-card priority-${ins.prioridade.toLowerCase()}`}>
                  <div className="ins-header">
                    <span className="ins-cat-badge">{ins.categoria}</span>
                    <span className="ins-priority-tag">Prioridade: <strong>{ins.prioridade}</strong></span>
                  </div>
                  <h4 className="ins-card-title">{ins.titulo}</h4>
                  <p className="ins-desc">{ins.descricao}</p>
                  <div className="ins-action-box">
                    <span className="action-icon">💡</span>
                    <div>
                      <strong>Ação Recomendada:</strong>
                      <p>{ins.acaoRecomendada}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 3. SEÇÃO DUAS COLUNAS: COMPLEMENTARIDADE VS CANIBALIZAÇÃO ───────── */}
      <div className="visuals-two-columns">
        {/* TOP TERRITÓRIOS DE COMPLEMENTARIDADE */}
        <div className="insight-card-box">
          <div className="card-box-header">
            <div className="box-title-group">
              <span className="box-icon">🚀</span>
              <div>
                <h3>Top Territórios de Maior Complementaridade</h3>
                <span className="box-sub">Onde a dobradinha soma mais do que cada um sozinho (potencial de transferência)</span>
              </div>
            </div>
          </div>

          <div className="ranking-items-list">
            {rankings.maiorComplementaridade.map((t, idx) => {
              const barWidth = (t.complementaridade / maxComp) * 100;
              return (
                <div key={t.id} className="ranking-item-row">
                  <span className="rank-badge">#{idx + 1}</span>
                  <div className="rank-content">
                    <div className="rank-top-line">
                      <strong className="rank-item-name">{t.nome}</strong>
                      <span className="highlight-pct-pill">+{(t.complementaridade * 100).toFixed(1)}% Comp</span>
                    </div>
                    <div className="rank-sub-details">
                      <span>{candX.nome_urna}: {(t.aderencia_A * 100).toFixed(1)}%</span>
                      {candY && <span> • {candY.nome_urna}: {(t.aderencia_B * 100).toFixed(1)}%</span>}
                    </div>
                    <div className="rank-track-bg">
                      <div className="rank-fill-comp" style={{ width: `${barWidth}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP TERRITÓRIOS DE CANIBALIZAÇÃO */}
        <div className="insight-card-box warning-box">
          <div className="card-box-header">
            <div className="box-title-group">
              <span className="box-icon">⚠️</span>
              <div>
                <h3>Top Territórios de Canibalização</h3>
                <span className="box-sub">Alta sobreposição de eleitorado — risco de disputa direta da mesma base</span>
              </div>
            </div>
          </div>

          <div className="ranking-items-list">
            {rankings.maiorCanibalizacao.map((t, idx) => {
              const barWidth = (t.sobreposicao / maxCanib) * 100;
              return (
                <div key={t.id} className="ranking-item-row">
                  <span className="rank-badge warning-badge">#{idx + 1}</span>
                  <div className="rank-content">
                    <div className="rank-top-line">
                      <strong className="rank-item-name">{t.nome}</strong>
                      <span className="warning-pct-pill">{(t.sobreposicao * 100).toFixed(1)}% Sobreposição</span>
                    </div>
                    <div className="rank-sub-details">
                      <span>Votos {candX.nome_urna}: {t.votos_A}</span>
                      {candY && <span> • Votos {candY.nome_urna}: {t.votos_B}</span>}
                    </div>
                    <div className="rank-track-bg">
                      <div className="rank-fill-canib" style={{ width: `${barWidth}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 4. MAIORES TERRITÓRIOS EM VOLUME DE ELEITORES ────────────────────── */}
      <div className="insight-card-box full-width-card">
        <div className="card-box-header">
          <div className="box-title-group">
            <span className="box-icon">🏆</span>
            <div>
              <h3>Maiores Territórios em Volume de Eleitores</h3>
              <span className="box-sub">Ranking de densidade demográfica dos eleitores aptos no recorte atual</span>
            </div>
          </div>
        </div>

        <div className="bar-charts-list">
          {topTerritoriosEleitores.map((t, idx) => {
            const pct = (t.aptos / maxEleitores) * 100;
            return (
              <div key={t.id} className="bar-chart-row">
                <div className="bar-row-header">
                  <span className="bar-row-title">#{idx + 1} <strong>{t.nome}</strong> ({t.mesorregiao})</span>
                  <span className="bar-row-value">{t.aptos.toLocaleString('pt-BR')} eleitores</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
