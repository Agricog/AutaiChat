(function() {
  // Prevent double-loading
  if (window.AutoReplyChatLoaded) return;
  window.AutoReplyChatLoaded = true;

  // Get customer ID from script tag
  const scripts = document.getElementsByTagName('script');
  const currentScript = scripts[scripts.length - 1];
  const customerId = currentScript.getAttribute('data-customer-id');

  if (!customerId) {
    console.error('AutoReplyChat: Missing data-customer-id attribute');
    return;
  }

  // Create widget container
  const container = document.createElement('div');
  container.id = 'autoreplychat-root';
  document.body.appendChild(container);

  // Load widget CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://autoreplychat.com/assets/index.css';
  document.head.appendChild(link);

  // Load widget JavaScript
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://autoreplychat.com/assets/index.js';
  
  script.onload = function() {
    // Initialize widget with customer ID
    if (window.initAutoReplyChat) {
      window.initAutoReplyChat(customerId);
    }
  };

  script.onerror = function() {
    console.error('AutoReplyChat: Failed to load widget');
  };

  document.body.appendChild(script);
})();
