'use client'

import { LanguageSwitcher } from '@/components/language-switcher'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Corinna AI Logo"
              width={120}
              height={40}
              className="h-8 lg:h-10 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-300">
            <li className="hover:text-orange-500 transition-colors cursor-pointer">Home</li>
            <li className="hover:text-orange-500 transition-colors cursor-pointer">Pricing</li>
            <li className="hover:text-orange-500 transition-colors cursor-pointer">News Room</li>
            <li className="hover:text-orange-500 transition-colors cursor-pointer">Features</li>
            <li className="hover:text-orange-500 transition-colors cursor-pointer">Contact us</li>
          </ul>

          {/* Desktop CTA + Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 shadow-soft hover:shadow-medium hover:scale-105 text-sm"
            >
              Free Trial
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md">
            <div className="px-4 py-6 space-y-4">
              <ul className="space-y-4 text-base font-medium text-gray-600 dark:text-gray-300">
                <li className="hover:text-orange-500 transition-colors cursor-pointer">Home</li>
                <li className="hover:text-orange-500 transition-colors cursor-pointer">Pricing</li>
                <li className="hover:text-orange-500 transition-colors cursor-pointer">News Room</li>
                <li className="hover:text-orange-500 transition-colors cursor-pointer">Features</li>
                <li className="hover:text-orange-500 transition-colors cursor-pointer">Contact us</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavBar
