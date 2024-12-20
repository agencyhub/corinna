'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import React from 'react'

type Props = {
  size: 'max' | 'min'
  label: string
  icon: JSX.Element
  path?: string
  current?: string
  onSignOut?(): void
}

const MenuItem = ({ size, path, icon, label, onSignOut }: Props) => {
  const segment = useSelectedLayoutSegment()
  const isActive = segment === path

  if (onSignOut) {
    return (
      <button
        onClick={onSignOut}
        className={cn(
          'flex items-center gap-2 px-1 py-2 rounded-lg my-1 transition-colors w-full',
          'text-gray-500 hover:bg-gray-100'
        )}
      >
        <span className="flex items-center gap-2">
          {icon} {size === 'max' && label}
        </span>
      </button>
    )
  }

  if (!path) return null

  return (
    <Link
      href={`/${path}`}
      className={cn(
        'flex items-center gap-2 px-1 py-2 rounded-lg my-1 transition-colors w-full',
        size === 'max'
          ? isActive
            ? 'bg-white font-bold text-black'
            : 'text-gray-500 hover:bg-gray-100'
          : isActive
          ? 'bg-white font-bold text-black'
          : 'text-gray-500 hover:bg-gray-100'
      )}
    >
      <span className="flex items-center gap-2">
        {icon} {size === 'max' && label}
      </span>
    </Link>
  )
}

export default MenuItem
