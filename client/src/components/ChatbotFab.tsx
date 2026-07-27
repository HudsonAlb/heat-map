import React from 'react';

interface ChatbotFabProps {
  onClick: () => void;
}

export const ChatbotFab: React.FC<ChatbotFabProps> = ({ onClick }) => {
  return (
    <button
      className="chatbot-fab-btn btn-primary"
      onClick={onClick}
      title="Abrir Assistente de Inteligência Artificial GeoVoto"
    >
      <span className="fab-pulse-dot"></span>
      <span className="fab-icon">💬</span>
      <span className="fab-text">IA Chatbot GeoVoto</span>
    </button>
  );
};
