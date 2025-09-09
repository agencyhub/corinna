'use client'

import { onGetAllCampaigns, onGetAllCustomers } from '@/actions/mail'
import EmailMarketing from '@/components/email-marketing'
import InfoBar from '@/components/infobar'
import { PageSkeleton } from '@/components/ui/page-skeleton'
import { useUser } from '@clerk/nextjs'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {
  const t = useTranslations('emailMarketing')
  const { user } = useUser()
  const [customers, setCustomers] = useState<any>(null)
  const [campaigns, setCampaigns] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return
      setLoading(true)
      const [customersData, campaignsData] = await Promise.all([
        onGetAllCustomers(user.id),
        onGetAllCampaigns(user.id)
      ])
      setCustomers(customersData)
      setCampaigns(campaignsData)
      setLoading(false)
    }
    fetchData()
  }, [user])

  if (!user) return null

  if (loading) {
    return <PageSkeleton variant="email-marketing" />
  }

  return (
    <div className="flex flex-col h-full">
      <InfoBar />

      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <EmailMarketing
          campaign={campaigns?.campaign!}
          subscription={customers?.subscription!}
          domains={customers?.domains!}
        />
      </div>
    </div>
  )
}

export default Page
