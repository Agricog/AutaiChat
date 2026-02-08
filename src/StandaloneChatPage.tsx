import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChatWidget from './ChatWidget';

interface BotSettings {
  botId: number;
  customerId: number;
  name: string;
  greetingMessage: string;
  headerTitle: string;
  headerColor: string;
  textColor: string;
  leadCaptureEnabled: boolean;
  chatBubbleBg: string;
  avatarBg: string;
  buttonStyle: string;
  buttonPosition: string;
  buttonSize: number;
  barMessage: string;
  chatWindowBg: string;
  userMessageBg: string;
  botMessageBg: string;
  sendButtonBg: string;
  leadFormMessage: string;
  isTrial: boolean;
}

function StandaloneChatPage() {
  const { botId } = useParams<{ botId: string }>();
  const [settings, setSettings] = useState<BotSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!botId) return;

    const fetchSettings = async () => {
      try {
        const response = await fetch(`https://api.autoreplychat.com/api/bots/${botId}/settings`);
        if (!response.ok) {
          throw new Error('Bot not found');
        }
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        setError('Bot not found');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [botId]);

  if (!botId) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Bot not found</h1>
          <p className="text-gray-600 mt-2">Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Bot not found</h1>
          <p className="text-gray-600 mt-2">Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ChatWidget 
          botId={botId}
          customerId={settings?.customerId?.toString()}
          embedded={true}
          greetingMessage={settings?.greetingMessage}
          headerTitle={settings?.headerTitle}
          headerColor={settings?.headerColor}
          textColor={settings?.textColor}
          leadCaptureEnabled={settings?.leadCaptureEnabled}
          chatBubbleBg={settings?.chatBubbleBg}
          avatarBg={settings?.avatarBg}
          buttonStyle={settings?.buttonStyle}
          buttonPosition={settings?.buttonPosition}
          buttonSize={settings?.buttonSize}
          barMessage={settings?.barMessage}
          chatWindowBg={settings?.chatWindowBg}
          userMessageBg={settings?.userMessageBg}
          botMessageBg={settings?.botMessageBg}
          sendButtonBg={settings?.sendButtonBg}
          leadFormMessage={settings?.leadFormMessage}
          isTrial={settings?.isTrial}
        />
      </div>
    </div>
  );
}

export default StandaloneChatPage;
