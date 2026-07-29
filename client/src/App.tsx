import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { GeoVotoDashboard } from './components/GeoVotoDashboard';
import type { UsuarioRBAC } from './types/geovoto';
import './App.css';

const USUARIOS_DEMO: UsuarioRBAC[] = [
  {
    id: 139,
    nome: 'Ster Vilela',
    email: 'ster.vilela@campanha.com.br',
    papel: 'candidato',
    candidato_id_padrao: 139,
    foto_url: '/ster_vilela.png',
    escopo_geografico: { uf: 'PE' },
  },
  {
    id: 101,
    nome: 'Pedro Campos',
    email: 'pedro.campos@campanha.com.br',
    papel: 'candidato',
    candidato_id_padrao: 101,
    foto_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200',
    escopo_geografico: { uf: 'PE' },
  },
  {
    id: 201,
    nome: 'João Campos',
    email: 'joao.campos@campanha.com.br',
    papel: 'candidato',
    candidato_id_padrao: 201,
    foto_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200',
    escopo_geografico: { uf: 'PE' },
  },
  {
    id: 1,
    nome: 'Carlos Eduardo',
    email: 'carlos@campanha.com.br',
    papel: 'responsavel_campanha',
    escopo_geografico: { uf: 'PE' },
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
