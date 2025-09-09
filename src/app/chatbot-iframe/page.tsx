'use client'

import AiChatBot from '@/components/chatbot'
import { Suspense } from 'react'

export default function ChatbotIframePage() {
  return (
    <div className="h-screen w-full">
      <Suspense fallback={<div className="h-full w-full flex items-center justify-center">Loading...</div>}>
        <AiChatBot />
      </Suspense>
    </div>
  )
}
