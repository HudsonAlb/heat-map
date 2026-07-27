import React, { useEffect, useState, useCallback } from 'react';
import type { RevOpsDashboardData, FonteRevOps } from '../../types/revops';
import { MetasSection } from './MetasSection';
import { AquisicaoVendasSection } from './AquisicaoVendasSection';
import { FooterBar } from '../FooterBar';

interface RevOpsDashboardContainerProps {
  userEmail: string;
  onSwitchToGeoVoto: () => void;
  onLogout: () => void;
}

export const RevOpsDashboardContainer: React.FC<RevOpsDashboardContainerProps> = ({
  userEmail,
  onSwitchToGeoVoto,
  onLogout,
}) => {
  const [fonteAtiva, setFonteAtiva] = useState<FonteRevOps>('crm');
  const [dashboardData, setDashboardData] = useState<RevOpsDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRevOpsData = useCallback(async (fonte: FonteRevOps) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/revops/dashboard?fonte=${fonte}`);
      if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
      const data: RevOpsDashboardData = await res.json();
      setDashboardData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados do B DASH');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRevOpsData(fonteAtiva);
  }, [fonteAtiva, fetchRevOpsData]);

  return (
    <div className="revops-dashboard-shell">
      {/* ── BARRA SUPERIOR DE NAVEGAÇÃO DE MÓDULOS (PADRONIZADA) ─────────────── */}
      <div className="top-module-bar">
        <span>Você está navegando no módulo <strong>B DASH (Dash de RevOps & CRM)</strong></span>
        <button className="btn btn-primary btn-sm" onClick={onSwitchToGeoVoto}>
          🗺️ Alternar para GeoVoto (Eleitoral) →
        </button>
      </div>

      {/* ── CABEÇALHO B DASH ─────────────────────────────────────────────── */}
      <header className="revops-header">
        <div className="revops-brand-group">
          <div className="revops-logo-badge">
            <span className="logo-icon">📈</span>
          </div>
          <div>
            <h1 className="revops-title">B DASH — Dash de RevOps</h1>
            <span className="revops-sub">Berlim Co. Intelligence</span>
          </div>
        </div>

        <div className="revops-header-actions">
          <span className="user-email-tag">👤 {userEmail}</span>
          <button className="btn btn-danger btn-sm" onClick={onLogout}>
            🚪 Sair
          </button>
        </div>
      </header>

      {/* ── CORPO DO B DASH ───────────────────────────────────────────────── */}
      <main className="revops-main-content">
        {isLoading && (
          <div className="content-loading-overlay">
            <div className="spinner"></div>
            <p>Carregando métricas de receitas e CRM no B DASH...</p>
          </div>
        )}

        {error && (
          <div className="content-error-overlay">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button className="btn btn-primary btn-md" onClick={() => fetchRevOpsData(fonteAtiva)}>
              Tentar Novamente
            </button>
          </div>
        )}

        {!isLoading && dashboardData && (
          <div className="revops-sections-stack">
            {/* 1. SEÇÃO DE METAS NO TOPO SUPERIOR */}
            <MetasSection metas={dashboardData.metas} />

            {/* 2. ÁREA DE AQUISIÇÃO E VENDAS COM FILTROS CRM / OUTRAS FONTES, GRÁFICO E TABELA */}
            <AquisicaoVendasSection
              fonteAtual={fonteAtiva}
              onTrocarFonte={setFonteAtiva}
              canaisAquisicao={dashboardData.canaisAquisicao}
              oportunidadesGrafico={dashboardData.oportunidadesGrafico}
            />
          </div>
        )}
      </main>

      {/* ── BARRA DE RODAPÉ OFICIAL ───────────────────────────────────────── */}
      <FooterBar />
    </div>
  );
};
