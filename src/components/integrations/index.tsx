'use client'
import { INTEGRATION_LIST_ITEMS } from '@/constants/integrations'
import Image from 'next/image'
import { Card, CardContent, CardDescription } from '../ui/card'
import IntegrationTrigger from './IntegrationTrigger'

type Props = {
  connections: {
    stripe: boolean
  }
}

const IntegrationsList = ({ connections }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {INTEGRATION_LIST_ITEMS.map((item) => (
        <Card key={item.id} className="group hover:shadow-medium transition-all duration-200 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex flex-col h-full">
              {/* Header with logo and name */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 relative bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                    <Image
                      src="/images/logo.png"
                      alt={`${item.name} logo`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${
                        connections[item.name]
                          ? 'bg-green-500'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`} />
                      <span className={`text-xs font-medium ${
                        connections[item.name]
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {connections[item.name] ? 'Connected' : 'Not connected'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="flex-1 mb-6">
                <CardDescription className="text-sm leading-relaxed">
                  {item.description}
                </CardDescription>
              </div>

              {/* Action button */}
              <div className="mt-auto">
                <IntegrationTrigger
                  connections={connections}
                  title={item.title}
                  descrioption={item.modalDescription}
                  logo={item.logo}
                  name={item.name}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default IntegrationsList
