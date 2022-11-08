import {
  Button,
  Col,
  Input,
  Pagination,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import { useMemo } from 'react'
import Table, { ColumnsType } from 'antd/lib/table'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Default = () => {
  const mockData = [
    {
      name: 'Huy Tieu',
      discord: '0xlight#0209',
      email: 'huytq@d.foundation',
      github: 'tqhuy1991',
      roles: ['PM', 'Delivery'],
      projects: [
        {
          name: 'Droppii',
        },
        {
          name: 'Nghenhan',
        },
      ],
      skillset: ['PM', 'BA'],
    },
  ]

  const columns = useMemo(() => {
    return [
      {
        title: 'Employee',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: 'Discord',
        key: 'discord',
        dataIndex: 'discord',
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        render: (value) => (
          <Typography.Link
            href={`mailto:${value}`}
            target="_blank"
            rel="noreferrer"
            underline
          >
            {value}
          </Typography.Link>
        ),
      },
      {
        title: 'Github',
        key: 'github',
        dataIndex: 'github',
        render: (value) => (
          <Typography.Link href="/" target="_blank" rel="noreferrer" underline>
            {value}
          </Typography.Link>
        ),
      },
      {
        title: 'Roles',
        key: 'roles',
        dataIndex: 'roles',
        render: (value) => (
          <Row gutter={[0, 8]}>
            {value.map((role: any) => (
              <Col>
                <Tag>{role}</Tag>
              </Col>
            ))}
          </Row>
        ),
      },
      {
        title: 'Projects',
        key: 'projects',
        dataIndex: 'projects',
        render: (value) => (
          <Row gutter={[0, 8]}>
            {value.map((project: any) => (
              <Col>
                <Link href="/">
                  <a>
                    <Tag>{project.name}</Tag>
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        ),
      },
      {
        title: 'Skillset',
        key: 'skillset',
        dataIndex: 'skillset',
        render: (value) => (
          <Row gutter={[0, 8]}>
            {value.map((skill: any) => (
              <Col>
                <Tag>{skill}</Tag>
              </Col>
            ))}
          </Row>
        ),
      },
      {
        title: '',
        key: 'action',
        render: () => (
          <Row justify="end" gutter={[8, 8]}>
            <Col>
              <Button type="text" size="small" icon={<EyeOutlined />} />
            </Col>
            <Col>
              <Button type="text" size="small" icon={<EditOutlined />} />
            </Col>
          </Row>
        ),
      },
    ] as ColumnsType<any>
  }, [])

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        title="Employees"
        rightRender={
          <>
            <Col style={{ width: 256 }}>
              <Input placeholder="Search members" bordered />
            </Col>
            <Col>
              <Button type="primary" href={ROUTES.ADD_EMPLOYEE}>
                Add Member
              </Button>
            </Col>
          </>
        }
      />
      <Table
        dataSource={mockData}
        columns={columns}
        rowKey={(row) => row.name}
        pagination={false}
      />
      <Row justify="end">
        <Pagination />
      </Row>
    </Space>
  )
}

export default Default
