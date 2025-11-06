import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatBotProps {
  onSendMessage: (message: string) => string;
}

export const ChatBot: React.FC<ChatBotProps> = ({ onSendMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Olá! Sou seu assistente virtual. Posso ajudar com informações sobre estoque, clientes e vendas. Como posso ajudar?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simular delay do bot
    setTimeout(() => {
      const botResponse = onSendMessage(inputMessage);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputMessage('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-96 flex flex-col">
      <div className="p-4 border-b bg-primary-50 rounded-t-lg">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Bot className="h-5 w-5 mr-2 text-primary-600" />
          Assistente Virtual
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-primary-600 text-white'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.isBot ? (
                  <Bot className="h-4 w-4 mt-0.5 text-primary-600" />
                ) : (
                  <User className="h-4 w-4 mt-0.5" />
                )}
                <div>
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.isBot ? 'text-gray-500' : 'text-primary-100'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Digite sua pergunta..."
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};