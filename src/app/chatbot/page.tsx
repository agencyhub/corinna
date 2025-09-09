'use client'
import AiChatBot from '@/components/chatbot'

type Props = {}

const ChatBot = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Corinna AI Chatbot</h1>
        <p className="text-gray-600 mb-4">
          Loading chatbot... If this page appears blank, check the console for errors.
        </p>
        <AiChatBot />
      </div>
    </div>
  )
}

export default ChatBot
