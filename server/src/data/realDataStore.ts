/**
 * GeoVoto - Armazém e Provedor de Dados Oficiais de Votação (TSE + IBGE)
 * Berlim Co.
 *
 * Cadastro dos candidatos de interesse direto da campanha.
 */

import { Candidato, Eleicao } from '../types';

export const ELEICOES_OFICIAIS: Eleicao[] = [
  {
    id: 1,
    ano: 2024,
    turno: 1,
    tipo_pleito: 'MUNICIPAL',
    uf: 'PE',
    descricao: 'Eleições Municipais 2024 - 1º Turno (Prefeito / Vereador)',
  },
  {
    id: 2,
    ano: 2022,
    turno: 1,
    tipo_pleito: 'GERAL',
    uf: 'PE',
    descricao: 'Eleições Gerais 2022 - 1º Turno (Deputado Federal / Deputado Estadual / Governador / Senador)',
  },
  {
    id: 3,
    ano: 2020,
    turno: 1,
    tipo_pleito: 'MUNICIPAL',
    uf: 'PE',
    descricao: 'Eleições Municipais 2020 - 1º Turno (Prefeito / Vereador)',
  },
  {
    id: 4,
    ano: 2018,
    turno: 1,
    tipo_pleito: 'GERAL',
    uf: 'PE',
    descricao: 'Eleições Gerais 2018 - 1º Turno (Deputado Federal / Deputado Estadual / Governador / Senador)',
  },
];

// LISTA DE CANDIDATOS DE INTERESSE DA CAMPANHA
export const CANDIDATOS_OFICIAIS: Candidato[] = [
  // João Campos - Prefeito de Recife (2024)
  {
    id: 201,
    sq_candidato_tse: 260002024001,
    nome_urna: 'JOÃO CAMPOS',
    nome_completo: 'JOÃO HENRIQUE DE ANDRADE LIMA CAMPOS',
    partido: 'PSB',
    numero: 40,
    cargo: 'PREFEITO',
    eleicao_id: 1,
    situacao: 'ELEITO',
    municipio: 'Recife'
  },
  // Pedro Campos - Deputado Federal (2022)
  {
    id: 101,
    sq_candidato_tse: 260001600101,
    nome_urna: 'PEDRO CAMPOS',
    nome_completo: 'PEDRO HENRIQUE CAMPOS',
    partido: 'PSB',
    numero: 4040,
    cargo: 'DEPUTADO FEDERAL',
    eleicao_id: 2,
    situacao: 'ELEITO'
  },
  // Ste Vilela - Vereadora de Recife (2024)
  {
    id: 139,
    sq_candidato_tse: 260002024139,
    nome_urna: 'STE VILELA',
    nome_completo: 'STERPHANIE VILELA',
    partido: 'PSB',
    numero: 40180,
    cargo: 'VEREADOR',
    eleicao_id: 1,
    situacao: 'SUPLENTE',
    municipio: 'Recife'
  },
  // Marília Arraes - Governadora PE (2022) / Prefeita (2020) / Deputada Federal (2018)
  {
    id: 777,
    sq_candidato_tse: 260001600777,
    nome_urna: 'MARÍLIA ARRAES',
    nome_completo: 'MARÍLIA VALENÇA ROCHA ARRAES DE ALENCAR',
    partido: 'SOLIDARIEDADE',
    numero: 77,
    cargo: 'GOVERNADOR',
    eleicao_id: 2,
    situacao: 'SEGUNDO TURNO',
    uf: 'PE'
  },
  {
    id: 778,
    sq_candidato_tse: 260001600778,
    nome_urna: 'MARÍLIA ARRAES',
    nome_completo: 'MARÍLIA VALENÇA ROCHA ARRAES DE ALENCAR',
    partido: 'PT',
    numero: 13,
    cargo: 'PREFEITO',
    eleicao_id: 3,
    situacao: 'SEGUNDO TURNO',
    municipio: 'Recife'
  },
  {
    id: 779,
    sq_candidato_tse: 260001600779,
    nome_urna: 'MARÍLIA ARRAES',
    nome_completo: 'MARÍLIA VALENÇA ROCHA ARRAES DE ALENCAR',
    partido: 'PT',
    numero: 1313,
    cargo: 'DEPUTADO FEDERAL',
    eleicao_id: 4,
    situacao: 'ELEITO',
    uf: 'PE'
  }
];
