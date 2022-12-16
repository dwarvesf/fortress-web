import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { PageHeader } from 'components/common/PageHeader'
import { statusColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import {
  PeerReviewSurveyStatus,
  peerReviewSurveyStatuses,
} from 'constants/status'
import { useRouter } from 'next/router'
import React from 'react'
import { WorkloadAverage } from 'components/pages/feedbacks/workload/WorkloadAverage'
import { WorkloadDetailActions } from 'components/pages/feedbacks/workload/WorkloadDetailActions'
import { mockWorkloadData } from '.'

const columns: ColumnsType<any> = [
  {
    title: 'Employee',
    key: 'employee',
    render: (value) => <AvatarWithName user={value} />,
    fixed: 'left',
  },
  {
    title: 'Project',
    key: 'projectName',
    dataIndex: 'projectName',
  },
  {
    title: 'Result',
    key: 'result',
    dataIndex: 'result',
    render: (value) => (
      <Space>
        {value.map((d: any) => (
          <WorkloadAverage data={d} />
        ))}
      </Space>
    ),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'workStatus',
    render: (value: PeerReviewSurveyStatus) => (
      <Tag color={statusColors[value]}>{peerReviewSurveyStatuses[value]}</Tag>
    ),
  },
  {
    title: 'Comments',
    key: 'comments',
    dataIndex: 'comments',
  },
  {
    title: '',
    render: (value) => <WorkloadDetailActions record={value} />,
    fixed: 'right',
  },
]

const EmployeePeerReviewsPage = () => {
  const { query } = useRouter()
  const currentData = mockWorkloadData.data.find((d) => d.id === query.id)

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader backHref={ROUTES.WORKLOAD} title={currentData?.title} />
      <Table
        dataSource={currentData?.employees || []}
        columns={columns}
        rowKey={(row) => row.id as string}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </Space>
  )
}

export default EmployeePeerReviewsPage
