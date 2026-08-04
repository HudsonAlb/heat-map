export interface ResultadoMunicipalBerlim {
  mesorregiao: string;
  municipio: string;
  eleitores: number;
  prefeito_eleito: string;
  votos_1lugar: number;
  segundo_lugar?: string;
  votos_2lugar?: number;
  terceiro_lugar?: string;
  votos_3lugar?: number;
}

export const DADOS_BERLIM_GESTAO: ResultadoMunicipalBerlim[] = [
  // ── AGRESTE CENTRAL ────────────────────────────────────────────────────────
  { mesorregiao: 'Agreste Central', municipio: 'AGRESTINA', eleitores: 20510, prefeito_eleito: 'JOSUÉ MENDES', votos_1lugar: 10517, segundo_lugar: 'THIAGO NUNES', votos_2lugar: 6592 },
  { mesorregiao: 'Agreste Central', municipio: 'ALAGOINHA', eleitores: 11802, prefeito_eleito: 'SIMÃOZINHO', votos_1lugar: 6950, segundo_lugar: 'MAURÍLIO ALMEIDA', votos_2lugar: 2578, terceiro_lugar: 'FRANCISCO LUMBA', votos_3lugar: 210 },
  { mesorregiao: 'Agreste Central', municipio: 'ALTINHO', eleitores: 16895, prefeito_eleito: 'MARIVALDO PENA', votos_1lugar: 6860, segundo_lugar: 'SEGUNDINHO DR ISRAEL', votos_2lugar: 6223, terceiro_lugar: 'ALLYSON OLIVEIRA', votos_3lugar: 902 },
  { mesorregiao: 'Agreste Central', municipio: 'BARRA DE GUABIRABA', eleitores: 10069, prefeito_eleito: 'DIOGO CARLOS', votos_1lugar: 5504, segundo_lugar: 'VALDINHO', votos_2lugar: 2822 },
  { mesorregiao: 'Agreste Central', municipio: 'BELO JARDIM', eleitores: 59076, prefeito_eleito: 'GILVANDRO ESTRELA', votos_1lugar: 33126, segundo_lugar: 'DR. MANECO', votos_2lugar: 10857, terceiro_lugar: 'JULIÃO JÚNIOR', votos_3lugar: 1587 },
  { mesorregiao: 'Agreste Central', municipio: 'BEZERROS', eleitores: 47110, prefeito_eleito: 'LUCIELLE LAURENTINO', votos_1lugar: 27959, segundo_lugar: 'VAQUEIRO NETO', votos_2lugar: 9422, terceiro_lugar: 'ERINALDO GRÁFICA', votos_3lugar: 517 },
  { mesorregiao: 'Agreste Central', municipio: 'BONITO', eleitores: 30295, prefeito_eleito: 'DR. RUY', votos_1lugar: 12332, segundo_lugar: 'SOM MONTEIRO', votos_2lugar: 10048, terceiro_lugar: 'ADEMIR', votos_3lugar: 2202 },
  { mesorregiao: 'Agreste Central', municipio: 'BREJO DA MADRE DE DEUS', eleitores: 35590, prefeito_eleito: 'ROBERTO ASFORA', votos_1lugar: 14964, segundo_lugar: 'JOSEVALDO COWBOY', votos_2lugar: 11220, terceiro_lugar: 'LUCIANA TORRES', votos_3lugar: 263 },
  { mesorregiao: 'Agreste Central', municipio: 'CACHOEIRINHA', eleitores: 15940, prefeito_eleito: 'ANDRÉ RAIMUNDO', votos_1lugar: 8016, segundo_lugar: 'LÉO DE DELINO', votos_2lugar: 5237 },
  { mesorregiao: 'Agreste Central', municipio: 'CAMOCIM DE SÃO FELIX', eleitores: 15239, prefeito_eleito: 'SOSTENES PONTES', votos_1lugar: 7949, segundo_lugar: 'MAILDE DE TETÉ', votos_2lugar: 4397 },
  { mesorregiao: 'Agreste Central', municipio: 'CARUARU', eleitores: 243631, prefeito_eleito: 'RODRIGO PINHEIRO', votos_1lugar: 102198, segundo_lugar: 'ZÉ QUEIROZ', votos_2lugar: 66253, terceiro_lugar: 'FERNANDO RODOLFO', votos_3lugar: 17326 },
  { mesorregiao: 'Agreste Central', municipio: 'CUPIRA', eleitores: 19296, prefeito_eleito: 'EDUARDO LIRA', votos_1lugar: 9185, segundo_lugar: 'RAMON', votos_2lugar: 5555, terceiro_lugar: 'BENA JUNIOR', votos_3lugar: 206 },
  { mesorregiao: 'Agreste Central', municipio: 'GRAVATÁ', eleitores: 65932, prefeito_eleito: 'PADRE JOSELITO SILVA', votos_1lugar: 32888, segundo_lugar: 'JOAQUIM NETO', votos_2lugar: 11275, terceiro_lugar: 'BRUNO SALES', votos_3lugar: 5898 },
  { mesorregiao: 'Agreste Central', municipio: 'IBIRAJUBA', eleitores: 6795, prefeito_eleito: 'MARIA IZALTA GAMA', votos_1lugar: 3083, segundo_lugar: 'CELSO ONOFRE', votos_2lugar: 2595 },
  { mesorregiao: 'Agreste Central', municipio: 'JATAÚBA', eleitores: 15188, prefeito_eleito: 'DRA CÁTIA', votos_1lugar: 7322, segundo_lugar: 'ANTONIO DE ROQUE', votos_2lugar: 3936, terceiro_lugar: 'MAMÃO', votos_3lugar: 845 },
  { mesorregiao: 'Agreste Central', municipio: 'LAGOA DOS GATOS', eleitores: 11017, prefeito_eleito: 'STÊNIO FERNANDES', votos_1lugar: 7637, segundo_lugar: 'LUCIMAR DA SAÚDE', votos_2lugar: 1621 },
  { mesorregiao: 'Agreste Central', municipio: 'PANELAS', eleitores: 19317, prefeito_eleito: 'RUBEN BARBOSA', votos_1lugar: 13068, segundo_lugar: 'PIERRE LOGAN', votos_2lugar: 2325 },
  { mesorregiao: 'Agreste Central', municipio: 'PESQUEIRA', eleitores: 51000, prefeito_eleito: 'CACIQUE MARCOS', votos_1lugar: 19613, segundo_lugar: 'ROSSINE', votos_2lugar: 18731 },
  { mesorregiao: 'Agreste Central', municipio: 'POÇÃO', eleitores: 9927, prefeito_eleito: 'GUILHERME VASCONCELOS', votos_1lugar: 5977, segundo_lugar: 'WRIDES MENDES', votos_2lugar: 1269 },
  { mesorregiao: 'Agreste Central', municipio: 'POMBOS', eleitores: 20065, prefeito_eleito: 'ELIAS MEU FI', votos_1lugar: 7316, segundo_lugar: 'ROGÉRIO BORGES', votos_2lugar: 5271, terceiro_lugar: 'ROMERO QUERALVES', votos_3lugar: 4057 },
  { mesorregiao: 'Agreste Central', municipio: 'RIACHO DAS ALMAS', eleitores: 20708, prefeito_eleito: 'DIÓ FILHO', votos_1lugar: 10823, segundo_lugar: 'ALBERES', votos_2lugar: 7491 },
  { mesorregiao: 'Agreste Central', municipio: 'SAIRÉ', eleitores: 11204, prefeito_eleito: 'GILDO DIAS', votos_1lugar: 6766, segundo_lugar: 'OZÉIAS DO SINDICATO', votos_2lugar: 2109 },
  { mesorregiao: 'Agreste Central', municipio: 'SANHARÓ', eleitores: 15960, prefeito_eleito: 'CÉSAR FREITAS', votos_1lugar: 9264, segundo_lugar: 'DUDU DE BETA', votos_2lugar: 3185 },
  { mesorregiao: 'Agreste Central', municipio: 'SÃO BENTO DO UNA', eleitores: 36572, prefeito_eleito: 'ALEXANDRÉ BATITÉ', votos_1lugar: 16297, segundo_lugar: 'ZÉ ALMEIDA', votos_2lugar: 12247 },
  { mesorregiao: 'Agreste Central', municipio: 'SÃO CAITANO', eleitores: 30313, prefeito_eleito: 'JOSAFÁ LIMA', votos_1lugar: 22155, segundo_lugar: 'MAKOY', votos_2lugar: 2153 },
  { mesorregiao: 'Agreste Central', municipio: 'SÃO JOAQUIM DO MONTE', eleitores: 17267, prefeito_eleito: 'DUGUINHA', votos_1lugar: 11524, segundo_lugar: 'MARCOS MARIANO', votos_2lugar: 1852 },
  { mesorregiao: 'Agreste Central', municipio: 'TACAIMBÓ', eleitores: 10691, prefeito_eleito: 'JOELDA PEREIRA', votos_1lugar: 4740, segundo_lugar: 'VAL LOURENÇO', votos_2lugar: 4290 },

  // ── AGRESTE MERIDIONAL ─────────────────────────────────────────────────────
  { mesorregiao: 'Agreste Meridional', municipio: 'ÁGUAS BELAS', eleitores: 33626, prefeito_eleito: 'DR. ELTON MARTINS', votos_1lugar: 12768, segundo_lugar: 'MAURÍCIO JOSUÉ', votos_2lugar: 12218 },
  { mesorregiao: 'Agreste Meridional', municipio: 'ANGELIM', eleitores: 9076, prefeito_eleito: 'CAIQUE O GALEGUINHO', votos_1lugar: 4156, segundo_lugar: 'MARQUINHO CALADO', votos_2lugar: 3593 },
  { mesorregiao: 'Agreste Meridional', municipio: 'BOM CONSELHO', eleitores: 33141, prefeito_eleito: 'DR. EDEZIO', votos_1lugar: 13258, segundo_lugar: 'DANNIEL GODOY', votos_2lugar: 12545, terceiro_lugar: 'CEL ALEXANDRE BILICA', votos_3lugar: 267 },
  { mesorregiao: 'Agreste Meridional', municipio: 'BREJÃO', eleitores: 9648, prefeito_eleito: 'SAULO MARUIM', votos_1lugar: 4275, segundo_lugar: 'LENA CADENGUE', votos_2lugar: 3940, terceiro_lugar: 'JÂNIO MORAES', votos_3lugar: 71 },
  { mesorregiao: 'Agreste Meridional', municipio: 'BUÍQUE', eleitores: 40550, prefeito_eleito: 'TÚLIO MONTEIRO', votos_1lugar: 16044, segundo_lugar: 'JOBSON CAMELO', votos_2lugar: 13062 },
  { mesorregiao: 'Agreste Meridional', municipio: 'CAETÉS', eleitores: 19653, prefeito_eleito: 'TIRIRI', votos_1lugar: 9777, segundo_lugar: 'GUILHERME FERNANDO', votos_2lugar: 4579 },
  { mesorregiao: 'Agreste Meridional', municipio: 'CALÇADO', eleitores: 7721, prefeito_eleito: 'ZÉ ELIAS MACENA', votos_1lugar: 4244, segundo_lugar: 'JÚNIOR CAETANO', votos_2lugar: 2478 },
  { mesorregiao: 'Agreste Meridional', municipio: 'CANHOTINHO', eleitores: 16723, prefeito_eleito: 'SANDRA PAES', votos_1lugar: 10548, segundo_lugar: 'MARCÍLIO ALBUQUERQUE', votos_2lugar: 2225 },
  { mesorregiao: 'Agreste Meridional', municipio: 'CAPOEIRAS', eleitores: 15931, prefeito_eleito: 'NEGO DO MERCADO', votos_1lugar: 9233, segundo_lugar: 'NATALIA COSTA', votos_2lugar: 2734 },
  { mesorregiao: 'Agreste Meridional', municipio: 'CORRENTES', eleitores: 14473, prefeito_eleito: 'EDMILSON DA BAHIA', votos_1lugar: 5722, segundo_lugar: 'DR. ROMÃO', votos_2lugar: 5484 },
  { mesorregiao: 'Agreste Meridional', municipio: 'GARANHUNS', eleitores: 95711, prefeito_eleito: 'SIVALDO ALBINO', votos_1lugar: 49838, segundo_lugar: 'IZAÍAS REGIS', votos_2lugar: 15944, terceiro_lugar: 'GERSINHO FILHO', votos_3lugar: 4046 },
  { mesorregiao: 'Agreste Meridional', municipio: 'IATI', eleitores: 15861, prefeito_eleito: 'CAMILA SOUZA', votos_1lugar: 6346, segundo_lugar: 'MARIA AUGUSTA', votos_2lugar: 5372, terceiro_lugar: 'FABRÍCIO FERNANDES', votos_3lugar: 60 },
  { mesorregiao: 'Agreste Meridional', municipio: 'ITAÍBA', eleitores: 20344, prefeito_eleito: 'PEDRO PILOTA', votos_1lugar: 8292, segundo_lugar: 'ROGÉRIA MARTINS', votos_2lugar: 7420, terceiro_lugar: 'VALDO DO PIPA', votos_3lugar: 655 },
  { mesorregiao: 'Agreste Meridional', municipio: 'JUCATI', eleitores: 10014, prefeito_eleito: 'CLELSON PEIXOTO', votos_1lugar: 6278, segundo_lugar: 'JOSEMAR', votos_2lugar: 1636 },
  { mesorregiao: 'Agreste Meridional', municipio: 'JUPI', eleitores: 12688, prefeito_eleito: 'RIVANDA TEIXEIRA', votos_1lugar: 6589, segundo_lugar: 'CELINA BRITO', votos_2lugar: 3920 },
  { mesorregiao: 'Agreste Meridional', municipio: 'JUREMA', eleitores: 12111, prefeito_eleito: 'BRANCO DE GERALDO', votos_1lugar: 5661, segundo_lugar: 'LÉO RAMOS', votos_2lugar: 4161 },
  { mesorregiao: 'Agreste Meridional', municipio: 'LAGOA DO OURO', eleitores: 11337, prefeito_eleito: 'EDSON QUEBRA SANTO', votos_1lugar: 5465, segundo_lugar: 'JUNIOR PAULINO', votos_2lugar: 3538 },
  { mesorregiao: 'Agreste Meridional', municipio: 'LAJEDO', eleitores: 31160, prefeito_eleito: 'ERIVALDO CHAGAS', votos_1lugar: 16559, segundo_lugar: 'ANTONIO JOÃO', votos_2lugar: 9574, terceiro_lugar: 'NILTINHO VICENTE', votos_3lugar: 196 },
  { mesorregiao: 'Agreste Meridional', municipio: 'PALMERINA', eleitores: 6308, prefeito_eleito: 'DELEGADA THATIANNE LIMA', votos_1lugar: 2635, segundo_lugar: 'JOSEMIR', votos_2lugar: 1915, terceiro_lugar: 'EUDSON CATÃO', votos_3lugar: 19 },
  { mesorregiao: 'Agreste Meridional', municipio: 'PARANATAMA', eleitores: 11630, prefeito_eleito: 'DR. HENRIQUE GOIS', votos_1lugar: 5036, segundo_lugar: 'LUCIANO BRITO', votos_2lugar: 4674 },
  { mesorregiao: 'Agreste Meridional', municipio: 'PEDRA', eleitores: 18094, prefeito_eleito: 'JUNIOR VAZ', votos_1lugar: 9555, segundo_lugar: 'FRANCISCO BRAZ', votos_2lugar: 5004, terceiro_lugar: 'SEBASTIÃO QUINO', votos_3lugar: 69 },
  { mesorregiao: 'Agreste Meridional', municipio: 'SALOÁ', eleitores: 13300, prefeito_eleito: 'JÚNIOR DE RIVALDO', votos_1lugar: 6872, segundo_lugar: 'WELLINGTON FREITAS', votos_2lugar: 1985 },
  { mesorregiao: 'Agreste Meridional', municipio: 'SÃO JOÃO', eleitores: 17633, prefeito_eleito: 'WILSON LIMA', votos_1lugar: 9011, segundo_lugar: 'GENALDI ZUMBA', votos_2lugar: 5497 },
  { mesorregiao: 'Agreste Meridional', municipio: 'TEREZINHA', eleitores: 6477, prefeito_eleito: 'ARNOBIO GOMES', votos_1lugar: 2748, segundo_lugar: 'PROF ADRIANO', votos_2lugar: 2663 },
  { mesorregiao: 'Agreste Meridional', municipio: 'TUPANATINGA', eleitores: 16313, prefeito_eleito: 'PROF RONALDO', votos_1lugar: 5596, segundo_lugar: 'VALMIR ROQUE', votos_2lugar: 4722, terceiro_lugar: 'DR. DIEGO', votos_3lugar: 2974 },
  { mesorregiao: 'Agreste Meridional', municipio: 'VENTUROSA', eleitores: 14539, prefeito_eleito: 'KELVIN CAVALCANTI', votos_1lugar: 6642, segundo_lugar: 'ADRIANNO DO POSTO', votos_2lugar: 5848, terceiro_lugar: 'ERNANDES FARMACIA', votos_3lugar: 304 },

  // ── AGRESTE SETENTRIONAL ───────────────────────────────────────────────────
  { mesorregiao: 'Agreste Setentrional', municipio: 'BOM JARDIM', eleitores: 29866, prefeito_eleito: 'JANJÃO', votos_1lugar: 13659, segundo_lugar: 'VÂNIA DE MIGUEL', votos_2lugar: 9949 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'CASINHAS', eleitores: 11784, prefeito_eleito: 'LÚCIO SILVA', votos_1lugar: 6364, segundo_lugar: 'BRUNO CAMELO', votos_2lugar: 3068 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'CUMARU', eleitores: 14081, prefeito_eleito: 'ZENEIDE MEDEIROS', votos_1lugar: 6645, segundo_lugar: 'NADJANE PEIXOTO', votos_2lugar: 5183 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'FEIRA NOVA', eleitores: 17515, prefeito_eleito: 'JOEL GONZAGA', votos_1lugar: 8462, segundo_lugar: 'BRUNO CHAVES', votos_2lugar: 6079 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'FREI MIGUELINHO', eleitores: 12587, prefeito_eleito: 'LINDONALDO DA FARINHA', votos_1lugar: 5781, segundo_lugar: 'LUIZA DE LULA', votos_2lugar: 4769, terceiro_lugar: 'ANICETO LIMA', votos_3lugar: 944 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'JOÃO ALFREDO', eleitores: 24283, prefeito_eleito: 'ZÉ MARTINS', votos_1lugar: 13145, segundo_lugar: 'VANIA DE OIM', votos_2lugar: 6613 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'LIMOEIRO', eleitores: 44484, prefeito_eleito: 'ORLANDO JORGE LIMA', votos_1lugar: 24898, segundo_lugar: 'DANIEL MERCADINHO', votos_2lugar: 10292, terceiro_lugar: 'ISAAC DO ONIBUS', votos_3lugar: 348 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'MACHADOS', eleitores: 10828, prefeito_eleito: 'JUAREZ DA BANANA', votos_1lugar: 3955, segundo_lugar: 'GUSTAVO PLÁCIDO', votos_2lugar: 3460, terceiro_lugar: 'ARGEMIRO PIMENTEL', votos_3lugar: 1695 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'OROBÓ', eleitores: 17868, prefeito_eleito: 'BIU ABREU', votos_1lugar: 7965, segundo_lugar: 'THOMAS BRITO', votos_2lugar: 6502 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'PASSIRA', eleitores: 25886, prefeito_eleito: 'SEVERINO SILVESTRE', votos_1lugar: 12704, segundo_lugar: 'KARLA MAÍSA', votos_2lugar: 6700, terceiro_lugar: 'JOÃO CABEÇÃO', votos_3lugar: 1212 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'SALGADINHO', eleitores: 7058, prefeito_eleito: 'JOIA', votos_1lugar: 4380, segundo_lugar: 'DR RONALDO', votos_2lugar: 1559 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'SANTA CRUZ CAPIBARIBE', eleitores: 63009, prefeito_eleito: 'HELIO ARAGÃO', votos_1lugar: 36318, segundo_lugar: 'ALESSANDRA VIEIRA', votos_2lugar: 11692, terceiro_lugar: 'ROBSON FERREIRA', votos_3lugar: 3803 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'SANTA MARIA CAMBUCÁ', eleitores: 11321, prefeito_eleito: 'ROBERVAN', votos_1lugar: 5478, segundo_lugar: 'NELSON', votos_2lugar: 4002 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'SÃO VICENTE FERRER', eleitores: 14327, prefeito_eleito: 'MARCONE VICENTE', votos_1lugar: 7270, segundo_lugar: 'FLÁVIO REGIS', votos_2lugar: 4448 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'SURUBIM', eleitores: 47262, prefeito_eleito: 'CHAPARRAL', votos_1lugar: 18500, segundo_lugar: 'VÉIA DE APRÍGIO', votos_2lugar: 17642, terceiro_lugar: 'DR. FLÁVIO', votos_3lugar: 2798 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'TAQUARITINGA DO NORTE', eleitores: 21740, prefeito_eleito: 'GENA LINS', votos_1lugar: 7541, segundo_lugar: 'ALLYSON DIAS', votos_2lugar: 6755, terceiro_lugar: 'JOBSON DA INTERNET', votos_3lugar: 2385 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'TORITAMA', eleitores: 33567, prefeito_eleito: 'SÉRGIO COLIN', votos_1lugar: 18816, segundo_lugar: 'ROMERINHO', votos_2lugar: 9151, terceiro_lugar: 'MARCELO ANDRADE', votos_3lugar: 150 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'VERTENTE DO LÉRIO', eleitores: 8222, prefeito_eleito: 'HISTÊNIO JÚNIOR', votos_1lugar: 3783, segundo_lugar: 'FÁBIO FRANÇA', votos_2lugar: 3260 },
  { mesorregiao: 'Agreste Setentrional', municipio: 'VERTENTES', eleitores: 16034, prefeito_eleito: 'RAEL', votos_1lugar: 7192, segundo_lugar: 'ZITO BARROS', votos_2lugar: 7003 },

  // ── MATA NORTE ─────────────────────────────────────────────────────────────
  { mesorregiao: 'Mata Norte', municipio: 'ALIANÇA', eleitores: 28538, prefeito_eleito: 'PEDRO ERMÍNIO', votos_1lugar: 17802, segundo_lugar: 'MACIEL DA ROCAM', votos_2lugar: 2708, terceiro_lugar: 'KARINA GOUVEIA', votos_3lugar: 735 },
  { mesorregiao: 'Mata Norte', municipio: 'BUENOS AIRES', eleitores: 11878, prefeito_eleito: 'HENRIQUE QUEIROZ', votos_1lugar: 5642, segundo_lugar: 'FAVIO DE DEDA', votos_2lugar: 4694 },
  { mesorregiao: 'Mata Norte', municipio: 'CAMUTANGA', eleitores: 7322, prefeito_eleito: 'TALITA DE DODA', votos_1lugar: 3418, segundo_lugar: 'GILMAR PEREIRA', votos_2lugar: 2638 },
  { mesorregiao: 'Mata Norte', municipio: 'CARPINA', eleitores: 57889, prefeito_eleito: 'EDUARDA GOUVEIA', votos_1lugar: 15758, segundo_lugar: 'JOAQUIM LAPA', votos_2lugar: 14190, terceiro_lugar: 'ALDINHO BOTAFOGO', votos_3lugar: 9283 },
  { mesorregiao: 'Mata Norte', municipio: 'CHÃ DE ALEGRIA', eleitores: 11432, prefeito_eleito: 'MARCOS DA ROÇA', votos_1lugar: 5258, segundo_lugar: 'NOVA HONÓRIO', votos_2lugar: 4535 },
  { mesorregiao: 'Mata Norte', municipio: 'CONDADO', eleitores: 19208, prefeito_eleito: 'ALBINO', votos_1lugar: 9173, segundo_lugar: 'DR. EDBERTO QUENTAL', votos_2lugar: 6814, terceiro_lugar: 'ANTONIO CARLOS', votos_3lugar: 255 },
  { mesorregiao: 'Mata Norte', municipio: 'FERREIROS', eleitores: 10045, prefeito_eleito: 'JOSÉ ROBERTO', votos_1lugar: 5630, segundo_lugar: 'BRUNO JAPHET FILHO', votos_2lugar: 2614, terceiro_lugar: 'GIL PONTES', votos_3lugar: 283 },
  { mesorregiao: 'Mata Norte', municipio: 'GLÓRIA DO GOITÁ', eleitores: 22649, prefeito_eleito: 'JAIMINHO', votos_1lugar: 9869, segundo_lugar: 'RODRIGO MARTINS', votos_2lugar: 8429 },
  { mesorregiao: 'Mata Norte', municipio: 'GOIANA', eleitores: 65197, prefeito_eleito: 'MARCÍLIO', votos_1lugar: 41605, segundo_lugar: 'QUINHO FENELON', votos_2lugar: 8092, terceiro_lugar: 'WALTER DA ETP', votos_3lugar: 2090 },
  { mesorregiao: 'Mata Norte', municipio: 'ITAMBÉ', eleitores: 23957, prefeito_eleito: 'ARMANDO PIMENTEL', votos_1lugar: 8982, segundo_lugar: 'FREDERICO', votos_2lugar: 6855, terceiro_lugar: 'MANUELA MATTOS', votos_3lugar: 3668 },
  { mesorregiao: 'Mata Norte', municipio: 'ITAQUITINGA', eleitores: 12544, prefeito_eleito: 'PATRICK MORAES', votos_1lugar: 6132, segundo_lugar: 'ISAQUE DA FOTO', votos_2lugar: 4584, terceiro_lugar: 'DEL PACHECO', votos_3lugar: 250 },
  { mesorregiao: 'Mata Norte', municipio: 'LAGOA DE ITAENGA', eleitores: 18183, prefeito_eleito: 'DIMAS NATANAEL', votos_1lugar: 8417, segundo_lugar: 'CARLINHOS MOINHO', votos_2lugar: 6985, terceiro_lugar: 'DR. TOINHO', votos_3lugar: 260 },
  { mesorregiao: 'Mata Norte', municipio: 'LAGOA DO CARRO', eleitores: 15520, prefeito_eleito: 'ZÉ LUIZ ALVES', votos_1lugar: 7172, segundo_lugar: 'JOSAFÁ BOTAFOGO', votos_2lugar: 6412 },
  { mesorregiao: 'Mata Norte', municipio: 'MACAPARANA', eleitores: 19626, prefeito_eleito: 'PAQUINHA', votos_1lugar: 8842, segundo_lugar: 'PEDÃO', votos_2lugar: 6364, terceiro_lugar: 'ZÉ IVALDO', votos_3lugar: 309 },
  { mesorregiao: 'Mata Norte', municipio: 'NAZARÉ DA MATA', eleitores: 25363, prefeito_eleito: 'ADRIANA DA FERBOM', votos_1lugar: 10102, segundo_lugar: 'PEREIRA DO SINDICATO', votos_2lugar: 7182, terceiro_lugar: 'KIKO', votos_3lugar: 3895 },
  { mesorregiao: 'Mata Norte', municipio: 'PAUDALHO', eleitores: 44609, prefeito_eleito: 'PAULA DA EDUCAÇÃO', votos_1lugar: 24394, segundo_lugar: 'ANGELA COUTINHO', votos_2lugar: 8825, terceiro_lugar: 'ANDRÉ VIANA', votos_3lugar: 2072 },
  { mesorregiao: 'Mata Norte', municipio: 'TIMBAÚBA', eleitores: 41649, prefeito_eleito: 'MARINALDO ROSENDO', votos_1lugar: 14839, segundo_lugar: 'ULISSES', votos_2lugar: 9642, terceiro_lugar: 'DR. JEFERSON', votos_3lugar: 7117 },
  { mesorregiao: 'Mata Norte', municipio: 'TRACUNHAÉM', eleitores: 11863, prefeito_eleito: 'IRMÃO ALUIZIO SILVA', votos_1lugar: 7038, segundo_lugar: 'BELARMINO VASQUEZ', votos_2lugar: 3145, terceiro_lugar: 'BIU DE OLIVEIRA', votos_3lugar: 79 },
  { mesorregiao: 'Mata Norte', municipio: 'VICÊNCIA', eleitores: 21946, prefeito_eleito: 'EDER SILVA', votos_1lugar: 9775, segundo_lugar: 'NETO DE DIJA', votos_2lugar: 8230 },

  // ── MATA SUL ───────────────────────────────────────────────────────────────
  { mesorregiao: 'Mata Sul', municipio: 'ÁGUA PRETA', eleitores: 20154, prefeito_eleito: 'MIRUCA', votos_1lugar: 7997, segundo_lugar: 'TONHÃO', votos_2lugar: 7934 },
  { mesorregiao: 'Mata Sul', municipio: 'AMARAJI', eleitores: 17457, prefeito_eleito: 'ARAÚJO', votos_1lugar: 7136, segundo_lugar: 'ALINE GOUVEIA', votos_2lugar: 6865, terceiro_lugar: 'IRMÃO NATAN', votos_3lugar: 134 },
  { mesorregiao: 'Mata Sul', municipio: 'BARREIROS', eleitores: 30916, prefeito_eleito: 'CARLINHOS DA PEDREIRA', votos_1lugar: 15899, segundo_lugar: 'PAULA VERÍSSIMO', votos_2lugar: 5378, terceiro_lugar: 'CLAUDIO DA COOATES', votos_3lugar: 715 },
  { mesorregiao: 'Mata Sul', municipio: 'BELEM DE MARIA', eleitores: 9249, prefeito_eleito: 'BETO DO SARGENTO', votos_1lugar: 4117, segundo_lugar: 'ALEXANDRE NETO', votos_2lugar: 3912 },
  { mesorregiao: 'Mata Sul', municipio: 'CATENDE', eleitores: 26679, prefeito_eleito: 'DN GRAÇA', votos_1lugar: 10531, segundo_lugar: 'DR. CAIO', votos_2lugar: 10517, terceiro_lugar: 'PROF. MARCELO P', votos_3lugar: 54 },
  { mesorregiao: 'Mata Sul', municipio: 'CHÃ GRANDE', eleitores: 18750, prefeito_eleito: 'SANDRO ADV', votos_1lugar: 9640, segundo_lugar: 'JORGE LUIS', votos_2lugar: 5915 },
  { mesorregiao: 'Mata Sul', municipio: 'CORTÊS', eleitores: 11421, prefeito_eleito: 'FÁTIMA BORBA', votos_1lugar: 3910, segundo_lugar: 'GENINHO', votos_2lugar: 2729, terceiro_lugar: 'PROF. ERON', votos_3lugar: 2493 },
  { mesorregiao: 'Mata Sul', municipio: 'ESCADA', eleitores: 48406, prefeito_eleito: 'MARY GOUVEIA', votos_1lugar: 19357, segundo_lugar: 'PROF JADSON CAETANO', votos_2lugar: 19243 },
  { mesorregiao: 'Mata Sul', municipio: 'GAMELEIRA', eleitores: 15388, prefeito_eleito: 'DR. LEANDRO LIMA', votos_1lugar: 9704, segundo_lugar: 'MAJOR RAMOS', votos_2lugar: 926, terceiro_lugar: 'PROF. EDSON', votos_3lugar: 690 },
  { mesorregiao: 'Mata Sul', municipio: 'JAQUEIRA', eleitores: 9337, prefeito_eleito: 'RIDETE PELLEGRINO', votos_1lugar: 6470, segundo_lugar: 'MANOEL DE CORUBAS', votos_2lugar: 960 },
  { mesorregiao: 'Mata Sul', municipio: 'JOAQUIM NABUCO', eleitores: 14328, prefeito_eleito: 'MÁRCIA BARRETO', votos_1lugar: 6404, segundo_lugar: 'JANE', votos_2lugar: 5828 },
  { mesorregiao: 'Mata Sul', municipio: 'MARAIAL', eleitores: 8218, prefeito_eleito: 'MARLOS HENRIQUE', votos_1lugar: 4055, segundo_lugar: 'DIOGO ANDRADE', votos_2lugar: 2665 },
  { mesorregiao: 'Mata Sul', municipio: 'PALMARES', eleitores: 41336, prefeito_eleito: 'JÚNIOR DE BETO', votos_1lugar: 25905, segundo_lugar: 'EUDO MAGALHÃES', votos_2lugar: 4368, terceiro_lugar: 'CASTRO', votos_3lugar: 772 },
  { mesorregiao: 'Mata Sul', municipio: 'PRIMAVERA', eleitores: 11020, prefeito_eleito: 'JEYSON FALCÃO', votos_1lugar: 4833, segundo_lugar: 'JUNIOR NICOLAU', votos_2lugar: 3250, terceiro_lugar: 'ROMULO PÃO COM OVO', votos_3lugar: 1003 },
  { mesorregiao: 'Mata Sul', municipio: 'QUIPAPÁ', eleitores: 15618, prefeito_eleito: 'PITÉ', votos_1lugar: 6351, segundo_lugar: 'LUIZINHO DO POSTO', votos_2lugar: 5518 },
  { mesorregiao: 'Mata Sul', municipio: 'RIBEIRÃO', eleitores: 28706, prefeito_eleito: 'CAROL JORDÃO', votos_1lugar: 12341, segundo_lugar: 'KARINA PAIVA', votos_2lugar: 8111, terceiro_lugar: 'DR. WELLIGTON', votos_3lugar: 1619 },
  { mesorregiao: 'Mata Sul', municipio: 'RIO FORMOSO', eleitores: 17104, prefeito_eleito: 'BERG DE HACKER', votos_1lugar: 5836, segundo_lugar: 'SALMO', votos_2lugar: 4443, terceiro_lugar: 'TIÃO', votos_3lugar: 2987 },
  { mesorregiao: 'Mata Sul', municipio: 'SÃO BENEDITO DO SUL', eleitores: 7791, prefeito_eleito: 'ZÉ BAIANO', votos_1lugar: 3980, segundo_lugar: 'NICOLLY PINTADINHA', votos_2lugar: 2120 },
  { mesorregiao: 'Mata Sul', municipio: 'SÃO JOSÉ DA COROA GRANDE', eleitores: 17995, prefeito_eleito: 'BARBOSA', votos_1lugar: 7463, segundo_lugar: 'NELSINHO DE PEL', votos_2lugar: 6802, terceiro_lugar: 'ROBERTO DO CAMPO', votos_3lugar: 292 },
  { mesorregiao: 'Mata Sul', municipio: 'SIRINHAÉM', eleitores: 28167, prefeito_eleito: 'MANOEL DA RETÍFICA', votos_1lugar: 11686, segundo_lugar: 'CAMILA MACHADO', votos_2lugar: 10955, terceiro_lugar: 'RENATA XIMENES', votos_3lugar: 252 },
  { mesorregiao: 'Mata Sul', municipio: 'TAMANDARÉ', eleitores: 19972, prefeito_eleito: 'CARRAPICHO', votos_1lugar: 9810, segundo_lugar: 'HILDO HACKER', votos_2lugar: 7154 },
  { mesorregiao: 'Mata Sul', municipio: 'VITÓRIA DE SANTO ANTÃO', eleitores: 101400, prefeito_eleito: 'PAULO ROBERTO', votos_1lugar: 64589, segundo_lugar: 'VICTOR', votos_2lugar: 13935, terceiro_lugar: 'ANDRÉ CARVALHO', votos_3lugar: 4949 },
  { mesorregiao: 'Mata Sul', municipio: 'XEXEU', eleitores: 10927, prefeito_eleito: 'THIAGO DE MIEL', votos_1lugar: 6617, segundo_lugar: 'EUDO MAGALHÃES', votos_2lugar: 2202 },

  // ── METROPOLITANA ──────────────────────────────────────────────────────────
  { mesorregiao: 'Metropolitana', municipio: 'ABREU E LIMA', eleitores: 78318, prefeito_eleito: 'FLÁVIO GADELHA', votos_1lugar: 40589, segundo_lugar: 'DR MARQUINHOS', votos_2lugar: 17360, terceiro_lugar: 'PROF. JAILSON', votos_3lugar: 594 },
  { mesorregiao: 'Metropolitana', municipio: 'ARAÇOIABA', eleitores: 18216, prefeito_eleito: 'JOGLI UCHOA', votos_1lugar: 9958, segundo_lugar: 'JOAMY', votos_2lugar: 5096 },
  { mesorregiao: 'Metropolitana', municipio: 'CABO SANTO AGOSTINHO', eleitores: 169197, prefeito_eleito: 'LULA CABRAL (sub judice)', votos_1lugar: 60103, segundo_lugar: 'KEKO DO ARMAZEM', votos_2lugar: 53794, terceiro_lugar: 'DELEGADO RESENDE', votos_3lugar: 13118 },
  { mesorregiao: 'Metropolitana', municipio: 'CAMARAGIBE', eleitores: 125398, prefeito_eleito: 'DIEGO CABRAL', votos_1lugar: 41968, segundo_lugar: 'JORGE ALEXANDRE', votos_2lugar: 33372, terceiro_lugar: 'FELIPE DANTAS', votos_3lugar: 9629 },
  { mesorregiao: 'Metropolitana', municipio: 'IGARASSU', eleitores: 89127, prefeito_eleito: 'PROF. ELCIONE', votos_1lugar: 40820, segundo_lugar: 'MIGUEL RICARDO', votos_2lugar: 29578 },
  { mesorregiao: 'Metropolitana', municipio: 'ILHA DE ITAMARACÁ', eleitores: 18619, prefeito_eleito: 'PAULO GALVÃO', votos_1lugar: 6849, segundo_lugar: 'PAULO BATISTA', votos_2lugar: 6194, terceiro_lugar: 'GEORGE BAIÁ', votos_3lugar: 1137 },
  { mesorregiao: 'Metropolitana', municipio: 'IPOJUCA', eleitores: 88015, prefeito_eleito: 'CARLOS SANTANA', votos_1lugar: 32805, segundo_lugar: 'ADILMA', votos_2lugar: 29112, terceiro_lugar: 'PAULO ALVES', votos_3lugar: 10014 },
  { mesorregiao: 'Metropolitana', municipio: 'ITAPISSUMA', eleitores: 21627, prefeito_eleito: 'JÚNIOR DE IRMÃ TECA', votos_1lugar: 10945, segundo_lugar: 'CAL VOLIA', votos_2lugar: 7674 },
  { mesorregiao: 'Metropolitana', municipio: 'JABOATÃO DOS GUARARAPES', eleitores: 487903, prefeito_eleito: 'MANO MEDEIROS', votos_1lugar: 180810, segundo_lugar: 'CLARISSA TÉCIO', votos_2lugar: 65400, terceiro_lugar: 'ELIAS GOMES', votos_3lugar: 59508 },
  { mesorregiao: 'Metropolitana', municipio: 'MORENO', eleitores: 49097, prefeito_eleito: 'EDMILSON CUPERTINO', votos_1lugar: 26835, segundo_lugar: 'HEITOR DE ENOQUE', votos_2lugar: 9528, terceiro_lugar: 'ANINHA ARAÚJO', votos_3lugar: 1038 },
  { mesorregiao: 'Metropolitana', municipio: 'OLINDA', eleitores: 300296, prefeito_eleito: 'MIRELLA', votos_1lugar: 111613, segundo_lugar: 'VINÍCIUS CASTELO', votos_2lugar: 105616, terceiro_lugar: 'IZABEL URQUIZA', votos_3lugar: 51526 },
  { mesorregiao: 'Metropolitana', municipio: 'PAULISTA', eleitores: 235213, prefeito_eleito: 'RAMOS', votos_1lugar: 120228, segundo_lugar: 'JUNIOR MATUTO', votos_2lugar: 43656, terceiro_lugar: 'LÍVIA ÁLVARO', votos_3lugar: 15784 },
  { mesorregiao: 'Metropolitana', municipio: 'RECIFE', eleitores: 1219917, prefeito_eleito: 'JOÃO CAMPOS', votos_1lugar: 725721, segundo_lugar: 'GILSON MACHADO', votos_2lugar: 127138, terceiro_lugar: 'DANI PORTELA', votos_3lugar: 35110 },
  { mesorregiao: 'Metropolitana', municipio: 'SÃO LOURENÇO DA MATA', eleitores: 82319, prefeito_eleito: 'VINICIUS LABANCA', votos_1lugar: 56964, segundo_lugar: 'JAIRO PEREIRA', votos_2lugar: 7484 },

  // ── SERTÃO DO ARARIPE ──────────────────────────────────────────────────────
  { mesorregiao: 'Sertão do Araripe', municipio: 'ARARIPINA', eleitores: 58543, prefeito_eleito: 'EVILÁSIO MATEUS', votos_1lugar: 27099, segundo_lugar: 'CAMILA MODESTO', votos_2lugar: 19181, terceiro_lugar: 'AILTON RODRIGUES', votos_3lugar: 431 },
  { mesorregiao: 'Sertão do Araripe', municipio: 'BODOCÓ', eleitores: 27335, prefeito_eleito: 'DR. OTÁVIO', votos_1lugar: 13974, segundo_lugar: 'TULIO ALVES', votos_2lugar: 9353 },
  { mesorregiao: 'Sertão do Araripe', municipio: 'EXU', eleitores: 28218, prefeito_eleito: 'JOSÉ PINTO JUNIOR', votos_1lugar: 11693, segundo_lugar: 'GENÁRIO AQUINO', votos_2lugar: 11152 },
  { mesorregiao: 'Sertão do Araripe', municipio: 'GRANITO', eleitores: 6811, prefeito_eleito: 'GEORGE DE SIDNEY', votos_1lugar: 3591, segundo_lugar: 'FRANCIVALDO ALVES', votos_2lugar: 2398 },
  { mesorregiao: 'Sertão do Araripe', municipio: 'IPUBI', eleitores: 23658, prefeito_eleito: 'JOÃO MARCOS SIQUEIRA', votos_1lugar: 9804, segundo_lugar: 'DR. WILSON FILHO', votos_2lugar: 9030 },
  { mesorregiao: 'Sertão do Araripe', municipio: 'MOREILÂNDIA', eleitores: 9780, prefeito_eleito: 'TETO TEIXEIRA', votos_1lugar: 5310, segundo_lugar: 'CIDENI MARINHEIRO', votos_2lugar: 2417, terceiro_lugar: 'JONATA RODRIGUES', votos_3lugar: 248 },
  { mesorregiao: 'Sertão do Araripe', municipio: 'OURICURI', eleitores: 47429, prefeito_eleito: 'VICTOR COELHO', votos_1lugar: 20485, segundo_lugar: 'RAIMUNDO DE BIBI', votos_2lugar: 17491, terceiro_lugar: 'PEDRO DO PIPA', votos_3lugar: 475 },
  { mesorregiao: 'Sertão do Araripe', municipio: 'SANTA CRUZ', eleitores: 12512, prefeito_eleito: 'CACHOEIRA', votos_1lugar: 8020, segundo_lugar: 'JUNHO TAVARES', votos_2lugar: 2732 },
  { mesorregiao: 'Sertão do Araripe', municipio: 'SANTA FILOMENA', eleitores: 12092, prefeito_eleito: 'GILVDEVAN COELHO', votos_1lugar: 5824, segundo_lugar: 'CLEOMATSON', votos_2lugar: 3752, terceiro_lugar: 'WAGNER MORORÓ', votos_3lugar: 1341 },
  { mesorregiao: 'Sertão do Araripe', municipio: 'TRINDADE', eleitores: 23735, prefeito_eleito: 'HELBE SILVA', votos_1lugar: 12341, segundo_lugar: 'ZÉ CAPACETE', votos_2lugar: 6492 },

  // ── SERTÃO CENTRAL ─────────────────────────────────────────────────────────
  { mesorregiao: 'Sertão Central', municipio: 'CEDRO', eleitores: 9794, prefeito_eleito: 'RIBA BEZERRA', votos_1lugar: 3959, segundo_lugar: 'MARLY DE NEGUINHO', votos_2lugar: 3882 },
  { mesorregiao: 'Sertão Central', municipio: 'MIRANDIBA', eleitores: 11867, prefeito_eleito: 'DR. EVALDO CARVALHO', votos_1lugar: 6025, segundo_lugar: 'NATINHO DO SINDICATO', votos_2lugar: 6572 },
  { mesorregiao: 'Sertão Central', municipio: 'PARNAMIRIM', eleitores: 18193, prefeito_eleito: 'MUCIO ANGELIM', votos_1lugar: 8421, segundo_lugar: 'NININHO', votos_2lugar: 6858 },
  { mesorregiao: 'Sertão Central', municipio: 'SALGUEIRO', eleitores: 41894, prefeito_eleito: 'FABINHO LISANDRO', votos_1lugar: 19829, segundo_lugar: 'DR. MARCONES', votos_2lugar: 13723, terceiro_lugar: 'ANTONIO ROCHA', votos_3lugar: 388 },
  { mesorregiao: 'Sertão Central', municipio: 'SÃO JOSÉ DO BELMONTE', eleitores: 27725, prefeito_eleito: 'VINÍCIUS MARQUES', votos_1lugar: 15349, segundo_lugar: 'SUELENE LEAL', votos_2lugar: 4373, terceiro_lugar: 'ANA PAULA RODRIGUES', votos_3lugar: 730 },
  { mesorregiao: 'Sertão Central', municipio: 'SERRITA', eleitores: 16665, prefeito_eleito: 'ALEUDO BENEDITO', votos_1lugar: 7615, segundo_lugar: 'MARLY RUFINO', votos_2lugar: 6034 },
  { mesorregiao: 'Sertão Central', municipio: 'TERRA NOVA', eleitores: 8673, prefeito_eleito: 'DINHA MORORÓ', votos_1lugar: 4709, segundo_lugar: 'DUÍLA DO ALAZÃO', votos_2lugar: 2908 },
  { mesorregiao: 'Sertão Central', municipio: 'VERDEJANTE', eleitores: 8235, prefeito_eleito: 'XICÃO TAVARES', votos_1lugar: 4309, segundo_lugar: 'CARRAPICHO', votos_2lugar: 2575 },

  // ── SERTÃO ITAPARICA ───────────────────────────────────────────────────────
  { mesorregiao: 'Sertão Itaparica', municipio: 'BELÉM DO SÃO FRANCISCO', eleitores: 15350, prefeito_eleito: 'CALBY CARVALHO', votos_1lugar: 6741, segundo_lugar: 'GUSTAVO CARIBÉ', votos_2lugar: 6184 },
  { mesorregiao: 'Sertão Itaparica', municipio: 'CARNAUBEIRA DA PENHA', eleitores: 12456, prefeito_eleito: 'ELIZIINHO', votos_1lugar: 5978, segundo_lugar: 'DR. MANOEL', votos_2lugar: 4938 },
  { mesorregiao: 'Sertão Itaparica', municipio: 'FLORESTA', eleitores: 24647, prefeito_eleito: 'ROSANGELA MANIÇOBA', votos_1lugar: 10235 },
  { mesorregiao: 'Sertão Itaparica', municipio: 'ITACURUBA', eleitores: 4839, prefeito_eleito: 'JUNIOR CANTARELLI', votos_1lugar: 2625, segundo_lugar: 'KIBA MANIÇOBA', votos_2lugar: 1872 },
  { mesorregiao: 'Sertão Itaparica', municipio: 'JATOBÁ', eleitores: 11447, prefeito_eleito: 'ROGÉRIO FERREIRA', votos_1lugar: 6081, segundo_lugar: 'NALDO', votos_2lugar: 3136, terceiro_lugar: 'EDGAR SHOW', votos_3lugar: 58 },
  { mesorregiao: 'Sertão Itaparica', municipio: 'PETROLÂNDIA', eleitores: 25686, prefeito_eleito: 'FABIANO MARQUES', votos_1lugar: 13316, segundo_lugar: 'SAID SOUSA', votos_2lugar: 5463 },
  { mesorregiao: 'Sertão Itaparica', municipio: 'TACARATU', eleitores: 17996, prefeito_eleito: 'WASHINGTON ARAÚJO', votos_1lugar: 7976, segundo_lugar: 'GERSON JUNIOR', votos_2lugar: 7101 },

  // ── SERTÃO MOXOTÓ ──────────────────────────────────────────────────────────
  { mesorregiao: 'Sertão Moxotó', municipio: 'ARCOVERDE', eleitores: 50413, prefeito_eleito: 'ZECA CAVALCANTI', votos_1lugar: 23091, segundo_lugar: 'MADALENA BRITTO', votos_2lugar: 15513, terceiro_lugar: 'JOÃO DO SKATE', votos_3lugar: 420 },
  { mesorregiao: 'Sertão Moxotó', municipio: 'BETÂNIA', eleitores: 9950, prefeito_eleito: 'BEBE ÁGUA', votos_1lugar: 4191, segundo_lugar: 'ALINE ARAÚJO', votos_2lugar: 3986, terceiro_lugar: 'HERON LIMA', votos_3lugar: 54 },
  { mesorregiao: 'Sertão Moxotó', municipio: 'CUSTÓDIA', eleitores: 30032, prefeito_eleito: 'MANOEL MESSIAS', votos_1lugar: 13438, segundo_lugar: 'LUCIARA DE NEMIAS', votos_2lugar: 9095 },
  { mesorregiao: 'Sertão Moxotó', municipio: 'IBIMIRIM', eleitores: 21966, prefeito_eleito: 'WELLITON SIQUEIRA', votos_1lugar: 11508, segundo_lugar: 'CHARLES DO PAULISTÃO', votos_2lugar: 4963 },
  { mesorregiao: 'Sertão Moxotó', municipio: 'INAJÁ', eleitores: 15230, prefeito_eleito: 'MARCELO DE ALBERTO', votos_1lugar: 8849, segundo_lugar: 'BEL GALDINO', votos_2lugar: 3473, terceiro_lugar: 'NETINHO DO PT', votos_3lugar: 91 },
  { mesorregiao: 'Sertão Moxotó', municipio: 'MANARI', eleitores: 14305, prefeito_eleito: 'AUDALIO JUNIOR', votos_1lugar: 6089, segundo_lugar: 'AUGUSTO DE CIDO', votos_2lugar: 4793, terceiro_lugar: 'JURANDIR ARAÚJO', votos_3lugar: 23 },
  { mesorregiao: 'Sertão Moxotó', municipio: 'SERTÂNIA', eleitores: 27255, prefeito_eleito: 'POLLYANA ABREU', votos_1lugar: 11478, segundo_lugar: 'RITA', votos_2lugar: 9067 },

  // ── SERTÃO PAJEÚ ───────────────────────────────────────────────────────────
  { mesorregiao: 'Sertão Pajeú', municipio: 'AFOGADOS DA INGAZEIRA', eleitores: 28923, prefeito_eleito: 'SANDRINHO PALMEIRA', votos_1lugar: 13061, segundo_lugar: 'DANILO SIMÕES', votos_2lugar: 9609 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'BREJINHO', eleitores: 7605, prefeito_eleito: 'GILSON BENTO', votos_1lugar: 4589, segundo_lugar: 'DR. TÚLIO', votos_2lugar: 1764 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'CALUMBI', eleitores: 7397, prefeito_eleito: 'JOELSON', votos_1lugar: 4598, segundo_lugar: 'DR. CÍCERO SIMÕES', votos_2lugar: 1576 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'CARNAÍBA', eleitores: 17347, prefeito_eleito: 'BERG GOMES', votos_1lugar: 7831, segundo_lugar: 'ILMA VALÉRIO', votos_2lugar: 5924 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'FLORES', eleitores: 16685, prefeito_eleito: 'GILBERTO RIBEIRO', votos_1lugar: 8002, segundo_lugar: 'ADEILTON PATRIOTA', votos_2lugar: 4046, terceiro_lugar: 'DR. NELSON', votos_3lugar: 22 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'IGUARACY', eleitores: 9351, prefeito_eleito: 'DR. PEDRO', votos_1lugar: 4328, segundo_lugar: 'ALBÉRICO ROCHA', votos_2lugar: 3116 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'INGAZEIRA', eleitores: 4368, prefeito_eleito: 'LUCIANO TORRES', votos_1lugar: 2875, segundo_lugar: 'ALCINEIDE PROFESSORA', votos_2lugar: 867 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'ITAPETIM', eleitores: 11815, prefeito_eleito: 'ALINE COSTA', votos_1lugar: 6111, segundo_lugar: 'ANDERSON LOPES', votos_2lugar: 3726 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'QUIXABA', eleitores: 6233, prefeito_eleito: 'ZÉ PRETINHO', votos_1lugar: 3757, segundo_lugar: 'NEUDIRAN', votos_2lugar: 1277 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'SANTA TEREZINHA', eleitores: 8261, prefeito_eleito: 'DR ISMAEL QUINTINO', votos_1lugar: 4918, segundo_lugar: 'IRLANDO PARABÓLICAS', votos_2lugar: 3457 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'SANTA CRUZ DA BAIXA VERDE', eleitores: 10001, prefeito_eleito: 'DELSON LUSTOSA', votos_1lugar: 5438, segundo_lugar: 'NEGUINHO DE DANDA', votos_2lugar: 914 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'SÃO JOSÉ DO EGITO', eleitores: 23955, prefeito_eleito: 'FREDSON BRITO', votos_1lugar: 10523, segundo_lugar: 'DR GEORGE BORJA', votos_2lugar: 8799 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'SERRA TALHADA', eleitores: 62295, prefeito_eleito: 'MARCIA CONRADO', votos_1lugar: 27952, segundo_lugar: 'MIGUEL DUQUE', votos_2lugar: 18191, terceiro_lugar: 'SARGENTO JUCELO', votos_3lugar: 1922 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'SOLIDÃO', eleitores: 5753, prefeito_eleito: 'MAYCO DA FARMÁCIA', votos_1lugar: 4207 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'TABIRA', eleitores: 21434, prefeito_eleito: 'FLÁVIO MARQUES', votos_1lugar: 9310, segundo_lugar: 'NICINHA DE DINCA', votos_2lugar: 8657 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'TRIUNFO', eleitores: 12110, prefeito_eleito: 'LUCIANO BONFIM', votos_1lugar: 5316, segundo_lugar: 'DR. EDUARDO', votos_2lugar: 4394, terceiro_lugar: 'NEGO RICO', votos_3lugar: 192 },
  { mesorregiao: 'Sertão Pajeú', municipio: 'TUPARETAMA', eleitores: 8217, prefeito_eleito: 'DIÓGENES PATRIOTA', votos_1lugar: 3619, segundo_lugar: 'DANILO', votos_2lugar: 3078, terceiro_lugar: 'IVAÍ CAVALDANTE', votos_3lugar: 50 },

  // ── SERTÃO SÃO FRANCISCO ───────────────────────────────────────────────────
  { mesorregiao: 'Sertão São Francisco', municipio: 'AFRÂNIO', eleitores: 17398, prefeito_eleito: 'CLOVES RAMOS', votos_1lugar: 9871, segundo_lugar: 'LÉLIO SALGA PELE', votos_2lugar: 4201, terceiro_lugar: 'ZÉ NILTON DE POÇÃO', votos_3lugar: 400 },
  { mesorregiao: 'Sertão São Francisco', municipio: 'CABROBÓ', eleitores: 24965, prefeito_eleito: 'GALEGO DE NANAI', votos_1lugar: 14317, segundo_lugar: 'DR. LUCAS NOVAES', votos_2lugar: 6442, terceiro_lugar: 'MÚCIO FREIRE', votos_3lugar: 150 },
  { mesorregiao: 'Sertão São Francisco', municipio: 'DORMENTES', eleitores: 15968, prefeito_eleito: 'CORRINHA DE GEOMARCO', votos_1lugar: 11727 },
  { mesorregiao: 'Sertão São Francisco', municipio: 'LAGOA GRANDE', eleitores: 20414, prefeito_eleito: 'CATHARINA GARZIERA', votos_1lugar: 11491, segundo_lugar: 'GABRIEL IMÓVEIS', votos_2lugar: 3428, terceiro_lugar: 'NILSINHO DE DOUTOR', votos_3lugar: 1010 },
  { mesorregiao: 'Sertão São Francisco', municipio: 'OROCÓ', eleitores: 12271, prefeito_eleito: 'ISMAEL LIRA', votos_1lugar: 5723, segundo_lugar: 'NEURE DE DEDI', votos_2lugar: 4762 },
  { mesorregiao: 'Sertão São Francisco', municipio: 'PETROLINA', eleitores: 240911, prefeito_eleito: 'SIMÃO DURANDO', votos_1lugar: 107806, segundo_lugar: 'JÚLIO LÓCIO', votos_2lugar: 52224, terceiro_lugar: 'LARA CAVALCANTI', votos_3lugar: 10757 },
  { mesorregiao: 'Sertão São Francisco', municipio: 'SANTA MARIA DA BOA VISTA', eleitores: 30105, prefeito_eleito: 'GEORGE DUARTE', votos_1lugar: 18163, segundo_lugar: 'HUMBERTO MENDES', votos_2lugar: 7241, terceiro_lugar: 'EDSON CAR', votos_3lugar: 175 },
];

