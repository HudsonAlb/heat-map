/**
 * EleitoralHeatmap — Componente principal do mapa de calor eleitoral
 *
 * Renderiza um mapa MapLibre com camada de heatmap mostrando a
 * densidade de eleitores distribuídos por Pernambuco.
 *
 * Funcionalidades:
 * - Heatmap com peso calibrado por `totalEleitores`
 * - Transição dinâmica de raio/opacidade por nível de zoom
 * - Rampa de cores suave (azul frio → vermelho quente)
 * - Navegação travada nos limites de PE (maxBounds)
 * - Popup informativo ao clicar em regiões de alta densidade
 * - Navegação rápida para microrregiões
 */

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import Map, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
  Popup,
} from 'react-map-gl/maplibre';
import type { MapRef, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import type { HeatmapLayerSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import type { EleitorFeatureCollection, MicrorregiãoPE } from '../types/geojson';
import {
  PE_CENTER,
  PE_INITIAL_ZOOM,
  PE_MIN_ZOOM,
  PE_MAX_ZOOM,
  MAP_STYLE_URL,
  HEATMAP_CONFIG,
  VIEWPOINTS,
  type ViewpointKey,
} from '../config/map';

// ─── Tipos internos ───────────────────────────────────────────────────────────

interface PopupInfo {
  longitude: number;
  latitude: number;
  municipio: string;
  bairro: string;
  totalEleitores: number;
  zonaEleitoral: number;
  microrregiao: string;
}

interface ViewState {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing?: number;
  pitch?: number;
}

// ─── Configuração da camada heatmap (MapLibre spec) ───────────────────────────

const heatmapLayerStyle: Omit<HeatmapLayerSpecification, 'source'> = {
  id: 'eleitores-heatmap',
  type: 'heatmap',

  paint: {
    // Peso: interpolação linear do totalEleitores (0 → maxWeight mapeado de 0 → 1)
    'heatmap-weight': [
      'interpolate',
      ['linear'],
      ['get', 'totalEleitores'],
      0, 0,
      HEATMAP_CONFIG.maxWeight, 1,
    ],

    // Intensidade: cresce com o zoom para manter legibilidade
    'heatmap-intensity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      ...HEATMAP_CONFIG.intensity.stops.flat(),
    ],

    // Rampa de cores: transparente → azul → ciano → verde → amarelo → laranja → vermelho
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      ...HEATMAP_CONFIG.colorRamp,
    ],

    // Raio: expande com o zoom
    'heatmap-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      ...HEATMAP_CONFIG.radius.stops.flat(),
    ],

    // Opacidade: fade-out suave em zooms altos para revelar detalhes abaixo
    'heatmap-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      ...HEATMAP_CONFIG.opacity.stops.flat(),
    ],
  },
};

// ─── Componente Principal ───────────────────────────────────────────────────────

