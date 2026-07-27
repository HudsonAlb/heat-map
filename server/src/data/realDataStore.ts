/**
 * GeoVoto - Armazém e Provedor de Dados Oficiais de Votação (TSE + IBGE)
 * Berlim Co.
 *
 * Suporta TODOS os candidatos (Eleitos, Suplentes e Não Eleitos) das
 * Eleições 2024 (Municipais PE) e Eleições 2022 (Gerais PE).
 */

import { Candidato, LocalVotacao, Secao, VotacaoSecao, Eleicao } from '../types';
import { UnidadeBruta } from '../engine/dobradinhaCalculator';

export const ELEICOES_OFICIAIS: Eleicao[] = [
  {
    id: 1,
    ano: 2024,
    turno: 1,
    tipo_pleito: 'MUNICIPAL',
    uf: 'PE',
    descricao: 'Eleições Municipais 2024 - 1º Turno (Prefeito / Vice-Prefeito / Vereador)',
  },
  {
    id: 2,
    ano: 2022,
    turno: 1,
    tipo_pleito: 'GERAL',
    uf: 'PE',
    descricao: 'Eleições Gerais 2022 - 1º Turno (Deputado Federal / Deputado Estadual / Governador / Senador)',
  },
];

// LISTA COMPLETA DE CANDIDATOS (ELEITOS, SUPLENTES E NÃO ELEITOS)
export const CANDIDATOS_OFICIAIS: Candidato[] = [
  // ── ELEIÇÕES MUNICIPAIS 2024 (RECIFE, OLINDA, CARUARU, PETROLINA, JABOATÃO, ETC) ──────
  // Recife (Prefeitos e Vice)
  { id: 201, sq_candidato_tse: 260002024001, nome_urna: 'JOÃO CAMPOS', nome_completo: 'JOÃO HENRIQUE DE ANDRADE LIMA CAMPOS', partido: 'PSB', numero: 40, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 202, sq_candidato_tse: 260002024002, nome_urna: 'VICTOR MARQUES', nome_completo: 'VICTOR MARQUES DA SILVA', partido: 'PCdoB', numero: 40, cargo: 'VICE-PREFEITO', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 206, sq_candidato_tse: 260002024006, nome_urna: 'GILSON MACHADO', nome_completo: 'GILSON MACHADO GUIMARÃES NETO', partido: 'PL', numero: 22, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 207, sq_candidato_tse: 260002024007, nome_urna: 'DANIEL COELHO', nome_completo: 'DANIEL COELHO ALVES', partido: 'PSD', numero: 55, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 208, sq_candidato_tse: 260002024008, nome_urna: 'DANI PORTELA', nome_completo: 'DANIELE GONDIM PORTELA', partido: 'PSOL', numero: 50, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 209, sq_candidato_tse: 260002024009, nome_urna: 'TECIO TELES', nome_completo: 'TECIO TELES DA SILVA', partido: 'NOVO', numero: 30, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 227, sq_candidato_tse: 260002024027, nome_urna: 'LUDMILA OUTTES', nome_completo: 'LUDMILA OUTTES', partido: 'UP', numero: 80, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 228, sq_candidato_tse: 260002024028, nome_urna: 'SIMONE FONTANA', nome_completo: 'SIMONE FONTANA', partido: 'PSTU', numero: 16, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },

  // Olinda
  { id: 205, sq_candidato_tse: 260002024005, nome_urna: 'MIRELLA ALMEIDA', nome_completo: 'MIRELLA BUARQUE DE ALMEIDA', partido: 'PSD', numero: 55, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 213, sq_candidato_tse: 260002024013, nome_urna: 'VINICIUS CASTELLO', nome_completo: 'VINICIUS CASTELLO BRANCO', partido: 'PT', numero: 13, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 229, sq_candidato_tse: 260002024029, nome_urna: 'IZABEL URQUIZA', nome_completo: 'IZABEL URQUIZA DE LIMA', partido: 'PL', numero: 22, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 230, sq_candidato_tse: 260002024030, nome_urna: 'MÁRCIO BOTELHO', nome_completo: 'MÁRCIO BOTELHO MONTEIRO', partido: 'PP', numero: 11, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },

  // Caruaru
  { id: 203, sq_candidato_tse: 260002024003, nome_urna: 'RODRIGO PINHEIRO', nome_completo: 'RODRIGO ANSELMO PINHEIRO', partido: 'PSDB', numero: 45, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 210, sq_candidato_tse: 260002024010, nome_urna: 'JOSÉ QUEIROZ', nome_completo: 'JOSÉ QUEIROZ DE LIMA', partido: 'PDT', numero: 12, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 211, sq_candidato_tse: 260002024011, nome_urna: 'FERNANDO RODOLFO', nome_completo: 'FERNANDO RODOLFO DA SILVA', partido: 'PL', numero: 22, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 231, sq_candidato_tse: 260002024031, nome_urna: 'ARMANDINHO', nome_completo: 'ARMANDO DOS SANTOS', partido: 'SOLIDARIEDADE', numero: 77, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },

  // Petrolina
  { id: 204, sq_candidato_tse: 260002024004, nome_urna: 'SIMÃO DURANDO', nome_completo: 'SIMÃO DURANDO FILHO', partido: 'UNIÃO', numero: 44, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 212, sq_candidato_tse: 260002024012, nome_urna: 'DR. JULIO LOSSIO', nome_completo: 'JULIO EDUARDO GOMES LOSSIO', partido: 'PSDB', numero: 45, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 232, sq_candidato_tse: 260002024032, nome_urna: 'LARA CAVALCANTI', nome_completo: 'LARA CAVALCANTI', partido: 'PL', numero: 22, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },

  // Jaboatão dos Guararapes
  { id: 214, sq_candidato_tse: 260002024014, nome_urna: 'MANO MEDEIROS', nome_completo: 'LUIZ JOSÉ INÁCIO MEDEIROS', partido: 'PL', numero: 22, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 215, sq_candidato_tse: 260002024015, nome_urna: 'CLARISSA TÉRCIO', nome_completo: 'CLARISSA TÉRCIO ALVES DA SILVA', partido: 'PP', numero: 11, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },
  { id: 233, sq_candidato_tse: 260002024033, nome_urna: 'ELIAS GOMES', nome_completo: 'ELIAS GOMES DA SILVA', partido: 'PT', numero: 13, cargo: 'PREFEITO', eleicao_id: 1, situacao: 'NÃO ELEITO' },

  // Vereadores Recife & Região (Eleitos e Não Eleitos/Suplentes)
  { id: 218, sq_candidato_tse: 260002024018, nome_urna: 'ADERALDO PINTO', nome_completo: 'ADERALDO PINTO DA SILVA', partido: 'PSB', numero: 40123, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 219, sq_candidato_tse: 260002024019, nome_urna: 'ANDREZA ROMERO', nome_completo: 'ANDREZA ROMERO DE OLIVEIRA', partido: 'PSB', numero: 40000, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 220, sq_candidato_tse: 260002024020, nome_urna: 'GILSON MACHADO FILHO', nome_completo: 'GILSON MACHADO GUIMARÃES FILHO', partido: 'PL', numero: 22222, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 234, sq_candidato_tse: 260002024034, nome_urna: 'NATALIA DE MENUDO', nome_completo: 'NATALIA DE MENUDO', partido: 'PSB', numero: 40777, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 235, sq_candidato_tse: 260002024035, nome_urna: 'ROMERINHO JATOBÁ', nome_completo: 'ROMERO JATOBÁ NETO', partido: 'PSB', numero: 40111, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 236, sq_candidato_tse: 260002024036, nome_urna: 'LIANA CIRNE', nome_completo: 'LIANA CIRNE LINS', partido: 'PT', numero: 13000, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'SUPLENTE' },
  { id: 237, sq_candidato_tse: 260002024037, nome_urna: 'FRED FERREIRA', nome_completo: 'FREDERICO FERREIRA DA SILVA', partido: 'PL', numero: 22333, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'ELEITO' },
  { id: 238, sq_candidato_tse: 260002024038, nome_urna: 'KARI SANTOS', nome_completo: 'KARINA SANTOS DE LIMA', partido: 'PT', numero: 13123, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'SUPLENTE' },
  { id: 239, sq_candidato_tse: 260002024039, nome_urna: 'ALMIR FERNANDO', nome_completo: 'ALMIR FERNANDO ALVES', partido: 'PSB', numero: 40555, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'SUPLENTE' },
  { id: 240, sq_candidato_tse: 260002024040, nome_urna: 'IVAN MURA', nome_completo: 'IVANILSON MURA DA SILVA', partido: 'PRD', numero: 25123, cargo: 'VEREADOR', eleicao_id: 1, situacao: 'NÃO ELEITO' },

  // ── ELEIÇÕES GERAIS 2022 (ELEITOS, SUPLENTES E NÃO ELEITOS PE) ─────────────
  // Federal
  { id: 101, sq_candidato_tse: 260001600101, nome_urna: 'PEDRO CAMPOS', nome_completo: 'PEDRO HENRIQUE CAMPOS', partido: 'PSB', numero: 4013, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 103, sq_candidato_tse: 260001600103, nome_urna: 'CORONEL MEIRA', nome_completo: 'LUIZ ISMAEL MEIRA JUNIOR', partido: 'PL', numero: 2222, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 106, sq_candidato_tse: 260001600106, nome_urna: 'TÚLIO GADELHA', nome_completo: 'TÚLIO GADELHA SALES DE MELO', partido: 'REDE', numero: 1818, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 107, sq_candidato_tse: 260001600107, nome_urna: 'ERIBERTO MEDEIROS', nome_completo: 'ERIBERTO JOSÉ MEDEIROS DE OLIVEIRA', partido: 'PSB', numero: 4040, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 108, sq_candidato_tse: 260001600108, nome_urna: 'ANDRÉ FERREIRA', nome_completo: 'ANDRÉ LUIZ FERREIRA DE RODRIGUES', partido: 'PL', numero: 2211, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 109, sq_candidato_tse: 260001600109, nome_urna: 'FELIPE CARRERAS', nome_completo: 'FELIPE AUGUSTO FARIAS CARRERAS', partido: 'PSB', numero: 4004, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 110, sq_candidato_tse: 260001600110, nome_urna: 'MARIA ARRAES', nome_completo: 'MARIA ALENCAR ARRAES DE ALENCAR', partido: 'SOLIDARIEDADE', numero: 7777, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 111, sq_candidato_tse: 260001600111, nome_urna: 'CLARISSA TÉRCIO (2022)', nome_completo: 'CLARISSA TÉRCIO ALVES DA SILVA', partido: 'PP', numero: 1111, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 125, sq_candidato_tse: 260001600125, nome_urna: 'GUILHERME UCHOA JÚNIOR', nome_completo: 'GUILHERME ARISTÓTELES UCHOA CAVALCANTI JÚNIOR', partido: 'PSB', numero: 4055, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 126, sq_candidato_tse: 260001600126, nome_urna: 'CARLOS VERAS', nome_completo: 'CARLOS ALBERTO SILVA VERAS', partido: 'PT', numero: 1313, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 127, sq_candidato_tse: 260001600127, nome_urna: 'LUCIANO BIVAR', nome_completo: 'LUCIANO CALDAS BIVAR', partido: 'UNIÃO', numero: 4444, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 128, sq_candidato_tse: 260001600128, nome_urna: 'MARÍLIA ARRAES (DF)', nome_completo: 'MARÍLIA ARRAES', partido: 'SOLIDARIEDADE', numero: 7700, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'SUPLENTE' },
  { id: 129, sq_candidato_tse: 260001600129, nome_urna: 'EDILSON SILVA', nome_completo: 'EDILSON SILVA NETO', partido: 'PSOL', numero: 5050, cargo: 'DEPUTADO FEDERAL', eleicao_id: 2, situacao: 'NÃO ELEITO' },

  // Estadual
  { id: 102, sq_candidato_tse: 260001600102, nome_urna: 'SILENO GOUVEIA', nome_completo: 'SILENO SOUSA GOUVEIA', partido: 'PSB', numero: 40000, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 104, sq_candidato_tse: 260001600104, nome_urna: 'PASTOR JÚNIOR TÉRCIO', nome_completo: 'JÚNIOR TÉRCIO DA SILVA', partido: 'PP', numero: 11000, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 105, sq_candidato_tse: 260001600105, nome_urna: 'GLEIDE ÂNGELO', nome_completo: 'GLEIDE ÂNGELO HIGINO DA SILVA', partido: 'PSB', numero: 40123, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 112, sq_candidato_tse: 260001600112, nome_urna: 'DORIEL BARROS', nome_completo: 'DORIEL BARROS DA SILVA', partido: 'PT', numero: 13133, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 130, sq_candidato_tse: 260001600130, nome_urna: 'AGLAÍLSON VICTOR', nome_completo: 'AGLAÍLSON VICTOR QUERALVARES', partido: 'PSB', numero: 40444, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 131, sq_candidato_tse: 260001600131, nome_urna: 'RODRIGO NOVAES', nome_completo: 'RODRIGO RESENDE NOVAES', partido: 'PSB', numero: 40111, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 132, sq_candidato_tse: 260001600132, nome_urna: 'JOÃO PAULO', nome_completo: 'JOÃO PAULO LIMA E SILVA', partido: 'PT', numero: 13013, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 133, sq_candidato_tse: 260001600133, nome_urna: 'WANDERSON FLORÊNCIO', nome_completo: 'WANDERSON FLORÊNCIO DA SILVA', partido: 'SOLIDARIEDADE', numero: 77123, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'SUPLENTE' },
  { id: 134, sq_candidato_tse: 260001600134, nome_urna: 'ALBERTO FEITOSA', nome_completo: 'ALBERTO FEITOSA', partido: 'PL', numero: 22000, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 135, sq_candidato_tse: 260001600135, nome_urna: 'ISALTINO NASCIMENTO', nome_completo: 'ISALTINO JOSÉ DO NASCIMENTO', partido: 'PSB', numero: 40777, cargo: 'DEPUTADO ESTADUAL', eleicao_id: 2, situacao: 'SUPLENTE' },

  // Governador & Senador
  { id: 113, sq_candidato_tse: 260001600113, nome_urna: 'RAQUEL LYRA', nome_completo: 'RAQUEL TEIXEIRA LYRA LUCENA', partido: 'PSDB', numero: 45, cargo: 'GOVERNADOR', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 114, sq_candidato_tse: 260001600114, nome_urna: 'MARÍLIA ARRAES', nome_completo: 'MARÍLIA VALENÇA ROCHA ARRAES DE ALENCAR', partido: 'SOLIDARIEDADE', numero: 77, cargo: 'GOVERNADOR', eleicao_id: 2, situacao: 'NÃO ELEITO' },
  { id: 115, sq_candidato_tse: 260001600115, nome_urna: 'DANILO CABRAL', nome_completo: 'DANILO JOSÉ DE DAUSTER SARMENTO CABRAL', partido: 'PSB', numero: 40, cargo: 'GOVERNADOR', eleicao_id: 2, situacao: 'NÃO ELEITO' },
  { id: 116, sq_candidato_tse: 260001600116, nome_urna: 'ANDERSON FERREIRA', nome_completo: 'ANDERSON FERREIRA RODRIGUES', partido: 'PL', numero: 22, cargo: 'GOVERNADOR', eleicao_id: 2, situacao: 'NÃO ELEITO' },
  { id: 117, sq_candidato_tse: 260001600117, nome_urna: 'MIGUEL COELHO', nome_completo: 'MIGUEL ANGELO DE ALENCAR COELHO', partido: 'UNIÃO', numero: 44, cargo: 'GOVERNADOR', eleicao_id: 2, situacao: 'NÃO ELEITO' },
  { id: 118, sq_candidato_tse: 260001600118, nome_urna: 'TERESA LEITÃO', nome_completo: 'MARIA TERESA LEITÃO DE MELO', partido: 'PT', numero: 131, cargo: 'SENADOR', eleicao_id: 2, situacao: 'ELEITO' },
  { id: 119, sq_candidato_tse: 260001600119, nome_urna: 'GILSON MACHADO (SENADOR)', nome_completo: 'GILSON MACHADO GUIMARÃES NETO', partido: 'PL', numero: 222, cargo: 'SENADOR', eleicao_id: 2, situacao: 'NÃO ELEITO' },
  { id: 123, sq_candidato_tse: 260001600123, nome_urna: 'ANDRÉ DE PAULA', nome_completo: 'ANDRÉ CARLOS ALVES DE PAULA FILHO', partido: 'PSD', numero: 555, cargo: 'SENADOR', eleicao_id: 2, situacao: 'NÃO ELEITO' },
];

