'use client'

import AiChatBot from '@/components/chatbot'
import { PageSkeleton } from '@/components/ui/page-skeleton'
import { Suspense } from 'react'

export default function ChatbotIframePage() {
  return (
    <div className="h-screen w-full">
      <Suspense fallback={<PageSkeleton variant="conversation" />}>
        <AiChatBot />
      </Suspense>
    </div>
  )
}
