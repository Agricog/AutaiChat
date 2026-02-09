import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import OverviewTab from '../components/tabs/OverviewTab';
import UploadTab from '../components/tabs/UploadTab';
import DocumentsTab from '../components/tabs/DocumentsTab';
import QAPairsTab from '../components/tabs/QAPairsTab';
import LeadsTab from '../components/tabs/LeadsTab';
import MessagesTab from '../components/tabs/MessagesTab';
import BehaviorTab from '../components/tabs/BehaviorTab';
import AppearanceTab from '../components/tabs/AppearanceTab';
import DeployTab from '../components/tabs/DeployTab';

// ── Types ──────────────────────────────────────────────
interface Bot {
  id: number;
  public_id: string;
  name: string;
  bot_instructions: string;
  greeting_message: string;
  header_title: string;
  header_color: string;
  text_color: string;
  lead_capture_enabled: boolean;
  notification_emails: string;
  conversation_notifications: boolean;
  chat_bubble_bg: string;
  avatar_bg: string;
  button_style: string;
  button_position: string;
  button_size: number;
  bar_message: string;
  chat_window_bg: string;
  user_message_bg: string;
  bot_message_bg: string;
  send_button_bg: string;
  lead_form_message: string;
  greeting_bubble_enabled: boolean;
}

interface CustomerInfo {
  name: string;
  email: string;
  subscriptionStatus: string;
  daysLeft: number | null;
  hasAccess: boolean;
  isPaid: boolean;
  showTrialBanner: boolean;
}

interface Stats {
  documents: number;
  leads: number;
  messages: number;
  bots: number;
}

export interface DashMessage {
  id: number;
  role: string;
  content: string;
  created_at: string;
  lead_name: string | null;
  lead_email: string | null;
}

export interface DashDocument {
  id: number;
  title: string;
  content_type: string;
  source_url: string | null;
  char_count: number;
  created_at: string;
}

export interface DashLead {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface DashQA {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

type TabKey = 'overview' | 'upload' | 'documents' | 'qa' | 'leads' | 'messages' | 'behavior' | 'appearance' | 'deploy';

const TAB_TITLES: Record<TabKey, string> = {
  overview: 'Dashboard',
  upload: 'Upload Content',
  documents: 'Documents',
  qa: 'Q&A Pairs',
  leads: 'Leads',
  messages: 'Messages',
  behavior: 'Bot Behavior',
  appearance: 'Appearance',
  deploy: 'Deploy',
};

// ── Helper: get initials ───────────────────────────────
function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

// ── SVG Icons (matching old dashboard) ─────────────────
const icons = {
  overview: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  upload: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
  documents: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  qa: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  leads: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  messages: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  behavior: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  appearance: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
  deploy: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  billing: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  logout: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  plus: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
};

// ═══════════════════════════════════════════════════════
// DASHBOARD PAGE
// ═══════════════════════════════════════════════════════
export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [bots, setBots] = useState<Bot[]>([]);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [customer, setCustomer] = useState<CustomerInfo | null>(null);
  const [stats, setStats] = useState<Stats>({ documents: 0, leads: 0, messages: 0, bots: 0 });
  const [messages, setMessages] = useState<DashMessage[]>([]);
  const [documents, setDocuments] = useState<DashDocument[]>([]);
  const [leads, setLeads] = useState<DashLead[]>([]);
  const [qaPairs, setQaPairs] = useState<DashQA[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newBotName, setNewBotName] = useState('');

