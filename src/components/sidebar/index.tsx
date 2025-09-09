'use client'
import useSideBar from '@/context/use-sidebar'
import { cn } from '@/lib/utils'
import MaxMenu from './maximized-menu'
import { MinMenu } from './minimized-menu'

type Props = {
  domains:
    | {
        id: string
        name: string
        icon: string
      }[]
    | null
    | undefined
}

const SideBar = ({ domains }: Props) => {
  const { expand, onExpand, page, onSignOut } = useSideBar()

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 h-full border-r border-gray-200 dark:border-gray-800 shadow-medium fixed left-0 top-0 z-40 transition-all duration-300',
        expand == undefined && 'w-[60px] md:w-[280px]',
        expand == true
          ? 'w-[280px] animate-open-sidebar'
          : expand == false
          ? 'w-[60px] animate-close-sidebar'
          : 'w-[60px] md:w-[280px]'
      )}
    >
      {expand !== false ? (
        <MaxMenu
          domains={domains}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ) : (
        <MinMenu
          domains={domains}
          onShrink={onExpand}
          current={page!}
          onSignOut={onSignOut}
        />
      )}
    </div>
  )
}

export default SideBar
