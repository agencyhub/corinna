'use client'

import { onGetAllBookingsForCurrentUser } from '@/actions/appointment';
import AllAppointments from '@/components/appointment/all-appointments';
import InfoBar from '@/components/infobar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Props = {}

const Page = (props: Props) => {
  const t = useTranslations('appointments')
  const { user } = useUser()
  const [domainBookings, setDomainBookings] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return
      setLoading(true)
      const result = await onGetAllBookingsForCurrentUser(user.id)
      setDomainBookings(result)
      setLoading(false)
    }
    fetchBookings()
  }, [user])

  if (!user) return null

  if (loading) {
    return (
      <div className="flex flex-col h-full">
        <InfoBar />
        <div className="flex-1 flex items-center justify-center">
          <p>{t('loading') || 'Loading...'}</p>
        </div>
      </div>
    )
  }

  if (!domainBookings)
    return (
      <div className="flex flex-col h-full">
        <InfoBar />
        <div className="w-full flex justify-center">
          <p>{t('noAppointments')}</p>
        </div>
      </div>
    )

  const today = new Date()
  const bookingsExistToday = domainBookings.bookings.filter(
    (booking: any) => booking.date.getDate() === today.getDate()
  )

  return (
    <div className="flex flex-col h-full">
      <InfoBar />

      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AllAppointments bookings={domainBookings?.bookings} />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-soft">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('bookingsToday')}</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('bookingsTodayDescription')}
              </p>
            </div>

            <div className="space-y-4">
              {bookingsExistToday.length ? (
                bookingsExistToday.map((booking: any) => (
                  <Card
                    key={booking.id}
                    className="rounded-xl overflow-hidden border-gray-200 dark:border-gray-700 shadow-soft hover:shadow-medium transition-all duration-200"
                  >
                    <CardContent className="p-0 flex">
                      <div className="w-4/12 text-lg bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20 py-8 flex justify-center items-center font-bold text-orange-800 dark:text-orange-300">
                        {booking.slot}
                      </div>
                      <div className="flex flex-col flex-1">
                        <div className="flex justify-between w-full p-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p className="font-medium">{t('created')}</p>
                            <p>
                              {booking.createdAt.getHours()}{' '}
                              {booking.createdAt.getMinutes()}{' '}
                              {booking.createdAt.getHours() > 12 ? 'PM' : 'AM'}
                            </p>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p className="font-medium">{t('domain')}</p>
                            <p>{booking.Customer?.Domain?.name}</p>
                          </div>
                        </div>
                        <Separator className="bg-gray-200 dark:bg-gray-700" />
                        <div className="w-full flex items-center p-4 gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 text-sm font-medium">
                              {booking.email[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.email}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">{t('noAppointmentsToday')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
