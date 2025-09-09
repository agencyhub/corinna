import { SIDE_BAR_MENU } from '@/constants/menu'


import { MenuLogo } from '@/icons/menu-logo'
import { LogOut, MonitorSmartphone } from 'lucide-react'
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
  return (
    <div className="p-3 flex flex-col items-center h-full">
      <span className="animate-fade-in opacity-0 delay-300 fill-mode-forwards cursor-pointer">
        <MenuLogo onClick={onShrink} />
      </span>
      <div className="animate-fade-in opacity-0 delay-300 fill-mode-forwards flex flex-col justify-between h-full pt-10">
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
