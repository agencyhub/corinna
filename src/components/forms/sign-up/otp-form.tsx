import OTPInput from '@/components/otp'
import { useFormContext } from 'react-hook-form'

type Props = {
  errors?: any
}

const OTPForm = ({ errors }: Props) => {
  const { register, watch, setValue } = useFormContext()
  const otpValue = watch('otp') || ''

  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Enter OTP</h2>
      <p className="text-iridium md:text-sm">
        Enter the one time password that was sent to your email.
      </p>
      <div className="w-full justify-center flex py-5">
        <OTPInput
          otp={otpValue}
          setOtp={(value) => setValue('otp', value)}
        />
      </div>
      {errors?.otp && (
        <p className="text-red-500 text-sm mt-2">{errors.otp.message}</p>
      )}
    </>
  )
}

export default OTPForm
