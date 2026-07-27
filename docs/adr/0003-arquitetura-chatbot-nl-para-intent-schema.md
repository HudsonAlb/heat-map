# ADR 0003: Arquitetura de Chatbot de Consulta NL -> Intent Schema -> Query Parametrizada

- **Status:** Aceito
- **Data:** 2026-07-27
- **Autor:** Agente Antigravity (Berlim Co.)

## Contexto e Problema

Para permitir navegação em linguagem natural sem comprometer a segurança da base de produção (evitando SQL Injection, vazamento de escopo RBAC ou alucinação de números pelo modelo de IA), o chatbot não pode gerar nem executar consultas SQL puras e arbitrárias contra o banco de dados.

## Decisão

Adotar o padrão **NL -> Intent Schema (Zod) -> Query Execution Parametrizada -> Text Formatting + Deep Link**:

1. **Parser de Intenção (`intentParser.ts`):**
   - Transforma a frase em português ("Quais os 10 bairros de maior oportunidade em Caruaru?") em um objeto JSON estritamente validado por um schema Zod.
   - Campos: `intencao`, `candidatos`, `recorte` (camada, UF, municípios, bairros), `eleicao` (ano, turno, cargo), `metrica`, `ordenacao`, `limite`.

2. **Executor Parametrizado (`queryExecutor.ts`):**
   - Mapeia o objeto `Intent` para handlers de consulta pré-compilados com parâmetros seguros.
   - Aplica os filtros do RBAC e escopo geográfico do usuário autenticado.

3. **Gerador de Respostas:**
   - Responde com os dados numéricos exatos retornados da query, citando formalmente a fonte (Ano, Camada, Filtros, Timestamp ETL) e anexando um **Deep Link** para visualização direta no mapa do dashboard.

## Consequências

- **Positivas:** Zero risco de SQL Injection; garantia de rastreabilidade e precisão numérica; facilidade de navegação com deep links no frontend.
