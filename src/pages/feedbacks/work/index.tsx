import { Col, Pagination, Row, Space, Table } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { ProgressColumn } from 'components/common/ProgressColumn'
import { Actions } from 'components/pages/feedbacks/work'
import { WorkAverage } from 'components/pages/feedbacks/work/WorkAverage'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { ToggleAllowSendSurveyModal } from 'components/pages/feedbacks/work/ToggleAllowSendSurveyModal'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { Setting } from '@icon-park/react'
import { SEO } from 'components/common/SEO'
import { CreateWorkSurveyModal } from 'components/pages/feedbacks/work/CreateWorkSurveyModal'
import { FeedbackSubtype } from 'constants/feedbackTypes'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { GET_PATHS, client } from 'libs/apis'
import { SurveyListFilter } from 'types/filters/SurveyListFilter'
import Link from 'next/link'
import { ROUTES } from 'constants/routes'
import { ViewSurvey } from 'types/schema'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Permission } from 'constants/permission'

const columns: ColumnsType<ViewSurvey> = [
  {
    title: 'Time',
    key: 'title',
    dataIndex: 'title',
    render: (value, record) => (
      <Link href={ROUTES.WORK_DETAIL(record.id || '')}>
        <a className="styled">{value || '-'}</a>
      </Link>
    ),
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

  return (
    <>
      <SEO title="Feedbacks - Work" />

      <Breadcrumb
        items={[
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
              <AuthenticatedContent
                permission={Permission.SURVEYS_CREATE}
                as={Col}
              >
                <Button type="primary" onClick={openCreateWorkSurveyDialog}>
                  Add event
                </Button>
              </AuthenticatedContent>
              <AuthenticatedContent
                permission={Permission.PROJECTS_EDIT}
                as={Col}
              >
                <Button type="default" onClick={openToggleSendSurveyDialog}>
                  <Setting size={24} />
                </Button>
              </AuthenticatedContent>
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
            onChange={(page, pageSize) => setFilter({ page, size: pageSize })}
            total={surveysData?.total}
            pageSize={filter.size}
            size="small"
            showSizeChanger
          />
        </Row>
      </Space>

      <ToggleAllowSendSurveyModal
        onClose={closeToggleSendSurveyDialog}
        isOpen={isToggleSendSurveyDialogOpen}
      />

      <CreateWorkSurveyModal
        onClose={closeCreateWorkSurveyDialog}
        isOpen={isCreateWorkSurveyDialogOpen}
        onAfterSubmit={mutateSurveys}
      />
    </>
  )
}

export default WorkPage
