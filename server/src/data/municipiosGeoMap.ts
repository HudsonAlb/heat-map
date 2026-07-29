/**
 * GeoVoto - Mapeamento Geográfico de todos os 184 municípios de Pernambuco
 * Auto-gerado a partir dos dados do IBGE e do GeoJSON oficial de PE
 */

export interface MunicipioGeo {
  nome: string;
  mesorregiao: 'RMR' | 'Zona da Mata' | 'Agreste' | 'Sertão';
  lat: number;
  lng: number;
}

export const MUNICIPIOS_PE_GEO: Record<string, MunicipioGeo> = {
  "ABREU E LIMA": {
    "nome": "Abreu e Lima",
    "mesorregiao": "RMR",
    "lat": -7.88806,
    "lng": -34.98491
  },
  "AFOGADOS DA INGAZEIRA": {
    "nome": "Afogados da Ingazeira",
    "mesorregiao": "Sertão",
    "lat": -7.71753,
    "lng": -37.62408
  },
  "AFRANIO": {
    "nome": "Afrânio",
    "mesorregiao": "Sertão",
    "lat": -8.62383,
    "lng": -41.03475
  },
  "AGRESTINA": {
    "nome": "Agrestina",
    "mesorregiao": "Agreste",
    "lat": -8.44979,
    "lng": -35.93358
  },
  "AGUA PRETA": {
    "nome": "Água Preta",
    "mesorregiao": "Zona da Mata",
    "lat": -8.72494,
    "lng": -35.49064
  },
  "AGUAS BELAS": {
    "nome": "Águas Belas",
    "mesorregiao": "Agreste",
    "lat": -9.08376,
    "lng": -37.02493
  },
  "ALAGOINHA": {
    "nome": "Alagoinha",
    "mesorregiao": "Agreste",
    "lat": -8.51919,
    "lng": -36.76427
  },
  "ALIANCA": {
    "nome": "Aliança",
    "mesorregiao": "Zona da Mata",
    "lat": -7.59779,
    "lng": -35.18218
  },
  "ALTINHO": {
    "nome": "Altinho",
    "mesorregiao": "Agreste",
    "lat": -8.47839,
    "lng": -36.0872
  },
  "AMARAJI": {
    "nome": "Amaraji",
    "mesorregiao": "Zona da Mata",
    "lat": -8.39916,
    "lng": -35.47231
  },
  "ANGELIM": {
    "nome": "Angelim",
    "mesorregiao": "Agreste",
    "lat": -8.8569,
    "lng": -36.27955
  },
  "ARACOIABA": {
    "nome": "Araçoiaba",
    "mesorregiao": "RMR",
    "lat": -7.79118,
    "lng": -35.07925
  },
  "ARARIPINA": {
    "nome": "Araripina",
    "mesorregiao": "Sertão",
    "lat": -7.63775,
    "lng": -40.5201
  },
  "ARCOVERDE": {
    "nome": "Arcoverde",
    "mesorregiao": "Sertão",
    "lat": -8.39327,
    "lng": -36.99864
  },
  "BARRA DE GUABIRABA": {
    "nome": "Barra de Guabiraba",
    "mesorregiao": "Agreste",
    "lat": -8.39289,
    "lng": -35.6261
  },
  "BARREIROS": {
    "nome": "Barreiros",
    "mesorregiao": "Zona da Mata",
    "lat": -8.81762,
    "lng": -35.24288
  },
  "BELEM DE MARIA": {
    "nome": "Belém de Maria",
    "mesorregiao": "Zona da Mata",
    "lat": -8.58323,
    "lng": -35.82588
  },
  "BELEM DO SAO FRANCISCO": {
    "nome": "Belém do São Francisco",
    "mesorregiao": "Sertão",
    "lat": -8.53334,
    "lng": -38.99544
  },
  "BELO JARDIM": {
    "nome": "Belo Jardim",
    "mesorregiao": "Agreste",
    "lat": -8.27369,
    "lng": -36.43646
  },
  "BETANIA": {
    "nome": "Betânia",
    "mesorregiao": "Sertão",
    "lat": -8.27393,
    "lng": -38.0104
  },
  "BEZERROS": {
    "nome": "Bezerros",
    "mesorregiao": "Agreste",
    "lat": -8.25826,
    "lng": -35.80918
  },
  "BODOCO": {
    "nome": "Bodocó",
    "mesorregiao": "Sertão",
    "lat": -7.73261,
    "lng": -39.96265
  },
  "BOM CONSELHO": {
    "nome": "Bom Conselho",
    "mesorregiao": "Agreste",
    "lat": -9.1998,
    "lng": -36.64644
  },
  "BOM JARDIM": {
    "nome": "Bom Jardim",
    "mesorregiao": "Agreste",
    "lat": -7.77119,
    "lng": -35.56373
  },
  "BONITO": {
    "nome": "Bonito",
    "mesorregiao": "Agreste",
    "lat": -8.49831,
    "lng": -35.67367
  },
  "BREJAO": {
    "nome": "Brejão",
    "mesorregiao": "Agreste",
    "lat": -9.02776,
    "lng": -36.55371
  },
  "BREJINHO": {
    "nome": "Brejinho",
    "mesorregiao": "Sertão",
    "lat": -7.34385,
    "lng": -37.32553
  },
  "BREJO DA MADRE DE DEUS": {
    "nome": "Brejo da Madre de Deus",
    "mesorregiao": "Agreste",
    "lat": -8.06563,
    "lng": -36.23947
  },
  "BUENOS AIRES": {
    "nome": "Buenos Aires",
    "mesorregiao": "Zona da Mata",
    "lat": -7.74156,
    "lng": -35.35888
  },
  "BUIQUE": {
    "nome": "Buíque",
    "mesorregiao": "Agreste",
    "lat": -8.66556,
    "lng": -37.14594
  },
  "CABO DE SANTO AGOSTINHO": {
    "nome": "Cabo de Santo Agostinho",
    "mesorregiao": "RMR",
    "lat": -8.26257,
    "lng": -35.08439
  },
  "CABROBO": {
    "nome": "Cabrobó",
    "mesorregiao": "Sertão",
    "lat": -8.39068,
    "lng": -39.32025
  },
  "CACHOEIRINHA": {
    "nome": "Cachoeirinha",
    "mesorregiao": "Agreste",
    "lat": -8.47853,
    "lng": -36.29809
  },
  "CAETES": {
    "nome": "Caetés",
    "mesorregiao": "Agreste",
    "lat": -8.80665,
    "lng": -36.66634
  },
  "CALCADO": {
    "nome": "Calçado",
    "mesorregiao": "Agreste",
    "lat": -8.74921,
    "lng": -36.32847
  },
  "CALUMBI": {
    "nome": "Calumbi",
    "mesorregiao": "Sertão",
    "lat": -7.9909,
    "lng": -38.06858
  },
  "CAMARAGIBE": {
    "nome": "Camaragibe",
    "mesorregiao": "RMR",
    "lat": -7.98171,
    "lng": -34.99762
  },
  "CAMOCIM DE SAO FELIX": {
    "nome": "Camocim de São Félix",
    "mesorregiao": "Agreste",
    "lat": -8.36097,
    "lng": -35.74526
  },
  "CAMUTANGA": {
    "nome": "Camutanga",
    "mesorregiao": "Zona da Mata",
    "lat": -7.42742,
    "lng": -35.29676
  },
  "CANHOTINHO": {
    "nome": "Canhotinho",
    "mesorregiao": "Agreste",
    "lat": -8.88137,
    "lng": -36.18203
  },
  "CAPOEIRAS": {
    "nome": "Capoeiras",
    "mesorregiao": "Agreste",
    "lat": -8.68881,
    "lng": -36.56864
  },
  "CARNAIBA": {
    "nome": "Carnaíba",
    "mesorregiao": "Sertão",
    "lat": -7.77941,
    "lng": -37.71319
  },
  "CARNAUBEIRA DA PENHA": {
    "nome": "Carnaubeira da Penha",
    "mesorregiao": "Sertão",
    "lat": -8.42458,
    "lng": -38.74942
  },
  "CARPINA": {
    "nome": "Carpina",
    "mesorregiao": "Zona da Mata",
    "lat": -7.826,
    "lng": -35.32525
  },
  "CARUARU": {
    "nome": "Caruaru",
    "mesorregiao": "Agreste",
    "lat": -8.17332,
    "lng": -36.018
  },
  "CASINHAS": {
    "nome": "Casinhas",
    "mesorregiao": "Agreste",
    "lat": -7.77215,
    "lng": -35.71843
  },
  "CATENDE": {
    "nome": "Catende",
    "mesorregiao": "Zona da Mata",
    "lat": -8.63047,
    "lng": -35.74359
  },
  "CEDRO": {
    "nome": "Cedro",
    "mesorregiao": "Sertão",
    "lat": -7.73379,
    "lng": -39.2094
  },
  "CHA DE ALEGRIA": {
    "nome": "Chã de Alegria",
    "mesorregiao": "Zona da Mata",
    "lat": -7.99969,
    "lng": -35.21384
  },
  "CHA GRANDE": {
    "nome": "Chã Grande",
    "mesorregiao": "Zona da Mata",
    "lat": -8.22693,
    "lng": -35.46665
  },
  "CONDADO": {
    "nome": "Condado",
    "mesorregiao": "Zona da Mata",
    "lat": -7.59283,
    "lng": -35.0847
  },
  "CORRENTES": {
    "nome": "Correntes",
    "mesorregiao": "Agreste",
    "lat": -9.12943,
    "lng": -36.32534
  },
  "CORTES": {
    "nome": "Cortês",
    "mesorregiao": "Zona da Mata",
    "lat": -8.44616,
    "lng": -35.52826
  },
  "CUMARU": {
    "nome": "Cumaru",
    "mesorregiao": "Agreste",
    "lat": -8.03151,
    "lng": -35.7236
  },
  "CUPIRA": {
    "nome": "Cupira",
    "mesorregiao": "Agreste",
    "lat": -8.5821,
    "lng": -35.9101
  },
  "CUSTODIA": {
    "nome": "Custódia",
    "mesorregiao": "Sertão",
    "lat": -8.12137,
    "lng": -37.67851
  },
  "DORMENTES": {
    "nome": "Dormentes",
    "mesorregiao": "Sertão",
    "lat": -8.43592,
    "lng": -40.61422
  },
  "ESCADA": {
    "nome": "Escada",
    "mesorregiao": "Zona da Mata",
    "lat": -8.35947,
    "lng": -35.26759
  },
  "EXU": {
    "nome": "Exu",
    "mesorregiao": "Sertão",
    "lat": -7.55343,
    "lng": -39.69297
  },
  "FEIRA NOVA": {
    "nome": "Feira Nova",
    "mesorregiao": "Agreste",
    "lat": -7.93139,
    "lng": -35.39984
  },
  "FERNANDO DE NORONHA": {
    "nome": "Fernando de Noronha",
    "mesorregiao": "RMR",
    "lat": -3.86053,
    "lng": -32.42953
  },
  "FERREIROS": {
    "nome": "Ferreiros",
    "mesorregiao": "Zona da Mata",
    "lat": -7.48896,
    "lng": -35.21953
  },
  "FLORES": {
    "nome": "Flores",
    "mesorregiao": "Sertão",
    "lat": -7.92912,
    "lng": -37.90422
  },
  "FLORESTA": {
    "nome": "Floresta",
    "mesorregiao": "Sertão",
    "lat": -8.5632,
    "lng": -38.30765
  },
  "FREI MIGUELINHO": {
    "nome": "Frei Miguelinho",
    "mesorregiao": "Agreste",
    "lat": -7.94396,
    "lng": -35.88313
  },
  "GAMELEIRA": {
    "nome": "Gameleira",
    "mesorregiao": "Zona da Mata",
    "lat": -8.60449,
    "lng": -35.39184
  },
  "GARANHUNS": {
    "nome": "Garanhuns",
    "mesorregiao": "Agreste",
    "lat": -8.92335,
    "lng": -36.52801
  },
  "GLORIA DO GOITA": {
    "nome": "Glória do Goitá",
    "mesorregiao": "Zona da Mata",
    "lat": -8.01459,
    "lng": -35.33985
  },
  "GOIANA": {
    "nome": "Goiana",
    "mesorregiao": "Zona da Mata",
    "lat": -7.59851,
    "lng": -34.93671
  },
  "GRANITO": {
    "nome": "Granito",
    "mesorregiao": "Sertão",
    "lat": -7.74616,
    "lng": -39.66536
  },
  "GRAVATA": {
    "nome": "Gravatá",
    "mesorregiao": "Agreste",
    "lat": -8.2448,
    "lng": -35.54567
  },
  "IATI": {
    "nome": "Iati",
    "mesorregiao": "Agreste",
    "lat": -9.16826,
    "lng": -36.92198
  },
  "IBIMIRIM": {
    "nome": "Ibimirim",
    "mesorregiao": "Sertão",
    "lat": -8.55899,
    "lng": -37.78726
  },
  "IBIRAJUBA": {
    "nome": "Ibirajuba",
    "mesorregiao": "Agreste",
    "lat": -8.61293,
    "lng": -36.18438
  },
  "IGARASSU": {
    "nome": "Igarassu",
    "mesorregiao": "RMR",
    "lat": -7.80385,
    "lng": -34.94813
  },
  "IGUARACY": {
    "nome": "Iguaracy",
    "mesorregiao": "Sertão",
    "lat": -7.8454,
    "lng": -37.42582
  },
  "INAJA": {
    "nome": "Inajá",
    "mesorregiao": "Sertão",
    "lat": -8.79819,
    "lng": -37.81258
  },
  "INGAZEIRA": {
    "nome": "Ingazeira",
    "mesorregiao": "Sertão",
    "lat": -7.70737,
    "lng": -37.42786
  },
  "IPOJUCA": {
    "nome": "Ipojuca",
    "mesorregiao": "RMR",
    "lat": -8.45481,
    "lng": -35.05895
  },
  "IPUBI": {
    "nome": "Ipubi",
    "mesorregiao": "Sertão",
    "lat": -7.50992,
    "lng": -40.22762
  },
  "ITACURUBA": {
    "nome": "Itacuruba",
    "mesorregiao": "Sertão",
    "lat": -8.75678,
    "lng": -38.71016
  },
  "ITAIBA": {
    "nome": "Itaíba",
    "mesorregiao": "Agreste",
    "lat": -8.96749,
    "lng": -37.31177
  },
  "ILHA DE ITAMARACA": {
    "nome": "Ilha de Itamaracá",
    "mesorregiao": "RMR",
    "lat": -7.75121,
    "lng": -34.85223
  },
  "ITAMBE": {
    "nome": "Itambé",
    "mesorregiao": "Zona da Mata",
    "lat": -7.44858,
    "lng": -35.16839
  },
  "ITAPETIM": {
    "nome": "Itapetim",
    "mesorregiao": "Sertão",
    "lat": -7.39748,
    "lng": -37.1313
  },
  "ITAPISSUMA": {
    "nome": "Itapissuma",
    "mesorregiao": "RMR",
    "lat": -7.73248,
    "lng": -34.90181
  },
  "ITAQUITINGA": {
    "nome": "Itaquitinga",
    "mesorregiao": "Zona da Mata",
    "lat": -7.6755,
    "lng": -35.06101
  },
  "JABOATAO DOS GUARARAPES": {
    "nome": "Jaboatão dos Guararapes",
    "mesorregiao": "RMR",
    "lat": -8.16082,
    "lng": -34.99214
  },
  "JAQUEIRA": {
    "nome": "Jaqueira",
    "mesorregiao": "Zona da Mata",
    "lat": -8.7321,
    "lng": -35.80336
  },
  "JATAUBA": {
    "nome": "Jataúba",
    "mesorregiao": "Agreste",
    "lat": -8.05712,
    "lng": -36.56416
  },
  "JATOBA": {
    "nome": "Jatobá",
    "mesorregiao": "Sertão",
    "lat": -9.2004,
    "lng": -38.19349
  },
  "JOAO ALFREDO": {
    "nome": "João Alfredo",
    "mesorregiao": "Agreste",
    "lat": -7.84855,
    "lng": -35.56893
  },
  "JOAQUIM NABUCO": {
    "nome": "Joaquim Nabuco",
    "mesorregiao": "Zona da Mata",
    "lat": -8.51331,
    "lng": -35.53007
  },
  "JUCATI": {
    "nome": "Jucati",
    "mesorregiao": "Agreste",
    "lat": -8.7372,
    "lng": -36.46518
  },
  "JUPI": {
    "nome": "Jupi",
    "mesorregiao": "Agreste",
    "lat": -8.74074,
    "lng": -36.38439
  },
  "JUREMA": {
    "nome": "Jurema",
    "mesorregiao": "Agreste",
    "lat": -8.76229,
    "lng": -36.14084
  },
  "LAGOA DO CARRO": {
    "nome": "Lagoa do Carro",
    "mesorregiao": "Zona da Mata",
    "lat": -7.84684,
    "lng": -35.33812
  },
  "LAGOA DE ITAENGA": {
    "nome": "Lagoa de Itaenga",
    "mesorregiao": "Zona da Mata",
    "lat": -7.90088,
    "lng": -35.30755
  },
  "LAGOA DO OURO": {
    "nome": "Lagoa do Ouro",
    "mesorregiao": "Agreste",
    "lat": -9.17384,
    "lng": -36.47327
  },
  "LAGOA DOS GATOS": {
    "nome": "Lagoa dos Gatos",
    "mesorregiao": "Agreste",
    "lat": -8.68623,
    "lng": -35.88755
  },
  "LAGOA GRANDE": {
    "nome": "Lagoa Grande",
    "mesorregiao": "Sertão",
    "lat": -8.78508,
    "lng": -40.24182
  },
  "LAJEDO": {
    "nome": "Lajedo",
    "mesorregiao": "Agreste",
    "lat": -8.67124,
    "lng": -36.28612
  },
  "LIMOEIRO": {
    "nome": "Limoeiro",
    "mesorregiao": "Agreste",
    "lat": -7.8671,
    "lng": -35.42561
  },
  "MACAPARANA": {
    "nome": "Macaparana",
    "mesorregiao": "Zona da Mata",
    "lat": -7.53795,
    "lng": -35.44765
  },
  "MACHADOS": {
    "nome": "Machados",
    "mesorregiao": "Agreste",
    "lat": -7.70815,
    "lng": -35.50451
  },
  "MANARI": {
    "nome": "Manari",
    "mesorregiao": "Sertão",
    "lat": -8.90775,
    "lng": -37.525
  },
  "MARAIAL": {
    "nome": "Maraial",
    "mesorregiao": "Zona da Mata",
    "lat": -8.83196,
    "lng": -35.7845
  },
  "MIRANDIBA": {
    "nome": "Mirandiba",
    "mesorregiao": "Sertão",
    "lat": -8.17464,
    "lng": -38.71874
  },
  "MORENO": {
    "nome": "Moreno",
    "mesorregiao": "RMR",
    "lat": -8.15572,
    "lng": -35.13766
  },
  "NAZARE DA MATA": {
    "nome": "Nazaré da Mata",
    "mesorregiao": "Zona da Mata",
    "lat": -7.71278,
    "lng": -35.18014
  },
  "OLINDA": {
    "nome": "Olinda",
    "mesorregiao": "RMR",
    "lat": -7.99152,
    "lng": -34.87123
  },
  "OROBO": {
    "nome": "Orobó",
    "mesorregiao": "Agreste",
    "lat": -7.71926,
    "lng": -35.61976
  },
  "OROCO": {
    "nome": "Orocó",
    "mesorregiao": "Sertão",
    "lat": -8.48879,
    "lng": -39.58879
  },
  "OURICURI": {
    "nome": "Ouricuri",
    "mesorregiao": "Sertão",
    "lat": -8.0155,
    "lng": -40.13964
  },
  "PALMARES": {
    "nome": "Palmares",
    "mesorregiao": "Zona da Mata",
    "lat": -8.59449,
    "lng": -35.64462
  },
  "PALMEIRINA": {
    "nome": "Palmeirina",
    "mesorregiao": "Agreste",
    "lat": -9.01385,
    "lng": -36.23381
  },
  "PANELAS": {
    "nome": "Panelas",
    "mesorregiao": "Agreste",
    "lat": -8.66202,
    "lng": -36.04053
  },
  "PARANATAMA": {
    "nome": "Paranatama",
    "mesorregiao": "Agreste",
    "lat": -8.89349,
    "lng": -36.69899
  },
  "PARNAMIRIM": {
    "nome": "Parnamirim",
    "mesorregiao": "Sertão",
    "lat": -8.1974,
    "lng": -39.74975
  },
  "PASSIRA": {
    "nome": "Passira",
    "mesorregiao": "Agreste",
    "lat": -7.98383,
    "lng": -35.5405
  },
  "PAUDALHO": {
    "nome": "Paudalho",
    "mesorregiao": "Zona da Mata",
    "lat": -7.92077,
    "lng": -35.13364
  },
  "PAULISTA": {
    "nome": "Paulista",
    "mesorregiao": "RMR",
    "lat": -7.92598,
    "lng": -34.90742
  },
  "PEDRA": {
    "nome": "Pedra",
    "mesorregiao": "Agreste",
    "lat": -8.6209,
    "lng": -36.90544
  },
  "PESQUEIRA": {
    "nome": "Pesqueira",
    "mesorregiao": "Agreste",
    "lat": -8.39357,
    "lng": -36.73239
  },
  "PETROLANDIA": {
    "nome": "Petrolândia",
    "mesorregiao": "Sertão",
    "lat": -8.81315,
    "lng": -38.3774
  },
  "PETROLINA": {
    "nome": "Petrolina",
    "mesorregiao": "Sertão",
    "lat": -9.06566,
    "lng": -40.57195
  },
  "POCAO": {
    "nome": "Poção",
    "mesorregiao": "Agreste",
    "lat": -8.21705,
    "lng": -36.70309
  },
  "POMBOS": {
    "nome": "Pombos",
    "mesorregiao": "Zona da Mata",
    "lat": -8.19175,
    "lng": -35.40552
  },
  "PRIMAVERA": {
    "nome": "Primavera",
    "mesorregiao": "Zona da Mata",
    "lat": -8.30601,
    "lng": -35.39759
  },
  "QUIPAPA": {
    "nome": "Quipapá",
    "mesorregiao": "Zona da Mata",
    "lat": -8.82756,
    "lng": -36.03434
  },
  "QUIXABA": {
    "nome": "Quixaba",
    "mesorregiao": "Sertão",
    "lat": -7.70808,
    "lng": -37.85173
  },
  "RECIFE": {
    "nome": "Recife",
    "mesorregiao": "RMR",
    "lat": -8.02084,
    "lng": -34.95074
  },
  "RIACHO DAS ALMAS": {
    "nome": "Riacho das Almas",
    "mesorregiao": "Agreste",
    "lat": -8.06389,
    "lng": -35.85329
  },
  "RIBEIRAO": {
    "nome": "Ribeirão",
    "mesorregiao": "Zona da Mata",
    "lat": -8.48298,
    "lng": -35.4237
  },
  "RIO FORMOSO": {
    "nome": "Rio Formoso",
    "mesorregiao": "Zona da Mata",
    "lat": -8.67524,
    "lng": -35.22022
  },
  "SAIRE": {
    "nome": "Sairé",
    "mesorregiao": "Agreste",
    "lat": -8.33085,
    "lng": -35.70792
  },
  "SALGADINHO": {
    "nome": "Salgadinho",
    "mesorregiao": "Agreste",
    "lat": -7.91662,
    "lng": -35.56344
  },
  "SALGUEIRO": {
    "nome": "Salgueiro",
    "mesorregiao": "Sertão",
    "lat": -8.08367,
    "lng": -39.0707
  },
  "SALOA": {
    "nome": "Saloá",
    "mesorregiao": "Agreste",
    "lat": -9.00587,
    "lng": -36.72928
  },
  "SANHARO": {
    "nome": "Sanharó",
    "mesorregiao": "Agreste",
    "lat": -8.32956,
    "lng": -36.53056
  },
  "SANTA CRUZ": {
    "nome": "Santa Cruz",
    "mesorregiao": "Sertão",
    "lat": -8.29565,
    "lng": -40.30964
  },
  "SANTA CRUZ DA BAIXA VERDE": {
    "nome": "Santa Cruz da Baixa Verde",
    "mesorregiao": "Sertão",
    "lat": -7.85139,
    "lng": -38.16657
  },
  "SANTA CRUZ DO CAPIBARIBE": {
    "nome": "Santa Cruz do Capibaribe",
    "mesorregiao": "Agreste",
    "lat": -7.90676,
    "lng": -36.32519
  },
  "SANTA FILOMENA": {
    "nome": "Santa Filomena",
    "mesorregiao": "Sertão",
    "lat": -8.27024,
    "lng": -40.59167
  },
  "SANTA MARIA DA BOA VISTA": {
    "nome": "Santa Maria da Boa Vista",
    "mesorregiao": "Sertão",
    "lat": -8.61788,
    "lng": -39.92067
  },
  "SANTA MARIA DO CAMBUCA": {
    "nome": "Santa Maria do Cambucá",
    "mesorregiao": "Agreste",
    "lat": -7.81343,
    "lng": -35.88197
  },
  "SANTA TEREZINHA": {
    "nome": "Santa Terezinha",
    "mesorregiao": "Sertão",
    "lat": -7.43512,
    "lng": -37.44208
  },
  "SAO BENEDITO DO SUL": {
    "nome": "São Benedito do Sul",
    "mesorregiao": "Zona da Mata",
    "lat": -8.80467,
    "lng": -35.90697
  },
  "SAO BENTO DO UNA": {
    "nome": "São Bento do Una",
    "mesorregiao": "Agreste",
    "lat": -8.52437,
    "lng": -36.44588
  },
  "SAO CAITANO": {
    "nome": "São Caitano",
    "mesorregiao": "Agreste",
    "lat": -8.34575,
    "lng": -36.1508
  },
  "SAO JOAO": {
    "nome": "São João",
    "mesorregiao": "Agreste",
    "lat": -8.85857,
    "lng": -36.38912
  },
  "SAO JOAQUIM DO MONTE": {
    "nome": "São Joaquim do Monte",
    "mesorregiao": "Agreste",
    "lat": -8.45912,
    "lng": -35.83089
  },
  "SAO JOSE DA COROA GRANDE": {
    "nome": "São José da Coroa Grande",
    "mesorregiao": "Zona da Mata",
    "lat": -8.87046,
    "lng": -35.18753
  },
  "SAO JOSE DO BELMONTE": {
    "nome": "São José do Belmonte",
    "mesorregiao": "Sertão",
    "lat": -7.82673,
    "lng": -38.7694
  },
  "SAO JOSE DO EGITO": {
    "nome": "São José do Egito",
    "mesorregiao": "Sertão",
    "lat": -7.53781,
    "lng": -37.26815
  },
  "SAO LOURENCO DA MATA": {
    "nome": "São Lourenço da Mata",
    "mesorregiao": "RMR",
    "lat": -8.01753,
    "lng": -35.1016
  },
  "SAO VICENTE FERRER": {
    "nome": "São Vicente Férrer",
    "mesorregiao": "Agreste",
    "lat": -7.59603,
    "lng": -35.49118
  },
  "SERRA TALHADA": {
    "nome": "Serra Talhada",
    "mesorregiao": "Sertão",
    "lat": -8.05696,
    "lng": -38.37023
  },
  "SERRITA": {
    "nome": "Serrita",
    "mesorregiao": "Sertão",
    "lat": -7.8336,
    "lng": -39.39883
  },
  "SERTANIA": {
    "nome": "Sertânia",
    "mesorregiao": "Sertão",
    "lat": -8.21188,
    "lng": -37.33361
  },
  "SIRINHAEM": {
    "nome": "Sirinhaém",
    "mesorregiao": "Zona da Mata",
    "lat": -8.58435,
    "lng": -35.14976
  },
  "MOREILANDIA": {
    "nome": "Moreilândia",
    "mesorregiao": "Sertão",
    "lat": -7.63111,
    "lng": -39.52842
  },
  "SOLIDAO": {
    "nome": "Solidão",
    "mesorregiao": "Sertão",
    "lat": -7.59748,
    "lng": -37.65588
  },
  "SURUBIM": {
    "nome": "Surubim",
    "mesorregiao": "Agreste",
    "lat": -7.85299,
    "lng": -35.75239
  },
  "TABIRA": {
    "nome": "Tabira",
    "mesorregiao": "Sertão",
    "lat": -7.60042,
    "lng": -37.50328
  },
  "TACAIMBO": {
    "nome": "Tacaimbó",
    "mesorregiao": "Agreste",
    "lat": -8.33955,
    "lng": -36.25004
  },
  "TACARATU": {
    "nome": "Tacaratu",
    "mesorregiao": "Sertão",
    "lat": -8.97538,
    "lng": -38.02185
  },
  "TAMANDARE": {
    "nome": "Tamandaré",
    "mesorregiao": "Zona da Mata",
    "lat": -8.75073,
    "lng": -35.19348
  },
  "TAQUARITINGA DO NORTE": {
    "nome": "Taquaritinga do Norte",
    "mesorregiao": "Agreste",
    "lat": -7.88055,
    "lng": -36.10763
  },
  "TEREZINHA": {
    "nome": "Terezinha",
    "mesorregiao": "Agreste",
    "lat": -9.08066,
    "lng": -36.60743
  },
  "TERRA NOVA": {
    "nome": "Terra Nova",
    "mesorregiao": "Sertão",
    "lat": -8.16467,
    "lng": -39.38697
  },
  "TIMBAUBA": {
    "nome": "Timbaúba",
    "mesorregiao": "Zona da Mata",
    "lat": -7.53345,
    "lng": -35.31704
  },
  "TORITAMA": {
    "nome": "Toritama",
    "mesorregiao": "Agreste",
    "lat": -7.99826,
    "lng": -36.05421
  },
  "TRACUNHAEM": {
    "nome": "Tracunhaém",
    "mesorregiao": "Zona da Mata",
    "lat": -7.74009,
    "lng": -35.14836
  },
  "TRINDADE": {
    "nome": "Trindade",
    "mesorregiao": "Sertão",
    "lat": -7.75287,
    "lng": -40.31408
  },
  "TRIUNFO": {
    "nome": "Triunfo",
    "mesorregiao": "Sertão",
    "lat": -7.85049,
    "lng": -38.05957
  },
  "TUPANATINGA": {
    "nome": "Tupanatinga",
    "mesorregiao": "Agreste",
    "lat": -8.67275,
    "lng": -37.2661
  },
  "TUPARETAMA": {
    "nome": "Tuparetama",
    "mesorregiao": "Sertão",
    "lat": -7.69762,
    "lng": -37.25091
  },
  "VENTUROSA": {
    "nome": "Venturosa",
    "mesorregiao": "Agreste",
    "lat": -8.57888,
    "lng": -36.81321
  },
  "VERDEJANTE": {
    "nome": "Verdejante",
    "mesorregiao": "Sertão",
    "lat": -7.97819,
    "lng": -38.99532
  },
  "VERTENTE DO LERIO": {
    "nome": "Vertente do Lério",
    "mesorregiao": "Agreste",
    "lat": -7.78418,
    "lng": -35.80794
  },
  "VERTENTES": {
    "nome": "Vertentes",
    "mesorregiao": "Agreste",
    "lat": -7.89934,
    "lng": -35.98998
  },
  "VICENCIA": {
    "nome": "Vicência",
    "mesorregiao": "Zona da Mata",
    "lat": -7.65487,
    "lng": -35.36694
  },
  "VITORIA DE SANTO ANTAO": {
    "nome": "Vitória de Santo Antão",
    "mesorregiao": "Zona da Mata",
    "lat": -8.14487,
    "lng": -35.28775
  },
  "XEXEU": {
    "nome": "Xexéu",
    "mesorregiao": "Zona da Mata",
    "lat": -8.84611,
    "lng": -35.63881
  }
};
