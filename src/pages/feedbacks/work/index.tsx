import { Col, Pagination, Row, Space, Table } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { ProgressColumn } from 'components/common/ProgressColumn'
import { Actions } from 'components/pages/feedbacks/work'
import { WorkAverage } from 'components/pages/feedbacks/work/WorkAverage'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { ToggleSendSurveysModal } from 'components/pages/feedbacks/work/ToggleSendSurveysModal'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { ROUTES } from 'constants/routes'
import { Setting } from '@icon-park/react'
import { SEO } from 'components/common/SEO'
import { CreateWorkSurveyModal } from 'components/pages/feedbacks/work/CreateWorkSurveyModal'
import moment from 'moment'
import { FeedbackSubtype } from 'constants/feedbackTypes'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { GET_PATHS, client } from 'libs/apis'
import { SurveyListFilter } from 'types/filters/SurveyListFilter'
import { useState } from 'react'

// const mockWorkAverageData = [
//   {
//     name: 'workload',
//     average: 3,
//     count: {
//       'strongly-disagree': 1,
//       disagree: 5,
//       mixed: 3,
//       agree: 4,
//       'strongly-agree': 2,
//     },
//   },
//   {
//     name: 'deadline',
//     average: 2,
//     count: {
//       'strongly-disagree': 1,
//       disagree: 2,
//       mixed: 3,
//       agree: 4,
//       'strongly-agree': 0,
//     },
//   },
//   {
//     name: 'learning',
//     average: 0,
//     count: {
//       'strongly-disagree': 0,
//       disagree: 0,
//       mixed: 0,
//       agree: 0,
//       'strongly-agree': 0,
//     },
//   },
// ]

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
    title: 'Workload',
    key: 'workload',
    dataIndex: 'domains',

    render: (value) => (
      <WorkAverage domain="workload" record={value[0] || {}} />
    ),
  },
  {
    title: 'Deadline',
    key: 'deadline',
    dataIndex: 'domains',
    render: (value) => (
      <WorkAverage domain="deadline" record={value[1] || {}} />
    ),
  },
  {
    title: 'Learning',
    key: 'learning',
    dataIndex: 'domains',

    render: (value) => (
      <WorkAverage domain="learning" record={value[2] || {}} />
    ),
  },
  {
    title: '',
    render: (value) => <Actions record={value} />,
    fixed: 'right',
  },
]

const WorkPage = () => {
  const {
    isOpen: isToggleSendSurveyDialogOpen,
    onOpen: openToggleSendSurveyDialog,
    onClose: closeToggleSendSurveyDialog,
  } = useDisclosure()

  const {
    isOpen: isCreateWorkSurveyDialogOpen,
    onOpen: openCreateWorkSurveyDialog,
    onClose: closeCreateWorkSurveyDialog,
  } = useDisclosure()

  const [projectsToSend, setProjectsToSend] = useState<string[]>([])

  const { filter, setFilter } = useFilter(
    new SurveyListFilter(FeedbackSubtype.WORK),
  )

  const {
    data: surveysData,
    loading,
    mutate: mutateSurveys,
  } = useFetchWithCache([GET_PATHS.getSurveys, filter], () =>
    client.getSurveys(filter),
  )

  const today = new Date()

  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  return (
    <>
      <SEO title="Feedbacks - Work" />

      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
          {
            label: 'Feedbacks',
          },
          {
            label: 'Work',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader
          title="Work"
          rightRender={
            <>
              <Col>
                <Button type="primary" onClick={openCreateWorkSurveyDialog}>
                  Add event
                </Button>
              </Col>
              <Col>
                <Button type="default" onClick={openToggleSendSurveyDialog}>
                  <Setting size={24} />
                </Button>
              </Col>
            </>
          }
        />

        <Table
          dataSource={surveysData?.data || []}
          columns={columns}
          rowKey={(row) => row.id as string}
          scroll={{ x: 'max-content' }}
          loading={loading}
          pagination={false}
        />

        <Row justify="end">
          <Pagination
            current={filter.page}
            onChange={(page) => setFilter({ page })}
            total={surveysData?.total}
            pageSize={filter.size}
            size="small"
            hideOnSinglePage
          />
        </Row>
      </Space>

      <ToggleSendSurveysModal
        onClose={closeToggleSendSurveyDialog}
        isOpen={isToggleSendSurveyDialogOpen}
        setProjectsToSend={setProjectsToSend}
      />

      <CreateWorkSurveyModal
        onClose={closeCreateWorkSurveyDialog}
        isOpen={isCreateWorkSurveyDialogOpen}
        initialValues={{
          fromDate: moment(),
          toDate: moment(tomorrow),
        }}
        onAfterSubmit={mutateSurveys}
        projectsToSend={projectsToSend}
      />
    </>
  )
}

export default WorkPage
