import ChatWidget from './ChatWidget'

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const customerId = urlParams.get('customer') || '1';

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Multilingual Chatbot Widget
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          This is a demo page. The chatbot widget appears in the bottom-right corner.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="text-left space-y-2 text-gray-700">
            <li>✓ Auto-detects browser language (95+ languages)</li>
            <li>✓ Lead capture form after first exchange</li>
            <li>✓ Claude-powered responses</li>
            <li>✓ Email notifications to business owner</li>
          </ul>
        </div>
      </div>
      
      <ChatWidget customerId={customerId} />
    </div>
  )
}

export default App
