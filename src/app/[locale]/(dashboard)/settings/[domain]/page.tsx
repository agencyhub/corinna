import { onGetCurrentDomainInfo } from '@/actions/settings'
import BotTrainingForm from '@/components/forms/settings/bot-training'
import SettingsForm from '@/components/forms/settings/form'
import InfoBar from '@/components/infobar'
import ProductTable from '@/components/products'
import { redirect } from 'next/navigation'

type Props = { params: { domain: string } }

const DomainSettingsPage = async ({ params }: Props) => {
  const domain = await onGetCurrentDomainInfo(params.domain)
  if (!domain) redirect('/dashboard')

  // Check if domain exists and has data
  if (!domain.domains || domain.domains.length === 0) {
    redirect('/dashboard')
  }

  const domainData = domain.domains[0]

  return (
    <div className="flex flex-col h-full">
      <InfoBar />

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
        <SettingsForm
          plan={domain.subscription?.plan!}
          chatBot={domainData.chatBot || null}
          id={domainData.id}
          name={domainData.name}
        />
        <BotTrainingForm id={domainData.id} />
        <ProductTable
          id={domainData.id}
          products={domainData.products || []}
        />
      </div>
    </div>
  )
}

export default DomainSettingsPage
