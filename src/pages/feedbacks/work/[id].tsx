import { Button, Pagination, Row, Space, Table, Tag, Tooltip } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ProjectAvatar, UserAvatar } from 'components/common/AvatarWithName'
import { PageHeader } from 'components/common/PageHeader'
import { ROUTES } from 'constants/routes'
import { statusColors } from 'constants/colors'
import {
  SurveyParticipantStatus,
  surveyParticipantStatuses,
} from 'constants/status'
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
import { ViewDomain, ViewTopic } from 'types/schema'
import { AgreementLevel } from 'constants/agreementLevel'
import { getWorkSurveyDetailReview } from 'utils/level'
import { DomainTypes } from 'constants/feedbackTypes'
import { WorkAverageIcon } from 'components/pages/feedbacks/work'
import { mapScoreToLikertScale } from 'utils/score'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
import { Permission } from 'constants/permission'
import { workSurveys } from 'constants/workSurveys'
import { fullListPagination } from 'types/filters/Pagination'

const renderDomainAverageResult = (
  record: ViewDomain[],
  index: number,
  domain: DomainTypes,
) => {
  const domainAverageResult = getWorkSurveyDetailReview(record[index].count!)

  const workAverageRender = (
    <Button
      style={{
        padding: 0,
        height: 'max-content',
        background: 'none',
        border: 'none',
        borderRadius: '50%',
      }}
    >
      <WorkAverageIcon
        backgroundColor={`${
          workSurveys[domain][
            mapScoreToLikertScale(record[index]?.average || 0)
          ].background
        }`}
        textColor={`${
          workSurveys[domain][
            mapScoreToLikertScale(record[index]?.average || 0)
          ].text
        }`}
        point={record[index]?.average || 0}
      />
    </Button>
  )

  return domainAverageResult ? (
    <Tooltip
      title={workSurveys[domain][domainAverageResult as AgreementLevel].name}
    >
      {workAverageRender}
    </Tooltip>
  ) : (
    workAverageRender
  )
}

const Default = () => {
  const { query } = useRouter()
  const workSurveyId = query.id as string
  const queryFilter = query.filter ? JSON.parse(query.filter as string) : {}

  const { filter, setFilter } = useFilter(
    new SurveyDetailFilter({
      ...queryFilter,
    }),
  )
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.getSurveyDetail(workSurveyId), workSurveyId, filter],
    () => client.getSurveyDetail(workSurveyId, filter),
  )

  const { data: projectsData } = useFetchWithCache(
    [GET_PATHS.getProjects],
    () =>
      client.getProjects({ ...new ProjectListFilter(), ...fullListPagination }),
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
              username: value.username,
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
      key: 'projects',
      dataIndex: 'project',
      filterSearch: true,
      filteredValue: filter.projects,
      filters: (projectsData?.data || []).map((p) => ({
        text: p.name,
        value: p.code!,
      })),
      render: (value) => <ProjectAvatar project={value} />,
    },
    {
      title: 'Workload',
      key: 'workload',
      dataIndex: 'domains',
      render: (value) => renderDomainAverageResult(value, 0, 'workload'),
    },
    {
      title: 'Deadline',
      key: 'deadline',
      dataIndex: 'domains',
      render: (value) => renderDomainAverageResult(value, 1, 'deadline'),
    },
    {
      title: 'Learning',
      key: 'learning',
      dataIndex: 'domains',
      render: (value) => renderDomainAverageResult(value, 2, 'learning'),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      filterSearch: true,
      filterMultiple: false,
      filters: Object.values(SurveyParticipantStatus).map((s) => ({
        value: s,
        text: <Tag color={statusColors[s]}>{surveyParticipantStatuses[s]}</Tag>,
      })),
      filteredValue: filter.status ? [filter.status] : [],
      render: (value: SurveyParticipantStatus) =>
        value ? (
          <Tag color={statusColors[value]}>
            {surveyParticipantStatuses[value]}
          </Tag>
        ) : (
          '-'
        ),
    },
    {
      title: 'Comments',
      key: 'comments',
      sorter: true,
      render: (value) => value.comments,
    },
    {
      title: '',
      render: (value) => <WorkDetailActions record={value} />,
      fixed: 'right',
    },
  ]

  return (
    <>
      <SEO title={`Work - ${data?.data?.title || '-'}`} />

      <Breadcrumb
        items={[
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

        <div>
          <TotalResultCount
            count={(data?.data?.topics || []).length}
            permission={Permission.PROJECTS_CREATE}
          />

          <Table
            dataSource={data?.data?.topics || []}
            columns={columns}
            rowKey={(row) => row.id as string}
            pagination={false}
            scroll={{ x: 'max-content' }}
            loading={loading}
            onChange={(_, filters, sorter: any) => {
              setFilter({
                ...filters,
                status: (filters.status?.[0] as string) || '',
                sort: sorter.order
                  ? `${sorter.order === 'ascend' ? '+' : '-'}${
                      sorter.columnKey
                    }`
                  : null,
              })
            }}
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
    </>
  )
}

export default Default