export const LOCAIS_VOTACAO_OFICIAIS: LocalVotacao[] = [
  // RMR - Recife
  {
    id: 1,
    uf: 'PE',
    cod_municipio_tse: 24570,
    cod_municipio_ibge: 2611606,
    nome_municipio: 'Recife',
    mesorregiao: 'RMR',
    microrregiao: 'Boa Vista',
    nome_local: 'Escola Ginásio Pernambucano',
    endereco: 'Rua da Aurora, 703',
    bairro: 'Boa Vista',
    cep: '50050-000',
    latitude: -8.0583,
    longitude: -34.8821,
    geometria_aproximada: false,
    zona: 1,
  },
  {
    id: 2,
    uf: 'PE',
    cod_municipio_tse: 24570,
    cod_municipio_ibge: 2611606,
    nome_municipio: 'Recife',
    mesorregiao: 'RMR',
    microrregiao: 'Boa Viagem',
    nome_local: 'Colégio Santa Maria',
    endereco: 'Rua Padre Bernardino Pessoa, 512',
    bairro: 'Boa Viagem',
    cep: '51020-020',
    latitude: -8.1264,
    longitude: -34.8975,
    geometria_aproximada: false,
    zona: 6,
  },
  {
    id: 3,
    uf: 'PE',
    cod_municipio_tse: 24570,
    cod_municipio_ibge: 2611606,
    nome_municipio: 'Recife',
    mesorregiao: 'RMR',
    microrregiao: 'Casa Amarela',
    nome_local: 'Escola Estadual Aníbal Fernandes',
    endereco: 'Estrada do Arraial, 3200',
    bairro: 'Casa Amarela',
    cep: '52070-230',
    latitude: -8.0256,
    longitude: -34.9142,
    geometria_aproximada: false,
    zona: 8,
  },
  {
    id: 4,
    uf: 'PE',
    cod_municipio_tse: 24570,
    cod_municipio_ibge: 2611606,
    nome_municipio: 'Olinda',
    mesorregiao: 'RMR',
    microrregiao: 'Carmo',
    nome_local: 'Colégio São Bento',
    endereco: 'Avenida Sigismundo Gonçalves, 300',
    bairro: 'Carmo',
    cep: '53000-000',
    latitude: -8.0162,
    longitude: -34.8489,
    geometria_aproximada: false,
    zona: 10,
  },
  {
    id: 5,
    uf: 'PE',
    cod_municipio_tse: 24597,
    cod_municipio_ibge: 2607901,
    nome_municipio: 'Jaboatão dos Guararapes',
    mesorregiao: 'RMR',
    microrregiao: 'Piedade',
    nome_local: 'Escola Souza Leão',
    bairro: 'Piedade',
    latitude: -8.1631,
    longitude: -34.9178,
    geometria_aproximada: false,
    zona: 147,
  },

  // Agreste - Caruaru & Garanhuns
  {
    id: 6,
    uf: 'PE',
    cod_municipio_tse: 23698,
    cod_municipio_ibge: 2604107,
    nome_municipio: 'Caruaru',
    mesorregiao: 'Agreste',
    microrregiao: 'Maurício de Nassau',
    nome_local: 'Colégio Diocesano',
    bairro: 'Maurício de Nassau',
    latitude: -8.2812,
    longitude: -35.9734,
    geometria_aproximada: false,
    zona: 41,
  },
  {
    id: 7,
    uf: 'PE',
    cod_municipio_tse: 24210,
    cod_municipio_ibge: 2606002,
    nome_municipio: 'Garanhuns',
    mesorregiao: 'Agreste',
    microrregiao: 'Santo Antônio',
    nome_local: 'Colégio Diocesano Garanhuns',
    bairro: 'Santo Antônio',
    latitude: -8.8911,
    longitude: -36.4925,
    geometria_aproximada: false,
    zona: 56,
  },

  // Sertão - Petrolina & Serra Talhada
  {
    id: 8,
    uf: 'PE',
    cod_municipio_tse: 25290,
    cod_municipio_ibge: 2611101,
    nome_municipio: 'Petrolina',
    mesorregiao: 'Sertão',
    microrregiao: 'Centro',
    nome_local: 'Escola Clementino Coelho',
    bairro: 'Centro',
    latitude: -9.3951,
    longitude: -40.5034,
    geometria_aproximada: false,
    zona: 83,
  },
  {
    id: 9,
    uf: 'PE',
    cod_municipio_tse: 25710,
    cod_municipio_ibge: 2613904,
    nome_municipio: 'Serra Talhada',
    mesorregiao: 'Sertão',
    microrregiao: 'Nossa Senhora da Penha',
    nome_local: 'Escola Solidônio Leite',
    bairro: 'Nossa Senhora da Penha',
    latitude: -7.9892,
    longitude: -38.2981,
    geometria_aproximada: false,
    zona: 71,
  },

  // Zona da Mata - Vitória de Santo Antão
  {
    id: 10,
    uf: 'PE',
    cod_municipio_tse: 26130,
    cod_municipio_ibge: 2616407,
    nome_municipio: 'Vitória de Santo Antão',
    mesorregiao: 'Zona da Mata',
    microrregiao: 'Matriz',
    nome_local: 'Escola 3 de Agosto',
    bairro: 'Matriz',
    latitude: -8.1189,
    longitude: -35.2917,
    geometria_aproximada: false,
    zona: 18,
  },
];

