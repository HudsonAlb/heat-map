import React from 'react';
import type { Candidato, CamadaGeografica, ModoVisualizacao } from '../types/geovoto';

interface GeoVotoSidebarProps {
  // / Filtro de busca
  filterSearch: string;
  onSearchChange: (val: string) => void;

  // / Região
  camadaAtiva: CamadaGeografica;
  onCamadaChange: (camada: CamadaGeografica) => void;
  mesorregiaoAtiva: string;
  onMesorregiaoChange: (meso: string) => void;
  municipioAtivo: string;
  onMunicipioChange: (mun: string) => void;
  bairroAtivo: string;
  onBairroChange: (bairro: string) => void;
  municipiosDisponiveis: string[];
  bairrosDisponiveis: string[];

  // / Parceria
  candidatosLista: Candidato[];
  candX: Candidato;
  candY?: Candidato;
  onCandXChange: (c: Candidato) => void;
  onCandYChange: (c: Candidato | undefined) => void;
  modoAtivo: ModoVisualizacao;
  onModoChange: (modo: ModoVisualizacao) => void;

  // / Histórico
  anoEleicao: number;
  onAnoEleicaoChange: (ano: number) => void;

  // / Resumo
  totalEleitoresFiltrados: number;
  totalSecoes: number;
  totalVotosParceria: number;
}

