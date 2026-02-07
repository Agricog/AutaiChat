(function() {
  // Get bot ID from script tag
  var scripts = document.getElementsByTagName('script');
  var currentScript = scripts[scripts.length - 1];
  var botId = currentScript.getAttribute('data-bot-id');
  
  if (!botId) {
    console.error('AutoReplyChat: data-bot-id attribute is required');
    return;
  }
  
  // Fetch bot settings
  fetch('https://api.autoreplychat.com/api/bots/' + botId + '/settings')
    .then(function(response) { return response.json(); })
    .then(function(settings) {
      createWidget(botId, settings);
    })
    .catch(function(error) {
      console.error('AutoReplyChat: Failed to load bot settings', error);
      // Use defaults if settings fail
      createWidget(botId, {});
    });
  
  function createWidget(botId, settings) {
    var buttonStyle = settings.buttonStyle || 'circle';
    var buttonPosition = settings.buttonPosition || 'right';
    var buttonSize = settings.buttonSize || 60;
    var chatBubbleBg = settings.chatBubbleBg || '#3b82f6';
    var barMessage = settings.barMessage || 'Chat Now';
    
    // Create container
    var container = document.createElement('div');
    container.id = 'autoreply-chat-container';
    container.style.cssText = 'position: fixed; bottom: 24px; ' + buttonPosition + ': 24px; z-index: 9999; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
    
    // Create chat button
    var button = document.createElement('div');
    button.id = 'autoreply-chat-button';
    
    if (buttonStyle === 'bar') {
      button.style.cssText = 'background: ' + chatBubbleBg + '; color: white; padding: 12px 20px; border-radius: 24px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 8px; transition: transform 0.2s, opacity 0.2s;';
      button.innerHTML = '<svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg><span style="font-weight: 500;">' + barMessage + '</span>';
    } else {
      button.style.cssText = 'background: ' + chatBubbleBg + '; width: ' + buttonSize + 'px; height: ' + buttonSize + 'px; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; transition: transform 0.2s, opacity 0.2s;';
      var iconSize = Math.round(buttonSize * 0.4);
      button.innerHTML = '<svg width="' + iconSize + '" height="' + iconSize + '" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
    }
    
    button.onmouseover = function() { this.style.transform = 'scale(1.05)'; };
    button.onmouseout = function() { this.style.transform = 'scale(1)'; };
    
    // Create iframe container (hidden initially)
    var iframeContainer = document.createElement('div');
    iframeContainer.id = 'autoreply-chat-iframe-container';
    iframeContainer.style.cssText = 'display: none; width: 380px; height: 550px; margin-bottom: 16px;';
    
    // Create iframe
    var iframe = document.createElement('iframe');
    iframe.src = 'https://autoreplychat.com/chat/' + botId;
    iframe.style.cssText = 'width: 100%; height: 100%; border: none; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.15);';
    iframe.allow = 'microphone';
    
    iframeContainer.appendChild(iframe);
    
    // Toggle function
    var isOpen = false;
    button.onclick = function() {
      isOpen = !isOpen;
      if (isOpen) {
        iframeContainer.style.display = 'block';
        if (buttonStyle === 'bar') {
          button.innerHTML = '<svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg><span style="font-weight: 500;">Close</span>';
        } else {
          button.innerHTML = '<svg width="' + iconSize + '" height="' + iconSize + '" fill="white" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
        }
      } else {
        iframeContainer.style.display = 'none';
        if (buttonStyle === 'bar') {
          button.innerHTML = '<svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg><span style="font-weight: 500;">' + barMessage + '</span>';
        } else {
          button.innerHTML = '<svg width="' + iconSize + '" height="' + iconSize + '" fill="white" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
        }
      }
    };
    
    container.appendChild(iframeContainer);
    container.appendChild(button);
    document.body.appendChild(container);
  }
})();
