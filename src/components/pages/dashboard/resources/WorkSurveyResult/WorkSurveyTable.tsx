import { Button, Input, Popover, Row, Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { UserAvatar } from 'components/common/AvatarWithName'
import { WorkAverageIcon } from 'components/pages/feedbacks/work'
import { AgreementLevel } from 'constants/agreementLevel'
import { likertScalesColors } from 'constants/colors'
import { DomainTypes } from 'constants/feedbackTypes'
import {
  ViewBasicEmployeeInfo,
  ViewBasicProjectInfo,
  ViewEmployeeData,
} from 'types/schema'
import { renderDomainLevels } from 'utils/level'
import { mapScoreToLikertScale } from 'utils/score'

interface RecordType {
  id?: string
  employee?: ViewBasicEmployeeInfo
  data?: {
    date?: string
    projects?: {
      project?: ViewBasicProjectInfo
      score?: number
    }[]
  }[]
}

const columns = (
  domain: DomainTypes,
  dates: string[] = [],
): ColumnsType<RecordType> => [
  {
    title: 'Name',
    dataIndex: 'employee',
    key: 'employee',
    render: (value?: ViewEmployeeData) =>
      value ? <UserAvatar user={value} /> : '-',
    fixed: 'left',
  },
  ...dates.map((date) => ({
    title: date,
    render: (record: RecordType) => (
      <Space>
        {record.data
          ?.find((each) => each.date === date)
          ?.projects?.map((each) => (
            <Popover
              key={each.project?.id}
              placement="bottom"
              title={each.project?.name}
              content={
                <div>
                  <WorkAverageIcon
                    backgroundColor={
                      likertScalesColors[mapScoreToLikertScale(each.score || 0)]
                        .background
                    }
                    size={28}
                  />
                  <span style={{ marginLeft: 8 }}>
                    {
                      renderDomainLevels(domain)[
                        Object.values(AgreementLevel)[
                          each.score || 0
                        ] as AgreementLevel
                      ]
                    }
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
                  backgroundColor={
                    likertScalesColors[mapScoreToLikertScale(each.score || 0)]
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

const employee = {
  id: 'd675dfc5-acbe-4566-acde-f7cb132c0206',
  fullName: 'Le Nguyen An Khang',
  displayName: 'Khang Le',
  avatar:
    'https://s3-ap-southeast-1.amazonaws.com/fortress-images/4368900905892223171.png',
  username: 'khanglna',
}

const dataSource: RecordType[] = [
  {
    id: '1',
    employee,
    data: [
      {
        date: '23/01',
        projects: [{ project: { id: '1', name: 'Fortress' }, score: 2 }],
      },
      {
        date: '07/02',
        projects: [{ project: { id: '1', name: 'Fortress' }, score: 2 }],
      },
      {
        date: '21/02',
        projects: [{ project: { id: '1', name: 'Fortress' }, score: 2 }],
      },
      {
        date: '06/03',
        projects: [{ project: { id: '1', name: 'Fortress' }, score: 2 }],
      },
      {
        date: '23/03',
        projects: [{ project: { id: '1', name: 'Fortress' }, score: 2 }],
      },
    ],
  },
  {
    id: '2',
    employee,
    data: [
      {
        date: '23/01',
        projects: [{ project: { id: '1', name: 'Fortress' }, score: 4 }],
      },
      {
        date: '07/02',
        projects: [
          { project: { id: '1', name: 'Fortress' }, score: 2 },
          { project: { id: '2', name: 'iCrosschain' }, score: 3 },
        ],
      },
      {
        date: '21/02',
        projects: [
          { project: { id: '1', name: 'Fortress' }, score: 1 },
          { project: { id: '2', name: 'iCrosschain' }, score: 4 },
        ],
      },
      {
        date: '06/03',
        projects: [{ project: { id: '1', name: 'Fortress' }, score: 1 }],
      },
      {
        date: '23/03',
        projects: [{ project: { id: '1', name: 'Fortress' }, score: 2 }],
      },
    ],
  },
]

interface Props {
  domain: DomainTypes
}

export const WorkSurveyTable = ({ domain }: Props) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Row justify="end" style={{ padding: 8 }}>
        <Input
          placeholder="Search by name"
          className="bordered"
          style={{ maxWidth: 300 }}
        />
      </Row>
      <Table
        columns={columns(domain, ['23/01', '07/02', '21/02', '06/03', '23/03'])}
        dataSource={dataSource}
        rowKey={(row) => row.id || ''}
        pagination={false}
        scroll={{ x: 'max-content', y: 330 }}
      />
    </Space>
  )
}
