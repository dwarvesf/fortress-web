import { Pagination, Row, Space, Table, Tag } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { ProgressColumn } from 'components/pages/feedbacks/peer-review/ProgressColumn'
import { Actions } from 'components/pages/feedbacks/peer-review/Actions'
import { statusColors } from 'constants/colors'
import { PeerReviewStatus, peerReviewStatuses } from 'constants/status'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { CreatePeerReviewModal } from 'components/pages/feedbacks/peer-review/CreatePeerReviewModal'

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
    status: PeerReviewStatus.DRAFT,
    totalCompletedSurveys: 0,
    totalParticipants: 50,
  },
  {
    id: '2',
    time: 'Q2/Q3, 2022',
    status: PeerReviewStatus.INPROGRESS,
    totalCompletedSurveys: 50,
    totalParticipants: 50,
  },
  {
    id: '3',
    time: 'Q1/Q2, 2022',
    status: PeerReviewStatus.DONE,
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
    render: (value: PeerReviewData) => (
      <ProgressColumn
        done={value.totalCompletedSurveys}
        total={value.totalParticipants}
      />
    ),
    width: '40%',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value: PeerReviewStatus) => (
      <Tag color={statusColors[value]}>{peerReviewStatuses[value] || '-'}</Tag>
    ),
  },
  {
    title: '',
    key: 'actions',
    dataIndex: 'actions',
    render: (_, record) => <Actions record={record} />,
    fixed: 'right',
  },
]

const PeerReviewPage = () => {
  const {
    isOpen: isCreatePeerReviewModalOpen,
    onOpen: openCreatePeerReviewModal,
    onClose: closeCreatePeerReviewModal,
  } = useDisclosure()

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        title="Peer performance review"
        rightRender={
          <Button type="primary" onClick={openCreatePeerReviewModal}>
            Create
          </Button>
        }
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

      <CreatePeerReviewModal
        isOpen={isCreatePeerReviewModalOpen}
        initialValues={{ quarters: 'Q1,Q2', year: 2022 }}
        onClose={closeCreatePeerReviewModal}
        onAfterSubmit={() => {}}
      />
    </Space>
  )
}

export default PeerReviewPage
