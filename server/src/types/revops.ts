/**
 * B DASH / Dash de RevOps - Definições de Tipos do Backend
 * Berlim Co.
 */

export type FonteRevOps = 'crm' | 'outras_fontes';

export interface MetaAnual {
  ano: number;
  metaTotal: number;
  realizado: number;
  pctAtingido: number;
  projecaoAno: number;
}

export interface MetaQuarter {
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  meta: number;
  realizado: number;
  pctAtingido: number;
  status: 'CONCLUIDO' | 'EM_ANDAMENTO' | 'PLANEJADO';
}

export interface MetaMensal {
  mesNome: string;
  meta: number;
  realizado: number;
  projecao: number;
  pctAtingido: number;
}

export interface ResultadoCanalAquisicao {
  canal: string;
  icone: string;
  leads: number;
  oportunidades: number;
  vendas: number;
  receitaTotal: number;
  ticketMedio: number;
  cac: number;
  taxaConversao: number; // % Leads -> Vendas
}

export interface OportunidadePorCanal {
  canal: string;
  criadas: number;
  qualificadas: number;
  ganhas: number;
  taxaGanho: number; // % Qualificadas -> Ganhas
}

export interface RevOpsDashboardData {
  fonte: FonteRevOps;
  metas: {
    anual: MetaAnual;
    quarters: MetaQuarter[];
    mensal: MetaMensal;
  };
  canaisAquisicao: ResultadoCanalAquisicao[];
  oportunidadesGrafico: OportunidadePorCanal[];
  timestampAtualizacao: string;
}
