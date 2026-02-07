import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
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

// For local development - render App component
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
}
