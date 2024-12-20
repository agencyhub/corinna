'use client'
import { useToast } from '@/components/ui/use-toast'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { useChatContext } from './user-chat-context'
import { onGetConversationMode, onToggleRealtime } from '@/actions/conversation'
import { useClerk } from '@clerk/nextjs'

const useSideBar = () => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [realtime, setRealtime] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { chatRoom } = useChatContext()

  const currentPath = pathname?.split('/').filter(Boolean)[0] || 'dashboard'

  const onActivateRealtime = useCallback(async (e: any) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom!,
        e.target.ariaChecked == 'true' ? false : true
      )
      if (realtime) {
        setRealtime(realtime.chatRoom.live)
        toast({
          title: 'Success',
          description: realtime.message,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [chatRoom, toast])

  const onGetCurrentMode = useCallback(async () => {
    try {
      setLoading(true)
      const mode = await onGetConversationMode(chatRoom!)
      if (mode) {
        setRealtime(mode.live)
      }
    } catch (error) {
      console.error('Error getting conversation mode:', error)
    } finally {
      setLoading(false)
    }
  }, [chatRoom])

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode()
    }
  }, [chatRoom, onGetCurrentMode])

  const { signOut } = useClerk()

  const onSignOut = useCallback(async () => {
    try {
      await signOut()
      router.replace('/')
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: 'Error',
        description: 'Failed to sign out. Please try again.',
        variant: 'destructive',
      })
    }
  }, [router, signOut, toast])

  const onExpand = useCallback(() => {
    setExpand((prev) => !prev)
  }, [])

  return {
    expand,
    onExpand,
    page: currentPath,
    onSignOut,
    realtime,
    onActivateRealtime,
    chatRoom,
    loading
  }
}

export default useSideBar
