import fs from 'fs';
import path from 'path';

export interface VotacaoSecaoTseRecord {
  ANO_ELEICAO: number;
  CD_MUNICIPIO: number;
  NM_MUNICIPIO: string;
  NR_ZONA: number;
  NR_SECAO: number;
  CD_CARGO: number;
  DS_CARGO: string;
  NR_VOTAVEL: number;
  NM_VOTAVEL: string;
  QT_VOTOS: number;
  NR_LOCAL_VOTACAO: number;
  NM_LOCAL_VOTACAO: string;
  DS_LOCAL_VOTACAO_ENDERECO: string;
}

/**
 * Módulo Ingestor de Dados Abertos do TSE
 * Lê arquivos CSV de votação por seção e popula a base do sistema sem intervenção manual.
 * Colunas Oficiais TSE:
 * [2] ANO_ELEICAO, [13] CD_MUNICIPIO, [14] NM_MUNICIPIO, [15] NR_ZONA, [16] NR_SECAO,
 * [17] CD_CARGO, [18] DS_CARGO, [19] NR_VOTAVEL, [20] NM_VOTAVEL, [21] QT_VOTOS,
 * [22] NR_LOCAL_VOTACAO, [24] NM_LOCAL_VOTACAO, [25] DS_LOCAL_VOTACAO_ENDERECO
 */
export function processarCsvVotacaoTSE(filePath: string): VotacaoSecaoTseRecord[] {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Arquivo de Dados Abertos do TSE não encontrado em: ${filePath}`);
    return [];
  }

  const content = fs.readFileSync(filePath, 'latin1');
  const lines = content.split('\n');
  const records: VotacaoSecaoTseRecord[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const cols = line.split(';').map((c) => c.replace(/^"/, '').replace(/"$/, ''));

    if (cols.length >= 22) {
      records.push({
        ANO_ELEICAO: Number(cols[2]),
        CD_MUNICIPIO: Number(cols[13]),
        NM_MUNICIPIO: cols[14],
        NR_ZONA: Number(cols[15]),
        NR_SECAO: Number(cols[16]),
        CD_CARGO: Number(cols[17]),
        DS_CARGO: cols[18],
        NR_VOTAVEL: Number(cols[19]),
        NM_VOTAVEL: cols[20],
        QT_VOTOS: Number(cols[21]),
        NR_LOCAL_VOTACAO: Number(cols[22] || 0),
        NM_LOCAL_VOTACAO: cols[24] || '',
        DS_LOCAL_VOTACAO_ENDERECO: cols[25] || '',
      });
    }
  }

  console.log(`✅ Ingestão TSE concluída: ${records.length} registros processados de ${filePath}`);
  return records;
}
