import { Pagination, Row, Space, Table /*Tag*/, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { UserAvatar } from 'components/common/AvatarWithName'
import { PageHeader } from 'components/common/PageHeader'
import { ROUTES } from 'constants/routes'
// import { statusColors } from 'constants/colors'
// import {
//   SurveyParticipantStatus,
//   surveyParticipantStatuses,
// } from 'constants/status'
// import { WorkAverage } from 'components/pages/feedbacks/work/WorkAverage'
import React from 'react'
import { WorkDetailActions } from 'components/pages/feedbacks/work/WorkDetailActions'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { GET_PATHS, client } from 'libs/apis'
import { SurveyDetailFilter } from 'types/filters/SurveyDetailFilter'
import { useRouter } from 'next/router'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { ViewTopic } from 'types/schema'
import { statusColors } from 'constants/colors'
import {
  SurveyParticipantStatus,
  surveyParticipantStatuses,
} from 'constants/status'

const EmployeePeerReviewsPage = () => {
  const { data: projectsData } = useFetchWithCache(
    [GET_PATHS.getProjects, 'toggle-projects-to-send-survey'],
    () => client.getProjects(new ProjectListFilter()),
  )

  const columns: ColumnsType<ViewTopic> = [
    {
      title: 'Employee',
      key: 'employee',
      dataIndex: 'employee',
      render: (value) =>
        value.displayName ? (
          <UserAvatar
            user={{
              id: value.id,
              avatar: value.avatar,
              displayName: value.displayName,
              fullName: value.fullName,
            }}
          />
        ) : (
          'TBD'
        ),
      fixed: 'left',
    },
    {
      title: 'Project',
      key: 'project',
      dataIndex: 'project',
      filters: (projectsData?.data || []).map((p) => ({
        value: p.id!,
        text: p.name,
      })),
      onFilter: (value, record) => value === record?.project?.id,
      render: (value) => value.name,
    },
    {
      title: 'Workload',
      key: 'workload',
      dataIndex: 'domains',
      // render: (value) => (
      //   <WorkAverage domain="workload" record={value[0] || {}} />
      // ),
    },
    {
      title: 'Deadline',
      key: 'deadline',
      dataIndex: 'domains',
      // render: (value) => (
      //   <WorkAverage domain="deadline" record={value[1] || {}} />
      // ),
    },
    {
      title: 'Learning',
      key: 'learning',
      dataIndex: 'domains',
      // render: (value) => (
      //   <WorkAverage domain="learning" record={value[2] || {}} />
      // ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'workStatus',
      filterMultiple: false,
      filters: Object.values(SurveyParticipantStatus).map((s) => ({
        value: s,
        text: <Tag color={statusColors[s]}>{surveyParticipantStatuses[s]}</Tag>,
      })),
      // onFilter: (value: any, record) => value === record.workStatus,
      // render: (value: SurveyParticipantStatus) =>
      //   value ? (
      //     <Tag color={statusColors[value]}>
      //       {surveyParticipantStatuses[value]}
      //     </Tag>
      //   ) : (
      //     '-'
      //   ),
    },
    {
      title: 'Comments',
      key: 'comments',
      sorter: (a, b) => a.comments! - b.comments!,
      render: (value) => value.comments,
    },
    {
      title: '',
      render: (value) => <WorkDetailActions record={value} />,
      fixed: 'right',
    },
  ]

  const { query } = useRouter()

  const workSurveyId = query.id as string

  const { filter, setFilter } = useFilter(new SurveyDetailFilter())
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.getSurveyDetail(workSurveyId), workSurveyId, filter],
    () => client.getSurveyDetail(workSurveyId, filter),
  )

  return (
    <>
      <SEO title={`Work - ${data?.data?.title || '-'}`} />

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
            href: ROUTES.WORK,
          },
          {
            label: data?.data?.title || '-',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader backHref={ROUTES.WORK} title={data?.data?.title || '-'} />
        <Table
          dataSource={data?.data?.topics || []}
          columns={columns}
          rowKey={(row) => row.id as string}
          pagination={false}
          scroll={{ x: 'max-content' }}
          loading={loading}
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
      </Space>
    </>
  )
}

export default EmployeePeerReviewsPage
