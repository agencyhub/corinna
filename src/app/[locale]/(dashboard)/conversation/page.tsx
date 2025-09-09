'use client'

import { onGetAllAccountDomains } from '@/actions/settings';
import ConversationMenu from '@/components/conversations';
import Messenger from '@/components/conversations/messenger';
import InfoBar from '@/components/infobar';
import { PageSkeleton } from '@/components/ui/page-skeleton';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {}

const ConversationPage = (props: Props) => {
  const t = useTranslations('conversations')
  const [domains, setDomains] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDomains = async () => {
      setLoading(true)
      const result = await onGetAllAccountDomains()
      setDomains(result)
      setLoading(false)
    }
    fetchDomains()
  }, [])

  if (loading) {
    return <PageSkeleton variant="conversation" />
  }

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
