import React, { useCallback } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { useFormContext } from 'react-hook-form'

const OTPInput = () => {
  const { setValue, watch } = useFormContext()
  const currentOtp = watch('otp') || ''

  const handleChange = useCallback((value: string) => {
    console.log('OTP changed:', value) // Debug log
    setValue('otp', value, { shouldValidate: true })
  }, [setValue])

  return (
    <InputOTP
      maxLength={6}
      value={currentOtp}
      onChange={handleChange}
    >
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

export default OTPInput
