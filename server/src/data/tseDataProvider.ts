/**
 * GeoVoto — Provedor de Dados Oficiais do TSE via Streaming dos CSVs de Dados Abertos
 * Berlim Co.
 *
 * Suporta leitura em chunks dos CSVs do TSE e agregação em camadas:
 * Mesorregião, Município, Bairro e Seção.
 */

import fs from 'fs';
import path from 'path';
import { UnidadeBruta } from '../engine/dobradinhaCalculator';
import { CamadaGeografica } from '../types';
import { CANDIDATOS_OFICIAIS } from './realDataStore';
import { MUNICIPIOS_PE_GEO, MunicipioGeo } from './municipiosGeoMap';
import { REAL_TSE_DATA_2024, REAL_TSE_DATA_2022 } from './tseRealSeedData';

interface DetalheVotoTse {
  municipio: string;
  nr_votavel: number;
  qt_votos: number;
  zona: number;
  secao: number;
  bairro: string;
  localName: string;
}

// Cache global
let cacheVotos2024: Map<number, DetalheVotoTse[]> | null = null;
let cacheVotos2022: Map<number, DetalheVotoTse[]> | null = null;
let cacheMunicipios2024: Set<string> | null = null;
let cacheMunicipios2022: Set<string> | null = null;

interface CoordGeo {
  lat: number;
  lng: number;
}

const BAIRROS_GEO_MAP: Record<string, Record<string, CoordGeo>> = {
  'RECIFE': {
    'CENTRO': { lat: -8.054289, lng: -34.8813 },
    'BOA VIAGEM': { lat: -8.1256, lng: -34.9011 },
    'IBURA': { lat: -8.1172, lng: -34.9458 },
    'IBURA DE BAIXO': { lat: -8.1130, lng: -34.9390 },
    'MADALENA': { lat: -8.0538, lng: -34.9066 },
    'PINA': { lat: -8.0890, lng: -34.8870 },
    'IMBIRIBEIRA': { lat: -8.0989, lng: -34.9065 },
    'AFOGADOS': { lat: -8.0772, lng: -34.9080 },
    'CASA AMARELA': { lat: -8.0264, lng: -34.9022 },
    'VARZEA': { lat: -8.0642, lng: -34.9622 },
    'VÁRZEA': { lat: -8.0642, lng: -34.9622 },
    'IPUTINGA': { lat: -8.0416, lng: -34.9392 },
    'TORROES': { lat: -8.0631, lng: -34.9322 },
    'TORRÕES': { lat: -8.0631, lng: -34.9322 },
    'BONGI': { lat: -8.0682, lng: -34.9197 },
    'BRASILIA TEIMOSA': { lat: -8.0850, lng: -34.8800 },
    'BRASÍLIA TEIMOSA': { lat: -8.0850, lng: -34.8800 },
    'CORREGO DA AREIA': { lat: -8.0160, lng: -34.9100 },
    'CORREGO SÃO SEBASTIÃO': { lat: -8.0180, lng: -34.9040 },
    'UR1': { lat: -8.1320, lng: -34.9520 },
    'UR2': { lat: -8.1350, lng: -34.9530 },
    'UR3': { lat: -8.1380, lng: -34.9540 },
    'UR-5': { lat: -8.1400, lng: -34.9550 },
    'UR-10': { lat: -8.1440, lng: -34.9580 },
    'VILA DA SUDENE': { lat: -8.0720, lng: -34.9050 },
    'RODA DE FOGO': { lat: -8.0630, lng: -34.9420 },
    'SAN MARTIN': { lat: -8.0672, lng: -34.9290 },
    'COHAB': { lat: -8.1350, lng: -34.9580 },
    'ALTO DO MANDU': { lat: -8.0290, lng: -34.9130 },
    'JARDIM BEIRA RIO': { lat: -8.1090, lng: -34.8980 }
  },
  'CABO DE SANTO AGOSTINHO': {
    'CENTRO': { lat: -8.2882, lng: -35.0282 },
    'CHARNECA': { lat: -8.2830, lng: -35.0320 },
    'GAIBU': { lat: -8.3240, lng: -34.9510 },
    'PRAIA DE GAIBU': { lat: -8.3240, lng: -34.9510 },
    'PONTE DOS CARVALHOS': { lat: -8.2320, lng: -34.9810 }
  }
};

