/**
 * GeoVoto - Cliente de Integração com APIs Oficiais do TSE (DivulgaCandContas & Resultados Dados Abertos)
 * Berlim Co.
 */

export interface CandidatoOficialTSE {
  id: number;
  sq_candidato_tse: number;
  nome_urna: string;
  nome_completo: string;
  partido: string;
  numero: number;
  cargo: string;
  eleicao_id: number;
  situacao: string;
}

/**
 * Consulta a API REST oficial do DivulgaCandContas do TSE para obter a ficha oficial do candidato.
 * Exemplo de URL oficial:
 * https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2024/24570/2045202024/candidato/260002024139
 */
export async function consultarCandidatoDivulgaCandTSE(
  ano: number,
  codigoMunicipioTSE: string,
  codigoEleicaoTSE: string,
  sqCandidatoTSE: string
): Promise<any> {
  const url = `https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/${ano}/${codigoMunicipioTSE}/${codigoEleicaoTSE}/candidato/${sqCandidatoTSE}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'GeoVoto-TSE-Sync/1.0 (Berlim Co.)',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na consulta TSE DivulgaCand: Status HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`❌ Falha na integração com API TSE (DivulgaCandContas) para candidato ${sqCandidatoTSE}:`, error);
    throw error;
  }
}

/**
 * Validador de integridade e cruzamento dos dados recebidos do TSE/TRE-PE.
 */
export function validarIntegridadeDadosTSE(votosComputados: number, votosOficiaisTSE: number): boolean {
  if (votosComputados !== votosOficiaisTSE) {
    console.error(`⚠️ DIVERGÊNCIA DETECTADA COM O TSE/TRE-PE: Computado (${votosComputados}) vs Oficial (${votosOficiaisTSE})`);
    return false;
  }
  return true;
}
