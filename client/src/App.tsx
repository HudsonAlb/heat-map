import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { GeoVotoDashboard } from './components/GeoVotoDashboard';
import { RevOpsDashboardContainer } from './components/revops/RevOpsDashboardContainer';
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
  const [activeModule, setActiveModule] = useState<'revops' | 'geovoto'>(() => {
    return (sessionStorage.getItem('berlim_active_module') as 'revops' | 'geovoto') || 'revops';
  });

  const handleLoginSucesso = (usuario: UsuarioRBAC, modulo: 'revops' | 'geovoto') => {
    setUsuarioAtual(usuario);
    setActiveModule(modulo);
    setIsLoggedIn(true);
    sessionStorage.setItem('berlim_logged_in', 'true');
    sessionStorage.setItem('berlim_active_module', modulo);
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

  if (activeModule === 'revops') {
    return (
      <RevOpsDashboardContainer
        userEmail={usuarioAtual.email}
        onSwitchToGeoVoto={() => {
          setActiveModule('geovoto');
          sessionStorage.setItem('berlim_active_module', 'geovoto');
        }}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <GeoVotoDashboard
      usuarioInicial={usuarioAtual}
      onSwitchToRevOps={() => {
        setActiveModule('revops');
        sessionStorage.setItem('berlim_active_module', 'revops');
      }}
      onLogout={handleLogout}
    />
  );
}

export default App;
