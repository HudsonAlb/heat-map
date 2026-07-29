import fs from 'fs';
import path from 'path';

interface DetalheVotoTse {
  municipio: string;
  nr_votavel: number;
  qt_votos: number;
  zona: number;
  secao: number;
  bairro: string;
  localName: string;
}

const CANDIDATOS_NUMEROS = [40, 4040, 40180];

function normalizarNomeBairro(bairro: string): string {
  if (!bairro) return 'CENTRO';
  let clean = bairro.toUpperCase().trim();
  clean = clean.replace(/^\d+\s*(-\s*)?/, '');
  clean = clean.replace(/^S\/N\º?\s*(-\s*)?/, '');
  clean = clean.replace(/^S\.N\.\s*(-\s*)?/, '');
  clean = clean.replace(/^SN\s*(-\s*)?/, '');
  clean = clean.replace(/\/\s*PE$/, '');
  clean = clean.replace(/\/\s*RECIFE$/, '');
  clean = clean.trim();
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
    if (clean.length <= 3) return true;
    if (/^[0-9\s\.\,\-\/]+$/.test(clean)) return true;
    if (clean === 'S/N' || clean === 'SN' || clean === 'S.N.' || clean === 'SEM NUMERO') return true;
    if (clean.startsWith('BLOCO') || clean.startsWith('SALA') || clean.startsWith('PAVILHAO') || clean.startsWith('ANEXO') || clean.startsWith('TERREO')) return true;
    if (clean.startsWith('RUA ') || clean.startsWith('AV ') || clean.startsWith('AV. ') || clean.startsWith('AVENIDA ') || clean.startsWith('RODOVIA ') || clean.startsWith('ESTRADA ') || clean.startsWith('TRAVESSA ') || clean.startsWith('BR-') || clean.startsWith('PE-')) return true;
    if (clean.includes('RECIFE') || clean.includes('PE') || clean.includes('PERNAMBUCO') || clean.includes('BRASIL')) return true;
    if (/^(KM|N|N\.|NO|NUMERO)\s*\d+/.test(clean)) return true;
    return false;
  };

  let rawBairro = 'CENTRO';

  if (parts.length >= 2) {
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

function processarAno(ano: number): DetalheVotoTse[] {
  const csvPath = path.join(__dirname, `../../data_tse/${ano}/votacao_secao_${ano}_PE.csv`);
  if (!fs.existsSync(csvPath)) {
    console.error(`CSV não encontrado em: ${csvPath}`);
    return [];
  }

  console.log(`Lendo dados reais do TSE ${ano} em fluxo...`);
  const registros: DetalheVotoTse[] = [];
  const CHUNK_SIZE = 32 * 1024 * 1024;
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
      if (isFirstLine) { isFirstLine = false; continue; }
      if (!line || line.length < 20) continue;

      const cols = line.split(';');
      if (cols.length < 22) continue;

      const nrVotavelStr = cols[19]?.replace(/^"/, '').replace(/"$/, '').trim();
      const nrVotavel = Number(nrVotavelStr);
      if (!CANDIDATOS_NUMEROS.includes(nrVotavel)) continue;

      const municipio = cols[14]?.replace(/^"/, '').replace(/"$/, '').trim().toUpperCase();
      const qtVotos = Number(cols[21]?.replace(/^"/, '').replace(/"$/, '').trim() || '0');
      if (!municipio || qtVotos <= 0) continue;

      const zona = Number(cols[15]?.replace(/^"/, '').replace(/"$/, '').trim() || '0');
      const secao = Number(cols[16]?.replace(/^"/, '').replace(/"$/, '').trim() || '0');
      const localName = cols[24]?.replace(/^"/, '').replace(/"$/, '').trim() || '';
      const localAddr = cols[25]?.replace(/^"/, '').replace(/"$/, '').trim() || '';
      const bairro = cleanBairro(localAddr, localName);

      registros.push({
        municipio,
        nr_votavel: nrVotavel,
        qt_votos: qtVotos,
        zona,
        secao,
        bairro,
        localName
      });
    }
  }

  fs.closeSync(fd);
  console.log(`Finalizado ${ano}: ${registros.length} seções extraídas.`);
  return registros;
}

const dados2024 = processarAno(2024);
const dados2022 = processarAno(2022);

const outputTsPath = path.join(__dirname, 'tseRealSeedData.ts');
const fileContent = `/**
 * GeoVoto - Dados Oficiais Reais do TSE dos Candidatos da Campanha (2022 e 2024)
 * Gerado automaticamente para envio do repositório/produção sem dependência de CSVs de 800MB.
 */

export interface DetalheVotoTse {
  municipio: string;
  nr_votavel: number;
  qt_votos: number;
  zona: number;
  secao: number;
  bairro: string;
  localName: string;
}

export const REAL_TSE_DATA_2024: DetalheVotoTse[] = ${JSON.stringify(dados2024)};

export const REAL_TSE_DATA_2022: DetalheVotoTse[] = ${JSON.stringify(dados2022)};
`;

fs.writeFileSync(outputTsPath, fileContent, 'utf-8');
console.log(`✅ Arquivo estático gerado com sucesso em: ${outputTsPath}`);
