'use client'
import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useSettings } from '@/hooks/settings/use-settings'
import PremiumBadge from '@/icons/premium-badge'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import CodeSnippet from './code-snippet'
import { DomainUpdate } from './domain-update'
import EditChatbotIcon from './edit-chatbot-icon'

const WelcomeMessage = dynamic(
  () => import('./greetings-message').then((props) => props.default),
  {
    ssr: false,
  }
)

type Props = {
  id: string
  name: string
  plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
  chatBot: {
    id: string
    icon: string | null
    welcomeMessage: string | null
  } | null
}

const SettingsForm = ({ id, name, chatBot, plan }: Props) => {
  const {
    register,
    onUpdateSettings,
    errors,
    onDeleteDomain,
    deleting,
    loading,
  } = useSettings(id)
  return (
    <div className="space-y-8">
      {/* Domain Settings Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-soft">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Domain Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure your domain and integration settings</p>
        </div>
        <Separator className="mb-6 bg-gray-200 dark:bg-gray-700" />

        <form onSubmit={onUpdateSettings} className="space-y-6">
          <DomainUpdate
            name={name}
            register={register}
            errors={errors}
          />
          <CodeSnippet id={id} />
        </form>
      </div>

      {/* Chatbot Settings Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-soft">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chatbot Settings</h2>
          <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 rounded-full px-4 py-2 text-sm font-semibold text-orange-800 dark:text-orange-300">
            <PremiumBadge />
            Premium
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">Customize your chatbot appearance and behavior</p>
        <Separator className="mb-6 bg-gray-200 dark:bg-gray-700" />

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <EditChatbotIcon
              chatBot={chatBot}
              register={register}
              errors={errors}
            />
            <WelcomeMessage
              message={chatBot?.welcomeMessage!}
              register={register}
              errors={errors}
            />
          </div>
          <div className="relative">
            <div className="sticky top-6">
              <Image
                src="/images/bot-ui.png"
                alt="Bot UI Preview"
                width={530}
                height={769}
                className="rounded-xl shadow-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button
          onClick={onDeleteDomain}
          variant="destructive"
          type="button"
          className="px-8 py-3"
          disabled={deleting}
        >
          <Loader loading={deleting}>Delete Domain</Loader>
        </Button>
        <Button
          onClick={onUpdateSettings}
          type="button"
          variant="gradient"
          className="px-8 py-3"
          disabled={loading}
        >
          <Loader loading={loading}>Save Changes</Loader>
        </Button>
      </div>
    </div>
  )
}

export default SettingsForm