export const GeoVotoSidebar: React.FC<GeoVotoSidebarProps> = ({
  filterSearch,
  onSearchChange,
  camadaAtiva,
  onCamadaChange,
  mesorregiaoAtiva,
  onMesorregiaoChange,
  municipioAtivo,
  onMunicipioChange,
  bairroAtivo,
  onBairroChange,
  municipiosDisponiveis,
  bairrosDisponiveis,
  candidatosLista,
  candX,
  candY,
  onCandXChange,
  onCandYChange,
  modoAtivo,
  onModoChange,
  anoEleicao,
  onAnoEleicaoChange,
  totalEleitoresFiltrados,
  totalSecoes,
  totalVotosParceria,
}) => {
  return (
    <aside className="geovoto-sidebar-panel">
      {/* ── 1. FILTRO DE BUSCA ───────────────────────────────────────────── */}
      <div className="sidebar-block">
        <h3 className="block-tag-title">
          <span className="slash-tag">/</span> Filtro de busca
        </h3>
        <div className="filter-group">
          <input
            type="text"
            className="sidebar-search-field"
            placeholder="Buscar Cidade, Bairro ou Comunidade..."
            value={filterSearch}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {/* ── 2. REGIÃO ────────────────────────────────────────────────────── */}
      <div className="sidebar-block">
        <h3 className="block-tag-title">
          <span className="slash-tag">/</span> Região
        </h3>

        {/* Nível de Agregação / Camada */}
        <div className="filter-group">
          <label className="sidebar-label">Visualizar por Camada:</label>
          <div className="camada-pills-row">
            <button
              className={`camada-pill-btn ${camadaAtiva === 'mesorregiao' ? 'active' : ''}`}
              onClick={() => onCamadaChange('mesorregiao')}
            >
              Mesorregião
            </button>
            <button
              className={`camada-pill-btn ${camadaAtiva === 'municipio' ? 'active' : ''}`}
              onClick={() => onCamadaChange('municipio')}
            >
              Cidade
            </button>
            <button
              className={`camada-pill-btn ${camadaAtiva === 'bairro' ? 'active' : ''}`}
              onClick={() => onCamadaChange('bairro')}
            >
              Bairro
            </button>
          </div>
        </div>

        {/* Mesorregião Select */}
        <div className="filter-group">
          <label className="sidebar-label">Mesorregião:</label>
          <select
            className="sidebar-select"
            value={mesorregiaoAtiva}
            onChange={(e) => {
              onMesorregiaoChange(e.target.value);
              onMunicipioChange('Todos');
              onBairroChange('Todos');
            }}
          >
            <option value="Todas">Todas as Mesorregiões</option>
            <option value="RMR">RMR (Região Metropolitana do Recife)</option>
            <option value="Zona da Mata">Zona da Mata</option>
            <option value="Agreste">Agreste</option>
            <option value="Sertão">Sertão</option>
          </select>
        </div>

        {/* Cidade / Município Select */}
        <div className="filter-group">
          <label className="sidebar-label">Cidade / Município:</label>
          <select
            className="sidebar-select"
            value={municipioAtivo}
            onChange={(e) => {
              onMunicipioChange(e.target.value);
              onBairroChange('Todos');
            }}
          >
            <option value="Todos">Todas as Cidades ({municipiosDisponiveis.length})</option>
            {municipiosDisponiveis.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Bairro / Comunidade Select (Encadeado com a Cidade) */}
        <div className="filter-group">
          <label className="sidebar-label">Bairro / Comunidade:</label>
          <select
            className="sidebar-select"
            value={bairroAtivo}
            disabled={municipioAtivo === 'Todos'}
            onChange={(e) => onBairroChange(e.target.value)}
          >
            {municipioAtivo === 'Todos' ? (
              <option value="Todos">⚠️ Selecione uma Cidade para filtrar Bairros</option>
            ) : (
              <>
                <option value="Todos">Todos os Bairros de {municipioAtivo} ({bairrosDisponiveis.length})</option>
                {bairrosDisponiveis.map((b) => (
                  <option key={b} value={b}>
                    📍 {b}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      {/* ── 3. PARCERIA ──────────────────────────────────────────────────── */}
      <div className="sidebar-block">
        <h3 className="block-tag-title">
          <span className="slash-tag">/</span> Parceria
        </h3>

        {/* Candidato A */}
        <div className="filter-group">
          <label className="sidebar-label">Candidato A (Base):</label>
          <select
            className="sidebar-select"
            value={candX.id}
            onChange={(e) => {
              const selected = candidatosLista.find((c) => c.id === Number(e.target.value));
              if (selected) onCandXChange(selected);
            }}
          >
            {candidatosLista.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome_urna} ({c.partido} - {c.numero})
              </option>
            ))}
          </select>
        </div>

        {/* Candidato B (Parceiro) */}
        <div className="filter-group">
          <label className="sidebar-label">Candidato B (Parceiro):</label>
          <select
            className="sidebar-select"
            value={candY?.id || ''}
            onChange={(e) => {
              const val = e.target.value;
              if (!val) onCandYChange(undefined);
              else {
                const selected = candidatosLista.find((c) => c.id === Number(val));
                onCandYChange(selected);
              }
            }}
          >
            <option value="">Nenhum (Visualização Isolada)</option>
            {candidatosLista
              .filter((c) => c.id !== candX.id)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome_urna} ({c.partido} - {c.numero})
                </option>
              ))}
          </select>
        </div>

        {/* Modo de Visualização dos Candidatos */}
        <div className="filter-group">
          <label className="sidebar-label">Visualização dos Candidatos:</label>
          <div className="mode-options-grid">
            <button
              className={`mode-option-btn ${modoAtivo === 'soma' ? 'active' : ''}`}
              onClick={() => onModoChange('soma')}
            >
              🔥 Somando (A + B)
            </button>
            <button
              className={`mode-option-btn ${modoAtivo === 'isolado_x' ? 'active' : ''}`}
              onClick={() => onModoChange('isolado_x')}
            >
              🟦 Só {candX.nome_urna}
            </button>
            {candY && (
              <button
                className={`mode-option-btn ${modoAtivo === 'isolado_y' ? 'active' : ''}`}
                onClick={() => onModoChange('isolado_y')}
              >
                🟩 Só {candY.nome_urna}
              </button>
            )}
            {candY && (
              <button
                className={`mode-option-btn ${modoAtivo === 'diferencial' ? 'active' : ''}`}
                onClick={() => onModoChange('diferencial')}
              >
                ☯️ Diferencial A-B
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 4. HISTÓRICO DE ELEIÇÃO ───────────────────────────────────────── */}
      <div className="sidebar-block">
        <h3 className="block-tag-title">
          <span className="slash-tag">/</span> Histórico de Eleição
        </h3>
        <div className="history-toggle-buttons">
          <button
            className={`history-btn ${anoEleicao === 2024 ? 'active' : ''}`}
            onClick={() => onAnoEleicaoChange(2024)}
          >
            🏛️ Eleições 2024 (Municipais)
          </button>
          <button
            className={`history-btn ${anoEleicao === 2022 ? 'active' : ''}`}
            onClick={() => onAnoEleicaoChange(2022)}
          >
            🗳️ Eleições 2022 (Gerais)
          </button>
        </div>
      </div>

      {/* ── 5. RESUMO ────────────────────────────────────────────────────── */}
      <div className="sidebar-block block-resumo">
        <h3 className="block-tag-title">
          <span className="slash-tag">/</span> Resumo
        </h3>

        <div className="sidebar-resumo-card">
          <div className="resumo-metric-item">
            <span className="resumo-lbl">Total Eleitores Aptos:</span>
            <strong className="resumo-val">{totalEleitoresFiltrados.toLocaleString('pt-BR')}</strong>
          </div>
          <div className="resumo-metric-item">
            <span className="resumo-lbl">Seções Eleitorais:</span>
            <strong className="resumo-val">{totalSecoes}</strong>
          </div>
          <div className="resumo-metric-item highlight-item">
            <span className="resumo-lbl">
              {!candY || modoAtivo === 'isolado_x' ? 'Total Votos (Candidato):' : 'Total Votos da Parceria:'}
            </span>
            <strong className="resumo-val val-soma">{totalVotosParceria.toLocaleString('pt-BR')}</strong>
          </div>
        </div>
      </div>
    </aside>
  );
};
