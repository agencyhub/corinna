'use client'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import SideBar from '../sidebar'

type Props = {
  children: React.ReactNode
  authenticated: any
}

const DashboardWrapper = ({ children, authenticated }: Props) => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Se estiver na raiz do dashboard, redireciona para /dashboard
    if (pathname === '/') {
      router.replace('/dashboard')
    }
  }, [pathname, router])

  return (
    <div className="flex h-screen w-full">
      <SideBar domains={authenticated.domain} />
      <div className="w-full h-screen flex flex-col pl-20 md:pl-4">
        {children}
      </div>
    </div>
  )
}

export default DashboardWrapper
