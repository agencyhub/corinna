'use server'

import { client } from '@/lib/prisma'
import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { onGetAllAccountDomains } from '../settings'

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    })

    if (registered) {
      return { status: 200, user: registered }
    }
  } catch (error) {
    return { status: 400 }
  }
}

export const onLoginUser = async () => {
  const user = await currentUser()
  if (!user) redirectToSignIn()
  else {
    try {
      let authenticated = await client.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          fullname: true,
          id: true,
          type: true,
        },
      })

      // If user doesn't exist in database, create them automatically
      if (!authenticated) {
        console.log('User not found in database, creating automatically...')
        const newUser = await client.user.create({
          data: {
            fullname: user.fullName || 'User',
            clerkId: user.id,
            type: 'owner', // Default type
            subscription: {
              create: {},
            },
          },
          select: {
            fullname: true,
            id: true,
            type: true,
          },
        })
        authenticated = newUser
        console.log('User created successfully:', newUser)
      }

      if (authenticated) {
        const domains = await onGetAllAccountDomains()
        return { status: 200, user: authenticated, domain: domains?.domains }
      }
    } catch (error) {
      console.error('Error in onLoginUser:', error)
      return { status: 400 }
    }
  }
}
