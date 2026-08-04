/**
 * GeoVoto - Definições de Tipos e Entidades do Domínio
 * Berlim Co.
 */

// ─── Hierarquia Geográfica ───────────────────────────────────────────────────
export type CamadaGeografica = 'mesorregiao' | 'municipio' | 'bairro' | 'secao';

export interface EscopoGeografico {
  uf: string;
  mesorregioes?: string[];
  municipios?: string[];
  bairros?: string[];
}

// ─── Entidades de Banco de Dados ──────────────────────────────────────────────
export interface Eleicao {
  id: number;
  ano: number;
  turno: number;
  tipo_pleito: 'GERAL' | 'MUNICIPAL';
  uf: string;
  descricao?: string;
}

export interface Candidato {
  id: number;
  sq_candidato_tse: number;
  nome_urna: string;
  nome_completo: string;
  cpf_hash?: string;
  partido: string;
  numero: number;
  cargo: 'DEPUTADO ESTADUAL' | 'DEPUTADO FEDERAL' | 'GOVERNADOR' | 'SENADOR' | 'PREFEITO' | 'VICE-PREFEITO' | 'VEREADOR';
  eleicao_id: number;
  situacao: string;
  municipio?: string;
  uf?: string;
  criado_em?: string;
}

export interface LocalVotacao {
  id: number;
  uf: string;
  cod_municipio_tse: number;
  cod_municipio_ibge: number;
  nome_municipio: string;
  mesorregiao: string;
  microrregiao: string;
  nome_local: string;
  endereco?: string;
  bairro: string;
  cep?: string;
  latitude: number;
  longitude: number;
  geometria_aproximada: boolean;
  zona: number;
}

export interface Secao {
  id: number;
  local_votacao_id: number;
  zona: number;
  numero_secao: number;
  qt_aptos: number;
}

export interface VotacaoSecao {
  id: number;
  eleicao_id: number;
  candidato_id: number;
  secao_id: number;
  qt_votos: number;
}

export interface DobradinhaSalva {
  id: number;
  nome: string;
  candidato_a_id: number;
  candidato_b_id: number;
  eleicao_referencia_id: number;
  criado_por: string;
  criado_em: string;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  papel: 'responsavel_campanha' | 'coordenador_geral' | 'coordenador_regional' | 'gestor_midia' | 'gestao_master';
  escopo_geografico: EscopoGeografico;
  campanha_id?: number;
  dados_limpos?: boolean;
  ativo: boolean;
}

// ─── Motor de Cálculo de Dobradinha ──────────────────────────────────────────
export type ClassificacaoTerritorio = 'FORÇA' | 'OPORTUNIDADE' | 'RISCO' | 'NEUTRO';

export interface TerritorioCalculado {
  id: string;
  camada: CamadaGeografica;
  nome: string;
  uf: string;
  mesorregiao: string;
  microrregiao: string;
  cod_municipio_ibge?: number;
  cod_municipio_tse?: number;
  nome_municipio?: string;
  bairro?: string;
  latitude?: number;
  longitude?: number;
  geometria_aproximada?: boolean;

  votos_A: number;
  votos_B: number;
  aptos: number;
  comparecimento: number;
  total_secoes: number;

  aderencia_A: number;
  aderencia_B: number;
  forca_dobradinha: number;
  sobreposicao: number;
  complementaridade: number;
  peso_absoluto: number;

  classificacao: ClassificacaoTerritorio;
  eleicao_referencia: string;
  data_atualizacao: string;
  tem_dados_nulos: boolean;
  sem_comparabilidade_historica?: boolean;
}

// ─── Modos de Visualização Comparativa ───────────────────────────────────────
export type ModoVisualizacao =
  | 'isolado_x'
  | 'isolado_y'
  | 'soma'
  | 'diferencial'
  | 'sobreposicao';

// ─── Chatbot Intent Schema ───────────────────────────────────────────────────
export type ChatbotIntencao =
  | 'comparar_candidatos'
  | 'ranking_territorios'
  | 'detalhe_territorio'
  | 'serie_historica'
  | 'resumo_metricas'
  | 'voto_candidato_isolado'
  | 'voto_regiao_geral';

export interface ChatbotIntent {
  intencao: ChatbotIntencao;
  candidatos: number[];
  recorte: {
    camada: CamadaGeografica;
    uf: string;
    mesorregiao?: string;
    municipios?: string[];
    bairros?: string[];
  };
  eleicao: {
    ano: number;
    turno?: number;
    cargo?: string;
  };
  metrica?: 'forca' | 'aderencia' | 'votos_absolutos' | 'classificacao' | 'complementaridade';
  ordenacao?: 'asc' | 'desc';
  limite?: number;
}

export interface ChatbotResponse {
  texto: string;
  intent: ChatbotIntent;
  dados: unknown[];
  fonte: {
    eleicao_referencia: string;
    camada: string;
    filtros: string;
    data_atualizacao: string;
  };
  deep_link?: {
    candXId: number;
    candYId: number;
    camada: CamadaGeografica;
    microrregiao?: string;
    municipio?: string;
    bairro?: string;
    modo: ModoVisualizacao;
  };
}
