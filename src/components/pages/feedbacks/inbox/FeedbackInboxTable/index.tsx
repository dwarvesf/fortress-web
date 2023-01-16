import { Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import classNames from 'classnames'
import { statusColors } from 'constants/colors'
import { FeedbackType, feedbackTypes } from 'constants/feedbackTypes'
import { feedbackStatuses, ModelEventReviewerStatus } from 'constants/status'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { ViewFeedback } from 'types/schema'
import { DATETIME_FORMAT } from 'constants/date'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
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
  const { push } = useRouter()

  const columns = useMemo(() => {
    return [
      {
        title: 'Topic',
        key: 'topic',
        dataIndex: 'title',
        fixed: 'left',
        render: (value) => value || '-',
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
        render: (value) => format(new Date(value), DATETIME_FORMAT),
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
    <>
      <TotalResultCount count={(data || []).length} />

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
        onRow={(record) => ({
          onClick: (e) => {
            if (e.defaultPrevented) return
            push(
              `${ROUTES.FEEDBACK_INBOX_DETAIL(record.topicID!)}?type=${
                record.type
              }&subtype=${record.subtype}&eventID=${record.eventID}`,
            )
          },
        })}
      />
    </>
  )
}