export default function EleitoralHeatmap() {
  // Estado dos dados GeoJSON originais do backend
  const [geojsonData, setGeojsonData] = useState<EleitorFeatureCollection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados dos filtros cruzados (Cross-Filters)
  const [filterSearch, setFilterSearch] = useState('');
  const [filterMicrorregiao, setFilterMicrorregiao] = useState<string>('Todas');
  const [filterMunicipio, setFilterMunicipio] = useState<string>('Todos');
  const filterMinEleitores = 0;
  const [filterMaxEleitores, setFilterMaxEleitores] = useState<number>(50000);

  // Estado das abas
  const [activeTab, setActiveTab] = useState<'map' | 'table' | 'metrics'>('map');

  // Estado da paginação da tabela
  const [tablePage, setTablePage] = useState(1);
  const itemsPerPage = 10;

  // Estado do mapa
  const [viewState, setViewState] = useState<ViewState>({
    latitude: PE_CENTER.latitude,
    longitude: PE_CENTER.longitude,
    zoom: PE_INITIAL_ZOOM,
  });
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [activeRegion, setActiveRegion] = useState<ViewpointKey>('Estado Completo');

  const mapRef = useRef<MapRef>(null);

  // ─── Fetch inicial dos dados completos ────────────────────────────────────────

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        let geoRes: Response | null = null;
        try {
          geoRes = await fetch('/api/eleitores/geojson', { signal: controller.signal });
        } catch {
          // Ignora erro de rede/CORS e tenta o fallback estático
        }

        if (!geoRes || !geoRes.ok) {
          geoRes = await fetch('/data/eleitores.json', { signal: controller.signal });
        }

        if (!geoRes.ok) throw new Error(`Erro HTTP ${geoRes.status} ao buscar GeoJSON`);

        const geoData: EleitorFeatureCollection = await geoRes.json();
        setGeojsonData(geoData);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Erro desconhecido ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);

  // ─── Lógica do Filtro Cruzado (Frontend Side) ────────────────────────────────

  // Lista filtrada de features baseada nos filtros ativos
  const filteredFeatures = useMemo(() => {
    if (!geojsonData) return [];
    return geojsonData.features.filter((f) => {
      // 1. Filtro de Texto (Município ou Bairro)
      const term = filterSearch.trim().toLowerCase();
      const matchesSearch =
        !term ||
        f.properties.municipio.toLowerCase().includes(term) ||
        f.properties.bairro.toLowerCase().includes(term);

      // 2. Filtro de Microrregião
      const matchesMicro =
        filterMicrorregiao === 'Todas' || f.properties.microrregiao === filterMicrorregiao;

      // 3. Filtro de Município específico
      const matchesMun =
        filterMunicipio === 'Todos' || f.properties.municipio === filterMunicipio;

      // 4. Filtro de Faixa de Eleitores
      const total = f.properties.totalEleitores;
      const matchesVoters = total >= filterMinEleitores && total <= filterMaxEleitores;

      return matchesSearch && matchesMicro && matchesMun && matchesVoters;
    });
  }, [geojsonData, filterSearch, filterMicrorregiao, filterMunicipio, filterMinEleitores, filterMaxEleitores]);

  // Estrutura GeoJSON gerada a partir das features filtradas para alimentar o mapa
  const filteredGeojsonData = useMemo((): EleitorFeatureCollection => {
    return {
      type: 'FeatureCollection',
      features: filteredFeatures,
    };
  }, [filteredFeatures]);

  // Lista dinâmica de Municípios com base na microrregião selecionada
  const availableMunicipios = useMemo(() => {
    if (!geojsonData) return [];
    const filteredByMicro = geojsonData.features.filter(
      (f) => filterMicrorregiao === 'Todas' || f.properties.microrregiao === filterMicrorregiao
    );
    const unique = Array.from(new Set(filteredByMicro.map((f) => f.properties.municipio)));
    return unique.sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [geojsonData, filterMicrorregiao]);

  // Limpa o município selecionado caso a microrregião mude e ele não faça parte dela
  const handleMicrorregiaoChange = (val: string) => {
    setFilterMicrorregiao(val);
    setFilterMunicipio('Todos');
    setTablePage(1);
  };

  // ─── Paginação da Tabela ───────────────────────────────────────────────────

  const totalPages = Math.ceil(filteredFeatures.length / itemsPerPage);

  const paginatedFeatures = useMemo(() => {
    const start = (tablePage - 1) * itemsPerPage;
    return filteredFeatures.slice(start, start + itemsPerPage);
  }, [filteredFeatures, tablePage]);

  // Reseta para a página 1 sempre que os filtros mudarem
  useEffect(() => {
    setTablePage(1);
  }, [filterSearch, filterMicrorregiao, filterMunicipio, filterMinEleitores, filterMaxEleitores]);

  // ─── Cálculos das Métricas & Insights ──────────────────────────────────────

  const totalEleitoresFiltrados = useMemo(() => {
    return filteredFeatures.reduce((acc, f) => acc + f.properties.totalEleitores, 0);
  }, [filteredFeatures]);

  const resumoPorMicrorregiao = useMemo(() => {
    const microrregioes: MicrorregiãoPE[] = [
      'Região Metropolitana do Recife',
      'Zona da Mata',
      'Agreste',
      'Sertão',
    ];
    return microrregioes.map((micro) => {
      const features = filteredFeatures.filter((f) => f.properties.microrregiao === micro);
      const totalEleitores = features.reduce((acc, f) => acc + f.properties.totalEleitores, 0);
      return {
        microrregiao: micro,
        totalPontos: features.length,
        totalEleitores,
      };
    });
  }, [filteredFeatures]);

  // Maiores municípios do filtro
  const rankingMunicipios = useMemo(() => {
    const totals: Record<string, number> = {};
    filteredFeatures.forEach((f) => {
      const mun = f.properties.municipio;
      totals[mun] = (totals[mun] || 0) + f.properties.totalEleitores;
    });
    return Object.entries(totals)
      .map(([municipio, total]) => ({ municipio, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [filteredFeatures]);

  // ─── Handlers do Mapa ────────────────────────────────────────────────────────

  /** Ao clicar no mapa, busca features próximas ao ponto clicado */
  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const features = map.queryRenderedFeatures(event.point, {
      layers: ['eleitores-heatmap'],
    });

    if (features && features.length > 0) {
      const props = features[0].properties;
      if (props) {
        setPopupInfo({
          longitude: event.lngLat.lng,
          latitude: event.lngLat.lat,
          municipio: props.municipio as string,
          bairro: props.bairro as string,
          totalEleitores: props.totalEleitores as number,
          zonaEleitoral: props.zonaEleitoral as number,
          microrregiao: props.microrregiao as string,
        });
      }
    } else {
      setPopupInfo(null);
    }
  }, []);

  /** Navega para uma microrregião predefinida e aplica o filtro correspondente */
  const navigateToRegion = useCallback((key: ViewpointKey) => {
    const vp = VIEWPOINTS[key];
    setActiveRegion(key);
    setViewState({
      latitude: vp.latitude,
      longitude: vp.longitude,
      zoom: vp.zoom,
    });
    setPopupInfo(null);

    // Sincroniza o filtro lateral com o botão clicado
    if (key === 'Estado Completo') {
      setFilterMicrorregiao('Todas');
    } else {
      setFilterMicrorregiao(key);
    }
    setFilterMunicipio('Todos');
  }, []);

  // ─── Helpers ───────────────────────────────────────────────────────────────

  const formatNumber = (n: number) => n.toLocaleString('pt-BR');

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="heatmap-container">
      {/* ── PAINEL LATERAL: Controles e Filtros Cruzados ──────────────────────── */}
      <aside className="heatmap-sidebar">
        {/* Seção 1: Filtros de Busca */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            <span className="icon">🔍</span>
            Filtros Cruzados
          </h3>

          {/* Campo de pesquisa textual */}
          <div className="filter-group">
            <label htmlFor="search-input">Buscar Município / Bairro</label>
            <input
              id="search-input"
              type="text"
              className="filter-input"
              placeholder="Ex: Recife, Centro..."
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
            />
          </div>

          {/* Dropdown de Microrregião */}
          <div className="filter-group">
            <label htmlFor="microrregiao-select">Microrregião</label>
            <select
              id="microrregiao-select"
              className="filter-select"
              value={filterMicrorregiao}
              onChange={(e) => handleMicrorregiaoChange(e.target.value)}
            >
              <option value="Todas">Todas as Microrregiões</option>
              <option value="Região Metropolitana do Recife">Metropolitana do Recife</option>
              <option value="Zona da Mata">Zona da Mata</option>
              <option value="Agreste">Agreste</option>
              <option value="Sertão">Sertão</option>
            </select>
          </div>

          {/* Dropdown de Município (dependente da microrregião) */}
          <div className="filter-group">
            <label htmlFor="municipio-select">Município</label>
            <select
              id="municipio-select"
              className="filter-select"
              value={filterMunicipio}
              onChange={(e) => {
                setFilterMunicipio(e.target.value);
                setTablePage(1);
              }}
              disabled={availableMunicipios.length === 0}
            >
              <option value="Todos">Todos ({availableMunicipios.length})</option>
              {availableMunicipios.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Slider de Quantidade de Eleitores */}
          <div className="filter-group">
            <div className="filter-slider-header">
              <label>Eleitores por Seção</label>
              <span className="slider-value">
                {formatNumber(filterMinEleitores)} - {formatNumber(filterMaxEleitores)}
              </span>
            </div>
            <div className="range-inputs">
              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={filterMaxEleitores}
                onChange={(e) => {
                  setFilterMaxEleitores(Number(e.target.value));
                  setTablePage(1);
                }}
                className="filter-slider"
              />
            </div>
          </div>
        </div>

        {/* Seção 2: Links Rápidos de Navegação Geográfica (Apenas visíveis na aba de mapa) */}
        {activeTab === 'map' && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <span className="icon">📍</span>
              Foco no Mapa
            </h3>
            <div className="region-buttons">
              {(Object.keys(VIEWPOINTS) as ViewpointKey[]).map((key) => (
                <button
                  key={key}
                  className={`region-btn ${activeRegion === key ? 'active' : ''}`}
                  onClick={() => navigateToRegion(key)}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Seção 3: Resumo Dinâmico do Filtro */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            <span className="icon">📊</span>
            Resumo Ativo
          </h3>
          <div className="resumo-total">
            <span className="resumo-label">Total Filtrado</span>
            <span className="resumo-value">{formatNumber(totalEleitoresFiltrados)}</span>
          </div>
          <div className="resumo-list">
            {resumoPorMicrorregiao.map((r) => (
              <div key={r.microrregiao} className="resumo-item">
                <span className="resumo-micro-name">{r.microrregiao}</span>
                <div className="resumo-micro-stats">
                  <span className="resumo-eleitores">{formatNumber(r.totalEleitores)}</span>
                  <span className="resumo-pontos">{r.totalPontos} seções</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legenda do Heatmap (apenas na aba de mapa) */}
        {activeTab === 'map' && (
          <div className="sidebar-section sidebar-legend">
            <h3 className="sidebar-title">
              <span className="icon">🎨</span>
              Legenda do Mapa
            </h3>
            <div className="legend-bar" />
            <div className="legend-labels">
              <span>Mínima</span>
              <span>Média</span>
              <span>Máxima</span>
            </div>
          </div>
        )}
      </aside>

      {/* ── ÁREA PRINCIPAL COM ABAS ─────────────────────────────────────────── */}
      <div className="heatmap-map-area">
        {/* Barra de Seleção de Abas */}
        <div className="dashboard-tab-bar">
          <button
            className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            🗺️ Mapa de Calor
          </button>
          <button
            className={`tab-btn ${activeTab === 'table' ? 'active' : ''}`}
            onClick={() => setActiveTab('table')}
          >
            📋 Tabela de Dados
          </button>
          <button
            className={`tab-btn ${activeTab === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveTab('metrics')}
          >
            📈 Métricas & Insights
          </button>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="map-overlay loading-overlay">
            <div className="spinner" />
            <p>Carregando dados eleitorais...</p>
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="map-overlay error-overlay">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Tentar novamente</button>
          </div>
        )}

        {/* CONTEÚDO DA ABA: MAPA */}
        {activeTab === 'map' && (
          <div className="tab-content map-tab-content">
            <Map
              ref={mapRef}
              {...viewState}
              onMove={(evt) => setViewState(evt.viewState)}
              onClick={handleMapClick}
              mapStyle={MAP_STYLE_URL}
              minZoom={PE_MIN_ZOOM}
              maxZoom={PE_MAX_ZOOM}
              style={{ width: '100%', height: '100%' }}
            >
              <NavigationControl position="top-right" />
              <ScaleControl position="bottom-right" maxWidth={200} unit="metric" />

              {filteredGeojsonData && (
                <Source id="eleitores" type="geojson" data={filteredGeojsonData}>
                  <Layer {...heatmapLayerStyle} />
                </Source>
              )}

              {popupInfo && (
                <Popup
                  longitude={popupInfo.longitude}
                  latitude={popupInfo.latitude}
                  closeOnClick={false}
                  onClose={() => setPopupInfo(null)}
                  anchor="bottom"
                  className="eleitor-popup"
                >
                  <div className="popup-content">
                    <h4>{popupInfo.municipio}</h4>
                    <p className="popup-bairro">{popupInfo.bairro}</p>
                    <div className="popup-stats">
                      <div className="popup-stat">
                        <span className="popup-stat-value">
                          {formatNumber(popupInfo.totalEleitores)}
                        </span>
                        <span className="popup-stat-label">eleitores</span>
                      </div>
                      <div className="popup-stat">
                        <span className="popup-stat-value">{popupInfo.zonaEleitoral}</span>
                        <span className="popup-stat-label">zona</span>
                      </div>
                    </div>
                    <span className="popup-micro">{popupInfo.microrregiao}</span>
                  </div>
                </Popup>
              )}
            </Map>

            <div className="zoom-badge">Zoom: {viewState.zoom.toFixed(1)}</div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: TABELA */}
        {activeTab === 'table' && (
          <div className="tab-content table-tab-content">
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Município</th>
                    <th>Bairro</th>
                    <th>Microrregião</th>
                    <th>Zona</th>
                    <th>Seção</th>
                    <th className="align-right">Total Eleitores</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedFeatures.length > 0 ? (
                    paginatedFeatures.map((f, idx) => (
                      <tr key={idx}>
                        <td className="bold">{f.properties.municipio}</td>
                        <td>{f.properties.bairro}</td>
                        <td>
                          <span className="micro-badge">{f.properties.microrregiao}</span>
                        </td>
                        <td>{f.properties.zonaEleitoral}</td>
                        <td>{f.properties.secaoEleitoral}</td>
                        <td className="align-right bold number-font">
                          {formatNumber(f.properties.totalEleitores)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="table-empty">
                        Nenhum registro encontrado para os filtros selecionados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Controles de Paginação */}
            {totalPages > 1 && (
              <div className="pagination-bar">
                <button
                  disabled={tablePage === 1}
                  onClick={() => setTablePage((prev) => prev - 1)}
                  className="pagination-btn"
                >
                  ⏮️ Anterior
                </button>
                <span className="pagination-info">
                  Página {tablePage} de {totalPages} ({filteredFeatures.length} resultados)
                </span>
                <button
                  disabled={tablePage === totalPages}
                  onClick={() => setTablePage((prev) => prev + 1)}
                  className="pagination-btn"
                >
                  Próxima ⏭️
                </button>
              </div>
            )}
          </div>
        )}

        {/* CONTEÚDO DA ABA: INSETS & METRICS */}
        {activeTab === 'metrics' && (
          <div className="tab-content metrics-tab-content">
            <div className="metrics-grid">
              {/* Card 1: Total Eleitores */}
              <div className="metric-card">
                <span className="card-icon">👥</span>
                <div className="card-body">
                  <h4>Total Eleitores Filtrados</h4>
                  <p className="card-value">{formatNumber(totalEleitoresFiltrados)}</p>
                </div>
              </div>

              {/* Card 2: Total Seções */}
              <div className="metric-card">
                <span className="card-icon">🏢</span>
                <div className="card-body">
                  <h4>Total de Seções Eleitorais</h4>
                  <p className="card-value">{filteredFeatures.length}</p>
                </div>
              </div>

              {/* Card 3: Média por Seção */}
              <div className="metric-card">
                <span className="card-icon">📈</span>
                <div className="card-body">
                  <h4>Média de Eleitores / Seção</h4>
                  <p className="card-value">
                    {filteredFeatures.length
                      ? formatNumber(Math.round(totalEleitoresFiltrados / filteredFeatures.length))
                      : 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="metrics-visuals">
              {/* Ranking dos maiores municípios */}
              <div className="visual-card">
                <h3>🏆 Top 5 Municípios com Mais Eleitores</h3>
                <p className="subtitle">Ranking dos municípios selecionados nos filtros ativos</p>
                <div className="ranking-list">
                  {rankingMunicipios.length > 0 ? (
                    rankingMunicipios.map((item, idx) => {
                      const maxVal = rankingMunicipios[0]?.total || 1;
                      const pct = (item.total / maxVal) * 100;
                      return (
                        <div key={item.municipio} className="ranking-row">
                          <span className="ranking-position">#{idx + 1}</span>
                          <div className="ranking-details">
                            <div className="ranking-header">
                              <span className="ranking-name">{item.municipio}</span>
                              <span className="ranking-total">{formatNumber(item.total)}</span>
                            </div>
                            <div className="ranking-bar-bg">
                              <div
                                className="ranking-bar-fill"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="empty-state">Sem dados disponíveis.</p>
                  )}
                </div>
              </div>

              {/* Distribuição por microrregião */}
              <div className="visual-card">
                <h3>📊 Distribuição de Eleitores por Microrregião</h3>
                <p className="subtitle">Breakdown proporcional por microrregião nos filtros ativos</p>
                <div className="breakdown-list">
                  {totalEleitoresFiltrados > 0 ? (
                    resumoPorMicrorregiao.map((item) => {
                      const pct = (item.totalEleitores / totalEleitoresFiltrados) * 100;
                      return (
                        <div key={item.microrregiao} className="breakdown-row">
                          <div className="breakdown-header">
                            <span className="breakdown-name">{item.microrregiao}</span>
                            <span className="breakdown-pct">{pct.toFixed(1)}%</span>
                          </div>
                          <div className="breakdown-bar-bg">
                            <div
                              className="breakdown-bar-fill"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className="breakdown-footer">
                            <span>{formatNumber(item.totalEleitores)} eleitores</span>
                            <span>{item.totalPontos} seções</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="empty-state">Sem dados disponíveis.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

