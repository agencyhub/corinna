import { onGetAllAccountDomains } from '@/actions/settings'
import ConversationMenu from '@/components/conversations'
import Messenger from '@/components/conversations/messenger'
import InfoBar from '@/components/infobar'

type Props = {}

const ConversationPage = async (props: Props) => {
  const domains = await onGetAllAccountDomains()
  return (
    <div className="flex flex-col h-full">
      <InfoBar />

        <div className="flex-1 flex overflow-hidden">
          <div className="w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
            <ConversationMenu domains={domains?.domains} />
          </div>

        <div className="flex-1 flex flex-col">
          <Messenger />
        </div>
      </div>
    </div>
  )
}

export default ConversationPage
