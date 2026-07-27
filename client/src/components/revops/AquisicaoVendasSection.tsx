import React from 'react';
import type {
  ResultadoCanalAquisicao,
  OportunidadePorCanal,
  FonteRevOps,
} from '../../types/revops';

interface AquisicaoVendasSectionProps {
  fonteAtual: FonteRevOps;
  onTrocarFonte: (fonte: FonteRevOps) => void;
  canaisAquisicao: ResultadoCanalAquisicao[];
  oportunidadesGrafico: OportunidadePorCanal[];
}

export const AquisicaoVendasSection: React.FC<AquisicaoVendasSectionProps> = ({
  fonteAtual,
  onTrocarFonte,
  canaisAquisicao,
  oportunidadesGrafico,
}) => {
  const formatCurrency = (val: number) =>
    val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });

  const maxOportunidades = Math.max(...oportunidadesGrafico.map((o) => o.criadas), 1);

  return (
    <div className="aquisicao-vendas-container">
      {/* HEADER DA SEÇÃO E FILTRO DE FONTE */}
      <div className="aquisicao-header-bar">
        <div className="aquisicao-title-group">
          <h2>🚀 Aquisição e Vendas</h2>
          <span className="aquisicao-subtitle">
            Análise integrada de canais de entrada, conversão comercial e receita gerada
          </span>
        </div>

        {/* FILTROS DE SELEÇÃO OBRIGATÓRIOS: CRM vs OUTRAS FONTES */}
        <div className="fonte-filter-tabs">
          <button
            className={`fonte-tab-btn ${fonteAtual === 'crm' ? 'active' : ''}`}
            onClick={() => onTrocarFonte('crm')}
          >
            🔌 CRM (HubSpot / Salesforce)
          </button>
          <button
            className={`fonte-tab-btn ${fonteAtual === 'outras_fontes' ? 'active' : ''}`}
            onClick={() => onTrocarFonte('outras_fontes')}
          >
            📁 Outras Fontes (Eventos / Legado)
          </button>
        </div>
      </div>

      {/* GRÁFICO VISUAL: RESULTADOS DE OPORTUNIDADES POR CANAL DE AQUISIÇÃO */}
      <div className="chart-section-card">
        <div className="chart-card-header">
          <h3>📊 Resultados de Oportunidades por Canal de Aquisição</h3>
          <span className="chart-sub">Volume de oportunidades criadas, qualificadas e ganhas</span>
        </div>

        <div className="opportunities-bars-grid">
          {oportunidadesGrafico.map((item) => {
            const pctBar = (item.criadas / maxOportunidades) * 100;
            return (
              <div key={item.canal} className="opp-bar-row">
                <div className="opp-info-header">
                  <span className="opp-channel-name"><strong>{item.canal}</strong></span>
                  <div className="opp-metrics-pills">
                    <span className="opp-pill created-pill">{item.criadas} Criadas</span>
                    <span className="opp-pill qualified-pill">{item.qualificadas} Qualificadas</span>
                    <span className="opp-pill won-pill">{item.ganhas} Ganhas</span>
                    <span className="opp-pill winrate-pill">Win Rate: {item.taxaGanho}%</span>
                  </div>
                </div>

                <div className="opp-track-bg">
                  <div className="opp-fill-created" style={{ width: `${pctBar}%` }}>
                    <div
                      className="opp-fill-won"
                      style={{ width: `${(item.ganhas / item.criadas) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RELATÓRIO TABULAR: RESULTADO POR CANAL DE AQUISIÇÃO */}
      <div className="report-table-card">
        <div className="table-card-header">
          <h3>📋 Relatório: Resultado por Canal de Aquisição</h3>
          <span className="report-sub">Detalhamento completo de Leads, Oportunidades, Receita, Ticket Médio e CAC</span>
        </div>

        <div className="table-responsive-wrapper">
          <table className="revops-report-table">
            <thead>
              <tr>
                <th>Canal de Aquisição</th>
                <th className="align-right">Leads Gerados</th>
                <th className="align-right">Oportunidades</th>
                <th className="align-right">Vendas Ganhas</th>
                <th className="align-right">Receita Total</th>
                <th className="align-right">Ticket Médio</th>
                <th className="align-right">CAC</th>
                <th className="align-center">Taxa Conversão</th>
              </tr>
            </thead>
            <tbody>
              {canaisAquisicao.map((row) => (
                <tr key={row.canal}>
                  <td className="bold-channel-name">
                    <span className="channel-icon">{row.icone}</span>
                    <span>{row.canal}</span>
                  </td>
                  <td className="align-right number-font">{row.leads.toLocaleString('pt-BR')}</td>
                  <td className="align-right number-font">{row.oportunidades.toLocaleString('pt-BR')}</td>
                  <td className="align-right number-font bold-val success-val">{row.vendas.toLocaleString('pt-BR')}</td>
                  <td className="align-right number-font bold-val accent-val">{formatCurrency(row.receitaTotal)}</td>
                  <td className="align-right number-font">{formatCurrency(row.ticketMedio)}</td>
                  <td className="align-right number-font cac-val">{formatCurrency(row.cac)}</td>
                  <td className="align-center">
                    <span className="conv-badge">{row.taxaConversao.toFixed(2)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
