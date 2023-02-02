import { Card, Col, Input, Row, Select } from 'antd'
import { ViewBasicEmployeeInfo } from 'types/schema'
import { WorkUnitDistributionChart } from './WorkUnitDistributionChart'

interface RecordType {
  id?: string
  employee?: ViewBasicEmployeeInfo
  development?: number
  management?: number
  training?: number
  learning?: number
}

const data: RecordType[] = [
  {
    id: '1',
    employee: {
      id: 'd675dfc5-acbe-4566-acde-f7cb132c0206',
      fullName: 'Le Nguyen An Khang',
      displayName: 'Khang Le',
      avatar:
        'https://s3-ap-southeast-1.amazonaws.com/fortress-images/4368900905892223171.png',
      username: 'khanglna',
    },
    development: 20,
    management: 15,
    training: 25,
    learning: 15,
  },
  {
    id: '2',
    employee: {
      id: '061820c0-bf6c-4b4a-9753-875f75d71a2c',
      fullName: 'Vong Tieu Hung',
      displayName: 'Hung Vong',
      avatar:
        'https://s3-ap-southeast-1.amazonaws.com/fortress-images/5762098830282049280.png',
      username: 'hungvt',
    },
    development: 25,
    management: 5,
    training: 0,
    learning: 0,
  },
  {
    id: '3',
    employee: {
      id: '7fbfb59b-e00e-46b2-85cd-64f9f9942daa',
      fullName: 'Phạm Văn Đạt',
      displayName: 'Dat Pham',
      avatar:
        'https://s3-ap-southeast-1.amazonaws.com/fortress-images/2774898538476441693.png',
      username: 'datpv',
    },
    development: 20,
    management: 0,
    training: 40,
    learning: 5,
  },
  {
    id: '4',
    employee: {
      id: 'd42a6fca-d3b8-4a48-80f7-a95772abda56',
      fullName: 'Nguyễn Xuân Trường',
      displayName: 'Truong Nguyen',
      avatar:
        'https://s3-ap-southeast-1.amazonaws.com/fortress-images/8690187460973853786.png',
      username: 'truongnx',
    },
    development: 20,
    management: 0,
    training: 0,
    learning: 10,
  },
  {
    id: '5',
    employee: {
      id: 'f7c6016b-85b5-47f7-8027-23c2db482197',
      fullName: 'Nguyen Van Duc',
      displayName: 'Duc Nguyen',
      avatar:
        'https://s3-ap-southeast-1.amazonaws.com/fortress-images/7227222220023148542.png',
      username: 'ducnv',
    },
    development: 23,
    management: 20,
    training: 30,
    learning: 15,
  },
]

const total = {
  development: 85,
  management: 24,
  training: 45,
  learning: 45,
}

export const WorkUnitDistribution = () => {
  return (
    <Card
      title="Work Unit Distribution"
      style={{ height: 500, display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ padding: 8, height: 500 }}
    >
      <Row gutter={10} style={{ marginBottom: 20 }}>
        <Col span={5}>
          <Select
            style={{ width: '100%' }}
            value="All"
            options={['All'].map((key) => {
              return {
                label: key,
                value: key,
              }
            })}
          />
        </Col>
        <Col span={5}>
          <Select
            style={{ width: '100%' }}
            value="Sort DESC"
            options={['Sort DESC'].map((key) => {
              return {
                label: key,
                value: key,
              }
            })}
          />
        </Col>
        <Col span={14} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Input
            placeholder="Search by name"
            className="bordered"
            style={{ maxWidth: 300 }}
          />
        </Col>
      </Row>
      <WorkUnitDistributionChart
        {...{ data, total }}
        data={[...data, ...data, ...data, ...data]}
      />
    </Card>
  )
}
