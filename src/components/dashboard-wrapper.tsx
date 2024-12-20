'use client'
import React from 'react'
import SideBar from './sidebar'
import Link from 'next/link'
import { SIDE_BAR_MENU } from '@/constants/menu'

type Props = {
  children: React.ReactNode
  authenticated: any
}

const DashboardWrapper = ({ children, authenticated }: Props) => {
  return (
    <div className="flex h-screen w-full">
      <SideBar domains={authenticated.domain} />
      <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
        {children}
      </div>
      {/* Prefetch Links */}
      <div className="hidden">
        {SIDE_BAR_MENU.map((item) =>
          item.path ? (
            <Link key={item.path} href={`/${item.path}`} prefetch={true}>
              {item.label}
            </Link>
          ) : null
        )}
      </div>
    </div>
  )
}

export default DashboardWrapper
