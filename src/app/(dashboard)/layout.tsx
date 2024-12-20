import { onLoginUser } from '@/actions/auth'
import { ChatProvider } from '@/context/user-chat-context'
import React, { Suspense } from 'react'
import DashboardWrapper from '@/components/dashboard-wrapper'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Loading from './loading'

type Props = {
  children: React.ReactNode
}

async function getUser() {
  const { userId } = auth()
  if (!userId) {
    redirect('/sign-in')
  }

  const authenticated = await onLoginUser()
  if (!authenticated) {
    redirect('/sign-in')
  }

  return authenticated
}

const OwnerLayout = async ({ children }: Props) => {
  const authenticated = await getUser()

  return (
    <ChatProvider>
      <DashboardWrapper authenticated={authenticated}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </DashboardWrapper>
    </ChatProvider>
  )
}

export default OwnerLayout
