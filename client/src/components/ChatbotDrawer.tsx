import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage, ChatbotResponse } from '../types/geovoto';

interface ChatbotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyDeepLink?: (deepLink: ChatbotResponse['deep_link']) => void;
  userEmail?: string;
}

interface QuickPrompt {
  id: string;
  label: string;
  promptText: string;
}

const QUICK_PROMPTS: QuickPrompt[] = [
  { id: '1', label: '📊 Qual mesorregião é mais forte?', promptText: 'Qual mesorregião tem maior densidade de votos?' },
  { id: '2', label: '⚖️ Onde há sobreposição?', promptText: 'Quais cidades têm maior sobreposição entre os candidatos?' },
  { id: '3', label: '💡 Onde investir em campanha?', promptText: 'Onde devemos focar esforços de campanha para crescer?' },
  { id: '4', label: '🏆 Ranking dos 5 maiores bairros', promptText: 'Quais os 5 maiores bairros em total de eleitores?' },
];

export const ChatbotDrawer: React.FC<ChatbotDrawerProps> = ({
  isOpen,
  onClose,
  onApplyDeepLink,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Olá! Sou o **GeoVoto AI Assistant**. Como posso ajudar na sua estratégia eleitoral em Pernambuco?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputTexto, setInputTexto] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const enviarMensagem = (texto: string) => {
    if (!texto.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: texto,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputTexto('');
    setIsLoading(true);

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `Com base nos dados eleitorais do TSE para o recorte selecionado, a região apresenta excelente potencial de tração e complementaridade de votos.`,
        timestamp: new Date().toISOString(),
        citation: {
          dataset: 'TSE Result_Secao_PE_2022_2024',
          periodo: 'Eleições 2022 / 2024',
          totalRegistrosAnalisados: 12450,
        },
        deepLink: {
          candXId: 1,
          candYId: 2,
          camada: 'mesorregiao',
          modo: 'soma',
        },
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsLoading(false);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-drawer-overlay">
      <div className="chatbot-drawer-panel">
        {/* HEADER */}
        <div className="chatbot-header">
          <div className="bot-title-group">
            <span className="bot-avatar">🤖</span>
            <div>
              <h3>GeoVoto AI Assistant</h3>
              <span className="bot-status">🟢 Online • Base Eleitoral TSE 2022/2024</span>
            </div>
          </div>
          <button className="close-drawer-btn" onClick={onClose} title="Fechar Chatbot">
            ✕
          </button>
        </div>

        {/* MESSAGES LIST */}
        <div className="chatbot-messages-container">
          {messages.map((m) => (
            <div key={m.id} className={`chat-bubble-row row-${m.sender}`}>
              <div className="chat-bubble">
                <div className="chat-text-formatted">
                  {m.text.split('\n').map((par: string, idx: number) => (
                    <p key={idx}>{par}</p>
                  ))}
                </div>

                {/* CITAÇÃO DE FONTE OFICIAL */}
                {m.citation && (
                  <div className="bot-citation-box">
                    <span className="citation-header">📌 Fonte de Dados Oficial</span>
                    <div className="citation-details">
                      <span><strong>Dataset:</strong> {m.citation.dataset}</span>
                      <span><strong>Período:</strong> {m.citation.periodo}</span>
                      <span><strong>Registros Analisados:</strong> {m.citation.totalRegistrosAnalisados.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                )}

                {/* BOTÃO DE DEEP LINK / APLICAÇÃO NO MAPA */}
                {m.deepLink && onApplyDeepLink && (
                  <button
                    className="btn btn-primary btn-sm deep-link-apply-btn"
                    onClick={() => {
                      onApplyDeepLink(m.deepLink!);
                      onClose();
                    }}
                  >
                    🎯 Aplicar Filtro no Mapa →
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="chat-bubble-row row-bot">
              <div className="chat-bubble loading-bubble">
                <span>🤖 Analisando seções e dados eleitorais...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* SUGESTÕES RÁPIDAS */}
        <div className="quick-prompts-bar">
          <span className="prompts-title">Perguntas Frequentes:</span>
          <div className="prompts-pills">
            {QUICK_PROMPTS.map((qp) => (
              <button
                key={qp.id}
                className="prompt-pill-btn"
                onClick={() => enviarMensagem(qp.promptText)}
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>

        {/* INPUT FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            enviarMensagem(inputTexto);
          }}
          className="chat-input-form"
        >
          <input
            type="text"
            className="chat-input-field"
            placeholder="Digite sua dúvida sobre o eleitorado..."
            value={inputTexto}
            onChange={(e) => setInputTexto(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm chat-send-btn" disabled={isLoading}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
