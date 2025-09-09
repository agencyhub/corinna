'use client'
import useSideBar from '@/context/use-sidebar'
import { cn } from '@/lib/utils'
import { useEffect } from 'react'
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
  const { expand, onExpand, page, onSignOut, isHydrated } = useSideBar()

  // Update main content margin based on sidebar state
  useEffect(() => {
    if (!isHydrated) return // Wait for hydration

    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      // Remove all margin classes first
      mainContent.classList.remove('ml-[60px]', 'ml-[280px]', 'md:ml-[60px]', 'md:ml-[280px]')

      if (expand === true) {
        mainContent.classList.add('ml-[280px]')
      } else if (expand === false) {
        mainContent.classList.add('ml-[60px]')
      } else {
        // Default responsive behavior - keep the CSS classes
        const isDesktop = window.innerWidth >= 768
        if (isDesktop) {
          mainContent.classList.add('md:ml-[280px]')
        } else {
          mainContent.classList.add('ml-[60px]')
        }
      }
    }
  }, [expand, isHydrated])

  // Apply correct margin immediately after hydration
  useEffect(() => {
    if (!isHydrated) return

    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      // Apply the correct margin based on current state
      if (expand === true) {
        mainContent.classList.remove('ml-[60px]', 'md:ml-[60px]', 'md:ml-[280px]')
        mainContent.classList.add('ml-[280px]')
      } else if (expand === false) {
        mainContent.classList.remove('ml-[280px]', 'md:ml-[60px]', 'md:ml-[280px]')
        mainContent.classList.add('ml-[60px]')
      }
      // If expand is undefined, keep the responsive CSS classes
    }
  }, [isHydrated, expand])

  // Handle window resize
  useEffect(() => {
    if (!isHydrated) return

    const handleResize = () => {
      const mainContent = document.getElementById('main-content')
      if (mainContent && expand === undefined) {
        const isDesktop = window.innerWidth >= 768
        mainContent.classList.remove('ml-[60px]', 'ml-[280px]', 'md:ml-[60px]', 'md:ml-[280px]')

        if (isDesktop) {
          mainContent.classList.add('md:ml-[280px]')
        } else {
          mainContent.classList.add('ml-[60px]')
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [expand, isHydrated])

  // Initialize margin on mount
  useEffect(() => {
    if (!isHydrated) return

    const mainContent = document.getElementById('main-content')
    if (mainContent && expand === undefined) {
      const isDesktop = window.innerWidth >= 768
      mainContent.classList.remove('ml-[60px]', 'ml-[280px]', 'md:ml-[60px]', 'md:ml-[280px]')

      if (isDesktop) {
        mainContent.classList.add('md:ml-[280px]')
      } else {
        mainContent.classList.add('ml-[60px]')
      }
    }
  }, [expand, isHydrated])

  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 h-full border-r border-gray-200 dark:border-gray-800 shadow-medium fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out',
        expand === true ? 'w-[280px]' : expand === false ? 'w-[60px]' : 'w-[60px] md:w-[280px]'
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
