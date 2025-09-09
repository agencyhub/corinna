'use server'

import { client } from '@/lib/prisma'
import { extractEmailsFromString, extractURLfromString } from '@/lib/utils'
import { clerkClient } from '@clerk/nextjs'
import OpenAi from 'openai'
import { onRealTimeChat } from '../conversation'
import { onMailer } from '../mailer'

const openai = new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
})

// Helper function to find domain by ID or name
const findDomainByIdOrName = async (id: string) => {
  console.log('findDomainByIdOrName: Searching for:', id)

  // Check if it looks like a UUID (contains hyphens and is 36 chars long)
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

  let domain = null

  if (isUUID) {
    // Try UUID search first if it looks like a UUID
    console.log('findDomainByIdOrName: Trying UUID search for:', id)
    try {
      domain = await client.domain.findUnique({
        where: { id },
      })
      console.log('findDomainByIdOrName: UUID search result:', domain)
    } catch (error) {
      console.log('findDomainByIdOrName: UUID search failed:', error)
    }
  }

  // If not found by UUID or not a UUID, try to find by domain name
  if (!domain) {
    console.log('findDomainByIdOrName: Trying name search for:', id)
    try {
      domain = await client.domain.findFirst({
        where: { name: id },
      })
      console.log('findDomainByIdOrName: Name search result:', domain)
    } catch (error) {
      console.log('findDomainByIdOrName: Name search failed:', error)
    }
  }

  return domain
}

export const onStoreConversations = async (
  id: string,
  message: string,
  role: 'assistant' | 'user'
) => {
  await client.chatRoom.update({
    where: {
      id,
    },
    data: {
      message: {
        create: {
          message,
          role,
        },
      },
    },
  })
}

export const onGetCurrentChatBot = async (id: string) => {
  try {
    console.log('onGetCurrentChatBot: Looking for domain with ID/name:', id)

    // First, let's check if there are any domains in the database
    const allDomains = await client.domain.findMany({
      select: {
        id: true,
        name: true,
        chatBot: {
          select: {
            id: true,
            welcomeMessage: true,
          },
        },
      },
    })
    console.log('onGetCurrentChatBot: All domains in database:', allDomains)

    const domain = await findDomainByIdOrName(id)
    console.log('onGetCurrentChatBot: Found domain:', domain)

    if (domain) {
      const chatbot = await client.domain.findUnique({
        where: {
          id: domain.id,
        },
        select: {
          helpdesk: true,
          name: true,
          chatBot: {
            select: {
              id: true,
              welcomeMessage: true,
              icon: true,
              textColor: true,
              background: true,
              helpdesk: true,
            },
          },
        },
      })

      console.log('onGetCurrentChatBot: Chatbot data:', chatbot)
      return chatbot
    } else {
      console.log('onGetCurrentChatBot: No domain found for:', id)
      return null
    }
  } catch (error) {
    console.log('Error in onGetCurrentChatBot:', error)
    return null
  }
}

let customerEmail: string | undefined

