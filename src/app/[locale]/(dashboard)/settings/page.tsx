import InfoBar from '@/components/infobar'
import BillingSettings from '@/components/settings/billing-settings'
import ChangePassword from '@/components/settings/change-password'
import DarkModetoggle from '@/components/settings/dark-mode'
import { getTranslations } from 'next-intl/server'

type Props = {}

const Page = async (props: Props) => {
  const t = await getTranslations('settings')

  return (
    <div className="flex flex-col h-full">
      <InfoBar />

      <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
        <BillingSettings />
        <DarkModetoggle />
        <ChangePassword />
      </div>
    </div>
  )
}

export default Page
