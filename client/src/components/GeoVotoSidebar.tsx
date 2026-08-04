import React from 'react';
import type { Candidato, CamadaGeografica, ModoVisualizacao } from '../types/geovoto';

interface GeoVotoSidebarProps {
  // / Ações de Filtro
  onApplyFilters?: () => void;
  onResetFilters?: () => void;

  // / Região
  camadaAtiva: CamadaGeografica;
  onCamadaChange: (camada: CamadaGeografica) => void;
  mesorregiaoAtiva: string;
  onMesorregiaoChange: (meso: string) => void;
  microrregiaoAtiva?: string;
  onMicrorregiaoChange?: (micro: string) => void;
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
  anosSelecionados?: number[];
  onAnoEleicaoChange: (ano: number) => void;
  onToggleAnoEleicao?: (ano: number) => void;

  // / Resumo
  totalEleitoresFiltrados: number;
  totalSecoes: number;
  totalVotosParceria: number;
  totalVotosX?: number;
  totalVotosY?: number;
}

export const LISTA_RDS_PE = [
  'Todas',
  'RD 01 - RMR (Região Metropolitana)',
  'RD 02 - Mata Norte',
  'RD 03 - Mata Sul',
  'RD 04 - Agreste Central',
  'RD 05 - Agreste Setentrional',
  'RD 06 - Agreste Meridional',
  'RD 07 - Sertão do Moxotó',
  'RD 08 - Sertão do Pajeú',
  'RD 09 - Sertão do Araripe',
  'RD 10 - Sertão Central',
  'RD 11 - Sertão do São Francisco',
  'RD 12 - Sertão de Itaparica',
];

