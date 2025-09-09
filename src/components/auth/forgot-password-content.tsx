'use client'

import ForgotPasswordForm from '@/components/forms/sign-in/forgot-password-form'
import ForgotPasswordProvider from '@/components/forms/sign-in/forgot-password-provider'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function ForgotPasswordContent() {
  const t = useTranslations('auth')

  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <ForgotPasswordProvider>
          <div className="flex flex-col gap-3">
            <ForgotPasswordForm />
            <div className="w-full flex flex-col gap-3 items-center">
              <p>
                {t('welcomeBack')}{' '}
                <Link
                  href="/auth/sign-in"
                  className="font-bold"
                >
                  {t('signIn')}
                </Link>
              </p>
            </div>
          </div>
        </ForgotPasswordProvider>
      </div>
    </div>
  )
}
