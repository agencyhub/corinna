'use client'
import { onGetConversationMode, onToggleRealtime } from '@/actions/conversation'
import { useToast } from '@/components/ui/use-toast'
import { useClerk } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useChatContext } from './user-chat-context'

const useSideBar = () => {
  const [expand, setExpand] = useState<boolean | undefined>(undefined)
  const [isHydrated, setIsHydrated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const [realtime, setRealtime] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { chatRoom } = useChatContext()

  // Load state from localStorage after hydration
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-expanded')
    if (savedState !== null) {
      setExpand(savedState === 'true')
    }
    setIsHydrated(true)
  }, [])

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    if (isHydrated && expand !== undefined) {
      localStorage.setItem('sidebar-expanded', expand.toString())
    }
  }, [expand, isHydrated])

  const onActivateRealtime = async (e: any) => {
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
  }

  const onGetCurrentMode = async () => {
    setLoading(true)
    const mode = await onGetConversationMode(chatRoom!)
    if (mode) {
      setRealtime(mode.live)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode()
    }
  }, [chatRoom, onGetCurrentMode])

  const page = pathname.split('/').pop()
  const { signOut } = useClerk()

  const onSignOut = () => signOut(() => router.push('/'))

  const onExpand = () => {
    setExpand((prev) => {
      if (prev === undefined) {
        // First click - collapse from default state
        return false
      }
      return !prev
    })
  }

  return {
    expand,
    onExpand,
    page,
    onSignOut,
    realtime,
    onActivateRealtime,
    chatRoom,
    loading,
    isHydrated,
  }
}

export default useSideBar
