(function () {
  function start() {
    try {
      var currentScript = document.currentScript;
      if (!currentScript) {
        console.warn('Corinna AI Chat: currentScript not found');
        return;
      }

      var domainId = currentScript.getAttribute('data-corinna-id');
      if (!domainId) {
        console.warn('Corinna AI Chat: data-corinna-id not provided');
        return;
      }

      var style = document.createElement('style');
      style.textContent = '.chat-frame {\n' +
        '  position: fixed;\n' +
        '  bottom: 50px;\n' +
        '  right: 50px;\n' +
        '  border: none;\n' +
        '  z-index: 9999;\n' +
        '  width: 350px;\n' +
        '  height: 500px;\n' +
        '  box-shadow: 0 4px 20px rgba(0,0,0,0.15);\n' +
        '  border-radius: 12px;\n' +
        '  overflow: hidden;\n' +
      '}';
      document.head.appendChild(style);

      var iframe = document.createElement('iframe');
      var chatbotUrl = (window.location.hostname === 'localhost'
        ? 'http://localhost:3000/chatbot'
        : 'https://corinna-two.vercel.app/chatbot');
      var chatbotOrigin = new URL(chatbotUrl).origin;

      iframe.src = chatbotUrl + '?id=' + encodeURIComponent(domainId);
      iframe.classList.add('chat-frame');
      iframe.id = 'corinna-chat-iframe';
      iframe.allow = 'microphone; camera';

      iframe.onload = function () {
        try {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(domainId, chatbotOrigin);
          }
        } catch (e) {}
      };

      function append() {
        if (!document.body) return window.addEventListener('load', append, { once: true });
        document.body.appendChild(iframe);
      }
      append();

      window.addEventListener('message', function (e) {
        if (e.origin !== chatbotOrigin) return;
        try {
          var dimensions = JSON.parse(e.data);
          if (dimensions && typeof dimensions.width !== 'undefined') {
            iframe.style.width = String(dimensions.width) + 'px';
          }
          if (dimensions && typeof dimensions.height !== 'undefined') {
            iframe.style.height = String(dimensions.height) + 'px';
          }
        } catch (_) {}
      });
    } catch (err) {
      // swallow
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
