import { onGetPaymentConnected } from '@/actions/settings';
import InfoBar from '@/components/infobar';
import IntegrationsList from '@/components/integrations';

const IntegrationsPage = async () => {
  const payment = await onGetPaymentConnected()

  const connections = {
    stripe: payment ? true : false,
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
