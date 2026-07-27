# ADR 0001: Modelo de Dados PostgreSQL + PostGIS e Materialized Views

- **Status:** Aceito
- **Data:** 2026-07-27
- **Autor:** Agente Antigravity (Berlim Co.)

## Contexto e Problema

A plataforma **GeoVoto** exige granularidade no nível de seção eleitoral (unidade atômica) com capacidade de navegação fluida entre camadas geográficas (Mesorregião, Município, Bairro e Seção), garantindo consultas de baixa latência (< 2s) sem perda de precisão RSR (Rastreabilidade Sem Restrições) dos dados oficiais do TSE.

## Decisão

Adotar **PostgreSQL com extensão PostGIS** para armazenamento relacional e espacial, estruturado da seguinte forma:

1. **Tabelas Principais:**
   - `eleicao`: Registro de pleito, ano, turno e UF.
   - `candidato`: Dados de urna, partido, número, cargo e `sq_candidato_tse`.
   - `local_votacao`: Locais físicos de votação com coordenadas geográficas `(latitude, longitude)` e índice GiST.
   - `secao`: Seções vinculadas a um local de votação e quantidade de eleitores aptos.
   - `votacao_secao`: Tabela fato que registra os votos computados por candidato e seção.
   - `malha_geo`: Polígonos das divisões territoriais (IBGE e bairros) com tipo de geometria e índice espacial GiST.
   - `dobradinha`: Duplas de candidatos salvas por campanhas.
   - `usuario`: Usuários do sistema com papel RBAC e escopo geográfico.
   - `log_etl`: Log auditável de proveniência de cargas.

2. **Materialized Views:**
   - Criar Views Materializadas pré-calculadas por camada (`mv_votacao_mesorregiao`, `mv_votacao_municipio`, `mv_votacao_bairro`) com atualização ao final de cada pipeline diário de ETL.

## Consequências

- **Positivas:** Desempenho excelente em queries agregadas; suporte a buscas espaciais nativas com PostGIS (`ST_Contains`, `ST_DWithin`); integridade referencial forte.
- **Negativas:** Necessidade de gerenciar refresh de materialized views durante cargas volumosas do TSE.
