import { Pagination, Row, Space, Table, Tag } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { Actions } from 'components/pages/feedbacks/engagement/Actions'
import { statusColors } from 'constants/colors'
import { SurveyStatus, surveyStatuses } from 'constants/status'
import { ViewSurvey } from 'types/schema'
import { ProgressColumn } from 'components/common/ProgressColumn'

const data: ViewSurvey[] = [
  {
    id: '1',
    title: 'Q1, 2022',
    count: {
      done: 0,
      total: 50,
    },
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'Q2, 2021',
    count: {
      done: 50,
      total: 50,
    },
    status: 'done',
  },
  {
    id: '3',
    title: 'Q1, 2021',
    count: {
      done: 49,
      total: 50,
    },
    status: 'done',
  },
]

const columns: ColumnsType<ViewSurvey> = [
  {
    title: 'Time',
    key: 'title',
    dataIndex: 'title',
    render: (value) => value || '-',
    fixed: 'left',
  },
  {
    title: 'Done',
    render: (value: ViewSurvey) => (
      <ProgressColumn done={value.count?.done} total={value.count?.total} />
    ),
    width: '40%',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value: SurveyStatus) => (
      <Tag color={statusColors[value]}>{surveyStatuses[value] || '-'}</Tag>
    ),
  },
  {
    title: '',
    render: (value: ViewSurvey) => <Actions record={value} />,
    fixed: 'right',
  },
]

const EngagementPage = () => {
  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        title="Employee engagement"
        rightRender={<Button type="primary">Create</Button>}
      />
      <Table
        dataSource={data}
        columns={columns}
        loading={false}
        rowKey={(row) => row.id as string}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <Row justify="end">
        <Pagination
          current={1}
          onChange={() => {}}
          total={1}
          pageSize={20}
          hideOnSinglePage
        />
      </Row>
    </Space>
  )
}

export default EngagementPage
