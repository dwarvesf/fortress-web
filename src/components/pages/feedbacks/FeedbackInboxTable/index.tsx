import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { FeedbackType, feedbackTypes } from 'constants/feedbackTypes'
import { FeedbackInboxItem } from 'pages/feedbacks/inbox'
import { useMemo } from 'react'
import { Actions } from './Actions'

export const FeedbackInputTable = ({
  data,
  isLoading,
  onAfterAction,
}: {
  data: FeedbackInboxItem[]
  isLoading?: boolean
  onAfterAction?: () => void
}) => {
  const columns = useMemo(() => {
    return [
      {
        title: 'Topic',
        key: 'topic',
        dataIndex: 'topic',
        fixed: 'left',
      },
      {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
        render: (value: FeedbackType) => feedbackTypes[value],
      },
      {
        title: 'Responses',
        key: 'responses',
        dataIndex: 'responses',
      },
      {
        title: 'Last updated',
        key: 'lastUpdated',
        dataIndex: 'lastUpdated',
      },
      {
        title: 'Author',
        key: 'author',
        dataIndex: 'author',
      },
      {
        key: 'actions',
        render: (value) => (
          <Actions record={value} onAfterAction={onAfterAction} />
        ),
        fixed: 'right',
      },
    ] as ColumnsType<FeedbackInboxItem>
  }, [onAfterAction])

  return (
    <Table
      loading={isLoading}
      rowKey={(row) => row.id || '-'}
      rowClassName={(row) => (!row.read ? 'not-read' : '')}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
