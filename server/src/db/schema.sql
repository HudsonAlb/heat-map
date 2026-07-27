-- =============================================================================
-- GEOVOTO - MODELO DE DADOS POSTGRESQL + POSTGIS
-- Berlim Co. | Inteligência Eleitoral Geográfica
-- =============================================================================

-- Habilita extensão espacial PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

-- -----------------------------------------------------------------------------
-- 1. ELEIÇÃO
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS eleicao (
    id SERIAL PRIMARY KEY,
    ano INT NOT NULL,
    turno INT NOT NULL DEFAULT 1,
    tipo_pleito VARCHAR(50) NOT NULL DEFAULT 'GERAL', -- GERAL ou MUNICIPAL
    uf VARCHAR(2) NOT NULL,
    descricao VARCHAR(100),
    CONSTRAINT uk_eleicao UNIQUE (ano, turno, uf)
);

-- -----------------------------------------------------------------------------
-- 2. CANDIDATO
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS candidato (
    id SERIAL PRIMARY KEY,
    sq_candidato_tse BIGINT UNIQUE NOT NULL,
    nome_urna VARCHAR(150) NOT NULL,
    nome_completo VARCHAR(255) NOT NULL,
    cpf_hash VARCHAR(64),
    partido VARCHAR(20) NOT NULL,
    numero INT NOT NULL,
    cargo VARCHAR(50) NOT NULL, -- DEPUTADO ESTADUAL, DEPUTADO FEDERAL, GOVERNADOR, SENADOR, PREFEITO
    eleicao_id INT NOT NULL REFERENCES eleicao(id) ON DELETE CASCADE,
    situacao VARCHAR(50) DEFAULT 'DEFERIDO',
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_candidato_busca ON candidato(eleicao_id, cargo, partido);
CREATE INDEX IF NOT EXISTS idx_candidato_nome ON candidato(nome_urna);

-- -----------------------------------------------------------------------------
-- 3. LOCAL DE VOTAÇÃO
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS local_votacao (
    id SERIAL PRIMARY KEY,
    uf VARCHAR(2) NOT NULL,
    cod_municipio_tse INT NOT NULL,
    cod_municipio_ibge INT NOT NULL,
    nome_municipio VARCHAR(150) NOT NULL,
    mesorregiao VARCHAR(150) NOT NULL,
    microrregiao VARCHAR(150) NOT NULL,
    nome_local VARCHAR(255) NOT NULL,
    endereco VARCHAR(255),
    bairro VARCHAR(150) NOT NULL,
    cep VARCHAR(10),
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    geometria GEOMETRY(Point, 4326),
    geometria_aproximada BOOLEAN DEFAULT FALSE,
    zona INT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_local_votacao_geo ON local_votacao USING GIST(geometria);
CREATE INDEX IF NOT EXISTS idx_local_votacao_mun ON local_votacao(cod_municipio_tse, bairro);

-- -----------------------------------------------------------------------------
-- 4. SEÇÃO ELEITORAL
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS secao (
    id SERIAL PRIMARY KEY,
    local_votacao_id INT NOT NULL REFERENCES local_votacao(id) ON DELETE CASCADE,
    zona INT NOT NULL,
    numero_secao INT NOT NULL,
    qt_aptos INT NOT NULL DEFAULT 0,
    CONSTRAINT uk_secao UNIQUE (local_votacao_id, zona, numero_secao)
);

-- -----------------------------------------------------------------------------
-- 5. VOTAÇÃO POR SEÇÃO (TABELA FATO)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS votacao_secao (
    id BIGSERIAL PRIMARY KEY,
    eleicao_id INT NOT NULL REFERENCES eleicao(id) ON DELETE CASCADE,
    candidato_id INT NOT NULL REFERENCES candidato(id) ON DELETE CASCADE,
    secao_id INT NOT NULL REFERENCES secao(id) ON DELETE CASCADE,
    qt_votos INT NOT NULL DEFAULT 0,
    CONSTRAINT uk_votacao_secao_cand UNIQUE (eleicao_id, candidato_id, secao_id)
);

CREATE INDEX IF NOT EXISTS idx_votacao_secao_cand ON votacao_secao(eleicao_id, candidato_id);
CREATE INDEX IF NOT EXISTS idx_votacao_secao_sec ON votacao_secao(secao_id);

-- -----------------------------------------------------------------------------
-- 6. MALHA GEOGRÁFICA (MESO, MICRO, MUNICÍPIO, BAIRRO)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS malha_geo (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(30) NOT NULL, -- mesorregiao, microrregiao, municipio, bairro
    cod_ibge INT,
    nome VARCHAR(150) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    geometria GEOMETRY(Geometry, 4326),
    geometria_aproximada BOOLEAN DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_malha_geo_spatial ON malha_geo USING GIST(geometria);
CREATE INDEX IF NOT EXISTS idx_malha_geo_tipo_nome ON malha_geo(tipo, nome, uf);

-- -----------------------------------------------------------------------------
-- 7. DOBRADINHA SALVA POR CAMPANHA
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dobradinha (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    candidato_a_id INT NOT NULL REFERENCES candidato(id) ON DELETE CASCADE,
    candidato_b_id INT NOT NULL REFERENCES candidato(id) ON DELETE CASCADE,
    eleicao_referencia_id INT NOT NULL REFERENCES eleicao(id) ON DELETE CASCADE,
    criado_por VARCHAR(150) NOT NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 8. USUÁRIO & RBAC
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    papel VARCHAR(50) NOT NULL, -- responsavel_campanha, coordenador_geral, coordenador_regional, gestor_midia
    escopo_geografico JSONB NOT NULL DEFAULT '{"uf": "PE"}', -- ex: {"uf": "PE", "municipios": ["Recife", "Olinda"]}
    campanha_id INT,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 9. LOG DE PROVENIÊNCIA ETL
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS log_etl (
    id SERIAL PRIMARY KEY,
    data_execucao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    fonte_url VARCHAR(255) NOT NULL,
    hash_arquivo VARCHAR(64) NOT NULL,
    linhas_processadas INT NOT NULL,
    status VARCHAR(50) NOT NULL, -- SUCESSO, ERRO_VALIDACAO, ERRO_RECONCILIACAO
    mensagem TEXT
);

-- =============================================================================
-- MATERIALIZED VIEWS PARA PERFORMANCE DE CONSULTA POR CAMADA
-- =============================================================================

-- Agregação por Bairro
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_votacao_bairro AS
SELECT 
    v.eleicao_id,
    v.candidato_id,
    l.uf,
    l.mesorregiao,
    l.microrregiao,
    l.cod_municipio_tse,
    l.cod_municipio_ibge,
    l.nome_municipio,
    l.bairro,
    SUM(v.qt_votos) AS total_votos,
    SUM(s.qt_aptos) AS total_aptos,
    COUNT(DISTINCT s.id) AS total_secoes
FROM votacao_secao v
JOIN secao s ON v.secao_id = s.id
JOIN local_votacao l ON s.local_votacao_id = l.id
GROUP BY v.eleicao_id, v.candidato_id, l.uf, l.mesorregiao, l.microrregiao, 
         l.cod_municipio_tse, l.cod_municipio_ibge, l.nome_municipio, l.bairro;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_bairro ON mv_votacao_bairro(eleicao_id, candidato_id, cod_municipio_tse, bairro);

-- Agregação por Município
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_votacao_municipio AS
SELECT 
    eleicao_id,
    candidato_id,
    uf,
    mesorregiao,
    microrregiao,
    cod_municipio_tse,
    cod_municipio_ibge,
    nome_municipio,
    SUM(total_votos) AS total_votos,
    SUM(total_aptos) AS total_aptos,
    SUM(total_secoes) AS total_secoes,
    COUNT(DISTINCT bairro) AS total_bairros
FROM mv_votacao_bairro
GROUP BY eleicao_id, candidato_id, uf, mesorregiao, microrregiao, 
         cod_municipio_tse, cod_municipio_ibge, nome_municipio;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_municipio ON mv_votacao_municipio(eleicao_id, candidato_id, cod_municipio_tse);

-- Agregação por Mesorregião
CREATE MATERIALIZED VIEW IF NOT EXISTS mv_votacao_mesorregiao AS
SELECT 
    eleicao_id,
    candidato_id,
    uf,
    mesorregiao,
    SUM(total_votos) AS total_votos,
    SUM(total_aptos) AS total_aptos,
    SUM(total_secoes) AS total_secoes,
    COUNT(DISTINCT cod_municipio_tse) AS total_municipios
FROM mv_votacao_municipio
GROUP BY eleicao_id, candidato_id, uf, mesorregiao;

CREATE UNIQUE INDEX IF NOT EXISTS idx_mv_mesorregiao ON mv_votacao_mesorregiao(eleicao_id, candidato_id, uf, mesorregiao);