const LOCAIS_GEO_MAP: Record<string, CoordGeo> = {
  'COLEGIO SANTA MARIA': { lat: -8.1189, lng: -34.8986 },
  'FACULDADE BOA VIAGEM - FBV': { lat: -8.1172, lng: -34.9135 },
  'COLEGIO BOA VIAGEM': { lat: -8.1147, lng: -34.8953 },
  'ESCOLA DOM BOSCO': { lat: -8.0645, lng: -34.9179 },
  'ESCOLA PROFESSORA HELENA PUGÓ': { lat: -8.1256, lng: -34.9011 },
  'ESCOLA PROFESSOR ALFREDO FREYRE': { lat: -8.0261, lng: -34.8920 },
  'ESCOLA ESTADUAL PEDRO CELSO': { lat: -8.0163, lng: -34.9080 },
  'COLÉGIO ADVENTISTA DO ARRUDA': { lat: -8.0252, lng: -34.8914 },
  'INSTITUTO BLUE DE EDUCACAO E CULTURA - BLUE SCHOOL (CONECTA)': { lat: -8.0436, lng: -34.8989 },
  'UNINASSAU - UNIDADE BOA VIAGEM': { lat: -8.1132, lng: -34.8951 },
  'COLÉGIO SALESIANO SAGRADO CORAÇÃO': { lat: -8.0560, lng: -34.8967 },
  'CENTRO INTERESCOLAR SANTOS DUMONT': { lat: -8.1294, lng: -34.9013 },
  'COLÉGIO MOTIVO': { lat: -8.1250, lng: -34.9020 },
  'COLEGIO MARISTA SAO LUÍS': { lat: -8.0432, lng: -34.9010 },
  'UNIBRA': { lat: -8.0573, lng: -34.8878 },
  'COLEGIO VISAO': { lat: -8.0931, lng: -34.9298 },
  'ESCOLA AMERICANA DO RECIFE': { lat: -8.1345, lng: -34.9082 },
  'ESCOLA DIARIO DE PERNAMBUCO': { lat: -8.1235, lng: -34.9458 },
  'ESCOLA PROFESSOR JORDAO EMERENCIANO': { lat: -8.1245, lng: -34.9480 },
  'UNIVERSIDADE SALGADO DE OLIVEIRA - UNIVERSO': { lat: -8.1092, lng: -34.9069 },
  'COLÉGIO GGE (ANTIGO ATUAL I / FAPE)': { lat: -8.1180, lng: -34.8990 },
  'ESCOLA ESTADUAL BRIGADEIRO EDUARDO GOMES': { lat: -8.1275, lng: -34.9022 },
  'ESCOLA DOM SEBASTIAO LEME (POLIVALENTE)': { lat: -8.1172, lng: -34.9458 },
  'ESCOLA ESTADUAL JARBAS PERNAMBUCANO': { lat: -8.0321, lng: -34.8770 },
  'ESCOLA ESTADUAL ALVARO LINS': { lat: -8.0123, lng: -34.9230 },
  'INSTITUTO HELENA LUBIENSKA': { lat: -8.0441, lng: -34.9220 },
  'ESCOLA ANTONIO FARIAS FILHO': { lat: -8.0772, lng: -34.9240 },
  'COLEGIO SANTA CATARINA': { lat: -8.0243, lng: -34.9095 },
  'ESCOLA AMAURY DE MEDEIROS': { lat: -8.0765, lng: -34.9123 },
  'ESCOLA ESTADUAL SILVA JARDIM': { lat: -8.0312, lng: -34.9168 }
};

function normalizarNomeBairro(bairro: string): string {
  if (!bairro) return 'CENTRO';
  
  let clean = bairro.toUpperCase().trim();
  
  // Remove números e traços iniciais (ex: "512 BOA VIAGEM" -> "BOA VIAGEM", "2 IBURA" -> "IBURA")
  clean = clean.replace(/^\d+\s*(-\s*)?/, '');
  
  // Remove prefixos de sem número (ex: "S/N - UR-10" -> "UR-10")
  clean = clean.replace(/^S\/N\º?\s*(-\s*)?/, '');
  clean = clean.replace(/^S\.N\.\s*(-\s*)?/, '');
  clean = clean.replace(/^SN\s*(-\s*)?/, '');
  
  // Remove sufixo de estado/cidade
  clean = clean.replace(/\/\s*PE$/, '');
  clean = clean.replace(/\/\s*RECIFE$/, '');
  
  clean = clean.trim();
  
  // Se restar algo inválido ou curto demais, vira 'CENTRO'
  if (clean.length <= 2 || clean === 'PE' || clean === 'RECIFE' || /^[0-9\s\-\/\.]+$/.test(clean)) {
    return 'CENTRO';
  }
  
  return clean;
}

