import { onAiChatBotAssistant, onGetCurrentChatBot } from '@/actions/bot'
import { getPusherClient, postToParent } from '@/lib/utils'
import {
    ChatBotMessageProps,
    ChatBotMessageSchema,
} from '@/schemas/conversation.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useChatBot = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChatBotMessageProps>({
    resolver: zodResolver(ChatBotMessageSchema),
  })
  const [currentBot, setCurrentBot] = useState<
    | {
        name: string
        chatBot: {
          id: string
          icon: string | null
          welcomeMessage: string | null
          background: string | null
          textColor: string | null
          helpdesk: boolean
        } | null
        helpdesk: {
          id: string
          question: string
          answer: string
          domainId: string | null
        }[]
      }
    | undefined
  >()
  const messageWindowRef = useRef<HTMLDivElement | null>(null)
  const [botOpened, setBotOpened] = useState<boolean>(false)
  const onOpenChatBot = () => setBotOpened((prev) => !prev)
  const [loading, setLoading] = useState<boolean>(true)
  const [onChats, setOnChats] = useState<
    { role: 'assistant' | 'user'; content: string; link?: string }[]
  >([])
  const [onAiTyping, setOnAiTyping] = useState<boolean>(false)
  const [currentBotId, setCurrentBotId] = useState<string>()
  const [onRealTime, setOnRealTime] = useState<
    { chatroom: string; mode: boolean } | undefined
  >(undefined)

  const onScrollToBottom = () => {
    messageWindowRef.current?.scroll({
      top: messageWindowRef.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    onScrollToBottom()
  }, [onChats, messageWindowRef])

  useEffect(() => {
    postToParent(
      JSON.stringify({
        width: botOpened ? 550 : 80,
        height: botOpened ? 800 : 80,
      })
    )
  }, [botOpened])

  let limitRequest = 0

  const onGetDomainChatBot = async (id: string) => {
    console.log('Chatbot: Getting domain chatbot for ID:', id)

    // Prevent duplicate loading
    if (currentBotId === id) {
      console.log('Chatbot: Already loaded for this ID, skipping')
      return
    }

    setCurrentBotId(id)
    setLoading(true)

    try {
      const chatbot = await onGetCurrentChatBot(id)
      console.log('Chatbot: API response:', chatbot)

      if (chatbot) {
        // Only add welcome message if chats are empty
        setOnChats((prev) => {
          if (prev.length === 0) {
            return [
              {
                role: 'assistant',
                content: chatbot.chatBot?.welcomeMessage!,
              },
            ]
          }
          return prev
        })
        setCurrentBot(chatbot)
        setLoading(false)
        console.log('Chatbot: Successfully loaded and ready')
      } else {
        console.error('Chatbot: No chatbot found for ID:', id)
        setLoading(false)
      }
    } catch (error) {
      console.error('Chatbot: Error loading chatbot:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      console.log('Message received:', e.data)

      // Check if it's a domain ID (not dimensions)
      const botid = e.data
      if (limitRequest < 1 && typeof botid === 'string' && !botid.includes('{') && !botid.includes('width')) {
        console.log('Valid domain ID received:', botid)
        onGetDomainChatBot(botid)
        limitRequest++
      } else {
        console.log('Ignoring message (not a domain ID):', botid)
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [currentBotId])

  // Support loading chatbot directly via URL query param: /chatbot?id=DOMAIN_ID
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const idFromQuery = params.get('id')
      console.log('Chatbot: URL params check', { idFromQuery, currentBotId })
      if (idFromQuery && !currentBotId) {
        console.log('Chatbot: Loading domain chatbot with ID:', idFromQuery)
        onGetDomainChatBot(idFromQuery)
      }
    } catch (err) {
      console.error('Failed to parse chatbot id from URL', err)
    }
  }, [currentBotId])

  const onStartChatting = handleSubmit(async (values) => {
    console.log('ALL VALUES', values)

    if (values.image.length) {
      console.log('IMAGE fROM ', values.image[0])

      // Dynamic import for client-side only
      const { UploadClient } = await import('@uploadcare/upload-client')
      const upload = new UploadClient({
        publicKey: process.env.NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY as string,
      })

      const uploaded = await upload.uploadFile(values.image[0])
      if (!onRealTime?.mode) {
        setOnChats((prev: any) => [
          ...prev,
          {
            role: 'user',
            content: uploaded.uuid,
          },
        ])
      }

      console.log('🟡 RESPONSE FROM UC', uploaded.uuid)
      setOnAiTyping(true)
      const response = await onAiChatBotAssistant(
        currentBotId!,
        onChats,
        'user',
        uploaded.uuid
      )

      if (response) {
        setOnAiTyping(false)
        if (response.live) {
          setOnRealTime((prev) => ({
            ...prev,
            chatroom: response.chatRoom,
            mode: response.live,
          }))
        } else {
          setOnChats((prev: any) => [...prev, response.response])
        }
      }
    }
    reset()

    if (values.content) {
      if (!onRealTime?.mode) {
        setOnChats((prev: any) => [
          ...prev,
          {
            role: 'user',
            content: values.content,
          },
        ])
      }

      setOnAiTyping(true)

      const response = await onAiChatBotAssistant(
        currentBotId!,
        onChats,
        'user',
        values.content
      )

      if (response) {
        setOnAiTyping(false)
        if (response.live) {
          setOnRealTime((prev) => ({
            ...prev,
            chatroom: response.chatRoom,
            mode: response.live,
          }))
        } else {
          setOnChats((prev: any) => [...prev, response.response])
        }
      }
    }
  })

  return {
    botOpened,
    onOpenChatBot,
    onStartChatting,
    onChats,
    register,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    setOnChats,
    onRealTime,
    errors,
  }
}

export const useRealTime = (
  chatRoom: string,
  setChats: React.Dispatch<
    React.SetStateAction<
      {
        role: 'user' | 'assistant'
        content: string
        link?: string | undefined
      }[]
    >
  >
) => {
  const counterRef = useRef(1)

  useEffect(() => {
    let pusherClient: any = null

    const setupPusher = async () => {
      pusherClient = await getPusherClient()
      pusherClient.subscribe(chatRoom)
      pusherClient.bind('realtime-mode', (data: any) => {
        console.log('✅', data)
        if (counterRef.current !== 1) {
          setChats((prev: any) => [
            ...prev,
            {
              role: data.chat.role,
              content: data.chat.message,
            },
          ])
        }
        counterRef.current += 1
      })
    }

    setupPusher()

    return () => {
      if (pusherClient) {
        pusherClient.unbind('realtime-mode')
        pusherClient.unsubscribe(chatRoom)
      }
    }
  }, [])
}
