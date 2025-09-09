import { onLoginUser } from '@/actions/auth';
import SideBar from '@/components/sidebar';
import { ChatProvider } from '@/context/user-chat-context';
import React from 'react';

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  try {
    const authenticated = await onLoginUser()
    if (!authenticated) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Required
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please sign in to access the dashboard
            </p>
          </div>
        </div>
      )
    }

    return (
      <ChatProvider>
        <div className="flex h-screen w-full bg-gray-50/30 dark:bg-gray-900/30">
          <SideBar domains={authenticated.domain} />
          <div className="flex-1 flex flex-col min-w-0 ml-[60px] md:ml-[280px] transition-all duration-300 ease-in-out" id="main-content">
            <main className="flex-1 overflow-hidden bg-gray-50/50 dark:bg-gray-900/50">
              {children}
            </main>
          </div>
        </div>
      </ChatProvider>
    )
  } catch (error) {
    console.error('Error in dashboard layout:', error)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">
            Error Loading Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please try refreshing the page
          </p>
        </div>
      </div>
    )
  }
}

export default OwnerLayout
