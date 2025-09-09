'use server'

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  typescript: true,
  apiVersion: '2024-04-10',
})

export const getUserClients = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      throw new Error('User not authenticated')
    }

    const clients = await client.customer.count({
      where: {
        Domain: {
          User: {
            clerkId: user.id,
          },
        },
      },
    })

    return clients || 0
  } catch (error) {
    console.error('Error in getUserClients:', error)
    return 0 // Return a safe default value instead of throwing
  }
}

export const getUserBalance = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return 0
    }

    const connectedStripe = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        stripeId: true,
      },
    })

    if (!connectedStripe?.stripeId) {
      return 0
    }

    const transactions = await stripe.balance.retrieve({
      stripeAccount: connectedStripe.stripeId,
    })

    const sales = transactions.pending.reduce((total, next) => {
      return total + next.amount
    }, 0)

    return sales / 100
  } catch (error) {
    console.error('Error in getUserBalance:', error)
    return 0
  }
}

export const getUserPlanInfo = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return null
    }

    const plan = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true,
            credits: true,
          },
        },
      },
    })

    if (!plan) {
      return null
    }

    return {
      plan: plan.subscription?.plan || 'STANDARD',
      credits: plan.subscription?.credits || 0,
      domains: plan._count.domains || 0,
    }
  } catch (error) {
    console.error('Error in getUserPlanInfo:', error)
    return null
  }
}

export const getUserTotalProductPrices = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return 0
    }

    const products = await client.product.findMany({
      where: {
        Domain: {
          User: {
            clerkId: user.id,
          },
        },
      },
      select: {
        price: true,
      },
    })

    const total = products.reduce((total: number, next: { price: number }) => {
      return total + next.price
    }, 0)

    return total
  } catch (error) {
    console.error('Error in getUserTotalProductPrices:', error)
    return 0
  }
}

export const getUserTransactions = async () => {
  try {
    const user = await currentUser()
    if (!user) {
      return null
    }

    const connectedStripe = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        stripeId: true,
      },
    })

    if (!connectedStripe?.stripeId) {
      return null
    }

    const transactions = await stripe.charges.list({
      stripeAccount: connectedStripe.stripeId,
    })

    return transactions
  } catch (error) {
    console.error('Error in getUserTransactions:', error)
    return null
  }
}
