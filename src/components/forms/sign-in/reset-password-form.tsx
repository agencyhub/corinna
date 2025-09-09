'use client'
import OTPInput from '@/components/otp';
import { Button } from '@/components/ui/button';
import { useResetPasswordContext } from '@/context/use-reset-password-context';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormGenerator from '../form-generator';

type Props = {}

const ResetPasswordForm = (props: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()
  const { step, loading, forceUpdate, isCodeVerified } = useResetPasswordContext()
  const [localStep, setLocalStep] = useState<'code' | 'password'>('code')
  const codeValue = watch('code') || ''

  // Sync local step with context step
  useEffect(() => {
    if (isCodeVerified) setLocalStep('password')
    else setLocalStep(step)
  }, [step, isCodeVerified])

  if (localStep === 'code') {
    return (
      <div key={`code-step-${forceUpdate}`}>
        <h2 className="text-gravel md:text-4xl font-bold">Enter Verification Code</h2>
        <p className="text-iridium md:text-sm">Enter the 6-digit code sent to your email address.</p>
        <div className="flex flex-col gap-3">
          <div className="w-full justify-center flex py-5">
            <OTPInput otp={codeValue} setOtp={(value) => setValue('code', value)} />
          </div>
          {errors?.code && codeValue.length > 0 && (
            <p className="text-red-500 text-sm text-center">
              {String(errors.code?.message || 'Invalid code')}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading || codeValue.length !== 6 || !codeValue}>
            {loading ? 'Verifying...' : 'Verify Code'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div key={`password-step-${forceUpdate}`}>
      <h2 className="text-gravel md:text-4xl font-bold">Set New Password</h2>
      <p className="text-iridium md:text-sm">Enter your new password below.</p>
      <div className="flex flex-col gap-3">
        <div>
          <FormGenerator
            register={register}
            errors={errors}
            name="password"
            placeholder="New Password"
            type="password"
            inputType="input"
          />
          {errors?.password && watch('password') && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.password.message === 'string'
                ? errors.password.message
                : 'Invalid password'}
            </p>
          )}
        </div>
        <div>
          <FormGenerator
            register={register}
            errors={errors}
            name="confirmPassword"
            placeholder="Confirm New Password"
            type="password"
            inputType="input"
          />
          {errors?.confirmPassword && watch('confirmPassword') && (
            <p className="text-red-500 text-sm mt-1">
              {typeof errors.confirmPassword.message === 'string'
                ? errors.confirmPassword.message
                : 'Invalid password'}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Setting Password...' : 'Set New Password'}
        </Button>
      </div>
    </div>
  )
}

export default ResetPasswordForm
