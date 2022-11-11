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
import { AvatarWithName } from 'components/common/AvatarWithName'

const Default = () => {
  const mockData = [
    {
      id: 1,
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
        render: (value) => <AvatarWithName user={value} />,
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
          // TODO: Add valid Github links
          <Typography.Link href="/" target="_blank" rel="noreferrer">
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
        render: (value) => (
          <Row justify="end" gutter={[8, 8]}>
            <Col>
              <Link href={ROUTES.EMPLOYEE_DETAIL(value.id)}>
                <a>
                  <Button type="text" size="small" icon={<EyeOutlined />} />
                </a>
              </Link>
            </Col>
            <Col>
              <Link href={ROUTES.EDIT_EMPLOYEE(value.id)}>
                <a>
                  <Button type="text" size="small" icon={<EditOutlined />} />
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
        title="Employees"
        rightRender={
          <>
            <Col style={{ width: 256 }}>
              <Input placeholder="Search members" bordered />
            </Col>
            <Col>
              <Link href={ROUTES.ADD_EMPLOYEE}>
                <a>
                  <Button type="primary">Add Employee</Button>
                </a>
              </Link>
            </Col>
          </>
        }
      />
      <Table
        dataSource={mockData}
        columns={columns}
        rowKey={(row) => row.name}
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
