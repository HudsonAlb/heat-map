export type CamadaGeografica = 'mesorregiao' | 'municipio' | 'bairro' | 'secao';
export type ModoVisualizacao = 'soma' | 'isolado_x' | 'isolado_y' | 'diferencial' | 'sobreposicao';
export type FiltroAnoEleicao = '2024' | '2022' | 'comparativo';

export interface Candidato {
  id: number;
  nome_urna: string;
  nome_completo?: string;
  numero: number;
  partido: string;
  cargo: string;
  foto_url?: string;
  municipio?: string;
  uf?: string;
}

export interface SecaoEleitoral {
  id: number;
  codigo_secao: number;
  zona_eleitoral: number;
  local_votacao: string;
  endereco: string;
  latitude: number;
  longitude: number;
  bairro: string;
  municipio: string;
  mesorregiao: 'RMR' | 'Mata' | 'Agreste' | 'Sertão';
  aptos: number;
}

export interface VotoSecao {
  secao_id: number;
  candidato_id: number;
  ano_eleicao: number;
  quantidade_votos: number;
}

export interface TerritorioCalculado {
  id: number;
  nome: string;
  nome_municipio?: string;
  camada: CamadaGeografica;
  mesorregiao: string;
  bairro?: string;
  localName?: string;
  latitude?: number;
  longitude?: number;
  geometria_aproximada: boolean;
  aptos: number;
  votos_A: number;
  votos_B: number;
  aderencia_A: number;
  aderencia_B: number;
  forca_dobradinha: number;
  sobreposicao: number;
  complementaridade: number;
  classificacao: 'FORÇA' | 'OPORTUNIDADE' | 'RISCO' | 'NEUTRO';
}

export interface ResultadoComparacao {
  territorios: TerritorioCalculado[];
  bairrosDisponiveis?: string[];
  resumoGeral: {
    totalEleitores: number;
    totalSecoes: number;
    mediaEleitoresPorSecao: number;
    totalVotosX: number;
    totalVotosY: number;
    totalVotosDobradinha: number;
  };
  rankings: {
    maiorComplementaridade: TerritorioCalculado[];
    maiorCanibalizacao: TerritorioCalculado[];
    maiorForcaDobradinha: TerritorioCalculado[];
  };
  aiInsights?: {
    resumoExecutivo: string;
    diagnosticoMesorregioes: {
      mesorregiao: string;
      desempenho: string;
      status: string;
      diretriz: string;
    }[];
    insightsDetalhados: {
      categoria: string;
      prioridade: 'ALTA' | 'MÉDIA' | 'BAIXA';
      titulo: string;
      descricao: string;
      acaoRecomendada: string;
    }[];
    timestampGeracao: string;
  };
}

export interface DobradinhaFavorita {
  id: string | number;
  nome?: string;
  nome_chapa?: string;
  candidato_x_id?: number;
  candidato_y_id?: number;
  candidato_a_id?: number;
  candidato_b_id?: number;
  candidatoA?: Candidato;
  candidatoB?: Candidato;
  candidato_A?: Candidato;
  candidato_B?: Candidato;
  criado_por?: string;
  criado_em?: string;
  data_criacao?: string;
}

export type DobradinhaSalva = DobradinhaFavorita;

export interface UsuarioRBAC {
  id: number;
  nome: string;
  email: string;
  papel: string;
  candidato_id_padrao?: number;
  foto_url?: string;
  dados_limpos?: boolean;
  escopo_geografico: {
    uf: string;
    mesorregioes?: string[];
    municipios?: string[];
  };
}

export interface ChatbotResponse {
  texto: string;
  dados: unknown[];
  fonte: {
    eleicao_referencia: string;
    camada: string;
    filtros: string;
    data_atualizacao: string;
  };
  deep_link: {
    candXId: number;
    candYId: number;
    camada: CamadaGeografica;
    microrregiao?: string;
    municipio?: string;
    bairro?: string;
    modo: ModoVisualizacao;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  citation?: {
    dataset: string;
    periodo: string;
    totalRegistrosAnalisados: number;
  };
  deepLink?: ChatbotResponse['deep_link'];
}

export type ModoOrdenacaoDados =
  | 'forca'
  | 'aptos'
  | 'votos_a'
  | 'votos_b'
  | 'alfabetica';