import { MUNICIPIOS_PE_GEO } from './municipiosGeoMap';
import { Candidato, TerritorioCalculado } from '../types';

export function obterCandidatosBerlimGestao(): Candidato[] {
  const lista: Candidato[] = [
    {
      id: 0,
      sq_candidato_tse: 0,
      nome_urna: 'Nenhum (Visão Geral da Região)',
      nome_completo: 'Visão Geral do Total de Votos da Região',
      partido: 'TODOS',
      numero: 0,
      cargo: 'PREFEITO',
      eleicao_id: 1,
      situacao: 'CONSOLIDADO',
      municipio: 'PERNAMBUCO',
    },
  ];
  let idCounter = 0;

  DADOS_BERLIM_GESTAO.forEach((item) => {
    // 1º Lugar (Prefeito Eleito)
    if (item.prefeito_eleito) {
      idCounter++;
      lista.push({
        id: idCounter,
        sq_candidato_tse: 260002024000 + idCounter,
        nome_urna: item.prefeito_eleito,
        nome_completo: `${item.prefeito_eleito} (Prefeito Eleito - ${item.municipio})`,
        partido: 'ELEITO',
        numero: 100 + (idCounter % 90),
        cargo: 'PREFEITO',
        eleicao_id: 1,
        situacao: 'ELEITO',
        municipio: item.municipio,
      });
    }

    // 2º Lugar
    if (item.segundo_lugar) {
      idCounter++;
      lista.push({
        id: idCounter,
        sq_candidato_tse: 260002024000 + idCounter,
        nome_urna: item.segundo_lugar,
        nome_completo: `${item.segundo_lugar} (2º Colocado - ${item.municipio})`,
        partido: '2º LUGAR',
        numero: 200 + (idCounter % 90),
        cargo: 'PREFEITO',
        eleicao_id: 1,
        situacao: 'NÃO ELEITO',
        municipio: item.municipio,
      });
    }

    // 3º Lugar
    if (item.terceiro_lugar) {
      idCounter++;
      lista.push({
        id: idCounter,
        sq_candidato_tse: 260002024000 + idCounter,
        nome_urna: item.terceiro_lugar,
        nome_completo: `${item.terceiro_lugar} (3º Colocado - ${item.municipio})`,
        partido: '3º LUGAR',
        numero: 300 + (idCounter % 90),
        cargo: 'PREFEITO',
        eleicao_id: 1,
        situacao: 'NÃO ELEITO',
        municipio: item.municipio,
      });
    }
  });

  return lista;
}

