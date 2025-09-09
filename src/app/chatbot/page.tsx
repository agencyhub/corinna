'use client'
import AiChatBot from '@/components/chatbot'
import { PageSkeleton } from '@/components/ui/page-skeleton'
import { useState } from 'react'

type Props = {}

const ChatBot = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Corinna AI Chatbot</h1>
        {isLoading ? (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        ) : (
          <AiChatBot />
        )}
      </div>
    </div>
  )
}

export default ChatBot
