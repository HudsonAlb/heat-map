import React, { useState } from 'react';
import type { UsuarioRBAC } from '../types/geovoto';

interface LoginScreenProps {
  usuariosDisponiveis: UsuarioRBAC[];
  onLoginSucesso: (usuario: UsuarioRBAC) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  usuariosDisponiveis,
  onLoginSucesso,
}) => {
  const [email, setEmail] = useState(usuariosDisponiveis[0]?.email || 'carlos@campanha.com.br');
  const [senha, setSenha] = useState('berlim2026');
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro('Por favor, informe o e-mail e a senha.');
      return;
    }

    const usuario = usuariosDisponiveis.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (usuario) {
      onLoginSucesso(usuario);
    } else {
      const novoUsuario: UsuarioRBAC = {
        id: 99,
        nome: email.split('@')[0],
        email,
        papel: 'responsavel_campanha',
        escopo_geografico: { uf: 'PE' },
      };
      onLoginSucesso(novoUsuario);
    }
  };

  return (
    <div className="login-screen-overlay">
      <div className="login-card-glass">
        {/* LOGO BERLIM CO & PLATAFORMAS */}
        <div className="login-brand-header">
          <div className="login-logo-mark">
            <span className="logo-icon">🗺️</span>
          </div>
          <h1 className="login-brand-title">GEOVOTO</h1>
          <span className="login-brand-sub">Berlim Co. Intelligence</span>
          <p className="login-slogan">"Inteligência Eleitoral Geográfica — Dados que transformam"</p>
        </div>

        {/* FORMULÁRIO DE LOGIN */}
        <form onSubmit={handleSubmit} className="login-form">
          {erro && <div className="login-error-badge">⚠️ {erro}</div>}

          <div className="login-form-group">
            <label htmlFor="login-email">Acesso de Perfil / E-mail:</label>
            <select
              id="login-email"
              className="login-input-select"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              {usuariosDisponiveis.map((u) => (
                <option key={u.email} value={u.email}>
                  {u.nome} — {u.papel.replace('_', ' ').toUpperCase()} ({u.escopo_geografico.mesorregioes?.[0] || 'PE Completo'})
                </option>
              ))}
            </select>
          </div>

          <div className="login-form-group">
            <label htmlFor="login-senha">Senha de Acesso:</label>
            <input
              id="login-senha"
              type="password"
              className="login-input-field"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg login-submit-btn">
            🚀 Acessar Plataforma GeoVoto
          </button>
        </form>

        <div className="login-footer-credits">
          <span>Desenvolvido por Berlim Co. Todos os direitos reservados.</span>
        </div>
      </div>
    </div>
  );
};
