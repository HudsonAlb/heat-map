# 🗳️ Dashboard Eleitoral PE — Mapa de Calor

Dashboard eleitoral interativo com mapa de calor (heatmap) para visualização de densidade de eleitores no estado de **Pernambuco (UF 26)**, Brasil.

![Stack](https://img.shields.io/badge/React-TypeScript-blue?logo=react)
![Map](https://img.shields.io/badge/MapLibre-GL-green?logo=mapbox)
![Backend](https://img.shields.io/badge/Node.js-Express-black?logo=node.js)

## ✨ Funcionalidades

- 🗺️ Mapa interativo com MapLibre GL (100% open-source, sem API key)
- 🔥 Camada de heatmap com peso calibrado por total de eleitores
- 📍 Navegação rápida para microrregiões (RMR, Zona da Mata, Agreste, Sertão)
- 📊 Painel de resumo com estatísticas por região
- 🔒 Navegação travada nos limites geográficos de PE
- 🎨 Design premium dark theme com glassmorphism e micro-animações

## 🛠️ Stack

| Camada    | Tecnologia                          |
|-----------|-------------------------------------|
| Frontend  | React + TypeScript + Vite           |
| Mapa      | react-map-gl + maplibre-gl          |
| Estilo    | CartoDB Positron (open-source)      |
| Backend   | Node.js + Express + TypeScript      |
| Dados     | GeoJSON (FeatureCollection)         |

## 🚀 Como Executar

```bash
# Clone o repositório
git clone https://github.com/<seu-usuario>/heat-map.git
cd heat-map

# Backend (Terminal 1)
cd server
npm install
npm run dev    # → http://localhost:3001

# Frontend (Terminal 2)
cd client
npm install
npm run dev    # → http://localhost:5173
```

Acesse **http://localhost:5173** no navegador.

## 📡 API

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/eleitores/geojson` | GET | FeatureCollection completa |
| `/api/eleitores/geojson?microrregiao=Agreste` | GET | Filtrado por microrregião |
| `/api/eleitores/resumo` | GET | Totais agregados por região |
| `/api/health` | GET | Health check |

## 📐 Configurações Geográficas

- **Bounding Box:** `[[-41.5, -9.5], [-34.7, -7.3]]`
- **Centro:** Lat `-8.38`, Lng `-37.86` (Agreste)
- **Zoom Inicial:** `7.2`

## 📁 Estrutura

```
heat-map/
├── client/                # Frontend React + Vite + TS
│   ├── src/
│   │   ├── components/    # EleitoralHeatmap.tsx
│   │   ├── config/        # Constantes geográficas
│   │   └── types/         # Interfaces GeoJSON
│   └── vite.config.ts     # Proxy /api → backend
│
└── server/                # Backend Node.js + Express + TS
    └── src/
        ├── data/          # Dados mockados (~45 pontos)
        ├── routes/        # Endpoints da API
        └── types/         # Interfaces GeoJSON
```

## 📄 Licença

MIT
