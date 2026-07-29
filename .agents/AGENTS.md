# Diretrizes de Desenvolvimento e Regras Gerais do Projeto GEOVOTOS

## 📌 Regra Fundamental: Integridade Estrita de Dados Oficiais do TSE

> [!IMPORTANT]
> **PROIBIÇÃO DE DADOS FICTÍCIOS OU SIMULADOS:**
> Em hipótese alguma o sistema, backend, motores de estatística, gráficos ou mapas de calor deverão inventar, simular, interpolar ou estimar dados de votação, seções ou eleitores.

### 🎯 Princípios Norteadores:
1. **Dados Estritamente Reais da API/TSE**:
   - Todo e qualquer dado exibido nos mapas, tabelas, resumos, filtros ou chatbot deve derivar unicamente dos registros oficiais fornecidos pela API/repositório de dados do **TSE (Tribunal Superior Eleitoral - DivulgaCandContas / Dados Abertos)**.

2. **Ausência de Registro = Votação Zero (0 Votos)**:
   - Caso um candidato não possua votos registrados em determinada seção, bairro ou município na base de dados oficial, o valor retornado **DEVE ser estritamente 0 (zero)**.
   - Nenhuma função helper ou gerador de fallback poderá aplicar multiplicadores, porcentagens determinísticas ou pisos mínimos de peso (`weight > 0`) quando o valor real for zero.

3. **Fidelidade Visual do Mapa de Calor**:
   - O mapa de calor (heatmap) deve refletir de forma matemática e física a densidade real dos votos. Locais com 0 votos devem ter peso 0 (`weight = 0`) e ser omissos da camada de calor.
