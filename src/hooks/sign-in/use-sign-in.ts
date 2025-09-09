import { useToast } from '@/components/ui/use-toast'
import { UserLoginProps, UserLoginSchema } from '@/schemas/auth.schema'
import { useSignIn } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { toast } = useToast()
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: 'onChange',
  })
  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return

      try {
        setLoading(true)
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        })

        if (authenticated.status === 'complete') {
          await setActive({ session: authenticated.createdSessionId })
          toast({
            title: 'Success',
            description: 'Welcome back!',
          })
          router.push('/dashboard')
        }
      } catch (error: any) {
        setLoading(false)
        console.error('Login error:', error)

        if (error.errors && error.errors[0]) {
          const errorCode = error.errors[0].code
          if (errorCode === 'form_password_incorrect') {
            toast({
              title: 'Error',
              description: 'Email/password is incorrect. Please try again.',
            })
          } else if (errorCode === 'form_identifier_not_found') {
            toast({
              title: 'Error',
              description: 'No account found with this email address.',
            })
          } else {
            toast({
              title: 'Error',
              description: error.errors[0].message || 'Login failed. Please try again.',
            })
          }
        } else {
          toast({
            title: 'Error',
            description: 'An unexpected error occurred. Please try again.',
          })
        }
      }
    }
  )

  return {
    methods,
    onHandleSubmit,
    loading,
  }
}
