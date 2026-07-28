import React, { useEffect, useState, useCallback, useMemo } from 'react';

import type {
  Candidato,
  ResultadoComparacao,
  CamadaGeografica,
  ModoVisualizacao,
  UsuarioRBAC,
  DobradinhaSalva,
  ChatbotResponse,
} from '../types/geovoto';

import { LoginScreen } from './LoginScreen';
import { HeaderBar } from './HeaderBar';
import { CandidateSelectorBar } from './CandidateSelectorBar';
import { GeoVotoSidebar } from './GeoVotoSidebar';
import { DataOrderingSelect } from './DataOrderingSelect';
import type { ModoOrdenacaoDados } from './DataOrderingSelect';
import { DobradinhaMap } from './DobradinhaMap';
import { ComparisonTable } from './ComparisonTable';
import { MetricsPanel } from './MetricsPanel';
import { SavedDobradinhasModal } from './SavedDobradinhasModal';
import { ChatbotDrawer } from './ChatbotDrawer';
import { ChatbotFab } from './ChatbotFab';
import { FooterBar } from './FooterBar';

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

interface GeoVotoDashboardProps {
  usuarioInicial?: UsuarioRBAC;
  onSwitchToRevOps?: () => void;
  onLogout?: () => void;
}

export const GeoVotoDashboard: React.FC<GeoVotoDashboardProps> = ({
  usuarioInicial,
  onSwitchToRevOps,
  onLogout,
}) => {
  // Estado de Autenticação / Área de Login
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('geovoto_logged_in') === 'true' || Boolean(usuarioInicial);
  });
  const [usuarioAtual, setUsuarioAtual] = useState<UsuarioRBAC>(usuarioInicial || USUARIOS_DEMO[0]);

  // Candidatos Padrão
  const [candidatosLista, setCandidatosLista] = useState<Candidato[]>([]);
  const [candX, setCandX] = useState<Candidato | null>(null);
  const [candY, setCandY] = useState<Candidato | undefined>(undefined);

  // Estados dos Filtros da Sidebar
  const [filterSearch, setFilterSearch] = useState('');
  const [camadaAtiva, setCamadaAtiva] = useState<CamadaGeografica>('municipio');
  const [mesorregiaoAtiva, setMesorregiaoAtiva] = useState<string>('Todas');
  const [municipioAtivo, setMunicipioAtivo] = useState<string>('Todos');
  const [bairroAtivo, setBairroAtivo] = useState<string>('Todos');
  const [modoAtivo, setModoAtivo] = useState<ModoVisualizacao>('soma');
  const [anoEleicao, setAnoEleicao] = useState<number>(2024);

  // Estado de Ordenação da Visualização dos Dados
  const [ordenacaoDados, setOrdenacaoDados] = useState<ModoOrdenacaoDados>('forca');

  // Estado dos Resultados da API
  const [resultado, setResultado] = useState<ResultadoComparacao | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado das Abas do Painel
  const [activeTab, setActiveTab] = useState<'map' | 'table' | 'metrics'>('map');

  // Modais e Drawers
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isDobradinhasModalOpen, setIsDobradinhasModalOpen] = useState(false);
  const [isMobileFilterDrawerOpen, setIsMobileFilterDrawerOpen] = useState(false);
  const [dobradinhasSalvas, setDobradinhasSalvas] = useState<DobradinhaSalva[]>([]);

  // 1. Fetch Inicial de Candidatos e Dobradinhas
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [candRes, dobRes] = await Promise.all([
          fetch(`/api/candidatos?ano=${anoEleicao}`),
          fetch('/api/dobradinhas'),
        ]);

        if (candRes.ok) {
          const candData = await candRes.json();
          const list: Candidato[] = candData.candidatos || [];
          setCandidatosLista(list);
          if (list.length > 0) setCandX(list[0]);
          if (list.length > 1) setCandY(list[1]);
        }

        if (dobRes.ok) {
          const dobData = await dobRes.json();
          setDobradinhasSalvas(dobData || []);
        }
      } catch (err) {
        console.error('Erro ao carregar candidatos:', err);
      }
    }

    loadInitialData();
  }, [anoEleicao]);

  // 2. Fetch da Consulta Comparativa/Parceria
  const fetchComparacao = useCallback(async () => {
    if (!candX) return;

    try {
      setIsLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        candX: String(candX.id),
        ano: String(anoEleicao),
        camada: camadaAtiva,
        microrregiao: mesorregiaoAtiva,
        municipio: municipioAtivo,
      });

      if (candY) {
        queryParams.append('candY', String(candY.id));
      }

      const res = await fetch(`/api/comparacao?${queryParams.toString()}`, {
        headers: {
          'X-User-Email': usuarioAtual.email,
        },
      });

      if (!res.ok) throw new Error(`Erro HTTP ${res.status} na consulta`);

      const data: ResultadoComparacao = await res.json();
      setResultado(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar dados');
    } finally {
      setIsLoading(false);
    }
  }, [candX, candY, anoEleicao, camadaAtiva, mesorregiaoAtiva, municipioAtivo, usuarioAtual]);

  useEffect(() => {
    fetchComparacao();
  }, [fetchComparacao]);

  // Municípios disponíveis dinâmicos
  const municipiosDisponiveis = useMemo(() => {
    if (!resultado) return [];
    const setMuns = new Set(resultado.territorios.map((t) => t.nome_municipio || t.nome));
    return Array.from(setMuns).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [resultado]);

  // Aplicação da Ordenação nos Territórios para Tabela e Lista
  const territoriosOrdenados = useMemo(() => {
    if (!resultado) return [];
    let list = [...resultado.territorios];

    if (filterSearch.trim()) {
      const term = filterSearch.toLowerCase();
      list = list.filter((t) => t.nome.toLowerCase().includes(term));
    }

    return list.sort((a, b) => {
      if (ordenacaoDados === 'forca') return b.forca_dobradinha - a.forca_dobradinha;
      if (ordenacaoDados === 'aptos') return b.aptos - a.aptos;
      if (ordenacaoDados === 'votos_a') return b.votos_A - a.votos_A;
      if (ordenacaoDados === 'votos_b') return b.votos_B - a.votos_B;
      if (ordenacaoDados === 'alfabetica') return a.nome.localeCompare(b.nome, 'pt-BR');
      return 0;
    });
  }, [resultado, filterSearch, ordenacaoDados]);

  // Handlers
  const handleLogin = (usuario: UsuarioRBAC) => {
    setUsuarioAtual(usuario);
    setIsLoggedIn(true);
    sessionStorage.setItem('geovoto_logged_in', 'true');
  };

  const handleLogoutAction = () => {
    if (onLogout) {
      onLogout();
    } else {
      setIsLoggedIn(false);
      sessionStorage.removeItem('geovoto_logged_in');
    }
  };

  const handleSalvarNovaDobradinha = async (nome: string, candidatoAId: number, candidatoBId: number) => {
    try {
      const res = await fetch('/api/dobradinhas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, candidatoAId, candidatoBId, criadoPor: usuarioAtual.nome }),
      });
      if (res.ok) {
        const listRes = await fetch('/api/dobradinhas');
        if (listRes.ok) setDobradinhasSalvas(await listRes.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletarDobradinha = async (id: number) => {
    try {
      const res = await fetch(`/api/dobradinhas/${id}`, { method: 'DELETE' });
      if (res.ok) setDobradinhasSalvas((prev) => prev.filter((d) => String(d.id) !== String(id)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleApplyDeepLink = (deepLink: ChatbotResponse['deep_link']) => {
    const cX = candidatosLista.find((c) => c.id === deepLink.candXId);
    const cY = candidatosLista.find((c) => c.id === deepLink.candYId);

    if (cX) setCandX(cX);
    if (cY) setCandY(cY);
    setCamadaAtiva(deepLink.camada);
    setModoAtivo(deepLink.modo);
    if (deepLink.microrregiao) setMesorregiaoAtiva(deepLink.microrregiao);
    if (deepLink.municipio) setMunicipioAtivo(deepLink.municipio);

    setActiveTab('map');
  };

  if (!isLoggedIn) {
    return (
      <LoginScreen
        usuariosDisponiveis={USUARIOS_DEMO}
        onLoginSucesso={handleLogin}
      />
    );
  }

  return (
    <div className="geovoto-app-shell">
      {/* ── CABEÇALHO SUPERIOR ───────────────────────────────────────────── */}
      <HeaderBar
        usuarioAtual={usuarioAtual}
        usuariosDisponiveis={USUARIOS_DEMO}
        onTrocarUsuario={setUsuarioAtual}
        onLogout={handleLogoutAction}
        lastUpdateTimestamp="27/07/2026 06:00"
      />

      {/* BANNER DE NAVEGAÇÃO DE MÓDULOS */}
      {onSwitchToRevOps && (
        <div className="top-module-bar">
          <span>Você está navegando no módulo <strong>GeoVoto (Inteligência Eleitoral Geográfica)</strong></span>
          <button className="btn btn-primary btn-sm" onClick={onSwitchToRevOps}>
            📈 Alternar para B DASH — Dash de RevOps →
          </button>
        </div>
      )}

      {/* BARRA FLUTUANTE DE BOTÃO DE FILTROS MOBILE */}
      {candX && (
        <div className="mobile-filter-bar-toggle">
          <button
            className="btn btn-primary btn-md mobile-filter-btn"
            onClick={() => setIsMobileFilterDrawerOpen(true)}
          >
            ⚙️ Filtros & Candidatos — {candX.nome_urna} {candY ? `vs ${candY.nome_urna}` : ''} ({anoEleicao})
          </button>
        </div>
      )}

      {/* MODAL / DRAWER DE FILTROS EXCLUSIVO PARA MOBILE */}
      {isMobileFilterDrawerOpen && candX && (
        <div className="mobile-filter-drawer-overlay">
          <div className="mobile-filter-drawer-card">
            <div className="mobile-filter-drawer-header">
              <h3>⚙️ Filtros & Configuração de Parceria</h3>
              <button
                className="drawer-close-btn"
                onClick={() => setIsMobileFilterDrawerOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="mobile-filter-drawer-body">
              <CandidateSelectorBar
                candidatosLista={candidatosLista}
                candX={candX}
                candY={candY || candX}
                onChangeCandX={setCandX}
                onChangeCandY={setCandY}
                camadaAtiva={camadaAtiva}
                onChangeCamada={setCamadaAtiva}
                modoAtivo={modoAtivo}
                onChangeModo={setModoAtivo}
                alertasCiclo={[]}
              />

              <GeoVotoSidebar
                filterSearch={filterSearch}
                onSearchChange={setFilterSearch}
                camadaAtiva={camadaAtiva}
                onCamadaChange={setCamadaAtiva}
                mesorregiaoAtiva={mesorregiaoAtiva}
                onMesorregiaoChange={setMesorregiaoAtiva}
                municipioAtivo={municipioAtivo}
                onMunicipioChange={setMunicipioAtivo}
                bairroAtivo={bairroAtivo}
                onBairroChange={setBairroAtivo}
                municipiosDisponiveis={municipiosDisponiveis}
                candidatosLista={candidatosLista}
                candX={candX}
                candY={candY}
                onCandXChange={setCandX}
                onCandYChange={setCandY}
                modoAtivo={modoAtivo}
                onModoChange={setModoAtivo}
                anoEleicao={anoEleicao}
                onAnoEleicaoChange={setAnoEleicao}
                totalEleitoresFiltrados={resultado?.resumoGeral.totalEleitores || 0}
                totalSecoes={resultado?.resumoGeral.totalSecoes || 0}
                totalVotosParceria={resultado?.resumoGeral.totalVotosDobradinha || 0}
              />
            </div>

            <div className="mobile-filter-drawer-footer">
              <button
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                onClick={() => setIsMobileFilterDrawerOpen(false)}
              >
                🚀 Aplicar Filtros no Mapa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CORPO DA DASHBOARD COM SIDEBAR E CONTEÚDO PRINCIPAL ───────────── */}
      <div className="geovoto-dashboard-body">
        {/* FILTRO LATERAL ESTRUTURADO (SIDEBAR DESKTOP) */}
        {candX && (
          <div className="desktop-sidebar-wrapper">
            <GeoVotoSidebar
              filterSearch={filterSearch}
              onSearchChange={setFilterSearch}
              camadaAtiva={camadaAtiva}
              onCamadaChange={setCamadaAtiva}
              mesorregiaoAtiva={mesorregiaoAtiva}
              onMesorregiaoChange={setMesorregiaoAtiva}
              municipioAtivo={municipioAtivo}
              onMunicipioChange={setMunicipioAtivo}
              bairroAtivo={bairroAtivo}
              onBairroChange={setBairroAtivo}
              municipiosDisponiveis={municipiosDisponiveis}
              candidatosLista={candidatosLista}
              candX={candX}
              candY={candY}
              onCandXChange={setCandX}
              onCandYChange={setCandY}
              modoAtivo={modoAtivo}
              onModoChange={setModoAtivo}
              anoEleicao={anoEleicao}
              onAnoEleicaoChange={setAnoEleicao}
              totalEleitoresFiltrados={resultado?.resumoGeral.totalEleitores || 0}
              totalSecoes={resultado?.resumoGeral.totalSecoes || 0}
              totalVotosParceria={resultado?.resumoGeral.totalVotosDobradinha || 0}
            />
          </div>
        )}

        {/* ÁREA DE EXIBIÇÃO DA DASHBOARD */}
        <main className="geovoto-main-view">
          {/* TOPO DE CONTROLES: NAVEGAÇÃO DE ABAS & SELECT DE ORDENAÇÃO */}
          <div className="main-top-controls-bar">
            <div className="tab-navigation-bar">
              <button
                className={`nav-tab-btn ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                🗺️ Mapa de Calor
              </button>
              <button
                className={`nav-tab-btn ${activeTab === 'table' ? 'active' : ''}`}
                onClick={() => setActiveTab('table')}
              >
                📋 Tabela Comparativa
              </button>
              <button
                className={`nav-tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
                onClick={() => setActiveTab('metrics')}
              >
                📈 Métricas IA
              </button>
            </div>

            {candX && (
              <DataOrderingSelect
                ordenacaoAtual={ordenacaoDados}
                onTrocarOrdenacao={setOrdenacaoDados}
                candXNome={candX.nome_urna}
                candYNome={candY?.nome_urna}
              />
            )}
          </div>

          {/* LOADING & ERROR OVERLAYS */}
          {isLoading && (
            <div className="content-loading-overlay">
              <div className="spinner"></div>
              <p>Processando inteligência eleitoral GeoVoto ({anoEleicao})...</p>
            </div>
          )}

          {error && (
            <div className="content-error-overlay">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
              <button className="btn btn-primary btn-md" onClick={fetchComparacao}>Tentar Novamente</button>
            </div>
          )}

          {/* CONTEÚDO DAS ABAS */}
          {!isLoading && resultado && candX && (
            <div className="tab-body-container">
              {/* ABA 1: MAPA */}
              {activeTab === 'map' && (
                <DobradinhaMap
                  territorios={territoriosOrdenados}
                  candX={candX}
                  candY={candY || candX}
                  modo={modoAtivo}
                  camada={camadaAtiva}
                  onDrillDown={(t) => {
                    if (camadaAtiva === 'mesorregiao') setCamadaAtiva('municipio');
                    else if (camadaAtiva === 'municipio') setCamadaAtiva('bairro');
                    if (t.nome_municipio) setMunicipioAtivo(t.nome_municipio);
                  }}
                />
              )}

              {/* ABA 2: TABELA */}
              {activeTab === 'table' && (
                <ComparisonTable
                  territorios={territoriosOrdenados}
                  candX={candX}
                  candY={candY || candX}
                />
              )}

              {/* ABA 3: MÉTRICAS & IA INSIGHTS */}
              {activeTab === 'metrics' && (
                <MetricsPanel
                  resultado={{ ...resultado, territorios: territoriosOrdenados }}
                  candX={candX}
                  candY={candY}
                />
              )}
            </div>
          )}
        </main>
      </div>

      {/* ── BOTÃO FLUTUANTE DO CHATBOT NO CANTO INFERIOR DIREITO ──────────── */}
      <ChatbotFab onClick={() => setIsChatbotOpen(true)} />

      {/* ── BARRA DE RODAPÉ OFICIAL BERLIM CO. ───────────────────────────── */}
      <FooterBar />

      {/* MODAIS & DRAWERS */}
      <SavedDobradinhasModal
        isOpen={isDobradinhasModalOpen}
        onClose={() => setIsDobradinhasModalOpen(false)}
        dobradinhasSalvas={dobradinhasSalvas}
        candidatosLista={candidatosLista}
        onCarregarDobradinha={(cA, cB) => {
          setCandX(cA);
          setCandY(cB);
          setActiveTab('map');
        }}
        onSalvarNovaDobradinha={handleSalvarNovaDobradinha}
        onDeletarDobradinha={handleDeletarDobradinha}
      />

      <ChatbotDrawer
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onApplyDeepLink={handleApplyDeepLink}
        userEmail={usuarioAtual.email}
      />
    </div>
  );
};
