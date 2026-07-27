import React, { useState, useRef, useCallback, useMemo } from 'react';
import Map, {
  Source,
  Layer,
  NavigationControl,
  ScaleControl,
  Popup,
} from 'react-map-gl/maplibre';
import type { MapRef, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import type { HeatmapLayerSpecification, CircleLayerSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import type { TerritorioCalculado, ModoVisualizacao, Candidato, CamadaGeografica } from '../types/geovoto';
import {
  PE_CENTER,
  PE_INITIAL_ZOOM,
  PE_MIN_ZOOM,
  PE_MAX_ZOOM,
  MAP_STYLE_URL,
} from '../config/map';

interface DobradinhaMapProps {
  territorios: TerritorioCalculado[];
  candX: Candidato;
  candY?: Candidato;
  modo: ModoVisualizacao;
  camada: CamadaGeografica;
  onDrillDown?: (territorio: TerritorioCalculado) => void;
}

export const DobradinhaMap: React.FC<DobradinhaMapProps> = ({
  territorios,
  candX,
  candY,
  modo,
  camada,
  onDrillDown,
}) => {
  const [viewState, setViewState] = useState({
    latitude: PE_CENTER.latitude as number,
    longitude: PE_CENTER.longitude as number,
    zoom: PE_INITIAL_ZOOM,
  });

  const [selectedTerritorio, setSelectedTerritorio] = useState<TerritorioCalculado | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{
    x: number;
    y: number;
    territorio: TerritorioCalculado;
  } | null>(null);

  const mapRef = useRef<MapRef>(null);

  // Converte o array de territórios em FeatureCollection GeoJSON com pesos calibrados
  const geojsonData = useMemo(() => {
    return {
      type: 'FeatureCollection' as const,
      features: territorios.map((t) => {
        let rawVal = t.forca_dobradinha;
        if (modo === 'isolado_x') rawVal = t.aderencia_A;
        if (modo === 'isolado_y') rawVal = t.aderencia_B;
        if (modo === 'sobreposicao') rawVal = t.sobreposicao;
        if (modo === 'diferencial') rawVal = Math.abs(t.aderencia_A - t.aderencia_B);

        // Peso calibrado de 0.20 a 1.0 para manter blobs de alta densidade visíveis
        const weight = Math.min(Math.max(rawVal * 3.5, 0.2), 1.0);

        // Cor do indicador para o modo diferencial
        const ehDominoX = t.aderencia_A >= t.aderencia_B;
        const colorDiff = ehDominoX ? '#0941dc' : '#ef4444';

        return {
          type: 'Feature' as const,
          geometry: {
            type: 'Point' as const,
            coordinates: [t.longitude || -34.88, t.latitude || -8.05],
          },
          properties: {
            id: t.id,
            nome: t.nome,
            weight,
            votos_A: t.votos_A,
            votos_B: t.votos_B,
            forca: (t.forca_dobradinha * 100).toFixed(1),
            classificacao: t.classificacao,
            colorDiff,
            territorioRaw: JSON.stringify(t),
          },
        };
      }),
    };
  }, [territorios, modo]);

  // Rampa Térmica Contínua Oficial: Estritamente de Azul (#0941dc) até Vermelho (#ef4444)
  const heatmapColorRamp = useMemo(() => {
    return [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0, 'rgba(9, 65, 220, 0)',
      0.15, '#0941dc', // Azul Berlim (Mínimo)
      0.35, '#06b6d4', // Ciano
      0.55, '#10b981', // Verde Neon
      0.75, '#f59e0b', // Amarelo / Dourado
      1.0, '#ef4444',  // Vermelho Vivo (Máximo)
    ];
  }, []);

  // Camada Heatmap de Alta Densidade de Azul até Vermelho
  const heatmapLayerStyle: Omit<HeatmapLayerSpecification, 'source'> = {
    id: 'geovoto-heatmap',
    type: 'heatmap',
    paint: {
      'heatmap-weight': ['get', 'weight'],
      'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 4, 1.5, 7, 3.2, 11, 5.0],
      'heatmap-color': heatmapColorRamp as any,
      'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 4, 40, 7, 65, 10, 100, 14, 150],
      'heatmap-opacity': 0.92,
    },
  };

  // Camada de Pontos (Sutil no modo heatmap, visível no modo diferencial)
  const circleLayerStyle: Omit<CircleLayerSpecification, 'source'> = {
    id: 'geovoto-points',
    type: 'circle',
    paint: {
      'circle-radius': modo === 'diferencial'
        ? ['interpolate', ['linear'], ['zoom'], 5, 8, 14, 16]
        : 6,
      'circle-color': modo === 'diferencial' ? ['get', 'colorDiff'] : '#ffffff',
      'circle-stroke-width': modo === 'diferencial' ? 2 : 1,
      'circle-stroke-color': '#0941dc',
      'circle-opacity': modo === 'diferencial' ? 0.9 : 0.4,
    },
  };

  const handleMapClick = useCallback((event: MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const features = map.queryRenderedFeatures(event.point, {
      layers: ['geovoto-heatmap', 'geovoto-points'],
    });

    if (features && features.length > 0 && features[0].properties?.territorioRaw) {
      const t = JSON.parse(features[0].properties.territorioRaw) as TerritorioCalculado;
      setSelectedTerritorio(t);
    } else {
      setSelectedTerritorio(null);
    }
  }, []);

  // Flag de Hover (Tooltip ao passar o mouse sobre qualquer localidade)
  const handleMouseMove = useCallback((event: MapLayerMouseEvent) => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const features = map.queryRenderedFeatures(event.point, {
      layers: ['geovoto-heatmap', 'geovoto-points'],
    });

    if (features && features.length > 0 && features[0].properties?.territorioRaw) {
      const t = JSON.parse(features[0].properties.territorioRaw) as TerritorioCalculado;
      setHoverInfo({
        x: event.point.x,
        y: event.point.y,
        territorio: t,
      });
    } else {
      setHoverInfo(null);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoverInfo(null);
  }, []);

  // Rótulos e Titulo da Legenda Oficial (Estritamente Azul -> Vermelho)
  const legendTitle = useMemo(() => {
    switch (modo) {
      case 'isolado_x':
        return `🟦 Força Isolada — ${candX.nome_urna}`;
      case 'isolado_y':
        return `🟩 Força Isolada — ${candY?.nome_urna || 'Candidato B'}`;
      case 'sobreposicao':
        return '⚖️ Taxa de Sobreposição (Canibalização)';
      case 'diferencial':
        return `☯️ Diferencial A-B (${candX.nome_urna} vs ${candY?.nome_urna || 'B'})`;
      default:
        return '🔥 Força Somada da Parceria (A + B)';
    }
  }, [modo, candX, candY]);

  return (
    <div className="map-view-container" onMouseLeave={handleMouseLeave}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleMapClick}
        onMouseMove={handleMouseMove}
        mapStyle={MAP_STYLE_URL}
        minZoom={PE_MIN_ZOOM}
        maxZoom={PE_MAX_ZOOM}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-right" unit="metric" />

        <Source id="geovoto-source" type="geojson" data={geojsonData}>
          <Layer {...heatmapLayerStyle} />
          <Layer {...circleLayerStyle} />
        </Source>

        {selectedTerritorio && (
          <Popup
            longitude={selectedTerritorio.longitude || -34.88}
            latitude={selectedTerritorio.latitude || -8.05}
            closeOnClick={false}
            onClose={() => setSelectedTerritorio(null)}
            anchor="bottom"
            className="geovoto-map-popup"
          >
            <div className="popup-card">
              <div className="popup-card-header">
                <h4>{selectedTerritorio.nome}</h4>
                <span className="popup-camada-badge">{camada.toUpperCase()}</span>
              </div>

              <div className="popup-stats-grid">
                <div className="popup-stat-box">
                  <span className="stat-label">Eleitores Aptos:</span>
                  <strong className="stat-val">{selectedTerritorio.aptos.toLocaleString('pt-BR')}</strong>
                </div>

                <div className="popup-stat-box">
                  <span className="stat-label">Votos {candX.nome_urna}:</span>
                  <strong className="stat-val text-cand-x">
                    {selectedTerritorio.votos_A.toLocaleString('pt-BR')} ({ (selectedTerritorio.aderencia_A * 100).toFixed(1) }%)
                  </strong>
                </div>

                {candY && (
                  <div className="popup-stat-box">
                    <span className="stat-label">Votos {candY.nome_urna}:</span>
                    <strong className="stat-val text-cand-y">
                      {selectedTerritorio.votos_B.toLocaleString('pt-BR')} ({ (selectedTerritorio.aderencia_B * 100).toFixed(1) }%)
                    </strong>
                  </div>
                )}

                <div className="popup-stat-box">
                  <span className="stat-label">Força da Parceria:</span>
                  <strong className="stat-val text-soma">
                    {(selectedTerritorio.forca_dobradinha * 100).toFixed(1)}%
                  </strong>
                </div>
              </div>

              <div className="popup-card-footer">
                <span className="class-label">
                  Status: <strong>{selectedTerritorio.classificacao}</strong>
                </span>

                {onDrillDown && camada !== 'secao' && (
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => onDrillDown(selectedTerritorio)}
                  >
                    🔍 Detalhar por Bairro / Seção →
                  </button>
                )}
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* 🚩 FLAG FLUTUANTE DE VOTOS AO PASSAR O MOUSE (HOVER TOOLTIP) */}
      {hoverInfo && (
        <div
          className="map-hover-flag-tooltip"
          style={{ left: hoverInfo.x + 15, top: hoverInfo.y - 20 }}
        >
          <div className="hover-flag-header">
            <span className="hover-flag-icon">📍</span>
            <strong>{hoverInfo.territorio.nome}</strong>
            <span className="hover-flag-badge">{camada.toUpperCase()}</span>
          </div>
          <div className="hover-flag-body">
            <div className="hover-flag-row">
              <span>{candX.nome_urna}:</span>
              <strong className="text-cand-x">
                {hoverInfo.territorio.votos_A.toLocaleString('pt-BR')} votos
              </strong>
            </div>
            {candY && (
              <div className="hover-flag-row">
                <span>{candY.nome_urna}:</span>
                <strong className="text-cand-y">
                  {hoverInfo.territorio.votos_B.toLocaleString('pt-BR')} votos
                </strong>
              </div>
            )}
            <div className="hover-flag-row total-row">
              <span>Total Votos:</span>
              <strong className="text-soma">
                {(hoverInfo.territorio.votos_A + hoverInfo.territorio.votos_B).toLocaleString('pt-BR')} votos
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* LEGENDA DINÂMICA: ESTRITAMENTE DE AZUL ATÉ VERMELHO */}
      <div className="map-dynamic-legend-overlay">
        <div className="legend-title-row">
          <span>Modo Visual: <strong>{legendTitle}</strong></span>
        </div>
        <div className="legend-heat-bar-wrapper">
          <div className="legend-heat-bar"></div>
          <div className="legend-heat-labels">
            <span>🟦 Baixa (Azul)</span>
            <span>🟩 Média</span>
            <span>🟥 Alta (Vermelho)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
