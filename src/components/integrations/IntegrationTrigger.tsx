import { CloudIcon } from 'lucide-react'
import Modal from '../mondal'
import { Separator } from '../ui/separator'
import { IntegrationModalBody } from './integration-modal-body'

type Props = {
  name: 'stripe'
  logo: string
  title: string
  descrioption: string
  connections: {
    [key in 'stripe']: boolean
  }
}

const IntegrationTrigger = ({
  name,
  logo,
  title,
  descrioption,
  connections,
}: Props) => {
  const isConnected = connections[name]

  return (
    <Modal
      title={title}
      type="Integration"
      logo={logo}
      description={descrioption}
      trigger={
        <button
          className={`w-full px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            isConnected
              ? 'bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300'
              : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-soft hover:shadow-medium'
          }`}
        >
          <CloudIcon className="w-4 h-4" />
          {isConnected ? 'Connected' : 'Connect'}
        </button>
      }
    >
      <Separator orientation="horizontal" />
      <IntegrationModalBody
        connections={connections}
        type={name}
      />
    </Modal>
  )
}

export default IntegrationTrigger
