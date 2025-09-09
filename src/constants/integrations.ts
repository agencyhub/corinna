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
    logo: '/images/stripe-logo.svg',
    title: 'connectStripeAccount',
    modalDescription: 'stripeModalDescription',
  },
]
