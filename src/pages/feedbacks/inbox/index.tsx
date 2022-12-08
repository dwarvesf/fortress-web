import { Tabs } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { FeedbackInputTable } from 'components/pages/feedbacks/inbox/FeedbackInboxTable'
import { useFilter } from 'hooks/useFilter'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { FeedbackListFilter } from 'types/filters/FeedbackListFilter'

export interface FeedbackInboxItem {
  id: string
  topic: string
  type: string
  subtype: string
  responses: number
  lastUpdated: string
  author: string
  read: boolean
}

const mockData: FeedbackInboxItem[] = [
  {
    id: '1',
    topic: 'Topic 1',
    type: 'survey',
    subtype: 'peer-review',
    responses: 1,
    lastUpdated: '10/02/2021',
    author: 'Dwarves Team',
    read: false,
  },
  {
    id: '2',
    topic: 'Topic 2',
    type: 'survey',
    subtype: 'work',
    responses: 1,
    lastUpdated: '10/02/2021',
    author: 'Dwarves Team',
    read: true,
  },
  {
    id: '3',
    topic: 'Topic 3',
    type: 'feedback',
    subtype: 'appreciation',
    responses: 1,
    lastUpdated: '10/02/2021',
    author: 'Dwarves Team',
    read: true,
  },
  {
    id: '4',
    topic: 'Employee engagement survey Q1/Q2, 2022',
    type: 'survey',
    subtype: 'engagement',
    responses: 1,
    lastUpdated: '10/02/2021',
    author: 'Dwarves Team',
    read: false,
  },
]

const Default = () => {
  const { tabKey, setTabKey } = useTabWithQuery({ queryKey: 'inbox' })

  // @ts-ignore
  // eslint-disable-next-line
  const { filter, setFilter } = useFilter({ ...new FeedbackListFilter() })

  const onTabChange = (tabKey: string) => {
    setTabKey(tabKey)
  }

  return (
    <>
      <PageHeader title="Feedbacks" />
      <Tabs
        defaultActiveKey={tabKey}
        onTabClick={onTabChange}
        items={[
          {
            key: 'inbox',
            label: `Inbox (${mockData.length})`,
            children: (
              <FeedbackInputTable
                data={mockData}
                // isLoading={isAllLoading}
                // onAfterAction={mutate}
              />
            ),
          },
          {
            key: 'sent',
            label: `Sent`,
            children: (
              <FeedbackInputTable
                data={[]}
                // isLoading={isPendingLoading}
                // onAfterAction={mutate}
              />
            ),
          },
          {
            key: 'draft',
            label: `Draft (4)`,
            children: (
              <FeedbackInputTable
                data={mockData}
                // isLoading={isInactiveLoading}
                // onAfterAction={mutate}
              />
            ),
          },
        ]}
      />
    </>
  )
}

export default Default
