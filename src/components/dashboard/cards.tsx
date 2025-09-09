
type Props = {
  title: string
  value: number
  icon: JSX.Element
  sales?: boolean
}

const DashboardCard = ({ icon, title, value, sales }: Props) => {
  return (
    <div className="relative group">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 w-full">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-shrink-0 p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl text-orange-600 dark:text-orange-400">
            {icon}
          </div>
          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
            {title}
          </h3>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="font-bold text-3xl lg:text-4xl text-gray-900 dark:text-white">
            {sales && (
              <span className="text-green-600 dark:text-green-400">$</span>
            )}
            {value.toLocaleString()}
          </p>
          {sales && (
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              USD
            </span>
          )}
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
    </div>
  )
}

export default DashboardCard
