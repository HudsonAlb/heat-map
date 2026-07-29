import React from 'react';
import type { UsuarioRBAC } from '../types/geovoto';
import geovotoLogotipo from '../assets/Geovoto - logotipo.svg';

interface HeaderBarProps {
  usuarioAtual: UsuarioRBAC;
  onLogout: () => void;
  lastUpdateTimestamp: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  usuarioAtual,
  onLogout,
  lastUpdateTimestamp,
}) => {
  return (
    <header className="geovoto-header">
      {/* Brand Logo GEOVOTO & Slogan */}
      <div className="header-brand-container">
        <img src={geovotoLogotipo} alt="GeoVoto" className="header-logo-img" />
        <div className="header-slogan">
          <span>"Dados que revelam intenções. Decisões que transformam."</span>
        </div>
      </div>

      {/* Right Controls: Timestamp & Action Buttons */}
      <div className="header-controls">
        {/* Timestamp de Atualização Diária */}
        <div className="live-timestamp-badge" title="Atualização diária via pipeline ETL TSE/IBGE">
          <span className="pulse-dot"></span>
          <span className="timestamp-label">ETL:</span>
          <strong className="timestamp-value">{lastUpdateTimestamp}</strong>
        </div>

        {/* Espaço de Perfil do Usuário */}
        <div className="header-user-profile">
          <img
            src={usuarioAtual.foto_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100'}
            alt={usuarioAtual.nome}
            className="header-profile-avatar"
          />
          <div className="header-profile-info">
            <span className="header-profile-name">{usuarioAtual.nome}</span>
            <span className="header-profile-role">{usuarioAtual.papel.replace('_', ' ').toUpperCase()}</span>
          </div>
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
