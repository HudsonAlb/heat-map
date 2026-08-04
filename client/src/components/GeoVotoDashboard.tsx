import React, { useEffect, useState, useCallback, useMemo } from 'react';

import type {
  Candidato,
  ResultadoComparacao,
  CamadaGeografica,
  ModoVisualizacao,
  UsuarioRBAC,
  DobradinhaSalva,
  ChatbotResponse,
  ModoOrdenacaoDados,
} from '../types/geovoto';

import { LoginScreen } from './LoginScreen';
import { HeaderBar } from './HeaderBar';
import { CandidateSelectorBar } from './CandidateSelectorBar';
import { GeoVotoSidebar } from './GeoVotoSidebar';
// DataOrderingSelect is deprecated and has been merged to GeoVotoSidebar
import { DobradinhaMap } from './DobradinhaMap';
import { ComparisonTable } from './ComparisonTable';
import { MetricsPanel } from './MetricsPanel';
import { SavedDobradinhasModal } from './SavedDobradinhasModal';
import { ChatbotDrawer } from './ChatbotDrawer';
import { ChatbotFab } from './ChatbotFab';
import { FooterBar } from './FooterBar';
import { BerlimGestaoView } from './BerlimGestaoView';

import steVilelaPhoto from '../assets/stevilela.jpg';