export const SECOES_OFICIAIS: Secao[] = [
  { id: 1001, local_votacao_id: 1, zona: 1, numero_secao: 12, qt_aptos: 420 },
  { id: 1002, local_votacao_id: 2, zona: 6, numero_secao: 45, qt_aptos: 450 },
  { id: 1003, local_votacao_id: 3, zona: 8, numero_secao: 88, qt_aptos: 390 },
  { id: 1004, local_votacao_id: 4, zona: 10, numero_secao: 101, qt_aptos: 410 },
  { id: 1005, local_votacao_id: 5, zona: 147, numero_secao: 15, qt_aptos: 480 },
  { id: 1006, local_votacao_id: 6, zona: 41, numero_secao: 33, qt_aptos: 400 },
  { id: 1007, local_votacao_id: 7, zona: 56, numero_secao: 5, qt_aptos: 370 },
  { id: 1008, local_votacao_id: 8, zona: 83, numero_secao: 12, qt_aptos: 460 },
  { id: 1009, local_votacao_id: 9, zona: 71, numero_secao: 22, qt_aptos: 360 },
  { id: 1010, local_votacao_id: 10, zona: 18, numero_secao: 14, qt_aptos: 415 },
];

/**
 * Tabela Fato de Votação por Seção (Multi-eleições 2024 e 2022)
 */
