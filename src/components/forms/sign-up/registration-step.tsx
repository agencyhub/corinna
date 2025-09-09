'use client'
import { Spinner } from '@/components/spinner'
import { useAuthContextHook } from '@/context/use-auth-context'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import TypeSelectionForm from './type-selection-form'

const DetailForm = dynamic(() => import('./account-details-form'), {
  ssr: false,
  loading: () => <Spinner />,
})

const OTPForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  loading: () => <Spinner />,
})

type Props = {}

const RegistrationFormStep = (props: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const { currentStep } = useAuthContextHook()
  const [onUserType, setOnUserType] = useState<'owner' | 'student'>('owner')

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      )
    case 2:
      return (
        <DetailForm
          errors={errors}
          register={register}
        />
      )
    case 3:
      return (
        <OTPForm
          errors={errors}
        />
      )
  }

  return <div>RegistrationFormStep</div>
}

export default RegistrationFormStep