const USUARIOS_DEMO: UsuarioRBAC[] = [
  {
    id: 999,
    nome: 'Berlim Gestão',
    email: 'berlim.gestao@campanha.com.br',
    papel: 'gestao_master',
    dados_limpos: true,
    escopo_geografico: { uf: 'PE' },
  },
  {
    id: 139,
    nome: 'Ste Vilela',
    email: 'ste.vilela@campanha.com.br',
    papel: 'candidato',
    candidato_id_padrao: 139,
    foto_url: steVilelaPhoto,
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
  const [camadaAtiva, setCamadaAtiva] = useState<CamadaGeografica>('municipio');
  const [mesorregiaoAtiva, setMesorregiaoAtiva] = useState<string>('Todas');
  const [microrregiaoAtiva, setMicrorregiaoAtiva] = useState<string>('Todas');
  const [municipioAtivo, setMunicipioAtivo] = useState<string>('Todos');
  const [bairroAtivo, setBairroAtivo] = useState<string>('Todos');
  const [modoAtivo, setModoAtivo] = useState<ModoVisualizacao>(
    usuarioAtual?.candidato_id_padrao ? 'isolado_x' : 'soma'
  );
  const [anoEleicao, setAnoEleicao] = useState<number>(0);
  const [anosSelecionados, setAnosSelecionados] = useState<number[]>([0]);

  const handleToggleAno = (ano: number) => {
    if (ano === 0) {
      setAnosSelecionados([0]);
      setAnoEleicao(0);
      return;
    }
    let updated = anosSelecionados.filter((a) => a !== 0);
    if (updated.includes(ano)) {
      updated = updated.filter((a) => a !== ano);
    } else {
      updated.push(ano);
    }
    if (updated.length === 0) {
      updated = [0];
    }
    setAnosSelecionados(updated);
    setAnoEleicao(updated[0] || 0);
  };

  // Estado de Ordenação da Visualização dos Dados
  const [ordenacaoDados] = useState<ModoOrdenacaoDados>('forca');

  // Estado dos Resultados da API
  const [resultado, setResultado] = useState<ResultadoComparacao | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado das Abas do Painel
  const [activeTab, setActiveTab] = useState<'map' | 'table' | 'metrics' | 'berlim_table'>('map');

  // Modais e Drawers
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isDobradinhasModalOpen, setIsDobradinhasModalOpen] = useState(false);
  const [isMobileFilterDrawerOpen, setIsMobileFilterDrawerOpen] = useState(false);
  const [dobradinhasSalvas, setDobradinhasSalvas] = useState<DobradinhaSalva[]>([]);

  // 1. Fetch Inicial de Candidatos e Dobradinhas com Fallback Defensivo
  useEffect(() => {
    async function loadInitialData() {
      try {
        const anoParam = anoEleicao === 0 ? '' : `ano=${anoEleicao}`;
        const [candRes, dobRes] = await Promise.allSettled([
          fetch(`/api/candidatos${anoParam ? `?${anoParam}` : ''}`, {
            headers: { 'X-User-Email': usuarioAtual?.email || '' },
          }),
          fetch('/api/dobradinhas'),
        ]);

        if (candRes.status === 'fulfilled' && candRes.value.ok) {
          const candData = await candRes.value.json();
          const list: Candidato[] = candData.candidatos || [];
          if (list.length > 0) {
            setCandidatosLista(list);

            if (usuarioAtual?.email === 'berlim.gestao@campanha.com.br' || usuarioAtual?.dados_limpos) {
              setCandX((prev) => {
                if (prev) {
                  const match = list.find((c) => c.id === prev.id);
                  if (match) return match;
                }
                return list[0];
              });
              setCandY((prev) => {
                if (prev !== undefined) {
                  const match = list.find((c) => c.id === prev.id);
                  if (match) return match;
                  return prev;
                }
                return undefined;
              });
            } else if (usuarioAtual?.candidato_id_padrao) {
              const perfilCand = list.find((c) => c.id === usuarioAtual.candidato_id_padrao);
              if (perfilCand) {
                setCandX(perfilCand);
                setCandY(undefined); // Por padrão mostra apenas o candidato logado
                setModoAtivo('isolado_x');
              } else {
                setCandX(list[0]);
              }
            } else {
              setCandX((prev) => prev || list[0]);
              setCandY((prev) => (prev !== undefined ? (list.find((c) => c.id === prev.id) || prev) : undefined));
            }
          } else {
            usarCandidatosFallback();
          }
        } else {
          usarCandidatosFallback();
        }

        if (dobRes.status === 'fulfilled' && dobRes.value.ok) {
          const dobData = await dobRes.value.json();
          setDobradinhasSalvas(dobData || []);
        }
      } catch (err) {
        console.error('Erro ao carregar candidatos:', err);
        usarCandidatosFallback();
      }
    }

    function usarCandidatosFallback() {
      if (usuarioAtual?.dados_limpos || usuarioAtual?.email === 'berlim.gestao@campanha.com.br') {
        const berlimFallback: Candidato[] = [
          { id: 9901, nome_urna: 'PREFEITOS ELEITOS PE (1º LUGAR)', nome_completo: 'CHAPA DOS PREFEITOS ELEITOS EM PERNAMBUCO (1º COLOCADOS)', partido: 'PREFEITURA PE', numero: 991, cargo: 'PREFEITO' },
          { id: 9902, nome_urna: 'OPOSIÇÃO MUNICIPAL (2º LUGAR)', nome_completo: 'CHAPA DOS SEGUNDOS COLOCADOS EM PERNAMBUCO (2º PLACE)', partido: 'OPOSIÇÃO PE', numero: 992, cargo: 'PREFEITO' },
        ];
        setCandidatosLista(berlimFallback);
        setCandX(berlimFallback[0]);
        setCandY(berlimFallback[1]);
        return;
      }
      const fallbackList: Candidato[] = [
        { id: 101, nome_urna: 'PEDRO CAMPOS', nome_completo: 'PEDRO HENRIQUE CAMPOS', partido: 'PSB', numero: 4040, cargo: 'DEPUTADO FEDERAL' },
        { id: 201, nome_urna: 'JOÃO CAMPOS', nome_completo: 'JOÃO HENRIQUE DE ANDRADE LIMA CAMPOS', partido: 'PSB', numero: 40, cargo: 'PREFEITO' },
        { id: 777, nome_urna: 'MARÍLIA ARRAES', nome_completo: 'MARÍLIA VALENÇA ROCHA ARRAES DE ALENCAR', partido: 'SOLIDARIEDADE', numero: 77, cargo: 'GOVERNADOR' },
        { id: 139, nome_urna: 'STE VILELA', nome_completo: 'STERPHANIE VILELA', partido: 'PSB', numero: 40180, cargo: 'VEREADOR' },
      ];
      setCandidatosLista(fallbackList);
      setCandX((prev) => prev || fallbackList[0]);
      setCandY((prev) => prev || fallbackList[2]); // Marília Arraes como parceira/opção inicial B
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
        microrregiao: microrregiaoAtiva !== 'Todas' ? microrregiaoAtiva : mesorregiaoAtiva,
        municipio: municipioAtivo,
        bairro: bairroAtivo,
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
  }, [candX, candY, anoEleicao, camadaAtiva, mesorregiaoAtiva, microrregiaoAtiva, municipioAtivo, bairroAtivo, usuarioAtual]);

  useEffect(() => {
    fetchComparacao();
  }, [fetchComparacao]);

  // Municípios disponíveis dinâmicos
  const municipiosDisponiveis = useMemo(() => {
    if (!resultado) return [];
    const setMuns = new Set(resultado.territorios.map((t) => t.nome_municipio || t.nome));
    return Array.from(setMuns).filter(Boolean).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [resultado]);

  // Bairros disponíveis dinâmicos para a cidade selecionada
  const bairrosDisponiveis = useMemo(() => {
    if (!resultado || municipioAtivo === 'Todos') return [];
    if (resultado.bairrosDisponiveis && resultado.bairrosDisponiveis.length > 0) {
      return resultado.bairrosDisponiveis;
    }
    const setBairros = new Set<string>();
    resultado.territorios.forEach((t) => {
      if ((t.nome_municipio === municipioAtivo || t.nome === municipioAtivo) && t.bairro) {
        setBairros.add(t.bairro);
      }
    });
    return Array.from(setBairros).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [resultado, municipioAtivo]);

  // Aplicação da Ordenação nos Territórios para Tabela e Lista
  const territoriosOrdenados = useMemo(() => {
    if (!resultado) return [];
    let list = [...resultado.territorios];

    return list.sort((a, b) => {
      if (ordenacaoDados === 'forca') return b.forca_dobradinha - a.forca_dobradinha;
      if (ordenacaoDados === 'aptos') return b.aptos - a.aptos;
      if (ordenacaoDados === 'votos_a') return b.votos_A - a.votos_A;
      if (ordenacaoDados === 'votos_b') return b.votos_B - a.votos_B;
      if (ordenacaoDados === 'alfabetica') return a.nome.localeCompare(b.nome, 'pt-BR');
      return 0;
    });
  }, [resultado, ordenacaoDados]);

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
    const cY = deepLink.modo === 'isolado_x' ? undefined : candidatosLista.find((c) => c.id === deepLink.candYId);

    if (cX) setCandX(cX);
    setCandY(cY);
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
                onApplyFilters={() => {
                  fetchComparacao();
                  setIsMobileFilterDrawerOpen(false);
                }}
                onResetFilters={() => {
                  setMesorregiaoAtiva('Todas');
                  setMicrorregiaoAtiva('Todas');
                  setMunicipioAtivo('Todos');
                  setBairroAtivo('Todos');
                }}
                camadaAtiva={camadaAtiva}
                onCamadaChange={setCamadaAtiva}
                mesorregiaoAtiva={mesorregiaoAtiva}
                onMesorregiaoChange={setMesorregiaoAtiva}
                microrregiaoAtiva={microrregiaoAtiva}
                onMicrorregiaoChange={setMicrorregiaoAtiva}
                municipioAtivo={municipioAtivo}
                onMunicipioChange={setMunicipioAtivo}
                bairroAtivo={bairroAtivo}
                onBairroChange={setBairroAtivo}
                municipiosDisponiveis={municipiosDisponiveis}
                bairrosDisponiveis={bairrosDisponiveis}
                candidatosLista={candidatosLista}
                candX={candX}
                candY={candY}
                onCandXChange={setCandX}
                onCandYChange={setCandY}
                modoAtivo={modoAtivo}
                onModoChange={setModoAtivo}
                anoEleicao={anoEleicao}
                anosSelecionados={anosSelecionados}
                onAnoEleicaoChange={setAnoEleicao}
                onToggleAnoEleicao={handleToggleAno}
                totalEleitoresFiltrados={resultado?.resumoGeral.totalEleitores || 0}
                totalSecoes={resultado?.resumoGeral.totalSecoes || 0}
                totalVotosX={resultado?.resumoGeral.totalVotosX || 0}
                totalVotosY={resultado?.resumoGeral.totalVotosY || 0}
                totalVotosParceria={
                  !candY || modoAtivo === 'isolado_x'
                    ? (resultado?.resumoGeral.totalVotosX || 0)
                    : modoAtivo === 'isolado_y'
                      ? (resultado?.resumoGeral.totalVotosY || 0)
                      : (resultado?.resumoGeral.totalVotosDobradinha || 0)
                }
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
              onApplyFilters={fetchComparacao}
              onResetFilters={() => {
                setMesorregiaoAtiva('Todas');
                setMicrorregiaoAtiva('Todas');
                setMunicipioAtivo('Todos');
                setBairroAtivo('Todos');
              }}
              camadaAtiva={camadaAtiva}
              onCamadaChange={setCamadaAtiva}
              mesorregiaoAtiva={mesorregiaoAtiva}
              onMesorregiaoChange={setMesorregiaoAtiva}
              microrregiaoAtiva={microrregiaoAtiva}
              onMicrorregiaoChange={setMicrorregiaoAtiva}
              municipioAtivo={municipioAtivo}
              onMunicipioChange={setMunicipioAtivo}
              bairroAtivo={bairroAtivo}
              onBairroChange={setBairroAtivo}
              municipiosDisponiveis={municipiosDisponiveis}
              bairrosDisponiveis={bairrosDisponiveis}
              candidatosLista={candidatosLista}
              candX={candX}
              candY={candY}
              onCandXChange={setCandX}
              onCandYChange={setCandY}
              modoAtivo={modoAtivo}
              onModoChange={setModoAtivo}
              anoEleicao={anoEleicao}
              anosSelecionados={anosSelecionados}
              onAnoEleicaoChange={setAnoEleicao}
              onToggleAnoEleicao={handleToggleAno}
              totalEleitoresFiltrados={resultado?.resumoGeral.totalEleitores || 0}
              totalSecoes={resultado?.resumoGeral.totalSecoes || 0}
              totalVotosX={resultado?.resumoGeral.totalVotosX || 0}
              totalVotosY={resultado?.resumoGeral.totalVotosY || 0}
              totalVotosParceria={
                !candY || modoAtivo === 'isolado_x'
                  ? (resultado?.resumoGeral.totalVotosX || 0)
                  : modoAtivo === 'isolado_y'
                    ? (resultado?.resumoGeral.totalVotosY || 0)
                    : (resultado?.resumoGeral.totalVotosDobradinha || 0)
              }
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
              {(usuarioAtual?.dados_limpos || usuarioAtual?.email === 'berlim.gestao@campanha.com.br') && (
                <button
                  className={`nav-tab-btn ${activeTab === 'berlim_table' ? 'active' : ''}`}
                  onClick={() => setActiveTab('berlim_table')}
                >
                  📊 Tabela Geral PE
                </button>
              )}
            </div>
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

          {/* MÓDULO BERLIM GESTÃO — TABELA GERAL PE */}
          {!isLoading && activeTab === 'berlim_table' && (
            <BerlimGestaoView />
          )}

          {/* CONTEÚDO DAS ABAS */}
          {!isLoading && resultado && candX && activeTab !== 'berlim_table' && (
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
                    const munNome = t.nome_municipio || t.nome;
                    if (munNome) {
                      setMunicipioAtivo(munNome);
                      setCamadaAtiva('bairro');
                    } else if (camadaAtiva === 'mesorregiao') {
                      setCamadaAtiva('municipio');
                    }
                  }}
                />
              )}

              {/* ABA 2: TABELA */}
              {activeTab === 'table' && (
                <ComparisonTable
                  territorios={territoriosOrdenados}
                  candX={candX}
                  candY={candY || candX}
                  anoEleicao={anoEleicao}
                  camada={camadaAtiva}
                  mesorregiaoAtiva={mesorregiaoAtiva}
                  municipioAtivo={municipioAtivo}
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
