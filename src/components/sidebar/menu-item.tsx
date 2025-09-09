'use client'

import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  size: 'max' | 'min'
  labelKey: string
  icon: JSX.Element
  path?: string
  current?: string
  onSignOut?(): void
}

const MenuItem = ({ size, path, icon, labelKey, current, onSignOut }: Props) => {
  const t = useTranslations()
  const pathname = usePathname()
  const firstSegment = pathname.split('/')[1]
  const locale = firstSegment === 'pt' || firstSegment === 'en' ? firstSegment : undefined
  const href = path ? `${locale ? `/${locale}` : ''}/${path}` : '#'
  const label = t(labelKey)

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
          href={href}
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
          href={href}
        >
          {icon}
        </Link>
      )
    default:
      return null
  }
}

export default MenuItem
