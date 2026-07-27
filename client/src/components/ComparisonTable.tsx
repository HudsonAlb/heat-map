import React, { useState, useMemo } from 'react';
import type { TerritorioCalculado, Candidato } from '../types/geovoto';

interface ComparisonTableProps {
  territorios: TerritorioCalculado[];
  candX: Candidato;
  candY?: Candidato;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  territorios,
  candX,
  candY,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof TerritorioCalculado>('forca_dobradinha');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const filtered = useMemo(() => {
    return territorios.filter((t) => {
      const term = searchTerm.toLowerCase();
      return (
        t.nome.toLowerCase().includes(term) ||
        t.mesorregiao.toLowerCase().includes(term) ||
        (t.bairro && t.bairro.toLowerCase().includes(term))
      );
    });
  }, [territorios, searchTerm]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const valA = a[sortField] ?? 0;
      const valB = b[sortField] ?? 0;
      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [filtered, sortField, sortAsc]);

  const maxAptos = useMemo(() => Math.max(...territorios.map((t) => t.aptos), 1), [territorios]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  }, [sorted, page]);

  const handleSort = (field: keyof TerritorioCalculado) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  // Exportar para CSV
  const handleExportCSV = () => {
    const headers = [
      'Territorio',
      'Camada',
      'Mesorregiao',
      'Eleitores_Aptos',
      `Votos_${candX.nome_urna}`,
      candY ? `Votos_${candY.nome_urna}` : 'Votos_Cand_B',
      `Aderencia_${candX.nome_urna}_pct`,
      candY ? `Aderencia_${candY.nome_urna}_pct` : '',
      'Forca_Dobradinha_pct',
      'Sobreposicao_pct',
      'Complementaridade_pct',
      'Classificacao',
    ].filter(Boolean);

    const rows = sorted.map((t) => [
      `"${t.nome}"`,
      t.camada,
      `"${t.mesorregiao}"`,
      t.aptos,
      t.votos_A,
      candY ? t.votos_B : 0,
      (t.aderencia_A * 100).toFixed(2),
      candY ? (t.aderencia_B * 100).toFixed(2) : '0',
      (t.forca_dobradinha * 100).toFixed(2),
      (t.sobreposicao * 100).toFixed(2),
      (t.complementaridade * 100).toFixed(2),
      t.classificacao,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `geovoto_tabela_${candX.nome_urna}${candY ? '_vs_' + candY.nome_urna : ''}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Exportar para PDF / Relatório
  const handleExportPDF = () => {
    window.print();
  };

  // Status Badge Class
  const getStatusBadge = (cl: string) => {
    switch (cl) {
      case 'FORÇA':
        return <span className="table-status-pill status-forca">🔥 FORÇA</span>;
      case 'OPORTUNIDADE':
        return <span className="table-status-pill status-oportunidade">🚀 OPORTUNIDADE</span>;
      case 'RISCO':
        return <span className="table-status-pill status-risco">⚠️ RISCO</span>;
      default:
        return <span className="table-status-pill status-neutro">⚪ NEUTRO</span>;
    }
  };

  return (
    <div className="table-view-container">
      {/* ── BARRA SUPERIOR DE TOOLBAR & BUSCA ─────────────────────────────── */}
      <div className="table-toolbar-card">
        <div className="table-search-group">
          <span className="search-icon-symbol">🔍</span>
          <input
            type="text"
            className="table-search-input"
            placeholder="Filtrar por município, bairro ou mesorregião..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>

        <div className="table-summary-stats">
          <span className="sum-stat">
            Total: <strong>{filtered.length}</strong> territórios
          </span>
        </div>

        <div className="table-export-group">
          <button className="btn btn-secondary btn-sm" onClick={handleExportCSV}>
            📥 CSV
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleExportPDF}>
            📄 Imprimir Relatório
          </button>
        </div>
      </div>

      {/* ── TABELA DE DADOS COMPARATIVOS ─────────────────────────────────── */}
      <div className="table-responsive-card">
        <table className="geovoto-data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('nome')} className="th-sortable">
                <div className="th-content">
                  <span>Território</span>
                  {sortField === 'nome' && <span className="sort-arrow">{sortAsc ? '▲' : '▼'}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('mesorregiao')} className="th-sortable">
                <div className="th-content">
                  <span>Mesorregião</span>
                  {sortField === 'mesorregiao' && <span className="sort-arrow">{sortAsc ? '▲' : '▼'}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('aptos')} className="th-sortable align-right">
                <div className="th-content align-right">
                  <span>Eleitores Aptos</span>
                  {sortField === 'aptos' && <span className="sort-arrow">{sortAsc ? '▲' : '▼'}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('votos_A')} className="th-sortable align-right col-cand-x">
                <div className="th-content align-right">
                  <span>Votos {candX.nome_urna}</span>
                  {sortField === 'votos_A' && <span className="sort-arrow">{sortAsc ? '▲' : '▼'}</span>}
                </div>
              </th>
              {candY && (
                <th onClick={() => handleSort('votos_B')} className="th-sortable align-right col-cand-y">
                  <div className="th-content align-right">
                    <span>Votos {candY.nome_urna}</span>
                    {sortField === 'votos_B' && <span className="sort-arrow">{sortAsc ? '▲' : '▼'}</span>}
                  </div>
                </th>
              )}
              <th onClick={() => handleSort('forca_dobradinha')} className="th-sortable align-right col-soma">
                <div className="th-content align-right">
                  <span>Força Somada</span>
                  {sortField === 'forca_dobradinha' && <span className="sort-arrow">{sortAsc ? '▲' : '▼'}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('sobreposicao')} className="th-sortable align-right">
                <div className="th-content align-right">
                  <span>Sobreposição</span>
                  {sortField === 'sobreposicao' && <span className="sort-arrow">{sortAsc ? '▲' : '▼'}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('complementaridade')} className="th-sortable align-right">
                <div className="th-content align-right">
                  <span>Complementaridade</span>
                  {sortField === 'complementaridade' && <span className="sort-arrow">{sortAsc ? '▲' : '▼'}</span>}
                </div>
              </th>
              <th onClick={() => handleSort('classificacao')} className="th-sortable align-center">
                <div className="th-content align-center">
                  <span>Classificação</span>
                  {sortField === 'classificacao' && <span className="sort-arrow">{sortAsc ? '▲' : '▼'}</span>}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((t) => {
                const pctEleitores = (t.aptos / maxAptos) * 100;
                return (
                  <tr key={t.id} className="table-data-row">
                    <td className="cell-territorio">
                      <div className="territorio-name-box">
                        <span className="layer-badge">{t.camada === 'mesorregiao' ? '🏛️' : t.camada === 'municipio' ? '🏙️' : '📍'}</span>
                        <div className="name-sub">
                          <strong className="t-name">{t.nome}</strong>
                          {t.bairro && <span className="t-sub-bairro">{t.bairro}</span>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="meso-name-tag">{t.mesorregiao}</span>
                    </td>
                    <td className="align-right">
                      <div className="aptos-bar-cell">
                        <span className="number-font bold-val">{t.aptos.toLocaleString('pt-BR')}</span>
                        <div className="mini-bar-track">
                          <div className="mini-bar-fill" style={{ width: `${pctEleitores}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="align-right">
                      <div className="votos-cand-cell text-cand-x">
                        <strong className="number-font">{t.votos_A.toLocaleString('pt-BR')}</strong>
                        <span className="pct-sub">{(t.aderencia_A * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    {candY && (
                      <td className="align-right">
                        <div className="votos-cand-cell text-cand-y">
                          <strong className="number-font">{t.votos_B.toLocaleString('pt-BR')}</strong>
                          <span className="pct-sub">{(t.aderencia_B * 100).toFixed(1)}%</span>
                        </div>
                      </td>
                    )}
                    <td className="align-right">
                      <div className="forca-cell">
                        <strong className="number-font text-soma font-lg">
                          {(t.forca_dobradinha * 100).toFixed(1)}%
                        </strong>
                        <div className="forca-mini-track">
                          <div
                            className="forca-mini-fill"
                            style={{ width: `${Math.min(t.forca_dobradinha * 100 * 2, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="align-right number-font">{(t.sobreposicao * 100).toFixed(1)}%</td>
                    <td className="align-right number-font font-bold">{(t.complementaridade * 100).toFixed(1)}%</td>
                    <td className="align-center">{getStatusBadge(t.classificacao)}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9} className="empty-table-row">
                  🔍 Nenhum território encontrado para o filtro "{searchTerm}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── PAGINAÇÃO ESTILIZADA ────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="table-pagination-footer">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="btn btn-secondary btn-sm"
          >
            ← Anterior
          </button>
          <span className="pagination-info">
            Página <strong>{page}</strong> de <strong>{totalPages}</strong> ({filtered.length} registros)
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="btn btn-secondary btn-sm"
          >
            Próxima →
          </button>
        </div>
      )}
    </div>
  );
};
