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
        console.log('Corinna AI Chat: Initializing...');

        const iframe = document.createElement("iframe");

        const iframeStyles = (styleString) => {
            const style = document.createElement('style');
            style.textContent = styleString;
            document.head.append(style);
        }

        iframeStyles('
            .chat-frame {
                position: fixed;
                bottom: 50px;
                right: 50px;
                border: none;
                z-index: 9999;
                width: 350px;
                height: 500px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                border-radius: 12px;
                overflow: hidden;
            }
        ')

        // Use production URL instead of localhost
        const chatbotUrl = window.location.hostname === 'localhost'
            ? 'http://localhost:3000/chatbot'
            : 'https://corinna-two.vercel.app/chatbot';

        iframe.src = chatbotUrl;
        iframe.classList.add('chat-frame');
        iframe.setAttribute('id', 'corinna-chat-iframe');
        iframe.setAttribute('allow', 'microphone; camera');

        // Add error handling
        iframe.onerror = function() {
            console.error('Corinna AI Chat: Failed to load iframe');
        };

        iframe.onload = function() {
            console.log('Corinna AI Chat: Iframe loaded successfully');
            // Send domain ID after iframe loads
            setTimeout(() => {
                iframe.contentWindow.postMessage("${id}", chatbotUrl);
            }, 1000);
        };

        document.body.appendChild(iframe);
        console.log('Corinna AI Chat: Iframe added to page');

        window.addEventListener("message", (e) => {
            if(e.origin !== chatbotUrl.replace('/chatbot', '')) return;

            try {
                let dimensions = JSON.parse(e.data);
                iframe.width = dimensions.width || '350px';
                iframe.height = dimensions.height || '500px';
                console.log('Corinna AI Chat: Dimensions updated', dimensions);
            } catch (error) {
                console.error('Corinna AI Chat: Error parsing message', error);
            }
        });

        console.log('Corinna AI Chat: Setup complete');
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
