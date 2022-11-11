import { Col, Input, Pagination, Row, Space } from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import { useMemo } from 'react'
import Table, { ColumnsType } from 'antd/lib/table'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { capitalizeFirstLetter } from 'utils/string'
import { AvatarArray } from 'components/common/AvatarArray'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { ProjectLink } from 'components/common/DetailLink'
import { Button } from 'components/common/Button'

const Default = () => {
  const mockData = [
    {
      id: 1,
      name: 'Fortress',
      status: 'active',
      lead: {
        id: 1,
        name: 'John Doe',
      },
      members: [
        {
          id: 1,
          name: 'Xx',
        },
        {
          id: 2,
          name: 'Yy',
        },
        {
          id: 3,
          name: 'Zz',
        },
        {
          id: 4,
          name: 'Tt',
        },
        {
          id: 5,
          name: 'Aa',
        },
      ],
      deliveryManager: {
        id: 1,
        name: 'John Doe',
      },
      accountManager: {
        id: 1,
        name: 'John Doe',
      },
    },
  ]

  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (value) => capitalizeFirstLetter(value),
      },
      {
        title: 'Lead',
        key: 'lead',
        dataIndex: 'lead',
        render: (value) => <AvatarWithName user={value} />,
      },
      {
        title: 'Members',
        key: 'members',
        dataIndex: 'members',
        render: (value) => <AvatarArray data={value} />,
      },
      {
        title: 'Delivery Manager',
        key: 'deliveryManager',
        dataIndex: 'deliveryManager',
        render: (value) => <AvatarWithName user={value} />,
      },
      {
        title: 'Account Manager',
        key: 'accountManager',
        dataIndex: 'accountManager',
        render: (value) => <AvatarWithName user={value} />,
      },
      {
        title: '',
        key: 'action',
        render: (value) => (
          <Row justify="end" gutter={[8, 8]}>
            <Col>
              <ProjectLink id={value.id}>
                <Button
                  type="text-primary"
                  size="small"
                  icon={<EyeOutlined />}
                />
              </ProjectLink>
            </Col>
            <Col>
              <Link href={ROUTES.EDIT_PROJECT(value.id)}>
                <a>
                  <Button
                    type="text-primary"
                    size="small"
                    icon={<EditOutlined />}
                  />
                </a>
              </Link>
            </Col>
          </Row>
        ),
      },
    ] as ColumnsType<any>
  }, [])

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        title="Projects"
        rightRender={
          <>
            <Col style={{ width: 256 }}>
              <Input placeholder="Search projects" bordered />
            </Col>
            <Col>
              <Link href={ROUTES.ADD_PROJECT}>
                <a>
                  <Button type="primary">Add Project</Button>
                </a>
              </Link>
            </Col>
          </>
        }
      />
      <Table
        dataSource={mockData}
        columns={columns}
        rowKey={(row) => row.id}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <Row justify="end">
        <Pagination />
      </Row>
    </Space>
  )
}

export default Default
