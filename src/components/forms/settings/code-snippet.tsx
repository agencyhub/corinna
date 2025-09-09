'use client'
import Section from '@/components/section-label';
import { useToast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';

type Props = {
  id: string
}

const CodeSnippet = ({ id }: Props) => {
  const { toast } = useToast()
  let snippet = `<script>
    (function() {
      function start() {
        console.log('Corinna AI Chat: Initializing...');

        var iframe = document.createElement('iframe');

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
        document.head.append(style);

        // Use production URL instead of localhost
        var chatbotUrl = window.location.hostname === 'localhost'
          ? 'http://localhost:3000/chatbot'
          : 'https://corinna-two.vercel.app/chatbot';
        var chatbotOrigin = new URL(chatbotUrl).origin;

        // Pass domain id in querystring for robustness
        iframe.src = chatbotUrl + '?id=${id}';
        iframe.classList.add('chat-frame');
        iframe.setAttribute('id', 'corinna-chat-iframe');
        iframe.setAttribute('allow', 'microphone; camera');

        iframe.onerror = function () {
          console.error('Corinna AI Chat: Failed to load iframe');
        };

        iframe.onload = function () {
          console.log('Corinna AI Chat: Iframe loaded successfully');
          // Send domain ID after iframe loads
          setTimeout(function () {
            if (iframe.contentWindow) {
              iframe.contentWindow.postMessage('${id}', chatbotOrigin);
            }
          }, 1000);
        };

        if (!document.body) {
          console.warn('Corinna AI Chat: document.body not ready yet, delaying append');
          window.addEventListener('load', function () {
            document.body.appendChild(iframe);
            console.log('Corinna AI Chat: Iframe added to page (on window.load)');
          });
        } else {
          document.body.appendChild(iframe);
          console.log('Corinna AI Chat: Iframe added to page');
        }

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
            console.log('Corinna AI Chat: Dimensions updated', dimensions);
          } catch (error) {
            // Ignore non-dimension messages
          }
        });

        console.log('Corinna AI Chat: Setup complete');
      }

      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', start);
      } else {
        start();
      }
    })();
</script>`

  return (
    <div className="mt-10 flex flex-col gap-5 items-start">
      <Section
        label="Code snippet"
        message="Copy and paste this code snippet into the header tag of your website"
      />
      <div className="bg-cream px-10 rounded-lg inline-block relative">
        <Copy
          className="absolute top-5 right-5 text-gray-400 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(snippet)
            toast({
              title: 'Copied to clipboard',
              description: 'You can now paste the code inside your website',
            })
          }}
        />
        <pre>
          <code className="text-gray-500">{snippet}</code>
        </pre>
      </div>
    </div>
  )
}

export default CodeSnippet