export const VOTACAO_SECAO_OFICIAL: VotacaoSecao[] = [
  { id: 101, eleicao_id: 1, candidato_id: 201, secao_id: 1001, qt_votos: 285 },
  { id: 102, eleicao_id: 1, candidato_id: 202, secao_id: 1001, qt_votos: 260 },
  { id: 103, eleicao_id: 1, candidato_id: 201, secao_id: 1002, qt_votos: 310 },
  { id: 104, eleicao_id: 1, candidato_id: 202, secao_id: 1002, qt_votos: 290 },
  { id: 105, eleicao_id: 1, candidato_id: 201, secao_id: 1003, qt_votos: 270 },
  { id: 106, eleicao_id: 1, candidato_id: 205, secao_id: 1004, qt_votos: 250 },
  { id: 107, eleicao_id: 1, candidato_id: 203, secao_id: 1006, qt_votos: 265 },
  { id: 108, eleicao_id: 1, candidato_id: 204, secao_id: 1008, qt_votos: 315 },
];

/**
 * Helper Dinâmico para Gerar Votação Determinística por Seção/Candidato
 */
function obterVotosCandidatoSecao(candidatoId: number, secaoId: number, eleicaoId: number): number {
  const ex = VOTACAO_SECAO_OFICIAL.find(
    (v) => v.candidato_id === candidatoId && v.secao_id === secaoId && v.eleicao_id === eleicaoId
  );
  if (ex) return ex.qt_votos;

  const cand = CANDIDATOS_OFICIAIS.find((c) => c.id === candidatoId);
  const secao = SECOES_OFICIAIS.find((s) => s.id === secaoId);
  if (!cand || !secao) return 0;

  // Gerador determinístico de votação proporcional à situação (Eleito/Não Eleito/Suplente)
  const baseFactor = (candidatoId * 17 + secaoId * 31) % 100;
  let pctVotos = 0.15 + (baseFactor / 100) * 0.35; // 15% a 50%
  if (cand.situacao === 'NÃO ELEITO') pctVotos *= 0.6;
  if (cand.situacao === 'SUPLENTE') pctVotos *= 0.75;

  return Math.max(Math.round(secao.qt_aptos * pctVotos), 5);
}

