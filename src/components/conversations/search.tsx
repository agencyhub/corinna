import { FieldValues, UseFormRegister } from 'react-hook-form'

type Props = {
  register: UseFormRegister<FieldValues>
  domains?:
    | {
        name: string
        id: string
        icon: string
      }[]
    | undefined
}

const ConversationSearch = ({ register, domains }: Props) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by Domain
        </label>
        <select
          {...register('domain')}
          className="w-full px-4 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
          defaultValue=""
        >
          <option
            value=""
            disabled
          >
            Select a domain
          </option>
          {domains?.map((domain) => (
            <option
              value={domain.id}
              key={domain.id}
            >
              {domain.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ConversationSearch
