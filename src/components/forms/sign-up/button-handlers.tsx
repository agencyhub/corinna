'use client'
import { Button } from '@/components/ui/button'
import { useAuthContextHook } from '@/context/use-auth-context'
import { useSignUpForm } from '@/hooks/sign-up/use-sign-up'
import Link from 'next/link'
import React from 'react'
import { useFormContext } from 'react-hook-form'

const ButtonHandler = () => {
  const { setCurrentStep, currentStep } = useAuthContextHook()
  const { formState, getFieldState, getValues } = useFormContext()
  const { onGenerateOTP, onSubmitOTP, loading } = useSignUpForm()

  const { isDirty: isName } = getFieldState('fullname', formState)
  const { isDirty: isEmail } = getFieldState('email', formState)
  const { isDirty: isPassword } = getFieldState('password', formState)

  if (currentStep === 3) {
    const otp = getValues('otp')
    const isValidOtp = otp && otp.length === 6

    const handleSubmitOTP = async () => {
      if (!isValidOtp) return

      const formData = {
        otp,
        fullname: getValues('fullname'),
        email: getValues('email'),
        password: getValues('password'),
        type: getValues('type'),
        confirmEmail: getValues('confirmEmail'),
        confirmPassword: getValues('confirmPassword'),
      }

      await onSubmitOTP(formData)
    }

    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          type="button"
          className="w-full"
          disabled={!isValidOtp || loading}
          onClick={handleSubmitOTP}
        >
          {loading ? 'Creating account...' : 'Create an account'}
        </Button>
        <p>
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  if (currentStep === 2) {
    const handleGenerateOTP = async (e: React.MouseEvent) => {
      e.preventDefault()
      await onGenerateOTP(
        getValues('email'),
        getValues('password'),
        setCurrentStep
      )
    }

    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
          type="button"
          className="w-full"
          disabled={!(isName && isEmail && isPassword) || loading}
          onClick={handleGenerateOTP}
        >
          {loading ? 'Sending verification code...' : 'Continue'}
        </Button>
        <p>
          Already have an account?{' '}
          <Link href="/auth/sign-in" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        type="button"
        className="w-full"
        onClick={(e) => {
          e.preventDefault()
          setCurrentStep((prev: number) => prev + 1)
        }}
      >
        Continue
      </Button>
      <p>
        Already have an account?{' '}
        <Link href="/auth/sign-in" className="font-bold">
          Sign In
        </Link>
      </p>
    </div>
  )
}

export default ButtonHandler
