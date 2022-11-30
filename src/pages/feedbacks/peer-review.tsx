import { Pagination, Row, Space, Table, Tag } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { ProgressColumn } from 'components/pages/PeerReview/ProgressColumn'
import { Actions } from 'components/pages/PeerReview/Actions'
import { statusColors } from 'constants/colors'
import { PeerReviewStatus, peerReviewStatuses } from 'constants/status'

export interface PeerReviewData {
  id?: string
  time?: string
  status?: string
  totalCompletedSurveys?: number
  totalParticipants?: number
}

const peerReviewData: PeerReviewData[] = [
  {
    id: '1',
    time: 'Q1/Q2, 2022',
    status: 'draft',
    totalCompletedSurveys: 0,
    totalParticipants: 50,
  },
  {
    id: '2',
    time: 'Q2/Q3, 2022',
    status: 'in-progress',
    totalCompletedSurveys: 50,
    totalParticipants: 50,
  },
  {
    id: '3',
    time: 'Q1/Q2, 2022',
    status: 'done',
    totalCompletedSurveys: 49,
    totalParticipants: 50,
  },
]

const columns: ColumnsType<PeerReviewData> = [
  {
    title: 'Time',
    key: 'time',
    dataIndex: 'time',
    render: (value) => value || '-',
    fixed: 'left',
  },
  {
    title: 'Done',
    key: 'done',
    dataIndex: 'done',
    render: (_, record) => <ProgressColumn record={record} />,
    width: '40%',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value) => (
      <Tag color={statusColors[value]}>
        {peerReviewStatuses[value as PeerReviewStatus] || '-'}
      </Tag>
    ),
  },
  {
    title: '',
    key: 'actions',
    dataIndex: 'actions',
    render: () => <Actions />,
    fixed: 'right',
  },
]

const PeerReviewPage = () => {
  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        title="Peer performance review"
        rightRender={<Button type="primary">Create</Button>}
      />
      <Table
        dataSource={peerReviewData}
        columns={columns}
        rowKey={(row) => row.id as string}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <Row justify="end">
        <Pagination current={1} onChange={() => {}} total={1} pageSize={10} />
      </Row>
    </Space>
  )
}

export default PeerReviewPage
