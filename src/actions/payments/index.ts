'use server'

import { client } from '@/lib/prisma'

export const onGetDomainProductsAndConnectedAccountId = async (id: string) => {
  try {
    // First try to find by UUID, then by name
    let domain = await client.domain.findUnique({
      where: { id },
    })

    if (!domain) {
      domain = await client.domain.findFirst({
        where: { name: id },
      })
    }

    if (!domain) return null

    const connectedAccount = await client.domain.findUnique({
      where: {
        id: domain.id,
      },
      select: {
        User: {
          select: {
            stripeId: true,
          },
        },
      },
    })

    const products = await client.product.findMany({
      where: {
        domainId: domain.id,
      },
      select: {
        price: true,
        name: true,
        image: true,
      },
    })

    if (products) {
      const totalAmount = products.reduce((current, next) => {
        return current + next.price
      }, 0)
      return {
        products: products,
        amount: totalAmount,
        stripeId: connectedAccount?.User?.stripeId,
      }
    }
  } catch (error) {
    console.log(error)
  }
}