function cleanBairro(endereco: string, localName: string): string {
  if (!endereco) return 'CENTRO';
  const cleanAddr = endereco.toUpperCase().replace(/"/g, '').trim();
  const parts = cleanAddr.split('-').map((p) => p.trim());
  
  const isNoise = (s: string) => {
    if (!s) return true;
    const clean = s.toUpperCase().trim();
    if (clean.length <= 3) return true; // ex: "A", "B", "55", "12", "136"
    if (/^[0-9\s\.\,\-\/]+$/.test(clean)) return true; // apenas números e símbolos
    if (clean === 'S/N' || clean === 'SN' || clean === 'S.N.' || clean === 'SEM NUMERO') return true;
    if (clean.startsWith('BLOCO') || clean.startsWith('SALA') || clean.startsWith('PAVILHAO') || clean.startsWith('ANEXO') || clean.startsWith('TERREO')) return true;
    if (clean.startsWith('RUA ') || clean.startsWith('AV ') || clean.startsWith('AV. ') || clean.startsWith('AVENIDA ') || clean.startsWith('RODOVIA ') || clean.startsWith('ESTRADA ') || clean.startsWith('TRAVESSA ') || clean.startsWith('BR-') || clean.startsWith('PE-')) return true;
    if (clean.includes('RECIFE') || clean.includes('PE') || clean.includes('PERNAMBUCO') || clean.includes('BRASIL')) return true;
    if (/^(KM|N|N\.|NO|NUMERO)\s*\d+/.test(clean)) return true; // ex: KM 17, N 10, KM 8.8
    return false;
  };

  let rawBairro = 'CENTRO';

  if (parts.length >= 2) {
    // Procura de trás para frente ignorando a última parte (Cidade/UF)
    let found = false;
    for (let i = parts.length - 2; i >= 0; i--) {
      const part = parts[i];
      if (!isNoise(part)) {
        rawBairro = part;
        found = true;
        break;
      }
    }
    if (!found) {
      const last = parts[parts.length - 1];
      if (!isNoise(last)) rawBairro = last;
    }
  } else {
    // Tenta quebrar por vírgula
    const commaParts = cleanAddr.split(',').map((p) => p.trim());
    if (commaParts.length >= 2) {
      for (let i = commaParts.length - 1; i >= 0; i--) {
        const part = commaParts[i];
        if (!isNoise(part)) {
          rawBairro = part;
          break;
        }
      }
    }
  }

  return normalizarNomeBairro(rawBairro);
}

function getStringHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function carregarCacheMunicipioVotos(ano: number): Map<number, DetalheVotoTse[]> {
  const start = Date.now();
  const map = new Map<number, DetalheVotoTse[]>();
  const municipiosSet = new Set<string>();

  const csvPath = path.join(__dirname, `../../data_tse/${ano}/votacao_secao_${ano}_PE.csv`);
  if (!fs.existsSync(csvPath)) {
    console.log(`📦 Carregando dataset oficial dos candidatos (${ano}) via módulo TS...`);
    const seed = ano === 2024 ? REAL_TSE_DATA_2024 : REAL_TSE_DATA_2022;
    for (const record of seed) {
      municipiosSet.add(record.municipio);
      let list = map.get(record.nr_votavel);
      if (!list) {
        list = [];
        map.set(record.nr_votavel, list);
      }
      list.push(record);
    }
    if (ano === 2024) cacheMunicipios2024 = municipiosSet;
    else cacheMunicipios2022 = municipiosSet;
    console.log(`✅ TSE ${ano} (Dados embutidos): ${map.size} candidatos carregados de ${municipiosSet.size} municípios em ${((Date.now() - start) / 1000).toFixed(1)}s`);
    return map;
  }

  console.log(`📊 Carregando dados oficiais do TSE ${ano} de ${csvPath}...`);

  const CHUNK_SIZE = 64 * 1024 * 1024; // 64MB
  const fd = fs.openSync(csvPath, 'r');
  const stat = fs.statSync(csvPath);
  let position = 0;
  let leftover = '';
  let isFirstLine = true;

  while (position < stat.size) {
    const buf = Buffer.alloc(Math.min(CHUNK_SIZE, stat.size - position));
    const bytesRead = fs.readSync(fd, buf, 0, buf.length, position);
    position += bytesRead;

    const chunk = leftover + buf.toString('latin1', 0, bytesRead);
    const lines = chunk.split('\n');

    leftover = position < stat.size ? (lines.pop() || '') : '';

    for (const line of lines) {
      if (isFirstLine) { isFirstLine = false; continue; } // pular header
      if (!line || line.length < 20) continue;

      const cols = line.split(';');
      if (cols.length < 22) continue;

      const municipio = cols[14]?.replace(/^"/, '').replace(/"$/, '').trim().toUpperCase();
      const nrVotavelStr = cols[19]?.replace(/^"/, '').replace(/"$/, '').trim();
      const qtVotos = Number(cols[21]?.replace(/^"/, '').replace(/"$/, '').trim() || '0');

      if (!municipio || !nrVotavelStr || qtVotos <= 0) continue;

      const nrVotavel = Number(nrVotavelStr);
      if (isNaN(nrVotavel)) continue;

      // Filtro de candidatos de interesse (40, 4040, 40180)
      if (nrVotavel !== 40 && nrVotavel !== 4040 && nrVotavel !== 40180) continue;

      municipiosSet.add(municipio);

      const zona = Number(cols[15]?.replace(/^"/, '').replace(/"$/, '').trim() || '0');
      const secao = Number(cols[16]?.replace(/^"/, '').replace(/"$/, '').trim() || '0');
      const localName = cols[24]?.replace(/^"/, '').replace(/"$/, '').trim() || '';
      const localAddr = cols[25]?.replace(/^"/, '').replace(/"$/, '').trim() || '';
      const bairro = cleanBairro(localAddr, localName);

      const record: DetalheVotoTse = {
        municipio,
        nr_votavel: nrVotavel,
        qt_votos: qtVotos,
        zona,
        secao,
        bairro,
        localName,
      };

      let list = map.get(nrVotavel);
      if (!list) {
        list = [];
        map.set(nrVotavel, list);
      }
      list.push(record);
    }
  }

  fs.closeSync(fd);

  if (ano === 2024) {
    cacheMunicipios2024 = municipiosSet;
  } else {
    cacheMunicipios2022 = municipiosSet;
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`✅ TSE ${ano}: ${map.size} candidatos carregados de ${municipiosSet.size} municípios em ${elapsed}s`);
  return map;
}

function getCache(ano: number): Map<number, DetalheVotoTse[]> {
  if (ano === 2024) {
    if (!cacheVotos2024) {
      cacheVotos2024 = carregarCacheMunicipioVotos(2024);
    }
    return cacheVotos2024;
  } else {
    if (!cacheVotos2022) {
      cacheVotos2022 = carregarCacheMunicipioVotos(2022);
    }
    return cacheVotos2022;
  }
}

export function getMunicipios(ano: number): Set<string> {
  getCache(ano);
  return (ano === 2024 ? cacheMunicipios2024 : cacheMunicipios2022) || new Set();
}

function lookupGeo(municipioUpper: string): MunicipioGeo | null {
  const upper = municipioUpper.toUpperCase();
  const direct = MUNICIPIOS_PE_GEO[upper];
  if (direct) return direct;

  const normalized = upper
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z ]/g, '');
  for (const [key, val] of Object.entries(MUNICIPIOS_PE_GEO)) {
    const keyNorm = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z ]/g, '');
    if (keyNorm === normalized) return val;
  }
  return null;
}

