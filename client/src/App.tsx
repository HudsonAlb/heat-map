/**
 * App — Dashboard Eleitoral PE
 *
 * Layout principal com header premium e o componente de heatmap.
 */

import EleitoralHeatmap from './components/EleitoralHeatmap';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* ── Header do Dashboard ──────────────────────────────────────────── */}
      <header className="app-header">
        <div className="header-left">
          <div className="logo-mark">
            <span className="logo-icon">🗳️</span>
          </div>
          <div className="header-text">
            <h1>Dashboard Eleitoral</h1>
            <p className="header-subtitle">Pernambuco — Mapa de Densidade de Eleitores</p>
          </div>
        </div>
        <div className="header-right">
          <div className="header-badge">
            <span className="badge-dot" />
            <span>Dados Atualizados</span>
          </div>
          <div className="header-uf">
            UF 26 — PE
          </div>
        </div>
      </header>

      {/* ── Conteúdo principal: Heatmap ──────────────────────────────────── */}
      <main className="app-main">
        <EleitoralHeatmap />
      </main>
    </div>
  );
}

export default App;