export function obterRDPorMunicipio(mun: string, mesorregiao: string): string {
  const m = mun.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (['ABREU E LIMA', 'ARACOIABA', 'CABO DE SANTO AGOSTINHO', 'CAMARAGIBE', 'IGARASSU', 'IPOJUCA', 'ITAMARACA', 'JABOATAO DOS GUARARAPES', 'MORENO', 'OLINDA', 'PAULISTA', 'RECIFE', 'SAO LOURENCO DA MATA'].includes(m)) {
    return 'RD 01 - RMR (Região Metropolitana)';
  }
  if (['ALIANCA', 'BUENOS AIRES', 'CAMUTANGA', 'CARPINA', 'CONDADO', 'GOIANA', 'ITAMBE', 'ITAQUITINGA', 'LAGOA DO CARRO', 'LAGOA DO ITAENGA', 'MACAPARANA', 'NAZARE DA MATA', 'PAUDALHO', 'SAO VICENTE FERRER', 'TIMBAUBA', 'TRACUNHAEM', 'VICENCIA'].includes(m)) {
    return 'RD 02 - Mata Norte';
  }
  if (['AGUA PRETA', 'AMARAJI', 'BARREIROS', 'BELEM DE MARIA', 'CATENDE', 'CORTES', 'ESCADA', 'GAMELEIRA', 'JAQUEIRA', 'JOAQUIM NABUCO', 'MARAIAL', 'PALMARES', 'PRIMAVERA', 'RIBEIRAO', 'RIO FORMOSO', 'SAO BENEDITO DO SUL', 'SAO JOSE DA COROA GRANDE', 'SIRINHAEM', 'TAMANDARE', 'XEXEU'].includes(m)) {
    return 'RD 03 - Mata Sul';
  }
  if (['AGRESTINA', 'ALAGOINHA', 'ALTINHO', 'BARRA DE GUABIRABA', 'BELO JARDIM', 'BEZERROS', 'BONITO', 'BREJO DA MADRE DE DEUS', 'CACHOEIRINHA', 'CAMOCIM DE SAO FELIX', 'CARUARU', 'CUPIRA', 'GRAVATA', 'IBIRAJUBA', 'JATAUBA', 'LAGOA DOS GATOS', 'PANELAS', 'PESQUEIRA', 'POCAO', 'POMBOS', 'RIACHO DAS ALMAS', 'SAIRE', 'SANHARO', 'SAO BENTO DO UNA', 'SAO CAITANO', 'SAO JOAQUIM DO MONTE', 'TACAIMBO'].includes(m)) {
    return 'RD 04 - Agreste Central';
  }
  if (['BOM JARDIM', 'CASINHAS', 'CUMARU', 'FEIRA NOVA', 'FREI MIGUELINHO', 'JOAO ALFREDO', 'LIMOEIRO', 'MACHADOS', 'OROBO', 'PASSIRA', 'SALGADINHO', 'SANTA CRUZ DO CAPIBARIBE', 'SANTA MARIA DO CAMBUCA', 'SURUBIM', 'TAQUARITINGA DO NORTE', 'TORITAMA', 'VERTENTE DO LERIO', 'VERTENTES'].includes(m)) {
    return 'RD 05 - Agreste Setentrional';
  }
  if (['AGUAS BELAS', 'ANGELIM', 'BOM CONSELHO', 'BREJAO', 'BUIQUE', 'CAETES', 'CALCADO', 'CANHOTINHO', 'CAPOEIRAS', 'CORRENTES', 'GARANHUNS', 'IATI', 'ITAIBA', 'JUCATI', 'JUPI', 'JUREMA', 'LAGOA DO OURO', 'LAJEDO', 'PALMEIRINA', 'PARANATAMA', 'PEDRA', 'SALOA', 'SAO JOAO', 'TEREZINHA', 'TUPANATINGA', 'VENTUROSA'].includes(m)) {
    return 'RD 06 - Agreste Meridional';
  }
  if (['ARCOVERDE', 'BETANIA', 'CUSTODIA', 'IBIMIRIM', 'INAJA', 'MANARI', 'SERTANIA'].includes(m)) {
    return 'RD 07 - Sertão do Moxotó';
  }
  if (['AFOGADOS DA INGAZEIRA', 'BREJINHO', 'CALUMBI', 'CARNAIBA', 'FLORES', 'IGUARACY', 'INGAZEIRA', 'ITAPETIM', 'QUIXABA', 'SANTA CRUZ DA BAIXA VERDE', 'SANTA TEREZINHA', 'SAO JOSE DO EGITO', 'SERRA TALHADA', 'SOLIDAO', 'TABIRA', 'TRIUNFO', 'TUPARETAMA'].includes(m)) {
    return 'RD 08 - Sertão do Pajeú';
  }
  if (['ARARIPINA', 'BODOCO', 'EXU', 'GRANITO', 'IPUBI', 'OURICURI', 'PARNAMIRIM', 'SANTA CRUZ', 'SANTA FILOMENA', 'TRINDADE'].includes(m)) {
    return 'RD 09 - Sertão do Araripe';
  }
  if (['CEDRO', 'MIRANDIBA', 'SALGUEIRO', 'SAO JOSE DO BELMONTE', 'SERRITA', 'VERDEJANTE'].includes(m)) {
    return 'RD 10 - Sertão Central';
  }
  if (['AFRANIO', 'CABROBO', 'DORMENTES', 'LAGOA GRANDE', 'OROCO', 'PETROLINA', 'SANTA MARIA DA BOA VISTA'].includes(m)) {
    return 'RD 11 - Sertão do São Francisco';
  }
  if (['BELEM DO SAO FRANCISCO', 'CARNAUBEIRA DA PENHA', 'FLORESTA', 'JATOBA', 'PETROLANDIA', 'TACARATU'].includes(m)) {
    return 'RD 12 - Sertão de Itaparica';
  }

  return mesorregiao;
}

