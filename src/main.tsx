import React from 'react'
import ReactDOM from 'react-dom/client'
import ChatWidget from './ChatWidget'
import './index.css'

// Global initialization function for embed script
declare global {
  interface Window {
    initAutoReplyChat: (customerId: string) => void;
  }
}

window.initAutoReplyChat = function(customerId: string) {
  const container = document.getElementById('autoreplychat-root');
  if (container) {
    ReactDOM.createRoot(container).render(
      <React.StrictMode>
        <ChatWidget customerId={customerId} />
      </React.StrictMode>
    );
  }
};

// For local development - check URL parameter
const urlParams = new URLSearchParams(window.location.search);
const devCustomerId = urlParams.get('customer') || '1';

// Render directly if in development mode
if (import.meta.env.DEV) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ChatWidget customerId={devCustomerId} />
    </React.StrictMode>
  );
}
