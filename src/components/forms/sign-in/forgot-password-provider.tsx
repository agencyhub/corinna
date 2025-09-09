'use client'
import { Loader } from '@/components/loader'
import { useForgotPasswordSimple } from '@/hooks/sign-in/use-forgot-password-simple'
import React from 'react'
import { FormProvider } from 'react-hook-form'

type Props = {
  children: React.ReactNode
}

const ForgotPasswordProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useForgotPasswordSimple()

  return (
    <FormProvider {...methods}>
      <form onSubmit={onHandleSubmit} className="h-full">
        <Loader loading={loading}>{children}</Loader>
      </form>
    </FormProvider>
  )
}

export default ForgotPasswordProvider
