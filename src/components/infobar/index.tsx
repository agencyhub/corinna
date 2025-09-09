'use client'
import { Headphones, Star, Trash } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card } from '../ui/card';
import BreadCrumb from './bread-crumb';

type Props = {}

const InfoBar = (props: Props) => {
  const pathname = usePathname()
  const isConversationPage = pathname.includes('/conversation')

  return (
    <div className="flex w-full justify-between items-center p-4 lg:p-5.5 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <BreadCrumb />
      <div className="flex items-center gap-4">
        {/* Only show conversation-specific buttons on conversation page */}
        {isConversationPage && (
          <div className="hidden md:flex">
            <Card className="rounded-xl flex items-center gap-3 py-2 px-4 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 shadow-soft">
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                <Trash className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors">
                <Star className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </Card>
          </div>
        )}

        <div className="flex items-center gap-3">
          {/* Only show headphones avatar on conversation page */}
          {isConversationPage && (
            <Avatar className="h-10 w-10 ring-2 ring-orange-200 dark:ring-orange-800">
              <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <Headphones className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
          )}

          <Avatar className="h-10 w-10 ring-2 ring-gray-200 dark:ring-gray-700">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User Avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              CN
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}

export default InfoBar
