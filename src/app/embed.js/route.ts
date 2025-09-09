import { NextResponse } from 'next/server';

export async function GET() {
  const embedScript = `(function () {
  function start() {
    try {
      // Try multiple methods to get the script tag
      var currentScript = document.currentScript;
      var scriptTag = null;

      if (currentScript) {
        scriptTag = currentScript;
      } else {
        // Fallback: find script tag by src
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
          if (scripts[i].src && scripts[i].src.includes('/embed.js')) {
            scriptTag = scripts[i];
            break;
          }
        }
      }

      if (!scriptTag) {
        console.warn('Corinna AI Chat: Script tag not found');
        return;
      }

      var domainId = scriptTag.getAttribute('data-corinna-id');
      if (!domainId) {
        console.warn('Corinna AI Chat: data-corinna-id not provided');
        return;
      }

      console.log('Corinna AI Chat: Initializing for domain:', domainId);
      console.log('Corinna AI Chat: Script tag found:', scriptTag);
      console.log('Corinna AI Chat: Current hostname:', window.location.hostname);

      var style = document.createElement('style');
      style.textContent = '.chat-frame {\\n' +
        '  position: fixed;\\n' +
        '  bottom: 50px;\\n' +
        '  right: 50px;\\n' +
        '  border: none;\\n' +
        '  z-index: 9999;\\n' +
        '  width: 350px;\\n' +
        '  height: 500px;\\n' +
        '  box-shadow: 0 4px 20px rgba(0,0,0,0.15);\\n' +
        '  border-radius: 12px;\\n' +
        '  overflow: hidden;\\n' +
      '}';
      document.head.appendChild(style);

      var iframe = document.createElement('iframe');
      var chatbotUrl = (window.location.hostname === 'localhost'
        ? 'http://localhost:3000/chatbot'
        : 'https://corinna-two.vercel.app/chatbot');
      var chatbotOrigin = new URL(chatbotUrl).origin;

      console.log('Corinna AI Chat: Using URL:', chatbotUrl);

      iframe.src = chatbotUrl + '?id=' + encodeURIComponent(domainId);
      iframe.classList.add('chat-frame');
      iframe.id = 'corinna-chat-iframe';
      iframe.allow = 'microphone; camera';

      iframe.onload = function () {
        console.log('Corinna AI Chat: Iframe loaded');
        try {
          if (iframe.contentWindow) {
            iframe.contentWindow.postMessage(domainId, chatbotOrigin);
            console.log('Corinna AI Chat: Domain ID sent to iframe:', domainId);
          }
        } catch (e) {
          console.error('Corinna AI Chat: Error sending message to iframe:', e);
        }
      };

      iframe.onerror = function (error) {
        console.error('Corinna AI Chat: Iframe failed to load:', error);
      };

      function append() {
        if (!document.body) {
          console.log('Corinna AI Chat: Document body not ready, waiting...');
          return window.addEventListener('load', append, { once: true });
        }
        document.body.appendChild(iframe);
        console.log('Corinna AI Chat: Iframe added to page');
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
          console.log('Corinna AI Chat: Dimensions updated:', dimensions);
        } catch (_) {
          console.log('Corinna AI Chat: Non-dimension message received:', e.data);
        }
      });
    } catch (err) {
      console.error('Corinna AI Chat: Error in start function:', err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();`;

  return new NextResponse(embedScript, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
