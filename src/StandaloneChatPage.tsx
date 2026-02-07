import { useParams } from 'react-router-dom';
import ChatWidget from './ChatWidget';

function StandaloneChatPage() {
  const { botId } = useParams<{ botId: string }>();
  
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ChatWidget 
          botId={botId}
          embedded={true}
        />
      </div>
    </div>
  );
}

export default StandaloneChatPage;