export function obterTerritoriosBerlimGestao(candXId?: number, candYId?: number): TerritorioCalculado[] {
  const dataAtual = new Date().toISOString().split('T')[0];
  const todosCandidatos = obterCandidatosBerlimGestao();
  const candX = todosCandidatos.find((c) => c.id === candXId);
  const candY = todosCandidatos.find((c) => c.id === candYId);

  return DADOS_BERLIM_GESTAO.map((item, index) => {
    const key = item.municipio.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const geo = MUNICIPIOS_PE_GEO[key] || MUNICIPIOS_PE_GEO[item.municipio.toUpperCase()] || { lat: -8.0476, lng: -34.8770, mesorregiao: 'RMR', nome: item.municipio };

    let votosA = 0;
    let votosB = 0;

    const ehVisaoGeralX = !candX || candX.id === 0;
    const ehVisaoGeralY = !candY || candY.id === 0;

    if (!ehVisaoGeralX && candX) {
      if (candX.nome_urna === item.prefeito_eleito) votosA = item.votos_1lugar || 0;
      else if (candX.nome_urna === item.segundo_lugar) votosA = item.votos_2lugar || 0;
      else if (candX.nome_urna === item.terceiro_lugar) votosA = item.votos_3lugar || 0;
      else votosA = 0;
    } else {
      // Se não houver candidato X selecionado (ou for Visão Geral), exibe a soma de todos os votos válidos do município
      votosA = (item.votos_1lugar || 0) + (item.votos_2lugar || 0) + (item.votos_3lugar || 0);
    }

    if (!ehVisaoGeralY && candY) {
      if (candY.nome_urna === item.prefeito_eleito) votosB = item.votos_1lugar || 0;
      else if (candY.nome_urna === item.segundo_lugar) votosB = item.votos_2lugar || 0;
      else if (candY.nome_urna === item.terceiro_lugar) votosB = item.votos_3lugar || 0;
      else votosB = 0;
    } else {
      votosB = 0;
    }

    const totalVotosLocal = votosA + votosB;
    const aptos = item.eleitores || 1000;

    const aderencia_A = totalVotosLocal > 0 ? (votosA / totalVotosLocal) * 100 : 0;
    const aderencia_B = totalVotosLocal > 0 ? (votosB / totalVotosLocal) * 100 : 0;
    const complementaridade = Math.round(Math.abs(aderencia_A - aderencia_B));
    const rdOficial = obterRDPorMunicipio(item.municipio, item.mesorregiao);

    return {
      id: `berlim-mun-${index + 1}`,
      camada: 'municipio',
      nome: item.municipio,
      nome_municipio: item.municipio,
      uf: 'PE',
      mesorregiao: item.mesorregiao,
      microrregiao: rdOficial,
      aptos,
      votos_A: votosA,
      votos_B: votosB,
      comparecimento: Math.round(aptos * 0.82),
      aderencia_A: Math.round(aderencia_A * 10) / 10,
      aderencia_B: Math.round(aderencia_B * 10) / 10,
      forca_dobradinha: totalVotosLocal,
      sobreposicao: Math.round(Math.min(aderencia_A, aderencia_B)),
      complementaridade,
      peso_absoluto: totalVotosLocal,
      classificacao: votosA > votosB * 1.5 ? 'FORÇA' : votosA > votosB ? 'OPORTUNIDADE' : 'NEUTRO',
      latitude: geo.lat,
      longitude: geo.lng,
      geometria_aproximada: true,
      total_secoes: Math.max(1, Math.round(aptos / 350)),
      eleicao_referencia: 'Eleições Municipais 2024 (Pernambuco - Berlim Gestão)',
      data_atualizacao: dataAtual,
      tem_dados_nulos: false,
    };
  });
}

