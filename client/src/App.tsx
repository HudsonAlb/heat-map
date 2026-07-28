import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { GeoVotoDashboard } from './components/GeoVotoDashboard';
import type { UsuarioRBAC } from './types/geovoto';
import './App.css';

const USUARIOS_DEMO: UsuarioRBAC[] = [
  {
    id: 1,
    nome: 'Carlos Eduardo',
    email: 'carlos@campanha.com.br',
    papel: 'responsavel_campanha',
    escopo_geografico: { uf: 'PE' },
  },
  {
    id: 2,
    nome: 'Mariana Silva',
    email: 'mariana.rmr@campanha.com.br',
    papel: 'coordenador_regional',
    escopo_geografico: { uf: 'PE', mesorregioes: ['RMR'] },
  },
  {
    id: 3,
    nome: 'João Pedro',
    email: 'joao.agreste@campanha.com.br',
    papel: 'coordenador_regional',
    escopo_geografico: { uf: 'PE', mesorregioes: ['Agreste'] },
  },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('berlim_logged_in') === 'true';
  });
  const [usuarioAtual, setUsuarioAtual] = useState<UsuarioRBAC>(USUARIOS_DEMO[0]);

  const handleLoginSucesso = (usuario: UsuarioRBAC) => {
    setUsuarioAtual(usuario);
    setIsLoggedIn(true);
    sessionStorage.setItem('berlim_logged_in', 'true');
    sessionStorage.setItem('berlim_active_module', 'geovoto');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('berlim_logged_in');
  };

  if (!isLoggedIn) {
    return (
      <LoginScreen
        usuariosDisponiveis={USUARIOS_DEMO}
        onLoginSucesso={handleLoginSucesso}
      />
    );
  }

  return (
    <GeoVotoDashboard
      usuarioInicial={usuarioAtual}
      onLogout={handleLogout}
    />
  );
}

export default App;
