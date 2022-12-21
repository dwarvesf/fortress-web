import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { UserAvatar } from 'components/common/AvatarWithName'
import { PageHeader } from 'components/common/PageHeader'
import { statusColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import {
  SurveyParticipantStatus,
  surveyParticipantStatuses,
} from 'constants/status'
import { useRouter } from 'next/router'
import React from 'react'
import { WorkAverage } from 'components/pages/feedbacks/work/WorkAverage'
import { WorkDetailActions } from 'components/pages/feedbacks/work/WorkDetailActions'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'
import { mockProjectNames, mockWorkData } from '.'

const columns: ColumnsType<any> = [
  {
    title: 'Employee',
    key: 'employee',
    render: (value) => <UserAvatar user={value} />,
    fixed: 'left',
  },
  {
    title: 'Project',
    key: 'projectName',
    dataIndex: 'projectName',
    filters: mockProjectNames.map((n) => ({
      value: n,
      text: n,
    })),
    onFilter: (value: any, record) => value === record.projectName,
  },
  {
    title: 'Result',
    key: 'result',
    dataIndex: 'result',
    render: (value) => (
      <Space>
        {value.map((d: any) => (
          <WorkAverage data={d} />
        ))}
      </Space>
    ),
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
    onFilter: (value: any, record) => value === record.workStatus,
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
    sorter: (a, b) => a.comments - b.comments,
    render: (value) => value.comments,
  },
  {
    title: '',
    render: (value) => <WorkDetailActions record={value} />,
    fixed: 'right',
  },
]

const EmployeePeerReviewsPage = () => {
  const { query } = useRouter()
  const currentData = mockWorkData.data.find((d) => d.id === query.id)

  return (
    <>
      <SEO title={`Work - ${currentData?.title || '-'}`} />

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
            label: currentData?.title,
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader backHref={ROUTES.WORK} title={currentData?.title} />
        <Table
          dataSource={currentData?.employees || []}
          columns={columns}
          rowKey={(row) => row.id as string}
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
      </Space>
    </>
  )
}

export default EmployeePeerReviewsPage
