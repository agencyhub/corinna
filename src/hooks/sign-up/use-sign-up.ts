'use client'
import { useToast } from '@/components/ui/use-toast'
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { onCompleteUserRegistration } from '@/actions/auth'

export const useSignUpForm = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const { signUp, isLoaded, setActive } = useSignUp()
  const router = useRouter()

  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: 'owner',
    },
    mode: 'onChange',
  })

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    if (!isLoaded) {
      console.log('Clerk not loaded for OTP generation')
      return
    }

    try {
      setLoading(true)

      // Primeiro, verifica se já existe um signup em andamento
      if (signUp.status === 'complete') {
        // Se já completou, cria um novo
        await signUp.create({
          emailAddress: email,
          password: password,
        })
      } else if (!signUp.emailAddress) {
        // Se não tem email, também cria um novo
        await signUp.create({
          emailAddress: email,
          password: password,
        })
      }

      // Agora prepara a verificação
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      toast({
        title: 'Success',
        description: 'Verification code sent to your email',
      })

      onNext((prev) => prev + 1)
    } catch (error: any) {
      console.error('OTP Generation error:', error)
      toast({
        title: 'Error',
        description: error.errors?.[0]?.longMessage || 'Failed to generate OTP. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const onSubmitOTP = async (values: UserRegistrationProps) => {
    console.log('Form submitted with values:', values)

    if (!isLoaded) {
      console.log('Clerk not loaded for verification')
      return
    }

    try {
      setLoading(true)
      console.log('Attempting verification with code:', values.otp)

      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: values.otp,
      })
      console.log('Verification result:', completeSignUp)

      if (completeSignUp.status !== 'complete') {
        toast({
          title: 'Error',
          description: 'Verification failed. Please try again.',
          variant: 'destructive',
        })
        return
      }

      if (!signUp.createdUserId) {
        toast({
          title: 'Error',
          description: 'User ID not found',
          variant: 'destructive',
        })
        return
      }

      console.log('Completing user registration with ID:', signUp.createdUserId)
      const registered = await onCompleteUserRegistration(
        values.fullname,
        signUp.createdUserId,
        values.type
      )

      if (registered?.status === 200 && registered.user) {
        await setActive({
          session: completeSignUp.createdSessionId,
        })
        router.push('/dashboard')
      } else {
        toast({
          title: 'Error',
          description: 'Failed to complete registration',
          variant: 'destructive',
        })
      }
    } catch (error: any) {
      console.error('Submit error:', error)
      toast({
        title: 'Error',
        description: error.errors?.[0]?.longMessage || 'Something went wrong',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    methods,
    onGenerateOTP,
    onSubmitOTP,
    loading,
  }
}
