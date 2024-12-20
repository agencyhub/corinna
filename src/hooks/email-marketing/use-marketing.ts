import {
  onAddCustomersToEmail,
  onBulkMailer,
  onCreateMarketingCampaign,
  onGetAllCustomerResponses,
  onGetEmailTemplate,
  onSaveEmailTemplate,
} from '@/actions/mail'
import { useToast } from '@/components/ui/use-toast'
import {
  EmailMarketingBodySchema,
  EmailMarketingSchema,
} from '@/schemas/marketing.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export const useEmailMarketing = () => {
  const [isSelected, setIsSelected] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [campaignId, setCampaignId] = useState<string | undefined>()
  const [processing, setProcessing] = useState<boolean>(false)
  const [isId, setIsId] = useState<string | undefined>(undefined)
  const [editing, setEditing] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(EmailMarketingSchema),
  })

  const {
    register: registerEmail,
    formState: { errors: emailErrors },
    handleSubmit: SubmitEmail,
    setValue,
  } = useForm({
    resolver: zodResolver(EmailMarketingBodySchema),
  })
  const { toast } = useToast()
  const router = useRouter()

  const onCreateCampaign = handleSubmit(async (values) => {
    try {
      setLoading(true)
      const campaign = await onCreateMarketingCampaign(values.name)
      if (campaign) {
        reset()
        toast({
          title: 'Success',
          description: campaign.message,
        })
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create campaign',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error creating campaign:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  })

  const onCreateEmailTemplate = SubmitEmail(async (values) => {
    try {
      if (!campaignId) {
        toast({
          title: 'Error',
          description: 'Please select a campaign first',
          variant: 'destructive',
        })
        return
      }

      setEditing(true)
      const template = JSON.stringify(values.description)
      const emailTemplate = await onSaveEmailTemplate(template, campaignId)
      if (emailTemplate) {
        toast({
          title: 'Success',
          description: emailTemplate.message,
        })
      } else {
        toast({
          title: 'Error',
          description: 'Failed to save email template',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error creating email template:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setEditing(false)
    }
  })

  const onSelectCampaign = (id: string) => setCampaignId(id)

  const onAddCustomersToCampaign = async () => {
    try {
      if (!campaignId) {
        toast({
          title: 'Error',
          description: 'Please select a campaign first',
          variant: 'destructive',
        })
        return
      }

      if (isSelected.length === 0) {
        toast({
          title: 'Error',
          description: 'Please select at least one customer',
          variant: 'destructive',
        })
        return
      }

      setProcessing(true)
      const customersAdd = await onAddCustomersToEmail(isSelected, campaignId)
      if (customersAdd) {
        toast({
          title: 'Success',
          description: customersAdd.message,
        })
        setCampaignId(undefined)
        setIsSelected([])
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to add customers to campaign',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error adding customers to campaign:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    } finally {
      setProcessing(false)
    }
  }

  const onSelectedEmails = (email: string) => {
    //add or remove
    const duplicate = isSelected.find((e) => e === email)
    if (duplicate) {
      setIsSelected(isSelected.filter((e) => e !== email))
    } else {
      setIsSelected((prev) => [...prev, email])
    }
  }

  const onBulkEmail = async (emails: string[], campaignId: string) => {
    try {
      if (emails.length === 0) {
        toast({
          title: 'Error',
          description: 'No customers selected for this campaign',
          variant: 'destructive',
        })
        return
      }

      const result = await onBulkMailer(emails, campaignId)
      if (result) {
        toast({
          title: 'Success',
          description: result.message,
        })
        router.refresh()
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send emails',
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error sending bulk emails:', error)
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    }
  }

  const onSetAnswersId = (id: string) => setIsId(id)

  return {
    onSelectedEmails,
    isSelected,
    onCreateCampaign,
    register,
    errors,
    loading,
    onSelectCampaign,
    processing,
    campaignId,
    onAddCustomersToCampaign,
    onBulkEmail,
    onSetAnswersId,
    isId,
    registerEmail,
    emailErrors,
    onCreateEmailTemplate,
    editing,
    setValue,
  }
}

export const useAnswers = (id: string) => {
  const [answers, setAnswers] = useState<
    {
      customer: {
        questions: { question: string; answered: string | null }[]
      }[]
    }[]
  >([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onGetCustomerAnswers = async () => {
    try {
      setLoading(true)
      setError(null)
      const answer = await onGetAllCustomerResponses(id)
      if (answer) {
        setAnswers(answer)
      } else {
        setAnswers([])
      }
    } catch (error) {
      console.error('Error fetching customer answers:', error)
      setError('Failed to fetch customer answers')
      setAnswers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      onGetCustomerAnswers()
    }
  }, [id])

  return { answers, loading, error }
}

export const useEditEmail = (id: string) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [template, setTemplate] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const onGetTemplate = async (id: string) => {
    try {
      setLoading(true)
      setError(null)
      const email = await onGetEmailTemplate(id)
      if (email) {
        setTemplate(email)
      } else {
        setTemplate('')
      }
    } catch (error) {
      console.error('Error fetching email template:', error)
      setError('Failed to fetch email template')
      setTemplate('')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      onGetTemplate(id)
    }
  }, [id])

  return { loading, template, error }
}