function aggregateRecord(
  rec: DetalheVotoTse,
  candidatoLetra: 'A' | 'B',
  camada: CamadaGeografica,
  unidadesMap: Map<string, UnidadeBruta>,
  secoesPorChave: Map<string, Set<string>>
) {
  let chave = '';
  let nomeUnidade = '';

  const geo = lookupGeo(rec.municipio);
  const mesorregiao = geo?.mesorregiao || 'Outras';
  const nomeMunFormatado = geo?.nome || rec.municipio;

  if (camada === 'mesorregiao') {
    chave = `meso-${mesorregiao}`;
    nomeUnidade = mesorregiao;
  } else if (camada === 'municipio') {
    chave = `mun-${rec.municipio}`;
    nomeUnidade = nomeMunFormatado;
  } else if (camada === 'bairro') {
    chave = `bairro-${rec.municipio}-${rec.bairro}`;
    nomeUnidade = rec.bairro;
  } else if (camada === 'secao') {
    chave = `secao-${rec.municipio}-${rec.zona}-${rec.secao}`;
    nomeUnidade = `Seção ${rec.secao} (Zona ${rec.zona})`;
  }

  let u = unidadesMap.get(chave);
  if (!u) {
    u = {
      id: chave,
      camada,
      nome: nomeUnidade,
      uf: 'PE',
      mesorregiao,
      microrregiao: '',
      nome_municipio: nomeMunFormatado,
      bairro: rec.bairro,
      localName: rec.localName,
      votos_A: 0,
      votos_B: 0,
      aptos: 0,
      comparecimento: 0,
      total_secoes: 0,
    };
    unidadesMap.set(chave, u);
  }

  if (candidatoLetra === 'A') {
    u.votos_A = (u.votos_A ?? 0) + rec.qt_votos;
  } else {
    u.votos_B = (u.votos_B ?? 0) + rec.qt_votos;
  }

  let secoesSet = secoesPorChave.get(chave);
  if (!secoesSet) {
    secoesSet = new Set<string>();
    secoesPorChave.set(chave, secoesSet);
  }
  secoesSet.add(`${rec.zona}-${rec.secao}`);
}

