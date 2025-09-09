type IntegrationsListItemProps = {
  id: string
  name: 'stripe'
  logo: string
  description: string
  title: string
  modalDescription: string
}

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: '1',
    name: 'stripe',
    description: 'stripeDescription',
    logo: '914be637-39bf-47e6-bb81-37b553163945',
    title: 'connectStripeAccount',
    modalDescription: 'stripeModalDescription',
  },
]
