import { Pagination, Row, Space, Table, Tag } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { Button } from 'components/common/Button'
import { ColumnsType } from 'antd/lib/table'
import { ProgressColumn } from 'components/common/ProgressColumn'
import { Actions } from 'components/pages/feedbacks/peer-review/Actions'
import { statusColors } from 'constants/colors'
import { SurveyEventStatus, surveyEventStatuses } from 'constants/status'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { CreatePeerReviewModal } from 'components/pages/feedbacks/peer-review/CreatePeerReviewModal'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useFilter } from 'hooks/useFilter'
import { SurveyListFilter } from 'types/filters/SurveyListFilter'
import { FeedbackSubtype } from 'constants/feedbackTypes'
import { ViewSurvey } from 'types/schema'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'

interface ColumnProps {
  onAfterDelete: () => void
}

const columns = ({ onAfterDelete }: ColumnProps): ColumnsType<ViewSurvey> => [
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
    render: (value: SurveyEventStatus) => (
      <Tag color={statusColors[value]}>{surveyEventStatuses[value] || '-'}</Tag>
    ),
  },
  {
    title: '',
    render: (value: ViewSurvey) => (
      <Actions record={value} onAfterDelete={onAfterDelete} />
    ),
    fixed: 'right',
  },
]

const PeerReviewPage = () => {
  const {
    isOpen: isCreatePeerReviewModalOpen,
    onOpen: openCreatePeerReviewModal,
    onClose: closeCreatePeerReviewModal,
  } = useDisclosure()

  const { filter, setFilter } = useFilter(
    new SurveyListFilter(FeedbackSubtype.PEER_REVIEW),
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
      <SEO title="Feedbacks - Peer Review" />

      <Breadcrumb
        items={[
          {
            label: 'Feedbacks',
          },
          {
            label: 'Peer Review',
          },
        ]}
      />

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
          dataSource={data?.data || []}
          columns={columns({ onAfterDelete: mutateSurveys })}
          loading={loading}
          rowKey={(row) => row.id as string}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        <Row justify="end">
          <Pagination
            current={filter.page}
            onChange={(page) => setFilter({ page })}
            total={data?.total}
            pageSize={filter.size}
            hideOnSinglePage
          />
        </Row>

        <CreatePeerReviewModal
          isOpen={isCreatePeerReviewModalOpen}
          initialValues={{ quarter: 'q1,q2', year: 2022 }}
          onClose={closeCreatePeerReviewModal}
          onAfterSubmit={() => {
            mutateSurveys()
          }}
        />
      </Space>
    </>
  )
}

export default PeerReviewPage
