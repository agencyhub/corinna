'use client'
import useSideBar from '@/context/use-sidebar';
import { useTranslations } from 'next-intl';
import { Loader } from '../loader';
import { Switch } from '../ui/switch';

type Props = {}

const BreadCrumb = (props: Props) => {
  const {
    chatRoom,
    expand,
    loading,
    onActivateRealtime,
    onExpand,
    page,
    onSignOut,
    realtime,
  } = useSideBar()
  const t = useTranslations()
  return (
    <div className="flex flex-col ">
      <div className="flex gap-5 items-center">
        <h2 className="text-3xl font-bold capitalize">
          {page == 'settings'
            ? t('navigation.settings')
            : page == 'dashboard'
            ? t('navigation.dashboard')
            : page == 'appointment'
            ? t('navigation.appointments')
            : page == 'email-marketing'
            ? t('navigation.emailMarketing')
            : page == 'integration'
            ? t('navigation.integrations')
            : t('navigation.conversations')}
        </h2>
        {page === 'conversation' && chatRoom && (
          <Loader
            loading={loading}
            className="p-0 inline"
          >
            <Switch
              defaultChecked={realtime}
              onClick={(e) => onActivateRealtime(e)}
              className="data-[state=checked]:bg-orange data-[state=unchecked]:bg-peach"
            />
          </Loader>
        )}
      </div>
      <p className="text-gray-500 text-sm">
        {page == 'settings'
          ? t('breadcrumb.settings')
          : page == 'dashboard'
          ? t('breadcrumb.dashboard')
          : page == 'appointment'
          ? t('breadcrumb.appointment')
          : page == 'email-marketing'
          ? t('breadcrumb.emailMarketing')
          : page == 'integration'
          ? t('breadcrumb.integration')
          : t('breadcrumb.conversation')}
      </p>
    </div>
  )
}

export default BreadCrumb
