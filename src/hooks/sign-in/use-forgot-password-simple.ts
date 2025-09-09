'use client'
import { useToast } from '@/components/ui/use-toast'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
})

type ForgotPasswordProps = z.infer<typeof ForgotPasswordSchema>

export const useForgotPasswordSimple = () => {
  const { isLoaded, signIn } = useSignIn()
  const [loading, setLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()

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

        // Create reset password flow using the correct API
        await signIn.create({
          strategy: 'reset_password_email_code',
          identifier: values.email,
        })
        console.log('Reset password flow created and email sent')

        toast({
          title: 'Success',
          description: 'Verification code sent to your email',
        })

        // Redirect to reset password page
        router.push('/auth/reset-password')

        setLoading(false)
      } catch (error: any) {
        setLoading(false)
        console.error('Reset password error:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        console.error('Error code:', error.errors?.[0]?.code)
        console.error('Error message:', error.errors?.[0]?.message)
        console.error('Error longMessage:', error.errors?.[0]?.longMessage)

        // Handle specific error cases
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
        } else if (error.errors?.[0]?.code === 'form_password_not_found') {
          toast({
            title: 'Error',
            description: 'User not found. Please check your email address.',
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
