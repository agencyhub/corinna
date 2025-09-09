
import { useTranslations } from 'next-intl'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import FormGenerator from '../form-generator'

type DomainUpdateProps = {
  name: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}

export const DomainUpdate = ({ name, register, errors }: DomainUpdateProps) => {
  const t = useTranslations('settings')
  return (
    <div className="max-w-md">
      <FormGenerator
        label={t('domainName', { default: 'Domain name' })}
        register={register}
        name="domain"
        errors={errors}
        type="text"
        inputType="input"
        placeholder={name}
      />
    </div>
  )
}
