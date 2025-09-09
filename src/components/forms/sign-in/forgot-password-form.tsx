'use client'
import { Button } from '@/components/ui/button'
import { useForgotPasswordSimple } from '@/hooks/sign-in/use-forgot-password-simple'
import { useFormContext } from 'react-hook-form'
import FormGenerator from '../form-generator'

type Props = {}

const ForgotPasswordForm = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { onHandleSubmit, loading } = useForgotPasswordSimple()

  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Reset Password</h2>
      <p className="text-iridium md:text-sm">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <div className="flex flex-col gap-3">
        <FormGenerator
          register={register}
          errors={errors}
          name="email"
          placeholder="Email"
          type="email"
          inputType="input"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </div>
    </>
  )
}

export default ForgotPasswordForm
