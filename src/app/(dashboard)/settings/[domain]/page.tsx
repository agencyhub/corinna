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
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full chat-window flex-1 h-0">
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
    </>
  )
}

export default DomainSettingsPage
