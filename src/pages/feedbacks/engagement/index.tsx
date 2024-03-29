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
import { FeedbackSubtype } from 'constants/feedbackTypes'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { GET_PATHS, client } from 'libs/apis'
import { SurveyListFilter } from 'types/filters/SurveyListFilter'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'
import { ViewSurvey } from 'types/schema'
import { ROUTES } from 'constants/routes'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Permission } from 'constants/permission'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
import { useMouseDown } from 'hooks/useMouseDown'

const columns: ColumnsType<ViewSurvey> = [
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
  const { openLink } = useMouseDown()

  const {
    isOpen: isCreateEngagementSurveyModalOpen,
    onOpen: openCreateEngagementSurveyModal,
    onClose: closeCreateEngagementSurveyModal,
  } = useDisclosure()

  const { filter, setFilter } = useFilter(
    new SurveyListFilter(FeedbackSubtype.ENGAGEMENT),
  )
  const {
    data,
    loading,
    mutate: mutateSurveys,
  } = useFetchWithCache([GET_PATHS.getSurveys, filter], () =>
    client.getSurveys(filter),
  )

  return (
    <>
      <SEO title="Feedbacks - Engagement" />

      <Breadcrumb
        items={[
          {
            label: 'Feedbacks',
          },
          {
            label: 'Engagement',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader
          title="Employee engagement"
          rightRender={
            <AuthenticatedContent permission={Permission.SURVEYS_CREATE}>
              <Button type="primary" onClick={openCreateEngagementSurveyModal}>
                Create
              </Button>
            </AuthenticatedContent>
          }
        />

        <div>
          <TotalResultCount
            count={(data?.data || []).length}
            permission={Permission.PROJECTS_CREATE}
          />

          <Table
            dataSource={data?.data || []}
            columns={columns}
            loading={loading}
            rowKey={(row) => row.id as string}
            pagination={false}
            scroll={{ x: 'max-content' }}
            onRow={(record) => ({
              onClick: openLink(ROUTES.EMPLOYEE_ENGAGEMENT_DETAIL(record.id!)),
              onAuxClick: openLink(
                ROUTES.EMPLOYEE_ENGAGEMENT_DETAIL(record.id!),
              ),
            })}
          />
        </div>

        <Row justify="end">
          <Pagination
            current={filter.page}
            onChange={(page, pageSize) => setFilter({ page, size: pageSize })}
            total={data?.total}
            pageSize={filter.size}
            size="small"
            showSizeChanger
          />
        </Row>
      </Space>

      <CreateEngagementSurveyModal
        isOpen={isCreateEngagementSurveyModalOpen}
        initialValues={{ quarter: 'q1', year: 2022 }}
        onClose={closeCreateEngagementSurveyModal}
        onAfterSubmit={mutateSurveys}
      />
    </>
  )
}

export default EmployeeEngagementPage
