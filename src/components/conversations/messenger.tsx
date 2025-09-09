'use client'
import { useChatWindow } from '@/hooks/conversation/use-conversation'
import { PaperclipIcon } from 'lucide-react'
import Bubble from '../chatbot/bubble'
import { Loader } from '../loader'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

type Props = {}

const Messenger = (props: Props) => {
  const {
    messageWindowRef,
    chats,
    loading,
    chatRoom,
    onHandleSentMessage,
    register,
  } = useChatWindow()

  return (
    <div className="flex flex-col h-full">
      {/* Chat Area */}
      <div className="flex-1 overflow-hidden">
        <Loader loading={loading}>
          <div
            ref={messageWindowRef}
            className="h-full overflow-y-auto p-6"
          >
            {chats.length ? (
              <div className="space-y-4">
                {chats.map((chat) => (
                  <Bubble
                    key={chat.id}
                    message={{
                      role: chat.role!,
                      content: chat.message,
                    }}
                    createdAt={chat.createdAt}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Chat Selected</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  Select a conversation from the sidebar to start chatting with your customer.
                </p>
              </div>
            )}
          </div>
        </Loader>
      </div>

      {/* Message Input */}
      {chatRoom && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <form
            onSubmit={onHandleSentMessage}
            className="p-4"
          >
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <Input
                  {...register('content')}
                  placeholder="Type your message..."
                  className="pr-12 py-3 text-sm resize-none"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <PaperclipIcon className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <Button
                type="submit"
                variant="gradient"
                className="px-6 py-3"
                disabled={!chatRoom}
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Messenger
