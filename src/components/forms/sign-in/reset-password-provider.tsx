'use client'
import { Loader } from '@/components/loader'
import { ResetPasswordContextProvider } from '@/context/use-reset-password-context'
import { useResetPassword } from '@/hooks/sign-in/use-reset-password'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
  children: React.ReactNode
}

const ResetPasswordProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading, step, forceUpdate, isCodeVerified } = useResetPassword()

  return (
    <FormProvider {...methods}>
      <ResetPasswordContextProvider value={{ step, isCodeVerified, loading, forceUpdate }}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <Loader loading={loading}>{children}</Loader>
        </form>
      </ResetPasswordContextProvider>
    </FormProvider>
  )
}

export default ResetPasswordProvider
