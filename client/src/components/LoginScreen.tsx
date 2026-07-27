import React, { useState } from 'react';
import type { UsuarioRBAC } from '../types/geovoto';

interface LoginScreenProps {
  usuariosDisponiveis: UsuarioRBAC[];
  onLoginSucesso: (usuario: UsuarioRBAC, moduloInicial: 'revops' | 'geovoto') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  usuariosDisponiveis,
  onLoginSucesso,
}) => {
  const [email, setEmail] = useState(usuariosDisponiveis[0]?.email || 'carlos@campanha.com.br');
  const [senha, setSenha] = useState('berlim2026');
  const [modulo, setModulo] = useState<'revops' | 'geovoto'>('revops');
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro('Por favor, informe o e-mail e a senha.');
      return;
    }

    const usuario = usuariosDisponiveis.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (usuario) {
      onLoginSucesso(usuario, modulo);
    } else {
      const novoUsuario: UsuarioRBAC = {
        id: 99,
        nome: email.split('@')[0],
        email,
        papel: 'responsavel_campanha',
        escopo_geografico: { uf: 'PE' },
      };
      onLoginSucesso(novoUsuario, modulo);
    }
  };

  return (
    <div className="login-screen-overlay">
      <div className="login-card-glass">
        {/* LOGO BERLIM CO & PLATAFORMAS */}
        <div className="login-brand-header">
          <div className="login-logo-mark">
            <span className="logo-icon">📈</span>
          </div>
          <h1 className="login-brand-title">B DASH & GEOVOTO</h1>
          <span className="login-brand-sub">Berlim Co. Intelligence</span>
          <p className="login-slogan">"Dash de RevOps & Inteligência Eleitoral Geográfica"</p>
        </div>

        {/* FORMULÁRIO DE LOGIN */}
        <form onSubmit={handleSubmit} className="login-form">
          {erro && <div className="login-error-badge">⚠️ {erro}</div>}

          <div className="login-form-group">
            <label htmlFor="login-modulo">Módulo de Acesso:</label>
            <select
              id="login-modulo"
              className="login-input-select"
              value={modulo}
              onChange={(e) => setModulo(e.target.value as 'revops' | 'geovoto')}
            >
              <option value="revops">📈 B DASH — Dash de RevOps (CRM & Metas)</option>
              <option value="geovoto">🗺️ GeoVoto — Inteligência Eleitoral Geográfica</option>
            </select>
          </div>

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
            🚀 Entrar na Plataforma Berlim Co.
          </button>
        </form>

        <div className="login-footer-credits">
          <span>Desenvolvido por Berlim Co. Todos os direitos reservados.</span>
        </div>
      </div>
    </div>
  );
};
