/**
 * B DASH / Dash de RevOps - Armazém de Dados de Inteligência de Receita (CRM + Outras Fontes)
 * Berlim Co.
 */

import { RevOpsDashboardData, FonteRevOps } from '../types/revops';

export function obterDadosRevOps(fonte: FonteRevOps = 'crm'): RevOpsDashboardData {
  const isCrm = fonte === 'crm';

  return {
    fonte,
    timestampAtualizacao: new Date().toISOString(),
    metas: {
      anual: {
        ano: 2026,
        metaTotal: 12000000,
        realizado: isCrm ? 8450000 : 2150000,
        pctAtingido: isCrm ? 70.4 : 61.4,
        projecaoAno: isCrm ? 12350000 : 3100000,
      },
      quarters: [
        {
          quarter: 'Q1',
          meta: 3000000,
          realizado: isCrm ? 2950000 : 750000,
          pctAtingido: isCrm ? 98.3 : 75.0,
          status: 'CONCLUIDO',
        },
        {
          quarter: 'Q2',
          meta: 3000000,
          realizado: isCrm ? 3100000 : 820000,
          pctAtingido: isCrm ? 103.3 : 82.0,
          status: 'CONCLUIDO',
        },
        {
          quarter: 'Q3',
          meta: 3000000,
          realizado: isCrm ? 2400000 : 580000,
          pctAtingido: isCrm ? 80.0 : 58.0,
          status: 'CONCLUIDO',
        },
        {
          quarter: 'Q4',
          meta: 3000000,
          realizado: isCrm ? 2000000 : 450000,
          pctAtingido: isCrm ? 66.7 : 45.0,
          status: 'EM_ANDAMENTO',
        },
      ],
      mensal: {
        mesNome: 'Julho 2026',
        meta: 1000000,
        realizado: isCrm ? 850000 : 180000,
        projecao: isCrm ? 1050000 : 220000,
        pctAtingido: isCrm ? 85.0 : 72.0,
      },
    },

    // Relatório: Resultado por Canal de Aquisição
    canaisAquisicao: isCrm
      ? [
          {
            canal: 'Google Ads (Mídia Paga)',
            icone: '🔍',
            leads: 2450,
            oportunidades: 380,
            vendas: 48,
            receitaTotal: 2160000,
            ticketMedio: 45000,
            cac: 3200,
            taxaConversao: 1.95,
          },
          {
            canal: 'Outbound SDR (Prospecção)',
            icone: '🎯',
            leads: 1800,
            oportunidades: 310,
            vendas: 42,
            receitaTotal: 2310000,
            ticketMedio: 55000,
            cac: 4100,
            taxaConversao: 2.33,
          },
          {
            canal: 'Inbound SEO & Conteúdo',
            icone: '🚀',
            leads: 3100,
            oportunidades: 290,
            vendas: 35,
            receitaTotal: 1575000,
            ticketMedio: 45000,
            cac: 1800,
            taxaConversao: 1.12,
          },
          {
            canal: 'Meta Ads (Instagram/FB)',
            icone: '📱',
            leads: 1950,
            oportunidades: 190,
            vendas: 22,
            receitaTotal: 880000,
            ticketMedio: 40000,
            cac: 2900,
            taxaConversao: 1.13,
          },
          {
            canal: 'Indicações & Parcerias',
            icone: '🤝',
            leads: 420,
            oportunidades: 145,
            vendas: 28,
            receitaTotal: 1525000,
            ticketMedio: 54464,
            cac: 1200,
            taxaConversao: 6.66,
          },
        ]
      : [
          {
            canal: 'Eventos & Feiras Presenciais',
            icone: '🏛️',
            leads: 650,
            oportunidades: 110,
            vendas: 18,
            receitaTotal: 1150000,
            ticketMedio: 63888,
            cac: 5200,
            taxaConversao: 2.76,
          },
          {
            canal: 'Vendas Diretas Base Legada',
            icone: '📁',
            leads: 380,
            oportunidades: 85,
            vendas: 14,
            receitaTotal: 700000,
            ticketMedio: 50000,
            cac: 1500,
            taxaConversao: 3.68,
          },
          {
            canal: 'Networking & Conselheiros',
            icone: '👔',
            leads: 120,
            oportunidades: 45,
            vendas: 8,
            receitaTotal: 300000,
            ticketMedio: 37500,
            cac: 800,
            taxaConversao: 6.66,
          },
        ],

    // Gráfico: Resultados de Oportunidades por Canal de Aquisição
    oportunidadesGrafico: isCrm
      ? [
          { canal: 'Google Ads', criadas: 380, qualificadas: 210, ganhas: 48, taxaGanho: 22.8 },
          { canal: 'Outbound SDR', criadas: 310, qualificadas: 185, ganhas: 42, taxaGanho: 22.7 },
          { canal: 'Inbound SEO', criadas: 290, qualificadas: 150, ganhas: 35, taxaGanho: 23.3 },
          { canal: 'Meta Ads', criadas: 190, qualificadas: 95, ganhas: 22, taxaGanho: 23.1 },
          { canal: 'Indicações', criadas: 145, qualificadas: 110, ganhas: 28, taxaGanho: 25.4 },
        ]
      : [
          { canal: 'Eventos & Feiras', criadas: 110, qualificadas: 75, ganhas: 18, taxaGanho: 24.0 },
          { canal: 'Base Legada', criadas: 85, qualificadas: 55, ganhas: 14, taxaGanho: 25.4 },
          { canal: 'Conselheiros', criadas: 45, qualificadas: 30, ganhas: 8, taxaGanho: 26.6 },
        ],
  };
}
