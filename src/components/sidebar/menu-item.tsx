import { cn } from '@/lib/utils'
import Link from 'next/link'

type Props = {
  size: 'max' | 'min'
  label: string
  icon: JSX.Element
  path?: string
  current?: string
  onSignOut?(): void
}

const MenuItem = ({ size, path, icon, label, current, onSignOut }: Props) => {
  switch (size) {
    case 'max':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
            !current
              ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              : current == path
              ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 font-semibold shadow-soft'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
          )}
          href={path ? `/${path}` : '#'}
        >
          <div className={cn(
            'flex-shrink-0',
            current == path ? 'text-orange-600 dark:text-orange-400' : ''
          )}>
            {icon}
          </div>
          <span className="text-sm font-medium">{label}</span>
        </Link>
      )
    case 'min':
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            'flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 mx-auto',
            !current
              ? 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              : current == path
              ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 shadow-soft'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
          )}
          href={path ? `/${path}` : '#'}
        >
          {icon}
        </Link>
      )
    default:
      return null
  }
}

export default MenuItem
