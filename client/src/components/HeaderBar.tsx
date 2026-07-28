import React from 'react';
import type { UsuarioRBAC } from '../types/geovoto';

interface HeaderBarProps {
  usuarioAtual: UsuarioRBAC;
  usuariosDisponiveis: UsuarioRBAC[];
  onTrocarUsuario: (user: UsuarioRBAC) => void;
  onLogout: () => void;
  lastUpdateTimestamp: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  usuarioAtual,
  usuariosDisponiveis,
  onTrocarUsuario,
  onLogout,
  lastUpdateTimestamp,
}) => {
  return (
    <header className="geovoto-header">
      {/* Brand Logo GEOVOTO & Slogan */}
      <div className="header-brand-container">
        <div className="header-logo-badge">
          <span className="logo-icon">🗺️</span>
          <div className="logo-text">
            <h1 className="brand-title">GEOVOTO</h1>
            <span className="brand-sub">Berlim Co.</span>
          </div>
        </div>
        <div className="header-slogan">
          <span>"Dados que revelam intenções. Decisões que transformam."</span>
        </div>
      </div>

      {/* Right Controls: Timestamp, RBAC Selector & Action Buttons */}
      <div className="header-controls">
        {/* Timestamp de Atualização Diária */}
        <div className="live-timestamp-badge" title="Atualização diária via pipeline ETL TSE/IBGE">
          <span className="pulse-dot"></span>
          <span className="timestamp-label">ETL:</span>
          <strong className="timestamp-value">{lastUpdateTimestamp}</strong>
        </div>

        {/* Seletor de Papel RBAC */}
        <div className="rbac-selector">
          <select
            className="rbac-select"
            value={usuarioAtual.email}
            onChange={(e) => {
              const u = usuariosDisponiveis.find((x) => x.email === e.target.value);
              if (u) onTrocarUsuario(u);
            }}
          >
            {usuariosDisponiveis.map((u) => (
              <option key={u.email} value={u.email}>
                {u.nome} ({u.papel.replace('_', ' ').toUpperCase()})
              </option>
            ))}
          </select>
        </div>


        {/* Botão Logout */}
        <button
          className="btn btn-danger btn-sm"
          onClick={onLogout}
          title="Sair do GeoVoto"
        >
          🚪 Sair
        </button>
      </div>
    </header>
  );
};