export const GeoVotoSidebar: React.FC<GeoVotoSidebarProps> = ({
  onApplyFilters,
  onResetFilters,
  camadaAtiva,
  onCamadaChange,
  mesorregiaoAtiva,
  onMesorregiaoChange,
  microrregiaoAtiva = 'Todas',
  onMicrorregiaoChange,
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
  anosSelecionados,
  onAnoEleicaoChange,
  onToggleAnoEleicao,
  totalEleitoresFiltrados,
  totalSecoes,
  totalVotosParceria,
  totalVotosX,
  totalVotosY,
}) => {
  // Ordenação Alfabética da Lista de Candidatos (Com Visão Geral no topo)
  const candidatosOrdenados = React.useMemo(() => {
    const geral = candidatosLista.find((c) => c.id === 0);
    const outros = candidatosLista
      .filter((c) => c.id !== 0)
      .sort((a, b) => a.nome_urna.localeCompare(b.nome_urna, 'pt-BR'));
    return geral ? [geral, ...outros] : outros;
  }, [candidatosLista]);

  return (
    <aside className="geovoto-sidebar-panel">
      {/* ── 1. BOTÃO PRINCIPAL DE FILTRAR ──────────────────────────────── */}
      <div className="sidebar-block filter-actions-block">
        <button
          type="button"
          className="btn btn-primary btn-block btn-lg filter-trigger-btn"
          onClick={() => onApplyFilters && onApplyFilters()}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: '15px',
            fontWeight: 700,
            backgroundColor: '#0941dc',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(9, 65, 220, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          🔍 FILTRAR DADOS
        </button>
        {onResetFilters && (
          <button
            type="button"
            className="btn btn-outline btn-block btn-sm filter-reset-btn"
            onClick={onResetFilters}
            style={{
              width: '100%',
              marginTop: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: 600,
              backgroundColor: 'transparent',
              color: '#94a3b8',
              border: '1px solid #334155',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            🧹 Limpar Filtros
          </button>
        )}
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
              Município
            </button>
            <button
              className={`camada-pill-btn ${camadaAtiva === 'bairro' ? 'active' : ''}`}
              onClick={() => onCamadaChange('bairro')}
            >
              Bairro
            </button>
            <button
              className={`camada-pill-btn ${camadaAtiva === 'secao' ? 'active' : ''}`}
              onClick={() => onCamadaChange('secao')}
            >
              Seção
            </button>
          </div>
        </div>

        {/* Mesorregião Select */}
        <div className="filter-group">
          <label className="sidebar-label">Mesorregião PE:</label>
          <select
            className="sidebar-select"
            value={mesorregiaoAtiva}
            onChange={(e) => {
              onMesorregiaoChange(e.target.value);
              if (onMicrorregiaoChange) onMicrorregiaoChange('Todas');
              onMunicipioChange('Todos');
              onBairroChange('Todos');
            }}
          >
            <option value="Todas">Todas as Mesorregiões (PE)</option>
            <option value="RMR">Região Metropolitana do Recife (RMR)</option>
            <option value="Zona da Mata">Zona da Mata</option>
            <option value="Agreste">Agreste Pernambucano</option>
            <option value="Sertão">Sertão Pernambucano</option>
          </select>
        </div>

        {/* RD — Região de Desenvolvimento Select */}
        <div className="filter-group">
          <label className="sidebar-label">RD — Região de Desenvolvimento (PE):</label>
          <select
            className="sidebar-select"
            value={microrregiaoAtiva}
            onChange={(e) => {
              if (onMicrorregiaoChange) onMicrorregiaoChange(e.target.value);
              onMunicipioChange('Todos');
              onBairroChange('Todos');
            }}
          >
            {LISTA_RDS_PE.map((rd) => (
              <option key={rd} value={rd}>
                {rd === 'Todas' ? 'Todas as RDs de PE' : rd}
              </option>
            ))}
          </select>
        </div>

        {/* Cidade / Município Select */}
        <div className="filter-group">
          <label className="sidebar-label">Município:</label>
          <select
            className="sidebar-select"
            value={municipioAtivo}
            onChange={(e) => {
              onMunicipioChange(e.target.value);
              onBairroChange('Todos');
            }}
          >
            <option value="Todos">Todos os Municípios ({municipiosDisponiveis.length})</option>
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
              const selected = candidatosOrdenados.find((c) => c.id === Number(e.target.value));
              if (selected) onCandXChange(selected);
            }}
          >
            {candidatosOrdenados.map((c) => (
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
                const selected = candidatosOrdenados.find((c) => c.id === Number(val));
                onCandYChange(selected);
              }
            }}
          >
            <option value="">Nenhum (Visualização Isolada)</option>
            {candidatosOrdenados
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
          {(() => {
            const activeList = anosSelecionados && anosSelecionados.length > 0 
              ? anosSelecionados 
              : (anoEleicao === 0 ? [0] : [anoEleicao]);
            
            const handleSelect = (ano: number) => {
              if (onToggleAnoEleicao) {
                onToggleAnoEleicao(ano);
              } else {
                onAnoEleicaoChange(ano);
              }
            };

            return (
              <>
                <button
                  type="button"
                  className={`history-btn btn-all ${activeList.includes(0) ? 'active' : ''}`}
                  onClick={() => handleSelect(0)}
                >
                  📊 Todas as Eleições (Consolidado)
                </button>
                <button
                  type="button"
                  className={`history-btn btn-2024 ${activeList.includes(2024) ? 'active' : ''}`}
                  onClick={() => handleSelect(2024)}
                >
                  🏛️ Eleições 2024 (Municipais)
                </button>
                <button
                  type="button"
                  className={`history-btn btn-2022 ${activeList.includes(2022) ? 'active' : ''}`}
                  onClick={() => handleSelect(2022)}
                >
                  🗳️ Eleições 2022 (Gerais)
                </button>
                <button
                  type="button"
                  className={`history-btn btn-2020 ${activeList.includes(2020) ? 'active' : ''}`}
                  onClick={() => handleSelect(2020)}
                >
                  🏛️ Eleições 2020 (Municipais)
                </button>
                <button
                  type="button"
                  className={`history-btn btn-2018 ${activeList.includes(2018) ? 'active' : ''}`}
                  onClick={() => handleSelect(2018)}
                >
                  🗳️ Eleições 2018 (Gerais)
                </button>
              </>
            );
          })()}
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

          {/* Soma detalhada ao combinar candidatos */}
          {candY && modoAtivo !== 'isolado_x' && modoAtivo !== 'isolado_y' && (
            <div className="resumo-breakdown-container">
              <div className="resumo-metric-item sub-item">
                <span className="resumo-lbl-sub">↳ {candX.nome_urna}:</span>
                <strong className="resumo-val-sub val-cand-x">{(totalVotosX || 0).toLocaleString('pt-BR')}</strong>
              </div>
              <div className="resumo-metric-item sub-item">
                <span className="resumo-lbl-sub">↳ {candY.nome_urna}:</span>
                <strong className="resumo-val-sub val-cand-y">{(totalVotosY || 0).toLocaleString('pt-BR')}</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
