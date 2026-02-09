import { useState, useEffect } from 'react';
import { api } from '../../lib/api';

interface Bot {
  id: number;
  bot_instructions: string;
  greeting_message: string;
  greeting_bubble_enabled: boolean;
  lead_capture_enabled: boolean;
  lead_form_message: string;
  conversation_notifications: boolean;
  notification_emails: string;
}

interface Props {
  customerId: number;
  botId: number;
  bot: Bot;
  showAlert: (type: 'success' | 'error', message: string) => void;
  refreshData: () => void;
}

export default function BehaviorTab({ customerId, botId, bot, showAlert }: Props) {
  const [instructions, setInstructions] = useState(bot.bot_instructions || '');
  const [greeting, setGreeting] = useState(bot.greeting_message || 'Thank you for visiting! How may we assist you today?');
  const [greetingBubble, setGreetingBubble] = useState(bot.greeting_bubble_enabled !== false);
  const [leadCapture, setLeadCapture] = useState(bot.lead_capture_enabled !== false);
  const [leadFormMsg, setLeadFormMsg] = useState(bot.lead_form_message || "Want personalized help? Leave your details and we'll follow up");
  const [convNotifications, setConvNotifications] = useState(bot.conversation_notifications || false);
  const [notifEmails, setNotifEmails] = useState(bot.notification_emails || '');

  // Sync when bot changes
  useEffect(() => {
    setInstructions(bot.bot_instructions || '');
    setGreeting(bot.greeting_message || 'Thank you for visiting! How may we assist you today?');
    setGreetingBubble(bot.greeting_bubble_enabled !== false);
    setLeadCapture(bot.lead_capture_enabled !== false);
    setLeadFormMsg(bot.lead_form_message || "Want personalized help? Leave your details and we'll follow up");
    setConvNotifications(bot.conversation_notifications || false);
    setNotifEmails(bot.notification_emails || '');
  }, [bot]);

  const save = async (endpoint: string, body: Record<string, unknown>, msg: string) => {
    try {
      await api.post(`/api/bots/${botId}/${endpoint}`, { customerId, ...body });
      showAlert('success', msg);
      refreshData();
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Failed to save');
    }
  };

  const cardCls = 'bg-white rounded-xl border border-slate-200 mb-6';
  const headerCls = 'px-5 py-4 border-b border-slate-200';
  const bodyCls = 'px-5 py-5';
  const inputCls = 'w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const btnCls = 'px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition';
  const helpCls = 'text-xs text-slate-400 mt-1.5';

  return (
    <div>
      {/* Bot Instructions */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Bot Instructions</h3></div>
        <div className={bodyCls}>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">System Prompt</label>
          <textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows={8} placeholder="Describe how your bot should behave..." className={`${inputCls} resize-y`} />
          <p className={helpCls}>This tells the AI how to respond — its personality, tone, what it should/shouldn't say.</p>
          <button onClick={() => save('instructions', { instructions }, 'Instructions saved!')} className={`${btnCls} mt-4`}>Save Instructions</button>
        </div>
      </div>

      {/* Greeting Message */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Greeting Message</h3></div>
        <div className={bodyCls}>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Welcome Message</label>
          <input type="text" value={greeting} onChange={e => setGreeting(e.target.value)} placeholder="Thank you for visiting! How may we assist you today?" className={inputCls} />
          <p className={helpCls}>Shown in the chat bubble when visitors first see the widget.</p>
          <button onClick={() => save('greeting', { greeting }, 'Greeting saved!')} className={`${btnCls} mt-4`}>Save Greeting</button>
        </div>
      </div>

      {/* Greeting Bubble Toggle */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Greeting Bubble</h3></div>
        <div className={bodyCls}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={greetingBubble}
              onChange={e => {
                setGreetingBubble(e.target.checked);
                save('greeting-bubble', { enabled: e.target.checked }, e.target.checked ? 'Greeting bubble enabled!' : 'Greeting bubble disabled!');
              }}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-800">Show greeting message bubble on page load</span>
          </label>
          <p className={helpCls}>When enabled, the greeting message appears in a popup bubble above the chat button. It auto-hides after 10 seconds.</p>
        </div>
      </div>

      {/* Lead Capture */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Lead Capture</h3></div>
        <div className={bodyCls}>
          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={leadCapture}
              onChange={e => {
                setLeadCapture(e.target.checked);
                save('lead-capture', { enabled: e.target.checked }, e.target.checked ? 'Lead capture enabled!' : 'Lead capture disabled!');
              }}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-800">Enable lead capture form</span>
          </label>
          <p className={`${helpCls} mb-4`}>When enabled, visitors are asked for their name and email after the first message exchange.</p>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Lead Form Message</label>
          <textarea value={leadFormMsg} onChange={e => setLeadFormMsg(e.target.value)} rows={3} placeholder="Want personalized help? Leave your details and we'll follow up" className={`${inputCls} resize-y`} />
          <p className={helpCls}>The message shown above the lead capture form.</p>
          <button onClick={() => save('lead-form-message', { message: leadFormMsg }, 'Lead form message saved!')} className={`${btnCls} mt-4`}>Save Lead Form Message</button>
        </div>
      </div>

      {/* Conversation Notifications */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Conversation Notifications</h3></div>
        <div className={bodyCls}>
          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={convNotifications}
              onChange={e => setConvNotifications(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-800">Send conversation transcripts via email</span>
          </label>
          <p className={`${helpCls} mb-4`}>When enabled, full conversation transcripts are emailed after 1 minute of inactivity.</p>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Notification Email(s)</label>
          <input type="text" value={notifEmails} onChange={e => setNotifEmails(e.target.value)} placeholder="email@example.com, another@example.com" className={inputCls} />
          <p className={helpCls}>Comma-separated list of email addresses to receive conversation transcripts.</p>
          <button
            onClick={() => {
              if (convNotifications && !notifEmails.trim()) { showAlert('error', 'Please enter at least one email'); return; }
              save('notifications', { enabled: convNotifications, emails: notifEmails }, 'Notification settings saved!');
            }}
            className={`${btnCls} mt-4`}
          >Save Notification Settings</button>
        </div>
      </div>
    </div>
  );
}