export function buscarUnidadesBrutasMultiTSE(
  numerosCandidatoA: number[],
  numeroCandidatoB: number | undefined,
  camada: CamadaGeografica,
  anoEleicao: number,
  filtros?: {
    mesorregiao?: string;
    municipio?: string;
    bairro?: string;
  }
): {
  unidades: UnidadeBruta[];
  bairrosDisponiveis: string[];
} {
  const anosAVerificar = anoEleicao === 0 ? [2024, 2022] : [anoEleicao];
  const unidadesMap = new Map<string, UnidadeBruta>();
  const secoesPorChave = new Map<string, Set<string>>();
  const bairrosSet = new Set<string>();

  const nrA = numerosCandidatoA[0];
  const nrB = numeroCandidatoB;

  const candA = CANDIDATOS_OFICIAIS.find((c) => c.numero === nrA);
  const candB = nrB ? CANDIDATOS_OFICIAIS.find((c) => c.numero === nrB) : undefined;

  function normalizeString(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z0-9 ]/gi, '')
      .trim()
      .toUpperCase();
  }

  for (const ano of anosAVerificar) {
    const cache = getCache(ano);
    
    // Votos do candidato A
    const listA = cache.get(nrA) || [];
    const matchesAnoA = candA ? (candA.eleicao_id === (ano === 2024 ? 1 : 2)) : false;
    
    if (matchesAnoA && candA) {
      for (const rec of listA) {
        if (candA.municipio) {
          if (normalizeString(rec.municipio) !== normalizeString(candA.municipio)) continue;
        }

        // Filtro de Mesorregião
        if (filtros?.mesorregiao && filtros.mesorregiao !== 'Todas') {
          const geo = lookupGeo(rec.municipio);
          const meso = geo?.mesorregiao || 'Outras';
          if (normalizeString(meso) !== normalizeString(filtros.mesorregiao)) continue;
        }

        // Filtro de Município
        if (filtros?.municipio && filtros.municipio !== 'Todos') {
          if (normalizeString(rec.municipio) !== normalizeString(filtros.municipio)) continue;
        }

        // Coleta bairros para dropdown dinâmico
        if (rec.bairro) {
          bairrosSet.add(rec.bairro);
        }

        // Filtro de Bairro
        if (filtros?.bairro && filtros.bairro !== 'Todos') {
          if (normalizeString(rec.bairro) !== normalizeString(filtros.bairro)) continue;
        }

        aggregateRecord(rec, 'A', camada, unidadesMap, secoesPorChave);
      }
    }

    // Votos do candidato B
    if (nrB) {
      const listB = cache.get(nrB) || [];
      const matchesAnoB = candB ? (candB.eleicao_id === (ano === 2024 ? 1 : 2)) : false;
      
      if (matchesAnoB && candB) {
        for (const rec of listB) {
          if (candB.municipio) {
            if (normalizeString(rec.municipio) !== normalizeString(candB.municipio)) continue;
          }

          // Filtro de Mesorregião
          if (filtros?.mesorregiao && filtros.mesorregiao !== 'Todas') {
            const geo = lookupGeo(rec.municipio);
            const meso = geo?.mesorregiao || 'Outras';
            if (normalizeString(meso) !== normalizeString(filtros.mesorregiao)) continue;
          }

          // Filtro de Município
          if (filtros?.municipio && filtros.municipio !== 'Todos') {
            if (normalizeString(rec.municipio) !== normalizeString(filtros.municipio)) continue;
          }

          // Coleta bairros para dropdown dinâmico
          if (rec.bairro) {
            bairrosSet.add(rec.bairro);
          }

          // Filtro de Bairro
          if (filtros?.bairro && filtros.bairro !== 'Todos') {
            if (normalizeString(rec.bairro) !== normalizeString(filtros.bairro)) continue;
          }

          aggregateRecord(rec, 'B', camada, unidadesMap, secoesPorChave);
        }
      }
    }
  }

  // Preenche dados padrão nas unidades de agregação
  for (const [chave, u] of unidadesMap.entries()) {
    const geo = lookupGeo(u.nome_municipio!);
    const mesorregiao = geo?.mesorregiao || 'Outras';
    u.mesorregiao = mesorregiao;
    
    const baseLat = geo?.lat || -8.05;
    const baseLng = geo?.lng || -34.88;

    const secoesSet = secoesPorChave.get(chave);
    u.total_secoes = secoesSet ? secoesSet.size : 0;
    u.aptos = u.total_secoes * 350;
    u.comparecimento = u.total_secoes * 280;

    if (camada === 'mesorregiao') {
      u.latitude = baseLat;
      u.longitude = baseLng;
    } else if (camada === 'municipio') {
      u.latitude = baseLat;
      u.longitude = baseLng;
    } else if (camada === 'bairro') {
      const normalizedMun = normalizeString(u.nome_municipio || '');
      const normalizedBairro = u.bairro ? u.bairro.toUpperCase().trim() : '';
      const exactBairroGeo = BAIRROS_GEO_MAP[normalizedMun]?.[normalizedBairro];

      if (exactBairroGeo) {
        u.latitude = exactBairroGeo.lat;
        u.longitude = exactBairroGeo.lng;
      } else {
        const hash = getStringHash(u.bairro || '');
        u.latitude = baseLat + ((hash % 100) - 50) * 0.0003;
        u.longitude = baseLng + ((hash % 100) - 50) * 0.0003;
      }
    } else if (camada === 'secao') {
      const normalizedLocalName = u.localName ? u.localName.toUpperCase().trim() : '';
      const exactLocalGeo = LOCAIS_GEO_MAP[normalizedLocalName];

      const normalizedMun = normalizeString(u.nome_municipio || '');
      const normalizedBairro = u.bairro ? u.bairro.toUpperCase().trim() : '';
      const exactBairroGeo = BAIRROS_GEO_MAP[normalizedMun]?.[normalizedBairro];
      
      const refLat = exactLocalGeo?.lat || exactBairroGeo?.lat || baseLat;
      const refLng = exactLocalGeo?.lng || exactBairroGeo?.lng || baseLng;

      const hash = getStringHash((u.bairro || '') + u.id);
      const offsetScale = exactLocalGeo ? 0.0001 : 0.0006;
      u.latitude = refLat + ((hash % 100) - 50) * offsetScale;
      u.longitude = refLng + ((hash % 100) - 50) * offsetScale;
    }
  }

  return {
    unidades: Array.from(unidadesMap.values()),
    bairrosDisponiveis: Array.from(bairrosSet).sort((a, b) => a.localeCompare(b, 'pt-BR')),
  };
}