export const onAiChatBotAssistant = async (
  id: string,
  chat: { role: 'assistant' | 'user'; content: string }[],
  author: 'user',
  message: string
) => {
  try {
    const domain = await findDomainByIdOrName(id)

    if (!domain) {
      console.log('Domain not found:', id)
      return
    }

    const chatBotDomain = await client.domain.findUnique({
      where: {
        id: domain.id,
      },
      select: {
        name: true,
        filterQuestions: {
          where: {
            answered: null,
          },
          select: {
            question: true,
          },
        },
      },
    })
    if (chatBotDomain) {
      const extractedEmail = extractEmailsFromString(message)
      if (extractedEmail) {
        customerEmail = extractedEmail[0]
      }

      if (customerEmail) {
        const checkCustomer = await client.domain.findUnique({
          where: {
            id: domain.id,
          },
          select: {
            User: {
              select: {
                clerkId: true,
              },
            },
            name: true,
            customer: {
              where: {
                email: {
                  startsWith: customerEmail,
                },
              },
              select: {
                id: true,
                email: true,
                questions: true,
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                    mailed: true,
                  },
                },
              },
            },
          },
        })
        if (checkCustomer && !checkCustomer.customer.length) {
          const newCustomer = await client.domain.update({
            where: {
              id: domain.id,
            },
            data: {
              customer: {
                create: {
                  email: customerEmail,
                  questions: {
                    create: chatBotDomain.filterQuestions,
                  },
                  chatRoom: {
                    create: {},
                  },
                },
              },
            },
          })
          if (newCustomer) {
            console.log('new customer made')
            const response = {
              role: 'assistant',
              content: `Welcome aboard ${
                customerEmail.split('@')[0]
              }! I'm glad to connect with you. Is there anything you need help with?`,
            }
            return { response }
          }
        }
        if (checkCustomer && checkCustomer.customer[0].chatRoom[0].live) {
          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            message,
            author
          )

          onRealTimeChat(
            checkCustomer.customer[0].chatRoom[0].id,
            message,
            'user',
            author
          )

          if (!checkCustomer.customer[0].chatRoom[0].mailed) {
            const user = await clerkClient.users.getUser(
              checkCustomer.User?.clerkId!
            )

            onMailer(user.emailAddresses[0].emailAddress)

            //update mail status to prevent spamming
            const mailed = await client.chatRoom.update({
              where: {
                id: checkCustomer.customer[0].chatRoom[0].id,
              },
              data: {
                mailed: true,
              },
            })

            if (mailed) {
              return {
                live: true,
                chatRoom: checkCustomer.customer[0].chatRoom[0].id,
              }
            }
          }
          return {
            live: true,
            chatRoom: checkCustomer.customer[0].chatRoom[0].id,
          }
        }

        await onStoreConversations(
          checkCustomer?.customer[0].chatRoom[0].id!,
          message,
          author
        )

        const chatCompletion = await openai.chat.completions.create({
          messages: [
            {
              role: 'assistant',
              content: `
              You will get an array of questions that you must ask the customer.

              Progress the conversation using those questions.

              Whenever you ask a question from the array i need you to add a keyword at the end of the question (complete) this keyword is extremely important.

              Do not forget it.

              only add this keyword when your asking a question from the array of questions. No other question satisfies this condition

              Always maintain character and stay respectfull.

              The array of questions : [${chatBotDomain.filterQuestions
                .map((questions) => questions.question)
                .join(', ')}]

              if the customer says something out of context or inapporpriate. Simply say this is beyond you and you will get a real user to continue the conversation. And add a keyword (realtime) at the end.

              if the customer agrees to book an appointment send them this link http://localhost:3000/portal/${id}/appointment/${
                checkCustomer?.customer[0].id
              }

              if the customer wants to buy a product redirect them to the payment page http://localhost:3000/portal/${id}/payment/${
                checkCustomer?.customer[0].id
              }
          `,
            },
            ...chat,
            {
              role: 'user',
              content: message,
            },
          ],
          model: 'gpt-3.5-turbo',
        })

        if (chatCompletion.choices[0].message.content?.includes('(realtime)')) {
          const realtime = await client.chatRoom.update({
            where: {
              id: checkCustomer?.customer[0].chatRoom[0].id,
            },
            data: {
              live: true,
            },
          })

          if (realtime) {
            const response = {
              role: 'assistant',
              content: chatCompletion.choices[0].message.content.replace(
                '(realtime)',
                ''
              ),
            }

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              response.content,
              'assistant'
            )

            return { response }
          }
        }
        if (chat[chat.length - 1].content.includes('(complete)')) {
          const firstUnansweredQuestion =
            await client.customerResponses.findFirst({
              where: {
                customerId: checkCustomer?.customer[0].id,
                answered: null,
              },
              select: {
                id: true,
              },
              orderBy: {
                question: 'asc',
              },
            })
          if (firstUnansweredQuestion) {
            await client.customerResponses.update({
              where: {
                id: firstUnansweredQuestion.id,
              },
              data: {
                answered: message,
              },
            })
          }
        }

        if (chatCompletion) {
          const generatedLink = extractURLfromString(
            chatCompletion.choices[0].message.content as string
          )

          if (generatedLink) {
            const link = generatedLink[0]
            const response = {
              role: 'assistant',
              content: `Great! you can follow the link to proceed`,
              link: link.slice(0, -1),
            }

            await onStoreConversations(
              checkCustomer?.customer[0].chatRoom[0].id!,
              `${response.content} ${response.link}`,
              'assistant'
            )

            return { response }
          }

          const response = {
            role: 'assistant',
            content: chatCompletion.choices[0].message.content,
          }

          await onStoreConversations(
            checkCustomer?.customer[0].chatRoom[0].id!,
            `${response.content}`,
            'assistant'
          )

          return { response }
        }
      }
      // No email found in the message - create an anonymous customer and chatroom
      console.log('No customer with email found. Creating anonymous chat...')
      const anonymous = await client.domain.update({
        where: { id: domain.id },
        data: {
          customer: {
            create: {
              email: null,
              chatRoom: { create: {} },
            },
          },
        },
        select: {
          customer: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: { chatRoom: { select: { id: true } }, id: true },
          },
        },
      })

      const anonChatRoomId = anonymous.customer[0]?.chatRoom[0]?.id
      if (anonChatRoomId) {
        await onStoreConversations(anonChatRoomId, message, author)
      }

      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: 'assistant',
            content: `
            You are a highly knowledgeable and experienced sales representative for a ${chatBotDomain.name} that offers a valuable product or service. Your goal is to have a natural, human-like conversation with the customer in order to understand their needs, provide relevant information, and ultimately guide them towards making a purchase or redirect them to a link if they havent provided all relevant information.
            Right now you are talking to a customer for the first time. Start by giving them a warm welcome on behalf of ${chatBotDomain.name} and make them feel welcomed.

            Your next task is lead the conversation naturally to get the customers email address. Be respectful and never break character

          `,
          },
          ...chat,
          {
            role: 'user',
            content: message,
          },
        ],
        model: 'gpt-3.5-turbo',
      })

      if (chatCompletion) {
        const response = {
          role: 'assistant',
          content: chatCompletion.choices[0].message.content,
        }

        if (anonChatRoomId) {
          await onStoreConversations(anonChatRoomId, response.content, 'assistant')
        }

        return { response }
      }
    }
  } catch (error) {
    console.log(error)
  }
}
