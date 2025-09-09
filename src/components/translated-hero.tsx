'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightCircleIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export function TranslatedHero() {
  const t = useTranslations('landing.hero')

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="flex items-center justify-center flex-col text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-800 shadow-soft">
            <span className="mr-2">✨</span>
            An AI powered sales assistant chatbot
          </div>

          <div className="space-y-6">
            <Image
              src="/images/corinna-ai-logo.png"
              width={500}
              height={100}
              alt="Corinna AI Logo"
              className="max-w-xl object-contain mx-auto"
              priority
            />

            <h1 className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </h1>
          </div>

          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-medium hover:shadow-large transition-all duration-200 hover:scale-105">
              {t('getStarted')}
              <ArrowRightCircleIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>

          <div className="pt-8">
            <Image
              src="/images/iphonecorinna.png"
              width={400}
              height={300}
              alt="Corinna AI Mobile Preview"
              className="max-w-sm md:max-w-md object-contain mx-auto drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
