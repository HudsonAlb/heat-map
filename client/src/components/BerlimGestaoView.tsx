import React, { useEffect, useState } from 'react';

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

export const BerlimGestaoView: React.FC = () => {
  const [dados, setDados] = useState<ResultadoMunicipalBerlim[]>([]);
  const [mesorregioes, setMesorregioes] = useState<string[]>([]);
  const [mesorregiaoFiltro, setMesorregiaoFiltro] = useState<string>('Todas');
  const [busca, setBusca] = useState<string>('');
  const [totalEleitores, setTotalEleitores] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/berlim-gestao/municipios');
        if (res.ok) {
          const json = await res.json();
          setDados(json.dados || []);
          setMesorregioes(json.mesorregioes || []);
          setTotalEleitores(json.totalEleitores || 0);
        }
      } catch (err) {
        console.error('Erro ao carregar dados do Berlim Gestão:', err);
      } finally {
        setIsLoading(false);
      }
    }
    carregarDados();
  }, []);

  const dadosFiltrados = dados.filter((item) => {
    const matchMesorregiao =
      mesorregiaoFiltro === 'Todas' || item.mesorregiao === mesorregiaoFiltro;
    const term = busca.toLowerCase().trim();
    const matchBusca =
      !term ||
      item.municipio.toLowerCase().includes(term) ||
      item.prefeito_eleito.toLowerCase().includes(term) ||
      (item.segundo_lugar && item.segundo_lugar.toLowerCase().includes(term)) ||
      (item.terceiro_lugar && item.terceiro_lugar.toLowerCase().includes(term));

    return matchMesorregiao && matchBusca;
  });

  const totalEleitoresFiltrados = dadosFiltrados.reduce((acc, curr) => acc + curr.eleitores, 0);

  return (
    <div className="berlim-gestao-container" style={{ padding: '1.5rem', color: 'var(--color-text-primary)', overflowY: 'auto', flex: 1, minHeight: 0, height: '100%' }}>
      {/* ── HEADER DA ÁREA BERLIM GESTÃO ───────────────────────────────────── */}
      <div
        className="berlim-header-card"
        style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '1.5rem 2rem',
          marginBottom: '1.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#38bdf8',
                textTransform: 'uppercase',
              }}
            >
              Módulo de Inteligência Eleitoral
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0.2rem 0 0.4rem', color: '#ffffff' }}>
              🏛️ Painel Berlim Gestão — Eleições Municipais PE
            </h1>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
              Base oficial alimentada por microrregião: Prefeito Eleito, 2º Lugar e 3º Lugar.
            </p>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '30px',
              fontSize: '0.85rem',
              color: '#4ade80',
              fontWeight: 600,
            }}
          >
            <span>🟢 Status: Base de Dados Ativa (185+ Municípios)</span>
          </div>
        </div>

        {/* METRICAS RÁPIDAS */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total de Eleitores (Filtrado)</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
              {totalEleitoresFiltrados.toLocaleString('pt-BR')}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Municípios Listados</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>
              {dadosFiltrados.length} / {dados.length}
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Total Eleitores Pernambuco</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>
              {totalEleitores.toLocaleString('pt-BR')}
            </div>
          </div>
        </div>
      </div>

      {/* ── BARRA DE FILTROS ──────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          background: 'rgba(30, 41, 59, 0.4)',
          padding: '1rem',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div style={{ flex: '1', minWidth: '240px' }}>
          <input
            type="text"
            placeholder="🔍 Buscar município ou candidato..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ minWidth: '220px' }}>
          <select
            value={mesorregiaoFiltro}
            onChange={(e) => setMesorregiaoFiltro(e.target.value)}
            style={{
              width: '100%',
              padding: '0.7rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: '#ffffff',
              fontSize: '0.9rem',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="Todas">📍 Todas as Microrregiões ({mesorregioes.length})</option>
            {mesorregioes.map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ── TABELA DE RESULTADOS ──────────────────────────────────────────── */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
          Carregando dados municipais de Pernambuco...
        </div>
      ) : dadosFiltrados.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'rgba(15, 23, 42, 0.4)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            color: '#94a3b8',
          }}
        >
          🔍 Nenhum município encontrado para os filtros selecionados.
        </div>
      ) : (
        <div
          style={{
            overflowX: 'auto',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.875rem',
            }}
          >
            <thead>
              <tr
                style={{
                  background: 'rgba(30, 41, 59, 0.8)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                }}
              >
                <th style={{ padding: '1rem' }}>Mesorregião</th>
                <th style={{ padding: '1rem' }}>Município</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Eleitores</th>
                <th style={{ padding: '1rem', color: '#4ade80' }}>🥇 Prefeito Eleito (1º Lugar)</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#4ade80' }}>Votos</th>
                <th style={{ padding: '1rem', color: '#38bdf8' }}>🥈 2º Lugar</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#38bdf8' }}>Votos</th>
                <th style={{ padding: '1rem', color: '#fb7185' }}>🥉 3º Lugar</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: '#fb7185' }}>Votos</th>
              </tr>
            </thead>
            <tbody>
              {dadosFiltrados.map((item, idx) => (
                <tr
                  key={`${item.municipio}-${idx}`}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <td style={{ padding: '0.85rem 1rem', color: '#cbd5e1', fontWeight: 500 }}>
                    {item.mesorregiao}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#ffffff', fontWeight: 700 }}>
                    {item.municipio}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#94a3b8' }}>
                    {item.eleitores.toLocaleString('pt-BR')}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#4ade80', fontWeight: 700 }}>
                    {item.prefeito_eleito}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#4ade80', fontWeight: 700 }}>
                    {item.votos_1lugar.toLocaleString('pt-BR')}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#93c5fd' }}>
                    {item.segundo_lugar || '—'}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#93c5fd' }}>
                    {item.votos_2lugar ? item.votos_2lugar.toLocaleString('pt-BR') : '—'}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#fca5a5' }}>
                    {item.terceiro_lugar || '—'}
                  </td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right', color: '#fca5a5' }}>
                    {item.votos_3lugar ? item.votos_3lugar.toLocaleString('pt-BR') : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
