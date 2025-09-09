import CalIcon from '@/icons/cal-icon'
import ChatIcon from '@/icons/chat-icon'
import DashboardIcon from '@/icons/dashboard-icon'
import EmailIcon from '@/icons/email-icon'
import HelpDeskIcon from '@/icons/help-desk-icon'
import IntegrationsIcon from '@/icons/integrations-icon'
import SettingsIcon from '@/icons/settings-icon'
import StarIcon from '@/icons/star-icon'
import TimerIcon from '@/icons/timer-icon'

type SIDE_BAR_MENU_PROPS = {
  labelKey: string
  icon: JSX.Element
  path: string
}

export const SIDE_BAR_MENU: SIDE_BAR_MENU_PROPS[] = [
  {
    labelKey: 'navigation.dashboard',
    icon: <DashboardIcon />,
    path: 'dashboard',
  },
  {
    labelKey: 'navigation.conversations',
    icon: <ChatIcon />,
    path: 'conversation',
  },
  {
    labelKey: 'navigation.integrations',
    icon: <IntegrationsIcon />,
    path: 'integration',
  },
  {
    labelKey: 'navigation.settings',
    icon: <SettingsIcon />,
    path: 'settings',
  },
  {
    labelKey: 'navigation.appointments',
    icon: <CalIcon />,
    path: 'appointment',
  },
  {
    labelKey: 'navigation.emailMarketing',
    icon: <EmailIcon />,
    path: 'email-marketing',
  },
]

type TABS_MENU_PROPS = {
  label: string
  icon?: JSX.Element
}

export const TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'unread',
    icon: <EmailIcon />,
  },
  {
    label: 'all',
    icon: <EmailIcon />,
  },
  {
    label: 'expired',
    icon: <TimerIcon />,
  },
  {
    label: 'starred',
    icon: <StarIcon />,
  },
]

export const HELP_DESK_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'help desk',
  },
  {
    label: 'questions',
  },
]

export const APPOINTMENT_TABLE_HEADER = [
  'Name',
  'RequestedTime',
  'Added Time',
  'Domain',
]

export const EMAIL_MARKETING_HEADER = ['Id', 'Email', 'Answers', 'Domain']

export const BOT_TABS_MENU: TABS_MENU_PROPS[] = [
  {
    label: 'chat',
    icon: <ChatIcon />,
  },
  {
    label: 'helpdesk',
    icon: <HelpDeskIcon />,
  },
]
