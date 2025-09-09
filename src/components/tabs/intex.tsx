import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  triggers: {
    label: string
    icon?: JSX.Element
  }[]
  children: React.ReactNode
  className?: string
  button?: JSX.Element
}

const TabsMenu = ({ triggers, children, className, button }: Props) => {
  return (
    <Tabs
      defaultValue={triggers[0].label}
      className="w-full"
    >
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <TabsList className={cn('w-full justify-start bg-gray-100 dark:bg-gray-700', className)}>
          {triggers.map((trigger, key) => (
            <TabsTrigger
              key={key}
              value={trigger.label}
              className="capitalize flex items-center gap-1.5 font-medium px-3 py-2 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-orange-600 dark:data-[state=active]:text-orange-400 data-[state=active]:shadow-sm"
            >
              {trigger.icon && (
                <span className="w-3 h-3 flex items-center justify-center">
                  {trigger.icon}
                </span>
              )}
              {trigger.label}
            </TabsTrigger>
          ))}
          {button && (
            <div className="ml-auto">
              {button}
            </div>
          )}
        </TabsList>
      </div>
      {children}
    </Tabs>
  )
}

export default TabsMenu
