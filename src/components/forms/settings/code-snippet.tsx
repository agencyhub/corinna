'use client'
import { useToast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';

type Props = {
  id: string
}

const CodeSnippet = ({ id }: Props) => {
  const { toast } = useToast()
  let snippet = `<script
    src="https://corinna-two.vercel.app/embed.js"
    data-corinna-id="${id}"
    defer
  ><\/script>`

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Code Snippet</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Copy and paste this code snippet into the header tag of your website
        </p>
      </div>

      <div className="relative bg-gray-900 dark:bg-gray-950 rounded-xl p-6 border border-gray-700">
        <button
          className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
          onClick={() => {
            navigator.clipboard.writeText(snippet)
            toast({
              title: 'Copied to clipboard',
              description: 'You can now paste the code inside your website',
            })
          }}
        >
          <Copy className="h-4 w-4 text-gray-300 group-hover:text-white transition-colors" />
        </button>

        <pre className="overflow-x-auto">
          <code className="text-green-400 text-sm font-mono leading-relaxed">
            {snippet}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default CodeSnippet
