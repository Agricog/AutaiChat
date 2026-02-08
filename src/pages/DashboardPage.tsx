import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import DocumentsTab from '../components/DocumentsTab';
import {
  FileText,
  HelpCircle,
  Settings,
  MessageSquare,
  Palette,
  Code,
  LogOut,
  ChevronDown,
  Bot,
} from 'lucide-react';

interface BotInfo {
  id: number;
  public_id: string;
  name: string;
}

type TabKey = 'documents' | 'qa' | 'config' | 'messages' | 'appearance' | 'embed';

const TABS: { key: TabKey; label: string; icon: typeof FileText }[] = [
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'qa', label: 'Q&A Pairs', icon: HelpCircle },
  { key: 'config', label: 'Bot Config', icon: Settings },
  { key: 'messages', label: 'Messages', icon: MessageSquare },
  { key: 'appearance', label: 'Appearance', icon: Palette },
  { key: 'embed', label: 'Embed Code', icon: Code },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('documents');
  const [bots, setBots] = useState<BotInfo[]>([]);
  const [selectedBot, setSelectedBot] = useState<BotInfo | null>(null);
  const [botsLoading, setBotsLoading] = useState(true);
  const [showBotDropdown, setShowBotDropdown] = useState(false);

  useEffect(() => {
    loadBots();
  }, []);

  const loadBots = async () => {
    try {
      const data = await api.get('/api/bots');
      const botList = data.bots || data || [];
      setBots(botList);
      if (botList.length > 0) {
        setSelectedBot(botList[0]);
      }
    } catch (err) {
      console.error('Failed to load bots:', err);
    } finally {
      setBotsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderTabContent = () => {
    if (!selectedBot) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-500">
          {botsLoading ? 'Loading...' : 'No bots found. Contact support.'}
        </div>
      );
    }

    switch (activeTab) {
      case 'documents':
        return (
          <DocumentsTab
            customerId={user!.customerId}
            botId={selectedBot.id}
            botPublicId={selectedBot.public_id}
          />
        );
      case 'qa':
      case 'config':
      case 'messages':
      case 'appearance':
      case 'embed':
        return (
          <div className="flex items-center justify-center h-64 text-gray-400">
            <p className="text-lg">{TABS.find(t => t.key === activeTab)?.label} — coming in Phase 3</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xl font-semibold tracking-tight text-gray-900">
              AutoReplyChat
            </span>

            {/* Bot selector */}
            {bots.length > 0 && (
              <div className="relative ml-6">
                <button
                  onClick={() => setShowBotDropdown(!showBotDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition text-sm"
                >
                  <Bot size={16} className="text-gray-500" />
                  <span className="text-gray-700 font-medium max-w-[200px] truncate">
                    {selectedBot?.name || 'Select bot'}
                  </span>
                  {bots.length > 1 && <ChevronDown size={14} className="text-gray-400" />}
                </button>

                {showBotDropdown && bots.length > 1 && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowBotDropdown(false)}
                    />
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1">
                      {bots.map((bot) => (
                        <button
                          key={bot.id}
                          onClick={() => {
                            setSelectedBot(bot);
                            setShowBotDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition ${
                            selectedBot?.id === bot.id
                              ? 'text-blue-600 font-medium bg-blue-50'
                              : 'text-gray-700'
                          }`}
                        >
                          {bot.name}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderTabContent()}
      </main>
    </div>
  );
}
