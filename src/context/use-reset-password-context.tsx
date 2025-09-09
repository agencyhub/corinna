'use client'
import React from 'react'

export type ResetPasswordContextValues = {
  step: 'code' | 'password'
  isCodeVerified: boolean
  loading: boolean
  forceUpdate: number
}

const InitialValues: ResetPasswordContextValues = {
  step: 'code',
  isCodeVerified: false,
  loading: false,
  forceUpdate: 0,
}

const resetPasswordContext = React.createContext<ResetPasswordContextValues>(InitialValues)

export const ResetPasswordContextProvider = resetPasswordContext.Provider

export const useResetPasswordContext = () => React.useContext(resetPasswordContext)

