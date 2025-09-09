import { SIDE_BAR_MENU } from '@/constants/menu'
import { Bot, LogOut, Menu, MonitorSmartphone } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import DomainMenu from './domain-menu'
import MenuItem from './menu-item'

type MinMenuProps = {
  onShrink(): void
  current: string
  onSignOut(): void
  domains:
    | {
        id: string
        name: string
        icon: string | null
      }[]
    | null
    | undefined
}

export const MinMenu = ({
  onShrink,
  current,
  onSignOut,
  domains,
}: MinMenuProps) => {
  const router = useRouter()
  const pathname = usePathname()

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en'

  const handleLogoClick = () => {
    router.push(`/${locale}/dashboard`)
  }

  return (
    <div className="p-3 flex flex-col items-center h-full">
      {/* Header with icon and expand button */}
      <div className="flex flex-col items-center w-full mb-4 space-y-3">
        <button
          onClick={handleLogoClick}
          className="cursor-pointer hover:opacity-80 transition-opacity p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Go to Dashboard"
        >
          <Bot className="h-6 w-6 text-gray-600 dark:text-gray-400 animate-fade-in opacity-0 delay-300 fill-mode-forwards" />
        </button>
        <button
          onClick={onShrink}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Expand sidebar"
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full">
        <div className="flex flex-col">
          {SIDE_BAR_MENU.map((menu, key) => (
            <MenuItem
              size="min"
              labelKey={menu.labelKey}
              icon={menu.icon}
              path={menu.path}
              key={key}
              current={current}
            />
          ))}
          <DomainMenu
            min
            domains={domains}
          />
        </div>
        <div className="flex flex-col">
          <MenuItem
            size="min"
            labelKey="navigation.logout"
            icon={<LogOut />}
            onSignOut={onSignOut}
          />
          <MenuItem
            size="min"
            labelKey="navigation.mobileApp"
            icon={<MonitorSmartphone />}
          />
        </div>
      </div>
    </div>
  )
}
