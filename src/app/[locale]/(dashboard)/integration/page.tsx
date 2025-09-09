'use client'
import { onGetPaymentConnected } from '@/actions/settings';
import InfoBar from '@/components/infobar';
import IntegrationsList from '@/components/integrations';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import { useEffect, useState } from 'react';

const IntegrationsPage = () => {
  const [connections, setConnections] = useState({ stripe: false })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayment = async () => {
      const payment = await onGetPaymentConnected()
      setConnections({
        stripe: payment ? true : false,
      })
      setLoading(false)
    }
    fetchPayment()
  }, [])

  if (loading) {
    return <PageSkeleton variant="integration" />
  }

  return (
    <div className="flex flex-col h-full">
      <InfoBar />

      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <IntegrationsList connections={connections} />
      </div>
    </div>
  )
}

export default IntegrationsPage
