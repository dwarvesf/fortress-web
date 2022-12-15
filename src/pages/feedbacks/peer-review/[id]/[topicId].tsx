import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { PageHeader } from 'components/common/PageHeader'
import { statusColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import {
  EmployeePeerReviewStatus,
  employeePeerReviewStatuses,
} from 'constants/status'
import { useRouter } from 'next/router'
import React from 'react'
import {
  EmployeeRelationship,
  employeeRelationship,
} from 'constants/relationship'
import { EmployeePeerReviewsAction } from 'components/pages/feedbacks/peer-review/EmployeePeerReviewsAction'
import { client, GET_PATHS } from 'libs/apis'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { ViewPeerReviewer } from 'types/schema'

interface ColumnProps {
  onAfterDelete: () => void
}

const columns = ({
  onAfterDelete,
}: ColumnProps): ColumnsType<ViewPeerReviewer> => [
  {
    title: 'Reviewer',
    key: 'reviewer',
    dataIndex: 'reviewer',
    render: (value) => <AvatarWithName user={value} />,
    fixed: 'left',
  },
  {
    title: 'Relationship',
    key: 'relationship',
    dataIndex: 'relationship',
    render: (value) => employeeRelationship[value as EmployeeRelationship],
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value: EmployeePeerReviewStatus) => (
      <Tag color={statusColors[value]}>
        {employeePeerReviewStatuses[value] || '-'}
      </Tag>
    ),
  },
  {
    title: '',
    render: (value: ViewPeerReviewer) => (
      <EmployeePeerReviewsAction
        employeePeerReviewDetail={value}
        onAfterDelete={onAfterDelete}
      />
    ),
    fixed: 'right',
  },
]

const EmployeePeerReviewsPage = () => {
  const { query } = useRouter()

  const { data, loading, mutate } = useFetchWithCache(
    [GET_PATHS.getSurveyTopic(query.id as string, query.topicId as string)],
    () => client.getSurveyTopic(query.id as string, query.topicId as string),
  )

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        backHref={ROUTES.PEER_REVIEW_EVENT_DETAIL(query.id as string)}
        title={data?.data?.title}
      />
      <Table
        dataSource={data?.data?.participants || []}
        columns={columns({
          onAfterDelete: mutate,
        })}
        rowKey={(row) => row.eventReviewerID as string}
        pagination={false}
        scroll={{ x: 'max-content' }}
        loading={loading}
      />
    </Space>
  )
}

export default EmployeePeerReviewsPage