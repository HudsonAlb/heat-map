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

import { useEffect, useState, useCallback, useRef } from 'react';
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

import type { EleitorFeatureCollection, ResumoResponse } from '../types/geojson';
import {
  PE_BOUNDS,
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

// ─── Componente ───────────────────────────────────────────────────────────────

export default function EleitoralHeatmap() {
  // Estado dos dados GeoJSON
  const [geojsonData, setGeojsonData] = useState<EleitorFeatureCollection | null>(null);
  const [resumo, setResumo] = useState<ResumoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado do mapa
  const [viewState, setViewState] = useState<ViewState>({
    latitude: PE_CENTER.latitude,
    longitude: PE_CENTER.longitude,
    zoom: PE_INITIAL_ZOOM,
  });
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [activeRegion, setActiveRegion] = useState<ViewpointKey>('Estado Completo');

  const mapRef = useRef<MapRef>(null);

  // ─── Fetch dos dados ────────────────────────────────────────────────────────

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch GeoJSON e resumo em paralelo
        const [geoRes, resumoRes] = await Promise.all([
          fetch('/api/eleitores/geojson', { signal: controller.signal }),
          fetch('/api/eleitores/resumo', { signal: controller.signal }),
        ]);

        if (!geoRes.ok) throw new Error(`Erro HTTP ${geoRes.status} ao buscar GeoJSON`);
        if (!resumoRes.ok) throw new Error(`Erro HTTP ${resumoRes.status} ao buscar resumo`);

        const geoData: EleitorFeatureCollection = await geoRes.json();
        const resumoData: ResumoResponse = await resumoRes.json();

        setGeojsonData(geoData);
        setResumo(resumoData);
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

  // ─── Handlers ───────────────────────────────────────────────────────────────

  /** Ao clicar no mapa, busca features próximas ao ponto clicado */
  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    // Busca features em um raio de 20px
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

  /** Navega para uma microrregião predefinida */
  const navigateToRegion = useCallback((key: ViewpointKey) => {
    const vp = VIEWPOINTS[key];
    setActiveRegion(key);
    setViewState({
      latitude: vp.latitude,
      longitude: vp.longitude,
      zoom: vp.zoom,
    });
    setPopupInfo(null);
  }, []);

  // ─── Formata números no padrão brasileiro ───────────────────────────────────

  const formatNumber = (n: number) =>
    n.toLocaleString('pt-BR');

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="heatmap-container">
      {/* ── Painel lateral com controles e resumo ──────────────────────────── */}
      <aside className="heatmap-sidebar">
        <div className="sidebar-section">
          <h3 className="sidebar-title">
            <span className="icon">📍</span>
            Regiões
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

        {resumo && (
          <div className="sidebar-section">
            <h3 className="sidebar-title">
              <span className="icon">📊</span>
              Resumo
            </h3>
            <div className="resumo-total">
              <span className="resumo-label">Total Geral</span>
              <span className="resumo-value">{formatNumber(resumo.totalGeral)}</span>
            </div>
            <div className="resumo-list">
              {resumo.porMicrorregiao.map((r) => (
                <div key={r.microrregiao} className="resumo-item">
                  <span className="resumo-micro-name">{r.microrregiao}</span>
                  <div className="resumo-micro-stats">
                    <span className="resumo-eleitores">{formatNumber(r.totalEleitores)}</span>
                    <span className="resumo-pontos">{r.totalPontos} pontos</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="sidebar-section sidebar-legend">
          <h3 className="sidebar-title">
            <span className="icon">🎨</span>
            Legenda
          </h3>
          <div className="legend-bar" />
          <div className="legend-labels">
            <span>Baixa</span>
            <span>Média</span>
            <span>Alta</span>
          </div>
        </div>
      </aside>

      {/* ── Área do mapa ──────────────────────────────────────────────────── */}
      <div className="heatmap-map-area">
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

        {/* Mapa MapLibre */}
        <Map
          ref={mapRef}
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          onClick={handleMapClick}
          mapStyle={MAP_STYLE_URL}
          maxBounds={PE_BOUNDS}
          minZoom={PE_MIN_ZOOM}
          maxZoom={PE_MAX_ZOOM}
          style={{ width: '100%', height: '100%' }}
          attributionControl={true}
        >
          {/* Controles de navegação */}
          <NavigationControl position="top-right" />
          <ScaleControl position="bottom-right" maxWidth={200} unit="metric" />

          {/* Camada de heatmap */}
          {geojsonData && (
            <Source id="eleitores" type="geojson" data={geojsonData}>
              <Layer {...heatmapLayerStyle} />
            </Source>
          )}

          {/* Popup informativo */}
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

        {/* Badge com zoom atual */}
        <div className="zoom-badge">
          Zoom: {viewState.zoom.toFixed(1)}
        </div>
      </div>
    </div>
  );
}
