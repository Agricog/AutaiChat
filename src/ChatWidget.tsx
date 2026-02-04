// ChatWidget.tsx - Multilingual widget with auto-detected language
import React, { useState } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { useTranslation } from './useTranslation';

export default function ChatWidget() {
  const { t, language } = useTranslation(); // Auto-detects browser language
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '' });

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // TODO: Call your Railway API endpoint here
    // For now, simulating bot response
    setTimeout(() => {
      const botMessage = { 
        role: 'assistant', 
        content: 'Based on our BS 7671 compliance documentation, cable sizing depends on load current, ambient temperature, and installation method. For a 32A circuit in conduit at 30°C, you\'d typically use 6mm² cable.' 
      };
      setMessages(prev => [...prev, botMessage]);
      
      // Show lead form after first exchange (if not already captured)
      if (messages.length === 0 && !leadCaptured) {
        setTimeout(() => setShowLeadForm(true), 1000);
      }
    }, 800);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setLeadCaptured(true);
    setShowLeadForm(false);
    
    // TODO: Send lead data to your backend
    // Backend will email business owner: conversation + lead details
    
    // Add confirmation message (using translation with interpolation)
    setMessages(prev => [...prev, {
      role: 'system',
      content: t('thankYouMessage', { name: leadInfo.name, email: leadInfo.email })
    }]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all"
          aria-label={t('openChatButton')}
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{t('headerTitle')}</h3>
          <p className="text-xs text-blue-100">{t('headerSubtitle')}</p>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-blue-700 rounded p-1"
          aria-label={t('closeButton')}
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <MessageCircle size={48} className="mx-auto mb-3 text-gray-300" />
            <p className="text-sm">{t('welcomeMessage')}</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : msg.role === 'system'
                  ? 'bg-green-100 text-green-800 text-sm'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Lead Capture Form (appears after first exchange) */}
      {showLeadForm && !leadCaptured && (
        <div className="bg-blue-50 border-t border-blue-200 p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-blue-900 text-sm">{t('leadFormTitle')}</p>
              <p className="text-xs text-blue-700">{t('leadFormSubtitle')}</p>
            </div>
            <button
              onClick={() => setShowLeadForm(false)}
              className="text-blue-600 hover:text-blue-800"
              aria-label={t('dismissButton')}
            >
              <X size={16} />
            </button>
          </div>
          <form onSubmit={handleLeadSubmit} className="space-y-2">
            <input
              type="text"
              placeholder={t('namePlaceholder')}
              value={leadInfo.name}
              onChange={(e) => setLeadInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-blue-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label={t('nameLabel')}
            />
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              value={leadInfo.email}
              onChange={(e) => setLeadInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-blue-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              aria-label={t('emailLabel')}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-medium transition-colors"
            >
              {t('submitButton')}
            </button>
          </form>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('placeholder')}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={t('placeholder')}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
            aria-label={t('sendButton')}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
