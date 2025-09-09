'use client'
import { useChatBot } from '@/hooks/chatbot/use-chatbot'
import { BotIcon } from '@/icons/bot-icon'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { BotWindow } from './window'

type Props = {}

const AiChatBot = (props: Props) => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
    errors,
  } = useChatBot()

  console.log('AiChatBot render:', {
    botOpened,
    currentBot: currentBot?.name,
    loading,
    hasChatBot: !!currentBot?.chatBot
  })

  return (
    <div className="h-screen flex flex-col justify-end items-end gap-4">
      {botOpened && (
        <BotWindow
          errors={errors}
          setChat={setOnChats}
          realtimeMode={onRealTime}
          helpdesk={currentBot?.helpdesk || []}
          domainName={currentBot?.name || 'Domain'}
          ref={messageWindowRef}
          help={currentBot?.chatBot?.helpdesk}
          theme={currentBot?.chatBot?.background}
          textColor={currentBot?.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTyping}
        />
      )}
      <div
        className={cn(
          'rounded-full relative cursor-pointer shadow-md w-20 h-20 flex items-center justify-center bg-grandis',
          loading ? 'invisible' : 'visible'
        )}
        onClick={onOpenChatBot}
      >
        {currentBot?.chatBot?.icon ? (
          <Image
            src={`https://ucarecdn.com/${currentBot.chatBot.icon}/-/format/auto/`}
            alt="bot"
            fill
          />
        ) : (
          <BotIcon />
        )}
      </div>
    </div>
  )
}

export default AiChatBot
