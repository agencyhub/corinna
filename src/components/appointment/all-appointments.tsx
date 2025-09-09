'use client'
import { APPOINTMENT_TABLE_HEADER } from '@/constants/menu'
import { getMonthName } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { DataTable } from '../table'
import { CardDescription } from '../ui/card'
import { TableCell, TableRow } from '../ui/table'

type Props = {
  bookings:
    | {
        Customer: {
          Domain: {
            name: string
          } | null
        } | null
        id: string
        email: string
        domainId: string | null
        date: Date
        slot: string
        createdAt: Date
      }[]
    | undefined
}

const AllAppointments = ({ bookings }: Props) => {
  const t = useTranslations('appointments')
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-soft">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('allAppointments', { default: 'All Appointments' })}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {t('allAppointmentsDescription', { default: 'View and manage all your appointments' })}
        </p>
      </div>

      <div className="overflow-x-auto">
        <DataTable headers={APPOINTMENT_TABLE_HEADER.map(header => t(header))}>
          {bookings ? (
            bookings.map((booking) => (
              <TableRow key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <TableCell className="font-medium text-gray-900 dark:text-white">
                  {booking.email}
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {getMonthName(booking.date.getMonth())} {booking.date.getDate()}{' '}
                    {booking.date.getFullYear()}
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-400 font-medium uppercase">
                    {booking.slot}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900 dark:text-white">
                    {getMonthName(booking.createdAt.getMonth())}{' '}
                    {booking.createdAt.getDate()} {booking.createdAt.getFullYear()}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {booking.createdAt.getHours()}:{booking.createdAt.getMinutes().toString().padStart(2, '0')}{' '}
                    {booking.createdAt.getHours() > 12 ? 'PM' : 'AM'}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                    {booking.Customer?.Domain?.name}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8">
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  {t('noAppointmentsFound', { default: 'No Appointments Found' })}
                </CardDescription>
              </TableCell>
            </TableRow>
          )}
        </DataTable>
      </div>
    </div>
  )
}

export default AllAppointments
