'use client'
import { useChatContext } from '@/context/user-chat-context';
import { UserButton } from '@clerk/nextjs';
import { Headphones, Star, Trash } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../theme-toggle';
import { Card } from '../ui/card';
import BreadCrumb from './bread-crumb';

type Props = {}

const InfoBar = (props: Props) => {
  const pathname = usePathname()
  const { chatRoom } = useChatContext()
  const isConversationPage = pathname.includes('/conversation')
  const hasActiveChat = chatRoom && chatRoom !== undefined

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
            <div className="h-10 w-10 ring-2 ring-orange-200 dark:ring-orange-800 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <Headphones className="h-5 w-5 text-white" />
            </div>
          )}

          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* User Button with dropdown menu */}
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10 ring-2 ring-gray-200 dark:ring-gray-700",
                userButtonPopoverCard: "bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700",
                userButtonPopoverActionButton: "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
                userButtonPopoverActionButtonText: "text-gray-700 dark:text-gray-300",
                userButtonPopoverFooter: "hidden", // Hide the footer with "Manage account" link
                userButtonPopoverHeader: "bg-white dark:bg-gray-800",
                userButtonPopoverMain: "bg-white dark:bg-gray-800",
                userButtonPopoverUserPreview: "text-gray-700 dark:text-gray-300",
                userButtonPopoverUserPreviewMainIdentifier: "text-gray-700 dark:text-gray-300",
                userButtonPopoverUserPreviewSecondaryIdentifier: "text-gray-500 dark:text-gray-400",
                userButtonPopoverActionButtonIcon: "text-gray-700 dark:text-gray-300",
                userButtonPopoverActionButtonIconBox: "text-gray-700 dark:text-gray-300",
                userButtonPopoverActionButtonIcon__manageAccount: "text-gray-700 dark:text-gray-300",
                userButtonPopoverActionButtonIcon__signOut: "text-gray-700 dark:text-gray-300"
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default InfoBar