  // Alerts
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showAlert = useCallback((type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), type === 'success' ? 3000 : 5000);
  }, []);

  // ── Load bots + customer ─────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        const [custData, botsData] = await Promise.all([
          api.get('/api/dash/customer'),
          api.get('/api/dash/bots'),
        ]);
        setCustomer(custData);
        const botList = botsData.bots || [];
        setBots(botList);
        if (botList.length > 0) setSelectedBot(botList[0]);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Load bot data when bot changes ───────────────
  const loadBotData = useCallback(async (botId: number) => {
    try {
      const [statsData, docsData, leadsData, msgsData, qaData] = await Promise.all([
        api.get(`/api/dash/bot/${botId}/stats`),
        api.get(`/api/dash/bot/${botId}/documents`),
        api.get(`/api/dash/bot/${botId}/leads`),
        api.get(`/api/dash/bot/${botId}/messages`),
        api.get(`/api/dash/bot/${botId}/qa`),
      ]);
      setStats(statsData);
      setDocuments(docsData.documents || []);
      setLeads(leadsData.leads || []);
      setMessages(msgsData.messages || []);
      setQaPairs(qaData.qaPairs || []);
    } catch (err) {
      console.error('Bot data load error:', err);
    }
  }, []);

  useEffect(() => {
    if (selectedBot) loadBotData(selectedBot.id);
  }, [selectedBot, loadBotData]);

  // ── Actions ──────────────────────────────────────
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const switchBot = (bot: Bot) => {
    setSelectedBot(bot);
    setActiveTab('overview');
  };

  const createBot = async () => {
    if (!newBotName.trim()) return;
    try {
      const data = await api.post('/api/bots', { customerId: user!.customerId, name: newBotName });
      setShowCreateModal(false);
      setNewBotName('');
      // Reload bots
      const botsData = await api.get('/api/dash/bots');
      const botList = botsData.bots || [];
      setBots(botList);
      const newBot = botList.find((b: Bot) => b.id === data.botId);
      if (newBot) setSelectedBot(newBot);
      showAlert('success', 'Bot created!');
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Failed to create bot');
    }
  };

  const deleteBot = async () => {
    if (!selectedBot) return;
    try {
      await api.delete(`/api/bots/${selectedBot.id}`);
      setShowDeleteModal(false);
      const botsData = await api.get('/api/dash/bots');
      const botList = botsData.bots || [];
      setBots(botList);
      if (botList.length > 0) setSelectedBot(botList[0]);
      showAlert('success', 'Bot deleted');
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Failed to delete bot');
    }
  };

  const handleUpgrade = async () => {
    try {
      const data = await api.post('/api/stripe/create-checkout', {});
      if (data.url) window.location.href = data.url;
    } catch {
      showAlert('error', 'Failed to start checkout');
    }
  };

  const openBillingPortal = async () => {
    try {
      const data = await api.post('/api/stripe/create-portal', {});
      if (data.url) window.location.href = data.url;
    } catch {
      showAlert('error', 'Failed to open billing portal');
    }
  };

  const refreshData = async () => {
    if (selectedBot) {
      loadBotData(selectedBot.id);
      // Also reload bot settings so behavior/appearance tabs stay in sync
      const botsData = await api.get('/api/dash/bots');
      const botList = botsData.bots || [];
      setBots(botList);
      const updated = botList.find((b: Bot) => b.id === selectedBot.id);
      if (updated) setSelectedBot(updated);
    }
  };

  // ── Loading state ────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading dashboard…</p>
      </div>
    );
  }

  // ── Upgrade page (trial expired) ─────────────────
  if (customer && !customer.hasAccess) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center px-5 py-10">
        <div className="text-2xl font-bold mb-10">
          <span className="text-amber-500">Auto</span>ReplyChat
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl">⏰</div>
          <h1 className="text-3xl font-bold text-slate-100 mb-3">Your trial has ended</h1>
          <p className="text-slate-400 mb-8">Subscribe now to restore access to your dashboard, chatbots, and all your training data.</p>
          <div className="bg-slate-900 rounded-xl p-6 mb-8">
            <div className="text-5xl font-bold text-amber-500">£399</div>
            <div className="text-slate-400 text-sm mt-1">One-time setup fee (includes first month)</div>
            <div className="text-slate-500 text-xs mt-3 pt-3 border-t border-slate-700">Then £99/month · No contract · Cancel anytime</div>
          </div>
          <div className="text-left space-y-2 mb-8">
            {['Unlimited AI conversations', 'Unlimited document training', 'Lead capture & email notifications', 'Custom branded widget', 'Multi-language support (95+ languages)', 'Priority support'].map(f => (
              <div key={f} className="flex items-center gap-3 text-sm text-slate-300">
                <span className="w-5 h-5 bg-amber-500/15 rounded-full flex items-center justify-center text-amber-500 text-xs flex-shrink-0">✓</span>
                {f}
              </div>
            ))}
          </div>
          <button onClick={handleUpgrade} className="w-full py-4 bg-amber-500 text-slate-900 rounded-xl font-bold text-base hover:bg-amber-400 transition">Subscribe Now — £399</button>
          <p className="text-slate-500 text-xs mt-4 leading-relaxed">You'll be redirected to our secure payment provider (Stripe).</p>
        </div>
        <div className="flex gap-6 mt-8">
          <a href="https://autoreplychat.com" className="text-slate-500 text-sm hover:text-amber-500 transition">Homepage</a>
          <button onClick={handleLogout} className="text-slate-500 text-sm hover:text-amber-500 transition">Sign Out</button>
        </div>
      </div>
    );
  }

  // ── Nav items ────────────────────────────────────
  const navSections: { title: string; items: { key: TabKey; label: string; icon: JSX.Element }[] }[] = [
    { title: 'Overview', items: [{ key: 'overview', label: 'Dashboard', icon: icons.overview }] },
    { title: 'Training Data', items: [
      { key: 'upload', label: 'Upload Content', icon: icons.upload },
      { key: 'documents', label: 'Documents', icon: icons.documents },
      { key: 'qa', label: 'Q&A Pairs', icon: icons.qa },
    ]},
    { title: 'Activity', items: [
      { key: 'leads', label: 'Leads', icon: icons.leads },
      { key: 'messages', label: 'Messages', icon: icons.messages },
    ]},
    { title: 'Settings', items: [
      { key: 'behavior', label: 'Bot Behavior', icon: icons.behavior },
      { key: 'appearance', label: 'Appearance', icon: icons.appearance },
      { key: 'deploy', label: 'Deploy', icon: icons.deploy },
    ]},
  ];

  // ── Render tab content ───────────────────────────
  const renderTab = () => {
    if (!selectedBot || !user) return null;
    const commonProps = { customerId: user.customerId, botId: selectedBot.id, showAlert, refreshData };
    switch (activeTab) {
      case 'overview': return <OverviewTab stats={stats} messages={messages} />;
      case 'upload': return <UploadTab {...commonProps} />;
      case 'documents': return <DocumentsTab {...commonProps} documents={documents} />;
      case 'qa': return <QAPairsTab qaPairs={qaPairs} />;
      case 'leads': return <LeadsTab leads={leads} />;
      case 'messages': return <MessagesTab messages={messages} />;
      case 'behavior': return <BehaviorTab {...commonProps} bot={selectedBot} />;
      case 'appearance': return <AppearanceTab {...commonProps} bot={selectedBot} />;
      case 'deploy': return <DeployTab publicId={selectedBot.public_id} />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      {/* ── Bot Sidebar ──────────────────────────── */}
      <div className="w-[72px] bg-slate-800 flex flex-col items-center py-4 gap-3 flex-shrink-0">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-base mb-5">AC</div>
        {bots.map(bot => (
          <button
            key={bot.id}
            onClick={() => switchBot(bot)}
            title={bot.name}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-semibold text-sm transition-all ${
              selectedBot?.id === bot.id
                ? 'bg-blue-500 text-white border-2 border-blue-400'
                : 'bg-slate-700 text-slate-400 border-2 border-transparent hover:bg-slate-600 hover:text-white'
            }`}
          >
            {getInitials(bot.name)}
          </button>
        ))}
        <button
          onClick={() => setShowCreateModal(true)}
          title="Create new bot"
          className="w-12 h-12 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-600 text-slate-500 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/10 transition-all"
        >
          {icons.plus}
        </button>
      </div>

      {/* ── Nav Sidebar ──────────────────────────── */}
      <div className="w-60 bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-slate-200">
          <h2 className="text-base font-semibold text-slate-800 truncate">{selectedBot?.name || 'Select Bot'}</h2>
          <p className="text-xs text-slate-400 mt-1">Bot ID: {selectedBot?.id}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {navSections.map(section => (
            <div key={section.title} className="px-3 pt-4 pb-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide px-2 mb-2">{section.title}</div>
              <ul>
                {section.items.map(item => (
                  <li key={item.key}>
                    <button
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                        activeTab === item.key
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Billing link for paid users */}
          {customer?.isPaid && (
            <div className="px-3 pb-2">
              <button
                onClick={openBillingPortal}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all"
              >
                {icons.billing}
                Billing
              </button>
            </div>
          )}
        </div>

        {/* User footer */}
        <div className="mt-auto px-4 py-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {customer?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-slate-800 truncate">{customer?.name}</div>
              <div className="text-xs text-slate-400 truncate">{customer?.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition"
          >
            {icons.logout}
            Sign Out
          </button>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Trial banner */}
        {customer?.showTrialBanner && (
          <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-amber-100 px-5 py-2.5 text-sm text-center font-medium">
            ⏰ Your free trial ends in {customer.daysLeft} day{customer.daysLeft !== 1 ? 's' : ''}.{' '}
            <button onClick={handleUpgrade} className="text-amber-300 font-bold underline hover:text-amber-200">Subscribe now</button>
          </div>
        )}

        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-xl font-semibold text-slate-800">{TAB_TITLES[activeTab]}</h1>
          <div className="flex items-center gap-3">
            {bots.length > 1 && (
              <button onClick={() => setShowDeleteModal(true)} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition">Delete Bot</button>
            )}
          </div>
        </div>

        {/* Alerts */}
        {alert && (
          <div className={`mx-8 mt-4 px-4 py-3 rounded-lg text-sm font-medium ${
            alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'
          }`}>
            {alert.message}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {renderTab()}
        </div>
      </div>

      {/* ── Create Bot Modal ─────────────────────── */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Create New Bot</h3>
            <p className="text-sm text-slate-500 mb-5">Give your new chatbot a name to get started.</p>
            <label className="text-sm font-medium text-slate-700">Bot Name</label>
            <input
              type="text"
              value={newBotName}
              onChange={e => setNewBotName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && createBot()}
              placeholder="e.g., Support Bot, Sales Assistant"
              className="w-full mt-1.5 mb-5 px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowCreateModal(false)} className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">Cancel</button>
              <button onClick={createBot} className="px-4 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">Create Bot</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Bot Modal ─────────────────────── */}
      {showDeleteModal && selectedBot && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Delete "{selectedBot.name}"?</h3>
            <p className="text-sm text-slate-500 mb-5">This will permanently delete all documents, leads, and messages associated with this bot. This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition">Cancel</button>
              <button onClick={deleteBot} className="px-4 py-2.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition">Delete Bot</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
