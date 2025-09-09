'use client'

import ResetPasswordForm from '@/components/forms/sign-in/reset-password-form'
import ResetPasswordProvider from '@/components/forms/sign-in/reset-password-provider'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export function ResetPasswordContent() {
  const t = useTranslations('auth')

  return (
    <div className="flex-1 py-36 md:px-16 w-full">
      <div className="flex flex-col h-full gap-3">
        <ResetPasswordProvider>
          <div className="flex flex-col gap-3">
            <ResetPasswordForm />
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
        </ResetPasswordProvider>
      </div>
    </div>
  )
}
