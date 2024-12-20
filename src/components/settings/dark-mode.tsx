'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

const DarkModetoggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent">
            <div className="w-[200px] h-[100px] bg-white"></div>
          </div>
          <div className="rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent">
            <div className="w-[200px] h-[100px] bg-[#09090B]"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          onClick={() => setTheme('light')}
          className={`rounded-2xl overflow-hidden cursor-pointer border-4 ${
            theme === 'light' ? 'border-orange' : 'border-transparent'
          }`}
        >
          <div className="w-[200px] h-[100px] bg-white"></div>
        </div>
        <div
          onClick={() => setTheme('dark')}
          className={`rounded-2xl overflow-hidden cursor-pointer border-4 ${
            theme === 'dark' ? 'border-orange' : 'border-transparent'
          }`}
        >
          <div className="w-[200px] h-[100px] bg-[#09090B]"></div>
        </div>
      </div>
    </div>
  )
}

export default DarkModetoggle
