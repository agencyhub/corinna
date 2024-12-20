'use client'
import { useAuthContextHook } from '@/context/use-auth-context'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import TypeSelectionForm from './type-selection-form'
import dynamic from 'next/dynamic'

const DetailForm = dynamic(() => import('./account-details-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

const OTPForm = dynamic(() => import('./otp-form'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
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
      return <OTPForm />
  }

  return <div>RegistrationFormStep</div>
}

export default RegistrationFormStep
