'use client'
import { TABS_MENU } from '@/constants/menu';
import { useConversation } from '@/hooks/conversation/use-conversation';
import { Loader } from '../loader';
import TabsMenu from '../tabs/intex';
import { TabsContent } from '../ui/tabs';
import ChatCard from './chat-card';
import ConversationSearch from './search';

type Props = {
  domains?:
    | {
        name: string
        id: string
        icon: string
      }[]
    | undefined
}

const ConversationMenu = ({ domains }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages } =
    useConversation()

  return (
    <div className="flex flex-col h-full">
      {/* Header */}


      {/* Tabs and Content */}
      <div className="flex-1 overflow-hidden">
        <TabsMenu triggers={TABS_MENU}>
          <TabsContent value="unread" className="h-full flex flex-col">
            <div className="p-6">
              <ConversationSearch
                domains={domains}
                register={register}
              />
            </div>

            <div className="flex-1 overflow-y-auto">
              <Loader loading={loading}>
                {chatRooms.length ? (
                  <div className="space-y-1">
                    {chatRooms.map((room) => (
                      <ChatCard
                        seen={room.chatRoom[0].message[0]?.seen}
                        id={room.chatRoom[0].id}
                        onChat={() => onGetActiveChatMessages(room.chatRoom[0].id)}
                        createdAt={room.chatRoom[0].message[0]?.createdAt}
                        key={room.chatRoom[0].id}
                        title={room.email!}
                        description={room.chatRoom[0].message[0]?.message}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No conversations yet</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Start chatting with your customers to see conversations here.</p>
                  </div>
                )}
              </Loader>
            </div>
          </TabsContent>

          <TabsContent value="all" className="h-full flex flex-col">
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">All Conversations</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">All conversations will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="expired" className="h-full flex flex-col">
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Expired Conversations</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Expired conversations will appear here</p>
            </div>
          </TabsContent>

          <TabsContent value="starred" className="h-full flex flex-col">
            <div className="p-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Starred Conversations</h3>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Starred conversations will appear here</p>
            </div>
          </TabsContent>
        </TabsMenu>
      </div>
    </div>
  )
}

export default ConversationMenu
