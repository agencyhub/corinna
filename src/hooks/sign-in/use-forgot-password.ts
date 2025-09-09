'use client'
import { useToast } from '@/components/ui/use-toast'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

type ForgotPasswordProps = z.infer<typeof ForgotPasswordSchema>

export const useForgotPassword = () => {
  const { isLoaded, signIn } = useSignIn()
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const methods = useForm<ForgotPasswordProps>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onChange',
  })

  const onHandleSubmit = methods.handleSubmit(
    async (values: ForgotPasswordProps) => {
      console.log('=== FORGOT PASSWORD FORM SUBMITTED ===')
      console.log('Form submitted with values:', values)
      console.log('Clerk isLoaded:', isLoaded)

      if (!isLoaded) {
        console.log('Clerk not loaded yet')
        return
      }

      try {
        setLoading(true)
        console.log('Starting reset password flow...')

        // Create reset password flow
        const resetPasswordFlow = await signIn.createResetPasswordFlow()
        console.log('Reset password flow created:', resetPasswordFlow)

        // Prepare email code verification
        await resetPasswordFlow.prepareEmailAddressVerification({
          strategy: 'reset_password_email_code',
        })
        console.log('Email verification prepared')

        toast({
          title: 'Success',
          description: 'Password reset link sent to your email',
        })

        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        console.error('Reset password error:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        console.error('Error code:', error.errors?.[0]?.code)
        console.error('Error message:', error.errors?.[0]?.message)
        console.error('Error longMessage:', error.errors?.[0]?.longMessage)

        // Check if it's a specific error about the strategy
        if (error.errors?.[0]?.code === 'form_identifier_not_found') {
          toast({
            title: 'Error',
            description: 'Email not found. Please check your email address.',
          })
        } else if (error.errors?.[0]?.code === 'form_strategy_not_supported') {
          toast({
            title: 'Error',
            description: 'Password reset is not enabled. Please contact support.',
          })
        } else {
          toast({
            title: 'Error',
            description: error.errors?.[0]?.longMessage || error.message || 'Failed to send reset link',
          })
        }
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
  }
}
