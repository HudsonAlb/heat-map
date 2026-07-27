import React, { useState } from 'react';
import type { DobradinhaSalva, Candidato } from '../types/geovoto';

interface SavedDobradinhasModalProps {
  isOpen: boolean;
  onClose: () => void;
  dobradinhasSalvas: DobradinhaSalva[];
  candidatosLista: Candidato[];
  onCarregarDobradinha: (candA: Candidato, candB: Candidato) => void;
  onSalvarNovaDobradinha: (nome: string, candAId: number, candBId: number) => void;
  onDeletarDobradinha: (id: number) => void;
}

export const SavedDobradinhasModal: React.FC<SavedDobradinhasModalProps> = ({
  isOpen,
  onClose,
  dobradinhasSalvas,
  candidatosLista,
  onCarregarDobradinha,
  onSalvarNovaDobradinha,
  onDeletarDobradinha,
}) => {
  const [nomeNovo, setNomeNovo] = useState('');
  const [candAId, setCandAId] = useState<number>(candidatosLista[0]?.id || 101);
  const [candBId, setCandBId] = useState<number>(candidatosLista[1]?.id || 102);
  const [showForm, setShowForm] = useState(false);

  if (!isOpen) return null;

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeNovo.trim()) return;
    onSalvarNovaDobradinha(nomeNovo, candAId, candBId);
    setNomeNovo('');
    setShowForm(false);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <h2>⭐ Dobradinhas Salvas pela Campanha</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <p className="modal-subtitle">
            "Cada nova liderança, cada dobradinha, uma nova visualização." Reabra rapidamente duplas de candidatos gravadas.
          </p>

          {/* LISTA DE DOBRADINHAS SALVAS */}
          <div className="dobradinhas-list">
            {dobradinhasSalvas.map((d) => {
              const candA = d.candidatoA || candidatosLista.find((c) => c.id === d.candidato_a_id);
              const candB = d.candidatoB || candidatosLista.find((c) => c.id === d.candidato_b_id);

              return (
                <div key={d.id} className="dobradinha-card-item">
                  <div className="dobradinha-card-main">
                    <h4>{d.nome}</h4>
                    <div className="dobradinha-candidates-pair">
                      <span className="cand-pill cand-a-pill">{candA?.nome_urna || `ID ${d.candidato_a_id}`}</span>
                      <span className="pair-plus">+</span>
                      <span className="cand-pill cand-b-pill">{candB?.nome_urna || `ID ${d.candidato_b_id}`}</span>
                    </div>
                    <div className="dobradinha-meta">
                      Criado por {d.criado_por || 'Usuário'} • {new Date(d.criado_em || d.data_criacao || Date.now()).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="dobradinha-card-actions">
                    {candA && candB && (
                      <button
                        className="action-load-btn"
                        onClick={() => {
                          onCarregarDobradinha(candA, candB);
                          onClose();
                        }}
                      >
                        🚀 Carregar no Mapa
                      </button>
                    )}
                    <button
                      className="action-delete-btn"
                      onClick={() => onDeletarDobradinha(Number(d.id))}
                      title="Excluir dobradinha"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FORMULÁRIO DE NOVA DOBRADINHA */}
          {!showForm ? (
            <button className="new-dobradinha-btn" onClick={() => setShowForm(true)}>
              ➕ Criar e Salvar Nova Dobradinha
            </button>
          ) : (
            <form onSubmit={handleSalvar} className="new-dobradinha-form">
              <h3>Cadastrar Nova Dobradinha</h3>
              <div className="form-group">
                <label>Nome / Identificador da Chapa:</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: Dobradinha Agreste - Pedro + Sileno"
                  value={nomeNovo}
                  onChange={(e) => setNomeNovo(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Candidato X:</label>
                  <select
                    className="form-select"
                    value={candAId}
                    onChange={(e) => setCandAId(Number(e.target.value))}
                  >
                    {candidatosLista.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome_urna} ({c.partido})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label>Candidato Y:</label>
                  <select
                    className="form-select"
                    value={candBId}
                    onChange={(e) => setCandBId(Number(e.target.value))}
                  >
                    {candidatosLista.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome_urna} ({c.partido})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="save-submit-btn">Salvar Dobradinha</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