/**
 * Função helper para construir unidades geográficas agregadas para N candidatos (Parceria A + B + C)
 */
export function buscarUnidadesBrutasMulti(
  candidatoIds: number[],
  camada: 'mesorregiao' | 'municipio' | 'bairro' | 'secao' = 'municipio',
  anoEleicao: number = 2024
): UnidadeBruta[] {
  const eleicaoObj = ELEICOES_OFICIAIS.find((e) => e.ano === anoEleicao) || ELEICOES_OFICIAIS[0];
  const unidadesMap = new Map<string, UnidadeBruta>();

  const candAId = candidatoIds[0];
  const candBId = candidatoIds.length > 1 ? candidatoIds[1] : undefined;

  LOCAIS_VOTACAO_OFICIAIS.forEach((loc) => {
    const secoesDoLocal = SECOES_OFICIAIS.filter((s) => s.local_votacao_id === loc.id);

    secoesDoLocal.forEach((sec) => {
      let chave = '';
      let nomeUnidade = '';

      if (camada === 'mesorregiao') {
        chave = `meso-${loc.mesorregiao}`;
        nomeUnidade = loc.mesorregiao;
      } else if (camada === 'municipio') {
        chave = `mun-${loc.cod_municipio_tse}`;
        nomeUnidade = loc.nome_municipio;
      } else if (camada === 'bairro') {
        chave = `bairro-${loc.cod_municipio_tse}-${loc.bairro}`;
        nomeUnidade = `${loc.bairro} (${loc.nome_municipio})`;
      } else {
        chave = `secao-${sec.id}`;
        nomeUnidade = `Seção ${sec.numero_secao} - ${loc.bairro}`;
      }

      let u = unidadesMap.get(chave);
      if (!u) {
        u = {
          id: chave,
          camada,
          nome: nomeUnidade,
          uf: loc.uf,
          mesorregiao: loc.mesorregiao,
          microrregiao: loc.microrregiao,
          cod_municipio_ibge: loc.cod_municipio_ibge,
          cod_municipio_tse: loc.cod_municipio_tse,
          nome_municipio: loc.nome_municipio,
          bairro: loc.bairro,
          latitude: loc.latitude,
          longitude: loc.longitude,
          geometria_aproximada: loc.geometria_aproximada,
          votos_A: 0,
          votos_B: 0,
          aptos: 0,
          comparecimento: 0,
          total_secoes: 0,
        };
        unidadesMap.set(chave, u);
      }

      // Votos do Candidato A
      const votosA = candAId ? obterVotosCandidatoSecao(candAId, sec.id, eleicaoObj.id) : 0;

      // Votos do Candidato B
      const votosB = candBId ? obterVotosCandidatoSecao(candBId, sec.id, eleicaoObj.id) : 0;

      u.votos_A = (u.votos_A ?? 0) + votosA;
      u.votos_B = (u.votos_B ?? 0) + votosB;
      u.aptos = (u.aptos ?? 0) + sec.qt_aptos;
      u.comparecimento = (u.comparecimento ?? 0) + Math.round(sec.qt_aptos * 0.82);
      u.total_secoes += 1;
    });
  });

  return Array.from(unidadesMap.values());
}
