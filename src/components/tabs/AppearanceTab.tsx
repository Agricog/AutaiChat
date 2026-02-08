import { useState, useEffect } from 'react';
import { api } from '../../lib/api';

interface Bot {
  id: number;
  header_title: string;
  header_color: string;
  text_color: string;
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
}

interface Props {
  customerId: number;
  botId: number;
  bot: Bot;
  showAlert: (type: 'success' | 'error', message: string) => void;
  refreshData: () => void;
}

const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex gap-3 items-center">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-14 h-10 border border-slate-200 rounded-lg cursor-pointer" />
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-24 px-3 py-2 border border-slate-200 rounded-lg text-sm" />
      </div>
    </div>
  );
}

function ToggleBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-medium rounded-lg border transition ${active ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>{label}</button>
  );
}

export default function AppearanceTab({ customerId, botId, bot, showAlert }: Props) {
  const [headerTitle, setHeaderTitle] = useState(bot.header_title || 'Support Assistant');
  const [headerColor, setHeaderColor] = useState(bot.header_color || '#3b82f6');
  const [textColor, setTextColor] = useState(bot.text_color || '#ffffff');
  const [chatBubbleBg, setChatBubbleBg] = useState(bot.chat_bubble_bg || '#3b82f6');
  const [avatarBg, setAvatarBg] = useState(bot.avatar_bg || '#e0e0e0');
  const [buttonStyle, setButtonStyle] = useState(bot.button_style || 'circle');
  const [buttonPosition, setButtonPosition] = useState(bot.button_position || 'right');
  const [buttonSize, setButtonSize] = useState(bot.button_size || 60);
  const [barMessage, setBarMessage] = useState(bot.bar_message || 'Chat Now');
  const [chatWindowBg, setChatWindowBg] = useState(bot.chat_window_bg || '#ffffff');
  const [userMessageBg, setUserMessageBg] = useState(bot.user_message_bg || '#3b82f6');
  const [botMessageBg, setBotMessageBg] = useState(bot.bot_message_bg || '#f3f4f6');
  const [sendButtonBg, setSendButtonBg] = useState(bot.send_button_bg || '#3b82f6');

  useEffect(() => {
    setHeaderTitle(bot.header_title || 'Support Assistant');
    setHeaderColor(bot.header_color || '#3b82f6');
    setTextColor(bot.text_color || '#ffffff');
    setChatBubbleBg(bot.chat_bubble_bg || '#3b82f6');
    setAvatarBg(bot.avatar_bg || '#e0e0e0');
    setButtonStyle(bot.button_style || 'circle');
    setButtonPosition(bot.button_position || 'right');
    setButtonSize(bot.button_size || 60);
    setBarMessage(bot.bar_message || 'Chat Now');
    setChatWindowBg(bot.chat_window_bg || '#ffffff');
    setUserMessageBg(bot.user_message_bg || '#3b82f6');
    setBotMessageBg(bot.bot_message_bg || '#f3f4f6');
    setSendButtonBg(bot.send_button_bg || '#3b82f6');
  }, [bot]);

  const handleSave = async () => {
    try {
      await api.post(`/api/bots/${botId}/appearance`, {
        customerId, headerTitle, headerColor, textColor, chatBubbleBg, avatarBg,
        buttonStyle, buttonPosition, buttonSize, barMessage,
        chatWindowBg, userMessageBg, botMessageBg, sendButtonBg,
      });
      showAlert('success', 'Appearance saved!');
    } catch (err: unknown) {
      showAlert('error', err instanceof Error ? err.message : 'Failed to save');
    }
  };

  const cardCls = 'bg-white rounded-xl border border-slate-200 mb-6';
  const headerCls = 'px-5 py-4 border-b border-slate-200';
  const bodyCls = 'px-5 py-5';
  const inputCls = 'w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
  const labelCls = labelClass;

  return (
    <div>
      {/* Chat Button */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Chat Button</h3></div>
        <div className={bodyCls}>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className={labelCls}>Button Style</label>
              <div className="flex gap-2">
                <ToggleBtn active={buttonStyle === 'circle'} onClick={() => setButtonStyle('circle')} label="Circle" />
                <ToggleBtn active={buttonStyle === 'bar'} onClick={() => setButtonStyle('bar')} label="Bar" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Button Position</label>
              <div className="flex gap-2">
                <ToggleBtn active={buttonPosition === 'left'} onClick={() => setButtonPosition('left')} label="Left" />
                <ToggleBtn active={buttonPosition === 'right'} onClick={() => setButtonPosition('right')} label="Right" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
              <label className={labelCls}>Button Size: {buttonSize}px</label>
              <input type="range" min="50" max="96" value={buttonSize} onChange={e => setButtonSize(parseInt(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className={labelCls}>Bar Message</label>
              <input type="text" value={barMessage} onChange={e => setBarMessage(e.target.value)} className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <ColorInput label="Chat Bubble Background" value={chatBubbleBg} onChange={setChatBubbleBg} />
            <ColorInput label="Avatar Background" value={avatarBg} onChange={setAvatarBg} />
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Chat Window</h3></div>
        <div className={bodyCls}>
          <div className="mb-5">
            <label className={labelCls}>Header Title</label>
            <input type="text" value={headerTitle} onChange={e => setHeaderTitle(e.target.value)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <ColorInput label="Header Color" value={headerColor} onChange={setHeaderColor} />
            <div>
              <label className={labelCls}>Header Text Color</label>
              <div className="flex gap-2">
                <ToggleBtn active={textColor === '#ffffff'} onClick={() => setTextColor('#ffffff')} label="White" />
                <ToggleBtn active={textColor === '#000000'} onClick={() => setTextColor('#000000')} label="Black" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <ColorInput label="Chat Window Background" value={chatWindowBg} onChange={setChatWindowBg} />
            <ColorInput label="Send Button Color" value={sendButtonBg} onChange={setSendButtonBg} />
          </div>
          <div className="grid grid-cols-2 gap-5 mt-5">
            <ColorInput label="User Message Background" value={userMessageBg} onChange={setUserMessageBg} />
            <ColorInput label="Bot Message Background" value={botMessageBg} onChange={setBotMessageBg} />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className={cardCls}>
        <div className={headerCls}><h3 className="text-base font-semibold text-slate-800">Preview</h3></div>
        <div className={bodyCls}>
          <div className="flex gap-10 items-start flex-wrap">
            {/* Button preview */}
            <div>
              <label className={`${labelCls} mb-3`}>Chat Button</label>
              {buttonStyle === 'circle' ? (
                <div style={{ width: buttonSize, height: buttonSize, background: chatBubbleBg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer' }}>
                  <svg width="28" height="28" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
                </div>
              ) : (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: chatBubbleBg, color: 'white', padding: '12px 20px', borderRadius: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer' }}>
                  <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
                  <span>{barMessage}</span>
                </div>
              )}
            </div>

            {/* Widget preview */}
            <div>
              <label className={`${labelCls} mb-3`}>Chat Window</label>
              <div style={{ width: 320, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <div style={{ background: headerColor, color: textColor, padding: 16 }}>
                  <div style={{ fontWeight: 600 }}>{headerTitle}</div>
                </div>
                <div style={{ background: chatWindowBg, padding: 16, minHeight: 120 }}>
                  <div style={{ background: botMessageBg, color: '#1f2937', padding: '10px 14px', borderRadius: 12, marginBottom: 10, maxWidth: '80%' }}>Hi! How can I help you today?</div>
                  <div style={{ background: userMessageBg, color: 'white', padding: '10px 14px', borderRadius: 12, marginLeft: 'auto', maxWidth: '80%', textAlign: 'right' }}>I have a question</div>
                </div>
                <div style={{ background: 'white', padding: 12, borderTop: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, padding: '10px 14px', background: '#f1f5f9', borderRadius: 8, color: '#94a3b8', fontSize: 14 }}>Ask a question...</div>
                    <div style={{ background: sendButtonBg, color: 'white', padding: '10px 14px', borderRadius: 8, display: 'flex', alignItems: 'center' }}>
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: 8 }}><span style={{ fontSize: 11, color: '#9ca3af' }}>Powered by AutoReplyChat</span></div>
                </div>
              </div>
            </div>
          </div>

          <button onClick={handleSave} className="mt-6 px-5 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition">Save Appearance</button>
        </div>
      </div>
    </div>
  );
}
