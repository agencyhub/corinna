import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/user-chat-context'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await onLoginUser()
  if (!authenticated) return null

  return (
    <ChatProvider>
      <div className="flex h-screen w-full bg-gray-50/30 dark:bg-gray-900/30">
        <SideBar domains={authenticated.domain} />
        <div className="flex-1 flex flex-col min-w-0 ml-[60px] md:ml-[280px] transition-all duration-200">
          <main className="flex-1 overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
            {children}
          </main>
        </div>
      </div>
    </ChatProvider>
  )
}

export default OwnerLayout
