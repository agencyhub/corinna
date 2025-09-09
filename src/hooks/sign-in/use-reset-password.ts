'use client'
import { useToast } from '@/components/ui/use-toast'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const CodeVerificationSchema = z.object({
  code: z.string()
    .min(1, { message: 'Please enter the verification code' })
    .min(6, { message: 'Code must be 6 digits' })
    .max(6, { message: 'Code must be exactly 6 digits' }),
})

const PasswordResetSchema = z.object({
  password: z.string()
    .min(1, { message: 'Please enter a password' })
    .min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string()
    .min(1, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type CodeVerificationProps = z.infer<typeof CodeVerificationSchema>
type PasswordResetProps = z.infer<typeof PasswordResetSchema>
type ResetPasswordProps = CodeVerificationProps & PasswordResetProps

export const useResetPassword = () => {
  const { isLoaded, signIn } = useSignIn()
  const [loading, setLoading] = useState<boolean>(false)
  const [step, setStep] = useState<'code' | 'password'>('code')
  const [forceUpdate, setForceUpdate] = useState(0)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const methods = useForm<ResetPasswordProps>({
    resolver: zodResolver(step === 'code' ? CodeVerificationSchema : PasswordResetSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  // Force re-render when step changes
  useEffect(() => {
    console.log('Step useEffect triggered:', step)
  }, [step])

  // Update resolver when step changes
  useEffect(() => {
    console.log('Step changed to:', step)
    methods.clearErrors()
    // Force revalidation with new schema
    methods.trigger()
  }, [step, methods])

  // Force re-render when step changes
  useEffect(() => {
    console.log('Step useEffect triggered:', step)
  }, [step])

  const onHandleSubmit = methods.handleSubmit(
    async (values: ResetPasswordProps) => {
      console.log('=== RESET PASSWORD FORM SUBMITTED ===')
      console.log('Form submitted with values:', values)
      console.log('Clerk isLoaded:', isLoaded)
      console.log('Current step:', step)
      console.log('Form errors:', methods.formState.errors)

      if (!isLoaded) {
        console.log('Clerk not loaded yet')
        return
      }

      try {
        setLoading(true)

        if (step === 'code') {
          console.log('Verifying code...')

          // Verify the code
          const result = await signIn.attemptFirstFactor({
            strategy: 'reset_password_email_code',
            code: values.code,
          })

          console.log('Code verification result:', result)

          if (result.status === 'needs_new_password') {
            console.log('Code verified successfully, changing step to password')
            setIsCodeVerified(true)
            setStep('password')
            setForceUpdate(prev => prev + 1)
            console.log('Step changed to:', 'password')

            toast({
              title: 'Code Verified',
              description: 'Please enter your new password',
            })
          } else {
            toast({
              title: 'Error',
              description: 'Invalid code. Please try again.',
            })
          }
        } else if (step === 'password') {
          console.log('Setting new password...')

          // Set new password
          const result = await signIn.resetPassword({
            password: values.password,
          })

          console.log('Password reset result:', result)

          if (result.status === 'complete') {
            toast({
              title: 'Success',
              description: 'Password reset successfully!',
            })
            router.push('/auth/sign-in')
          } else {
            toast({
              title: 'Error',
              description: 'Failed to reset password. Please try again.',
            })
          }
        }

        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        console.error('Reset password error:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        console.error('Error code:', error.errors?.[0]?.code)
        console.error('Error message:', error.errors?.[0]?.message)
        console.error('Error longMessage:', error.errors?.[0]?.longMessage)

        toast({
          title: 'Error',
          description: error.errors?.[0]?.longMessage || error.message || 'Something went wrong',
        })
      }
    },
    (errors) => {
      console.log('=== FORM VALIDATION ERRORS ===')
      console.log('Validation errors:', errors)
    }
  )

  return {
    methods,
    onHandleSubmit,
    loading,
    step,
    setStep,
    forceUpdate,
    isCodeVerified,
  }
}
