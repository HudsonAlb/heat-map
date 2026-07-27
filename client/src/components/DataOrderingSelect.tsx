import React from 'react';

export type ModoOrdenacaoDados =
  | 'forca'
  | 'aptos'
  | 'votos_a'
  | 'votos_b'
  | 'alfabetica';

interface DataOrderingSelectProps {
  ordenacaoAtual: ModoOrdenacaoDados;
  onTrocarOrdenacao: (modo: ModoOrdenacaoDados) => void;
  candXNome: string;
  candYNome?: string;
}

export const DataOrderingSelect: React.FC<DataOrderingSelectProps> = ({
  ordenacaoAtual,
  onTrocarOrdenacao,
  candXNome,
  candYNome,
}) => {
  return (
    <div className="data-ordering-wrapper">
      <label htmlFor="data-ordering-select" className="ordering-label">
        <span className="icon">📊</span> Organizar Visualização dos Dados:
      </label>
      <select
        id="data-ordering-select"
        className="ordering-select-field"
        value={ordenacaoAtual}
        onChange={(e) => onTrocarOrdenacao(e.target.value as ModoOrdenacaoDados)}
      >
        <option value="forca">🔥 Força da Parceria (Soma A + B + C)</option>
        <option value="aptos">👥 Maior Eleitorado Aptos</option>
        <option value="votos_a">🟦 Votos {candXNome}</option>
        {candYNome && <option value="votos_b">🟩 Votos {candYNome}</option>}
        <option value="alfabetica">🔤 Ordem Alfabética (A-Z)</option>
      </select>
    </div>
  );
};
