import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { Card, Col, Row, Table, Tabs } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { Button } from 'components/common/Button'
import { useMemo, useState } from 'react'

const mockData = [
  {
    id: 1,
    name: 'Jane Doe',
    roles: ['Fullstack', 'Lead'],
    seniority: 'Fresher',
    type: 'Fulltime',
    startDate: '10/02/2021',
    endDate: '10/02/2022',
  },
  {
    id: 2,
    name: 'Jane Doe',
    roles: ['Fullstack', 'Lead'],
    seniority: 'Fresher',
    type: 'Fulltime',
    startDate: '10/02/2021',
    endDate: '10/02/2022',
  },
]

const StaffTable = ({ data }: { data: any }) => {
  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: 'Roles',
        key: 'roles',
        dataIndex: 'roles',
        render: (value) => value.join(', '),
      },
      {
        title: 'Seniority',
        key: 'seniority',
        dataIndex: 'seniority',
      },
      {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
      },
      {
        title: 'Start Date',
        key: 'startDate',
        dataIndex: 'startDate',
      },
      {
        title: 'End Date',
        key: 'endDate',
        dataIndex: 'endDate',
      },
      {
        key: 'action',
        render: () => (
          <Row justify="end" gutter={[8, 8]}>
            <Col>
              <Button
                type="text-primary"
                size="small"
                icon={<EditOutlined />}
              />
            </Col>
            <Col>
              <Button
                type="text-primary"
                size="small"
                icon={<DeleteOutlined />}
              />
            </Col>
          </Row>
        ),
      },
    ] as ColumnsType<any>
  }, [])

  return (
    <Table
      rowKey={(row) => row.id}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}

export const Staff = () => {
  const [, setCurrentTabKey] = useState('')

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Tabs
        tabBarStyle={{ padding: '20px 20px 0' }}
        onTabClick={setCurrentTabKey}
        tabBarExtraContent={
          <Button type="primary" icon={<PlusCircleOutlined />}>
            Add New
          </Button>
        }
      >
        <Tabs.TabPane tab="All (20)" key="">
          <StaffTable data={mockData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Active (16)" key="active">
          <StaffTable data={mockData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Pending (2)" key="pending">
          <StaffTable data={mockData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Inactive (2)" key="inactive">
          <StaffTable data={mockData} />
        </Tabs.TabPane>
      </Tabs>
    </Card>
  )
}
