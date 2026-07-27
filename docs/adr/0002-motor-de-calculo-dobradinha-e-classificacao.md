# ADR 0002: Motor de Cálculo da Dobradinha e Classificação de Território

- **Status:** Aceito
- **Data:** 2026-07-27
- **Autor:** Agente Antigravity (Berlim Co.)

## Contexto e Problema

A tese central do GeoVoto é identificar territorialmente onde uma dobradinha (Candidato A + Candidato B) possui potencial de transferência de votos, sobreposição ou oportunidade de expansão eleitoral. A computação deve ser parametrizada por quantis locais e resistente a distorções causadas por variação populacional ou dados faltantes.

## Decisão

Implementar um motor de cálculo determinístico em TypeScript no backend (`server/src/engine/dobradinhaCalculator.ts` e `territoryClassifier.ts`):

1. **Métricas por Unidade Geográfica ($g$):**
   - $\text{aderencia}_A(g) = \frac{\text{votos}_A(g)}{\text{comparecimento}(g)}$
   - $\text{aderencia}_B(g) = \frac{\text{votos}_B(g)}{\text{comparecimento}(g)}$
   - $\text{forca}(g) = \text{aderencia}_A(g) + \text{aderencia}_B(g)$
   - $\text{sobreposicao}(g) = \frac{\min(\text{aderencia}_A(g), \text{aderencia}_B(g))}{\max(\text{aderencia}_A(g), \text{aderencia}_B(g))}$
   - $\text{complementaridade}(g) = |\text{aderencia}_A(g) - \text{aderencia}_B(g)|$
   - $\text{peso\_absoluto}(g) = \frac{\text{votos}_A(g) + \text{votos}_B(g)}{\text{total\_votos\_dobradinha}}$

2. **Classificação contra Percentis (Parametrizável por Campanha):**
   - **FORÇA:** $\text{forca} \ge P75 \land \text{peso\_absoluto} \ge P50$
   - **OPORTUNIDADE:** $P25 \le \text{forca} < P75 \land \text{aptos} \ge P60$
   - **RISCO:** $\text{forca} \le P25 \land \text{peso\_absoluto} \ge P50$
   - **NEUTRO:** Demais casos.

3. **Regras Invioláveis:**
   - Tratamento explícito de `null` em seções sem dado (exclusão do denominador, sem converter para 0).
   - Flag `geometria_aproximada` para seções clusterizadas via DBSCAN.

## Consequências

- **Positivas:** Raciocínio estatístico sólido; alinhado com a tomada de decisão estratégica de campanhas; sem hardcode de limiares fixos não contextuais.
