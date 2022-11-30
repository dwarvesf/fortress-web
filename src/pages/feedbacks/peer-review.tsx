import { Pagination, Row, Space, Table } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { StatusColumn } from 'components/pages/PeerReview/StatusColumn'
import { ActionColumn } from 'components/pages/PeerReview/ActionColumn'

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
    status: 'Draft',
    totalCompletedSurveys: 0,
    totalParticipants: 50,
  },
  {
    id: '2',
    time: 'Q2/Q3, 2022',
    status: 'In progress',
    totalCompletedSurveys: 50,
    totalParticipants: 50,
  },
  {
    id: '3',
    time: 'Q1/Q2, 2022',
    status: 'Done',
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
    width: '25%',
  },
  {
    title: 'Done',
    key: 'done',
    dataIndex: 'done',
    render: (_, record) => <StatusColumn record={record} />,
    width: '30%',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value) => value || '-',
    width: '25%',
  },
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: () => <ActionColumn />,
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
