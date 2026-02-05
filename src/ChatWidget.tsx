import { useState, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { useTranslation } from './useTranslation';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatWidgetProps {
  customerId: string;
  greetingMessage?: string;
}

const API_URL = 'https://api.autoreplychat.com/api';

export default function ChatWidget({ 
  customerId,
  greetingMessage = "Thank you for visiting! How may we assist you today?"
}: ChatWidgetProps) {
  const { t } = useTranslation();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);

  // Auto-hide greeting after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Hide greeting when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowGreeting(false);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          customerId: customerId,
          conversationHistory: messages.map(m => ({
            role: m.role === 'system' ? 'assistant' : m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: Message = { 
        role: 'assistant', 
        content: data.message || data.response
      };
      setMessages(prev => [...prev, botMessage]);
      
      if (messages.length === 0 && !leadCaptured) {
        setTimeout(() => setShowLeadForm(true), 1000);
      }
    } catch (error) {
      console.error('Error calling API:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: t('errorMessage')
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadCaptured(true);
    setShowLeadForm(false);
    
    try {
      await fetch(`${API_URL}/chat/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: leadInfo.name,
          email: leadInfo.email,
          customerId: customerId,
          conversation: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });
    } catch (error) {
      console.error('Error capturing lead:', error);
    }
    
    setMessages(prev => [...prev, {
      role: 'system',
      content: t('thankYouMessage', { name: leadInfo.name, email: leadInfo.email })
    }]);
  };
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Greeting Bubble */}
        {showGreeting && (
          <div className="mb-4 mr-2 animate-fade-in">
            <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <button
                onClick={() => setShowGreeting(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                aria-label="Close greeting"
              >
                <X size={16} />
              </button>
              <p className="text-sm text-gray-800 pr-4">
                {greetingMessage}
              </p>
              {/* Arrow pointing to button */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45"></div>
            </div>
          </div>
        )}

        {/* Chat Button */}
        <button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => !isOpen && setShowGreeting(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110"
          aria-label={t('openChatButton')}
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50">
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

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 rounded-lg px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

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

      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            placeholder={t('placeholder')}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            aria-label={t('placeholder')}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            aria-label={t('sendButton')}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
