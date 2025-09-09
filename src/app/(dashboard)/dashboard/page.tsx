import { getUserAppointments } from '@/actions/appointment'
import {
    getUserBalance,
    getUserClients,
    getUserPlanInfo,
    getUserTotalProductPrices,
    getUserTransactions,
} from '@/actions/dashboard'
import DashboardCard from '@/components/dashboard/cards'
import { PlanUsage } from '@/components/dashboard/plan-usage'
import InfoBar from '@/components/infobar'
import { Separator } from '@/components/ui/separator'
import CalIcon from '@/icons/cal-icon'
import PersonIcon from '@/icons/person-icon'
import { TransactionsIcon } from '@/icons/transactions-icon'
import { DollarSign } from 'lucide-react'

type Props = {}

const Page = async (props: Props) => {
  try {
    const clients = await getUserClients()
    const sales = await getUserBalance()
    const bookings = await getUserAppointments()
    const plan = await getUserPlanInfo()
    const transactions = await getUserTransactions()
    const products = await getUserTotalProductPrices()

    return (
      <div className="flex flex-col h-full">
        <InfoBar />

        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <DashboardCard
              value={clients || 0}
              title="Potential Clients"
              icon={<PersonIcon />}
            />
            <DashboardCard
              value={products! * clients! || 0}
              sales
              title="Pipeline Value"
              icon={<DollarSign />}
            />
            <DashboardCard
              value={bookings || 0}
              title="Appointments"
              icon={<CalIcon />}
            />
            <DashboardCard
              value={sales || 0}
              sales
              title="Total Sales"
              icon={<DollarSign />}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Plan Usage Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-soft">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Plan Usage
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  A detailed overview of your metrics, usage, customers and more
                </p>
              </div>
              <PlanUsage
                plan={plan?.plan!}
                credits={plan?.credits || 0}
                domains={plan?.domains || 0}
                clients={clients || 0}
              />
            </div>

            {/* Recent Transactions Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-soft">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg text-orange-600 dark:text-orange-400">
                    <TransactionsIcon />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Transactions
                  </h2>
                </div>
                <button className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors">
                  See more
                </button>
              </div>

              <div className="space-y-4">
                <Separator className="bg-gray-200 dark:bg-gray-700" />
                {transactions && transactions.data.length > 0 ? (
                  transactions.data.map((transaction) => (
                    <div
                      className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                      key={transaction.id}
                    >
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {transaction.calculated_statement_descriptor}
                      </p>
                      <p className="font-bold text-lg text-green-600 dark:text-green-400">
                        ${(transaction.amount / 100).toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      No recent transactions
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in dashboard:', error)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">Oops! Something went wrong</h1>
        <p className="text-gray-600">We&apos;re having trouble connecting to the database. Please try again later.</p>
      </div>
    )
  }
}

export default Page
