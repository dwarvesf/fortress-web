import { Button, Popover, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { UserAvatar } from 'components/common/AvatarWithName'
import { WorkAverageIcon } from 'components/pages/feedbacks/work'
import { AgreementLevel } from 'constants/agreementLevel'
import { DomainTypes } from 'constants/feedbackTypes'
import { workSurveys } from 'constants/workSurveys'
import {
  ViewBasicEmployeeInfo,
  ViewWorkSurveySummary,
  ViewWorkSurveySummaryEmployee,
} from 'types/schema'

const columns = (
  domain: DomainTypes,
  dates: string[] = [],
): ColumnsType<ViewWorkSurveySummaryEmployee> => [
  {
    title: 'Name',
    dataIndex: 'reviewer',
    key: 'reviewer',
    render: (value?: ViewBasicEmployeeInfo) =>
      value ? <UserAvatar user={value} /> : '-',
    fixed: 'left',
    width: 150,
  },
  ...dates.map((date) => ({
    title: date,
    width: 120,
    render: (record: ViewWorkSurveySummaryEmployee) => (
      <Space>
        {record.listAnswers
          ?.find((each) => each.date === date)
          ?.answers?.map((each) => (
            <Popover
              key={each.project?.id}
              placement="bottom"
              title={each.project?.name}
              content={
                <div>
                  <WorkAverageIcon
                    backgroundColor={
                      workSurveys[domain][each?.answer as AgreementLevel]
                        .background
                    }
                    size={24}
                  />
                  <span style={{ marginLeft: 8 }}>
                    {workSurveys[domain][each?.answer as AgreementLevel].name}
                  </span>
                </div>
              }
            >
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
                  size={24}
                  backgroundColor={
                    workSurveys[domain][each?.answer as AgreementLevel]
                      .background
                  }
                />
              </Button>
            </Popover>
          ))}
      </Space>
    ),
  })),
]

interface Props {
  domain: DomainTypes
  data?: ViewWorkSurveySummary
}

export const WorkSurveyTable = ({ domain, data }: Props) => {
  return (
    <Table
      columns={columns(domain, data?.dates)}
      dataSource={data?.data}
      rowKey={(row) => row.reviewer?.id || ''}
      pagination={false}
      scroll={{ x: 'max-content', y: 330 }}
    />
  )
}
