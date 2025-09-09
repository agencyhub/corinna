import { onGetAllCampaigns, onGetAllCustomers } from '@/actions/mail'
import EmailMarketing from '@/components/email-marketing'
import InfoBar from '@/components/infobar'
import { currentUser } from '@clerk/nextjs'

type Props = {}

const Page = async (props: Props) => {
  const user = await currentUser()

  if (!user) return null
  const customers = await onGetAllCustomers(user.id)
  const campaigns = await onGetAllCampaigns(user.id)

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
