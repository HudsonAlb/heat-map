import React, { useState } from 'react';
import type { Candidato, CamadaGeografica, ModoVisualizacao } from '../types/geovoto';

interface CandidateSelectorBarProps {
  candidatosLista: Candidato[];
  candX: Candidato;
  candY: Candidato;
  onChangeCandX: (cand: Candidato) => void;
  onChangeCandY: (cand: Candidato) => void;
  camadaAtiva: CamadaGeografica;
  onChangeCamada: (camada: CamadaGeografica) => void;
  modoAtivo: ModoVisualizacao;
  onChangeModo: (modo: ModoVisualizacao) => void;
  alertasCiclo: string[];
}

export const CandidateSelectorBar: React.FC<CandidateSelectorBarProps> = ({
  candidatosLista,
  candX,
  candY,
  onChangeCandX,
  onChangeCandY,
  camadaAtiva,
  onChangeCamada,
  modoAtivo,
  onChangeModo,
  alertasCiclo,
}) => {
  const [searchX, setSearchX] = useState('');
  const [searchY, setSearchY] = useState('');
  const [showDropdownX, setShowDropdownX] = useState(false);
  const [showDropdownY, setShowDropdownY] = useState(false);

  const filteredX = candidatosLista.filter((c) =>
    c.nome_urna.toLowerCase().includes(searchX.toLowerCase()) ||
    c.partido.toLowerCase().includes(searchX.toLowerCase()) ||
    String(c.numero).includes(searchX)
  );

  const filteredY = candidatosLista.filter((c) =>
    c.nome_urna.toLowerCase().includes(searchY.toLowerCase()) ||
    c.partido.toLowerCase().includes(searchY.toLowerCase()) ||
    String(c.numero).includes(searchY)
  );

  return (
    <div className="selector-bar-container">
      {/* SELEÇÃO DE CANDIDATO X vs CANDIDATO Y */}
      <div className="candidates-pickers-row">
        {/* CANDIDATO X */}
        <div className="candidate-picker-box cand-x-box">
          <label className="picker-label">
            <span className="cand-tag tag-x">Candidato X</span>
            <span className="cand-sublabel">(Base Primária)</span>
          </label>
          <div className="autocomplete-wrapper">
            <button
              className="picker-select-btn"
              onClick={() => setShowDropdownX(!showDropdownX)}
            >
              <div className="selected-cand-info">
                <strong>{candX.nome_urna}</strong>
                <span>{candX.partido} • {candX.numero} • {candX.cargo}</span>
              </div>
              <span className="dropdown-arrow">▼</span>
            </button>

            {showDropdownX && (
              <div className="autocomplete-dropdown">
                <input
                  type="text"
                  className="dropdown-search-input"
                  placeholder="Buscar nome, número ou partido..."
                  value={searchX}
                  onChange={(e) => setSearchX(e.target.value)}
                  autoFocus
                />
                <div className="dropdown-options-list">
                  {filteredX.map((c) => (
                    <div
                      key={c.id}
                      className={`dropdown-option-item ${c.id === candX.id ? 'active' : ''}`}
                      onClick={() => {
                        onChangeCandX(c);
                        setShowDropdownX(false);
                      }}
                    >
                      <strong>{c.nome_urna}</strong> ({c.partido} - {c.numero})
                      <div className="opt-sub">{c.cargo} • {c.nome_completo}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* VS BADGE */}
        <div className="vs-badge">
          <span>VS</span>
        </div>

        {/* CANDIDATO Y */}
        <div className="candidate-picker-box cand-y-box">
          <label className="picker-label">
            <span className="cand-tag tag-y">Candidato Y</span>
            <span className="cand-sublabel">(Parceiro de Chapa)</span>
          </label>
          <div className="autocomplete-wrapper">
            <button
              className="picker-select-btn"
              onClick={() => setShowDropdownY(!showDropdownY)}
            >
              <div className="selected-cand-info">
                <strong>{candY.nome_urna}</strong>
                <span>{candY.partido} • {candY.numero} • {candY.cargo}</span>
              </div>
              <span className="dropdown-arrow">▼</span>
            </button>

            {showDropdownY && (
              <div className="autocomplete-dropdown">
                <input
                  type="text"
                  className="dropdown-search-input"
                  placeholder="Buscar nome, número ou partido..."
                  value={searchY}
                  onChange={(e) => setSearchY(e.target.value)}
                  autoFocus
                />
                <div className="dropdown-options-list">
                  {filteredY.map((c) => (
                    <div
                      key={c.id}
                      className={`dropdown-option-item ${c.id === candY.id ? 'active' : ''}`}
                      onClick={() => {
                        onChangeCandY(c);
                        setShowDropdownY(false);
                      }}
                    >
                      <strong>{c.nome_urna}</strong> ({c.partido} - {c.numero})
                      <div className="opt-sub">{c.cargo} • {c.nome_completo}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BANNER DE ALERTA DE CICLOS DIFERENTES */}
      {alertasCiclo.length > 0 && (
        <div className="cycle-alert-banner">
          <span className="alert-icon">⚠️</span>
          <span>{alertasCiclo[0]}</span>
        </div>
      )}

      {/* CONTROLES DE CAMADA E MODOS DE MAPA */}
      <div className="controls-subbar">
        {/* SELETOR DE CAMADA GEOGRÁFICA */}
        <div className="layer-selector-group">
          <span className="group-label">Camada Geográfica:</span>
          <div className="tab-group-buttons">
            <button
              className={`layer-tab-btn ${camadaAtiva === 'mesorregiao' ? 'active' : ''}`}
              onClick={() => onChangeCamada('mesorregiao')}
            >
              Mesorregião
            </button>
            <button
              className={`layer-tab-btn ${camadaAtiva === 'municipio' ? 'active' : ''}`}
              onClick={() => onChangeCamada('municipio')}
            >
              Município
            </button>
            <button
              className={`layer-tab-btn ${camadaAtiva === 'bairro' ? 'active' : ''}`}
              onClick={() => onChangeCamada('bairro')}
            >
              Bairro
            </button>
            <button
              className={`layer-tab-btn ${camadaAtiva === 'secao' ? 'active' : ''}`}
              onClick={() => onChangeCamada('secao')}
            >
              Seção Eleitoral
            </button>
          </div>
        </div>

        {/* TOGGLE DOS 5 MODOS DE VISUALIZAÇÃO DE MAPA */}
        <div className="mode-selector-group">
          <span className="group-label">Modo de Mapa:</span>
          <div className="mode-pills">
            <button
              className={`mode-pill ${modoAtivo === 'soma' ? 'active mode-soma' : ''}`}
              onClick={() => onChangeModo('soma')}
              title="Força combinada da dobradinha (A + B) - Padrão"
            >
              🔥 Soma (Dobradinha)
            </button>
            <button
              className={`mode-pill ${modoAtivo === 'isolado_x' ? 'active mode-x' : ''}`}
              onClick={() => onChangeModo('isolado_x')}
              title="Votação isolada do Candidato X"
            >
              🟦 Isolado X
            </button>
            <button
              className={`mode-pill ${modoAtivo === 'isolado_y' ? 'active mode-y' : ''}`}
              onClick={() => onChangeModo('isolado_y')}
              title="Votação isolada do Candidato Y"
            >
              🟩 Isolado Y
            </button>
            <button
              className={`mode-pill ${modoAtivo === 'diferencial' ? 'active mode-diff' : ''}`}
              onClick={() => onChangeModo('diferencial')}
              title="Mapa divergente: Onde X domina (Azul) vs Onde Y domina (Vermelho)"
            >
              ☯️ Diferencial X-Y
            </button>
            <button
              className={`mode-pill ${modoAtivo === 'sobreposicao' ? 'active mode-overlap' : ''}`}
              onClick={() => onChangeModo('sobreposicao')}
              title="Territórios onde ambos têm alta aderência simultânea"
            >
              ⚡ Sobreposição
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
