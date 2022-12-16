import { Pagination, Row, Space, Table, Tag } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { ProgressColumn } from 'components/common/ProgressColumn'
import { statusColors } from 'constants/colors'
import { SurveyEventStatus, surveyEventStatuses } from 'constants/status'
import { Actions } from 'components/pages/feedbacks/engagement/Actions'
import { CreateEngagementSurveyModal } from 'components/pages/feedbacks/engagement/CreateEngagementSurveyModal'
import { useDisclosure } from '@dwarvesf/react-hooks'

const mockData = [
  {
    id: '8a5bfedb-6e11-4f5c-82d9-2635cfcce3e2',
    title: 'Q1, 2022',
    type: 'survey',
    subtype: 'peer-review',
    status: 'in-progress',
    startDate: '2022-11-29T08:03:33.233262Z',
    endDate: '2023-05-29T08:03:33.233262Z',
    count: {
      total: 1,
      sent: 1,
      done: 0,
    },
  },
  {
    id: '26b52a9e-bdff-451e-9d37-7aa7695abace',
    title: 'Q2, 2022',
    type: 'survey',
    subtype: 'peer-review',
    status: 'draft',
    startDate: '2023-01-01T00:00:00Z',
    endDate: '2023-06-30T23:59:59Z',
    count: {
      total: 12,
      sent: 10,
      done: 5,
    },
  },
  {
    id: '6d97b658-9d40-4116-a809-e621203c8496',
    title: 'Q3, 2022',
    type: 'survey',
    subtype: 'peer-review',
    status: 'done',
    startDate: '2023-01-01T00:00:00Z',
    endDate: '2023-06-30T23:59:59Z',
    count: {
      total: 12,
      sent: 11,
      done: 1,
    },
  },
]

const columns: ColumnsType<any> = [
  {
    title: 'Time',
    key: 'title',
    dataIndex: 'title',
    render: (value) => value || '-',
    fixed: 'left',
  },
  {
    title: 'Count',
    render: (value) => (
      <ProgressColumn done={value.count?.done} total={value.count?.total} />
    ),
    width: '40%',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value: SurveyEventStatus) => (
      <Tag color={statusColors[value]}>{surveyEventStatuses[value] || '-'}</Tag>
    ),
  },
  {
    title: '',
    render: (value) => <Actions record={value} />,
    fixed: 'right',
  },
]

const EmployeeEngagementPage = () => {
  const {
    isOpen: isCreateEngagementSurveyModalOpen,
    onOpen: openCreateEngagementSurveyModal,
    onClose: closeCreateEngagementSurveyModal,
  } = useDisclosure()

  return (
    <>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader
          title="Employee engagement"
          rightRender={
            <Button type="primary" onClick={openCreateEngagementSurveyModal}>
              Create
            </Button>
          }
        />
        <Table
          dataSource={mockData || []}
          columns={columns}
          // loading={loading}
          rowKey={(row) => row.id as string}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        <Row justify="end">
          <Pagination
            current={1}
            onChange={() => {}}
            total={3}
            pageSize={20}
            hideOnSinglePage
          />
        </Row>
      </Space>

      <CreateEngagementSurveyModal
        isOpen={isCreateEngagementSurveyModalOpen}
        initialValues={{ quarter: 'q1', year: 2022 }}
        onClose={closeCreateEngagementSurveyModal}
        onAfterSubmit={() => {}}
      />
    </>
  )
}

export default EmployeeEngagementPage
