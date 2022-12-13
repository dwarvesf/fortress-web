import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import classNames from 'classnames'
import { statusColors } from 'constants/colors'
import { FeedbackType, feedbackTypes } from 'constants/feedbackTypes'
import { feedbackStatuses, ModelEventReviewerStatus } from 'constants/status'
import { useMemo } from 'react'
import { ViewFeedback } from 'types/schema'
import { Actions } from './Actions'

export const FeedbackInputTable = ({
  data,
  isLoading,
  onAfterAction,
}: {
  data: ViewFeedback[]
  isLoading?: boolean
  onAfterAction?: () => void
}) => {
  const columns = useMemo(() => {
    return [
      {
        title: 'Topic',
        key: 'topic',
        dataIndex: 'title',
        fixed: 'left',
      },
      {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
        render: (value: FeedbackType) => feedbackTypes[value],
      },
      // {
      //   title: 'Responses',
      //   key: 'responses',
      //   dataIndex: 'responses',
      // },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (value: ModelEventReviewerStatus) => (
          <Tag color={statusColors[value]}>{feedbackStatuses[value]}</Tag>
        ),
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
        render: (value) => value.displayName || '-',
      },
      {
        key: 'actions',
        render: (value) => (
          <Actions record={value} onAfterAction={onAfterAction} />
        ),
        fixed: 'right',
      },
    ] as ColumnsType<ViewFeedback>
  }, [onAfterAction])

  return (
    <Table
      loading={isLoading}
      rowKey={(row) => row.topicID || '-'}
      rowClassName={(row) =>
        classNames('inbox-row', { 'not-read': !row.isRead })
      }
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
