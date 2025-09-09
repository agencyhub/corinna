'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else if (theme === 'light') {
      setTheme('system')
    } else {
      setTheme('dark')
    }
  }

  const getIcon = () => {
    if (theme === 'dark') {
      return <Moon className="h-4 w-4" />
    } else if (theme === 'light') {
      return <Sun className="h-4 w-4" />
    } else {
      return <Sun className="h-4 w-4" />
    }
  }

  const getTooltip = () => {
    if (theme === 'dark') {
      return 'Switch to Light Mode'
    } else if (theme === 'light') {
      return 'Switch to System Mode'
    } else {
      return 'Switch to Dark Mode'
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="h-10 w-10 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
      title={getTooltip()}
    >
      {getIcon()}
    </Button>
  )
}

export default ThemeToggle
