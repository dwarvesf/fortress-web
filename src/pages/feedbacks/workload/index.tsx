import { Space, Table } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { ProgressColumn } from 'components/pages/feedbacks/peer-review/ProgressColumn'
import { Actions } from 'components/pages/feedbacks/workload'
import { SettingFilled } from '@ant-design/icons'
import { theme } from 'styles'
import { WorkloadAverage } from 'components/pages/feedbacks/workload/WorkloadAverage'
import { WorkloadAverageStatus } from 'constants/status'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { ToggleSendSurveysModal } from 'components/pages/feedbacks/workload/ToggleSendSurveysModal'

const mockWorkloadAverageData = [
  {
    title: 'Development',
    average: WorkloadAverageStatus.ALL_BORING_STUFF,
  },
  { title: 'Management', average: WorkloadAverageStatus.FEW_THINGS },
  { title: 'Learning', average: WorkloadAverageStatus.NOTHING_NEW },
  { title: 'Training', average: WorkloadAverageStatus.A_LOT },
]

const mockWorkloadData = {
  page: 1,
  size: 20,
  sort: '',
  total: 1,
  data: [
    {
      id: '1',
      title: 'Dec 23, 2022',
      type: 'survey',
      subtype: 'peer-review',
      status: 'in-progress',
      average: mockWorkloadAverageData,
      startDate: '2022-11-29T08:03:33.233262Z',
      endDate: '2023-05-29T08:03:33.233262Z',
      count: {
        total: 50,
        done: 50,
      },
    },
    {
      id: '2',
      title: 'Dec 16, 2022',
      type: 'survey',
      subtype: 'peer-review',
      status: 'in-progress',
      average: mockWorkloadAverageData,
      startDate: '2022-11-29T08:03:33.233262Z',
      endDate: '2023-05-29T08:03:33.233262Z',
      count: {
        total: 50,
        done: 0,
      },
    },
    {
      id: '3',
      title: 'Dec 09, 2022',
      type: 'survey',
      subtype: 'peer-review',
      status: 'in-progress',
      average: mockWorkloadAverageData,
      startDate: '2022-11-29T08:03:33.233262Z',
      endDate: '2023-05-29T08:03:33.233262Z',
      count: {
        total: 50,
        done: 25,
      },
    },
  ],
}

const columns: ColumnsType<any> = [
  {
    title: 'Time',
    key: 'title',
    dataIndex: 'title',
    render: (value) => value || '-',
    fixed: 'left',
  },
  {
    title: 'Done',
    render: (value) => (
      <ProgressColumn done={value.count?.done} total={value.count?.total} />
    ),
    width: '40%',
  },
  {
    title: 'Average',
    key: 'average',
    dataIndex: 'average',
    render: (value) => (
      <Space>
        {value.map((d: any) => (
          <WorkloadAverage data={d} />
        ))}
      </Space>
    ),
  },
  {
    title: '',
    render: (value) => <Actions record={value} />,
    fixed: 'right',
  },
]

const WorkloadPage = () => {
  const {
    isOpen: isToggleSendSurveyDialogOpen,
    onOpen: openToggleSendSurveyDialog,
    onClose: closeToggleSendSurveyDialog,
  } = useDisclosure()

  return (
    <>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader
          title="Work"
          rightRender={
            <Button
              type="primary"
              style={{ background: theme.colors.gray600, border: 'none' }}
              onClick={openToggleSendSurveyDialog}
            >
              <SettingFilled />
            </Button>
          }
        />
        <Table
          dataSource={mockWorkloadData.data || []}
          columns={columns}
          rowKey={(row) => row.id as string}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Space>

      <ToggleSendSurveysModal
        onClose={closeToggleSendSurveyDialog}
        isOpen={isToggleSendSurveyDialogOpen}
      />
    </>
  )
}

export default WorkloadPage
