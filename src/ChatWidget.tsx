import { useState, useEffect, useRef } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { useTranslation } from './useTranslation';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatWidgetProps {
  customerId?: string;
  botId?: string;
  greetingMessage?: string;
  embedded?: boolean;
  headerTitle?: string;
  headerColor?: string;
  textColor?: string;
  leadCaptureEnabled?: boolean;
  chatBubbleBg?: string;
  avatarBg?: string;
  buttonStyle?: string;
  buttonPosition?: string;
  buttonSize?: number;
  barMessage?: string;
  chatWindowBg?: string;
  userMessageBg?: string;
  botMessageBg?: string;
  sendButtonBg?: string;
  leadFormMessage?: string;
  isTrial?: boolean;
}

const API_URL = 'https://api.autoreplychat.com/api';

// Generate unique session ID
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Simple markdown to HTML renderer
function renderMarkdown(text: string) {
  let html = text
    // Escape HTML first
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic: *text*
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links: [text](url)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">$1</a>')
    // Plain URLs (not already in a link)
    .replace(/(?<!href=")(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">$1</a>')
    // Line breaks
    .replace(/\n/g, '<br/>');
  return html;
}

export default function ChatWidget({ 
  customerId,
  botId,
  greetingMessage = "Thank you for visiting! How may we assist you today?",
  embedded = false,
  headerTitle = "Support Assistant",
  headerColor = "#3b82f6",
  textColor = "#ffffff",
  leadCaptureEnabled = true,
  chatBubbleBg = "#3b82f6",
  buttonStyle = "circle",
  buttonPosition = "right",
  buttonSize = 60,
  barMessage = "Chat Now",
  chatWindowBg = "#ffffff",
  userMessageBg = "#3b82f6",
  botMessageBg = "#f3f4f6",
  sendButtonBg = "#3b82f6",
  leadFormMessage = "Want personalized help? Leave your details and we'll follow up",
  isTrial = false
}: ChatWidgetProps) {
  const { t } = useTranslation();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [isOpen, setIsOpen] = useState(embedded);
  const [leadInfo, setLeadInfo] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showGreeting, setShowGreeting] = useState(!embedded);
  const [isMobile, setIsMobile] = useState(false);
  const [sessionId] = useState(() => generateSessionId());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-hide greeting after 10 seconds (only in non-embedded mode)
  useEffect(() => {
    if (embedded) return;
    
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [embedded]);

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
          botId: botId || undefined,
          customerId: customerId || undefined,
          sessionId: sessionId,
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
      
      if (messages.length === 0 && !leadCaptured && leadCaptureEnabled) {
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
          botId: botId || undefined,
          customerId: customerId || undefined,
          sessionId: sessionId,
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

  // Floating button mode (non-embedded, chat closed)
  if (!isOpen && !embedded) {
    const positionClass = buttonPosition === 'left' ? 'left-6' : 'right-6';
    
    return (
      <div className={`fixed bottom-6 ${positionClass} z-50`}>
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

        {/* Chat Button - Circle Style */}
        {buttonStyle === 'circle' && (
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => !isOpen && setShowGreeting(true)}
            style={{ 
              backgroundColor: chatBubbleBg,
              width: `${buttonSize}px`,
              height: `${buttonSize}px`
            }}
            className="hover:opacity-90 text-white rounded-full shadow-lg transition-all hover:scale-110 flex items-center justify-center"
            aria-label={t('openChatButton')}
          >
            <MessageCircle size={buttonSize * 0.4} />
          </button>
        )}
        
        {/* Chat Button - Bar Style */}
        {buttonStyle === 'bar' && (
          <button
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => !isOpen && setShowGreeting(true)}
            style={{ backgroundColor: chatBubbleBg }}
            className="hover:opacity-90 text-white rounded-full px-5 py-3 shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            aria-label={t('openChatButton')}
          >
            <MessageCircle size={20} />
            <span className="font-medium">{barMessage}</span>
          </button>
        )}
      </div>
    );
  }

  // Chat window styles - fullscreen on mobile, floating card on desktop
  const containerStyle: React.CSSProperties = embedded
    ? {}
    : isMobile
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
      }
    : {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '384px',
        height: '600px',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        zIndex: 9999,
      };

  const containerClass = embedded
    ? "w-full h-[550px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200"
    : "bg-white shadow-2xl flex flex-col overflow-hidden";

  return (
    <div className={containerClass} style={containerStyle}>
      {/* Header */}
      <div 
        style={{ backgroundColor: headerColor, color: textColor }} 
        className="p-4 flex items-center justify-between"
      >
        <div>
          <h3 className="font-semibold">{headerTitle}</h3>
        </div>
        {!embedded && (
          <button 
            onClick={() => setIsOpen(false)}
            style={{ 
              color: textColor,
              minWidth: '44px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="hover:opacity-70 rounded p-2"
            aria-label={t('closeButton')}
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Trial Badge */}
      {isTrial && (
        <div style={{ backgroundColor: '#fef3c7', borderBottom: '1px solid #fde68a', padding: '6px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px', color: '#92400e', fontWeight: 500 }}>⚡ Trial Version</span>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ backgroundColor: chatWindowBg }}>
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
                  ? 'text-white'
                  : msg.role === 'system'
                  ? 'bg-green-100 text-green-800 text-sm'
                  : 'text-gray-800'
              }`}
              style={
                msg.role === 'user' 
                  ? { backgroundColor: userMessageBg } 
                  : msg.role === 'assistant'
                  ? { backgroundColor: botMessageBg }
                  : {}
              }
            >
              {msg.role === 'assistant' ? (
                <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="text-gray-800 rounded-lg px-4 py-2" style={{ backgroundColor: botMessageBg }}>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Lead Form */}
      {showLeadForm && !leadCaptured && (
        <div className="bg-blue-50 border-t border-blue-200 p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-blue-900 text-sm">{leadFormMessage}</p>
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
              style={{ backgroundColor: headerColor }}
              className="w-full hover:opacity-90 text-white py-2 rounded text-sm font-medium transition-colors"
            >
              {t('submitButton')}
            </button>
          </form>
        </div>
      )}

      {/* Input Area */}
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
            style={{ backgroundColor: isLoading ? '#9ca3af' : sendButtonBg }}
            className="hover:opacity-90 text-white p-2 rounded-lg transition-colors disabled:cursor-not-allowed"
            aria-label={t('sendButton')}
          >
            <Send size={20} />
          </button>
        </div>
        
        {/* Powered by link */}
        <div className="text-center mt-3">
          <a 
            href="https://autoreplychat.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Powered by AutoReplyChat
          </a>
        </div>
      </div>
    </div>
  );
}
