import { SIDE_BAR_MENU } from '@/constants/menu';
import { LogOut, Menu, MonitorSmartphone } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import DomainMenu from './domain-menu';
import MenuItem from './menu-item';

type Props = {
  onExpand(): void
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

const MaxMenu = ({ current, domains, onExpand, onSignOut }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en'

  const handleLogoClick = () => {
    router.push(`/${locale}/dashboard`)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-[18px] border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={handleLogoClick}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Image
            src="/images/logo.png"
            alt="Corinna AI Logo"
            width={120}
            height={40}
            className="h-8 w-auto animate-fade-in opacity-0 delay-300 fill-mode-forwards"
          />
        </button>
        <button
          onClick={onExpand}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col justify-between py-6">
        <div className="px-6">
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Menu
            </p>
            <nav className="space-y-2">
              {SIDE_BAR_MENU.map((menu, key) => (
                <MenuItem
                  size="max"
                  labelKey={menu.labelKey}
                  icon={menu.icon}
                  path={menu.path}
                  key={key}
                  current={current}
                />
              ))}
            </nav>
          </div>
          <DomainMenu domains={domains} />
        </div>

        {/* Bottom Options */}
        <div className="px-6 border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
            Options
          </p>
          <div className="space-y-2">
            <MenuItem
              size="max"
              labelKey="navigation.mobileApp"
              icon={<MonitorSmartphone />}
            />
            <MenuItem
              size="max"
              labelKey="navigation.logout"
              icon={<LogOut />}
              onSignOut={onSignOut}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MaxMenu
