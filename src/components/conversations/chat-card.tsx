'use client'
import { useChatTime } from '@/hooks/conversation/use-conversation'
import { UrgentIcon } from '@/icons/urgent-icon'
import { User } from 'lucide-react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Card, CardContent } from '../ui/card'

type Props = {
  title: string
  description?: string
  createdAt: Date
  id: string
  onChat(): void
  seen?: boolean
}

const ChatCard = ({
  title,
  description,
  createdAt,
  onChat,
  id,
  seen,
}: Props) => {
  const { messageSentAt, urgent } = useChatTime(createdAt, id)

  return (
    <Card
      onClick={onChat}
      className="border-0 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all duration-200 group"
    >
      <CardContent className="p-4">
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 text-orange-800 dark:text-orange-300 font-medium">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                  {title}
                </h3>
                {urgent && !seen && (
                  <div className="flex-shrink-0">
                    <UrgentIcon />
                  </div>
                )}
                {!seen && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                )}
              </div>
              <div className="flex-shrink-0">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {createdAt ? messageSentAt : ''}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {description
                ? description.length > 50
                  ? description.substring(0, 50) + '...'
                  : description
                : 'No messages yet'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ChatCard
