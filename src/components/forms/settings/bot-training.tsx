import TabsMenu from '@/components/tabs/intex'
import { TabsContent } from '@/components/ui/tabs'
import { HELP_DESK_TABS_MENU } from '@/constants/menu'
import FilterQuestions from './filter-questions'
import HelpDesk from './help-desk'

type Props = {
  id: string
}

const BotTrainingForm = ({ id }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700 shadow-soft">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bot Training</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Set FAQ questions, create questions for capturing lead information and
          train your bot to act the way you want it to.
        </p>
      </div>

      <TabsMenu triggers={HELP_DESK_TABS_MENU}>
        <TabsContent
          value="help desk"
          className="w-full"
        >
          <HelpDesk id={id} />
        </TabsContent>
        <TabsContent value="questions">
          <FilterQuestions id={id} />
        </TabsContent>
      </TabsMenu>
    </div>
  )
}

export default BotTrainingForm
