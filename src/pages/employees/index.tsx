import { Col, Input, Pagination, Row, Space, Tag } from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import { useMemo } from 'react'
import Table, { ColumnsType } from 'antd/lib/table'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { EmployeeLink, ProjectLink } from 'components/common/DetailLink'
import { Button } from 'components/common/Button'

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
          <a href={`mailto:${value}`} target="_blank" rel="noreferrer">
            {value}
          </a>
        ),
      },
      {
        title: 'Github',
        key: 'github',
        dataIndex: 'github',
        render: (value) => (
          // TODO: Add valid Github links
          <a href="/" target="_blank" rel="noreferrer">
            {value}
          </a>
        ),
      },
      {
        title: 'Roles',
        key: 'roles',
        dataIndex: 'roles',
        render: (value) => (
          <Space size={[0, 8]}>
            {value.map((role: any) => (
              <Tag key={role}>{role}</Tag>
            ))}
          </Space>
        ),
      },
      {
        title: 'Projects',
        key: 'projects',
        dataIndex: 'projects',
        render: (value) => (
          <Space size={[0, 8]}>
            {value.map((project: any) => (
              <ProjectLink key={project.id} id={project.id}>
                <Tag>{project.name}</Tag>
              </ProjectLink>
            ))}
          </Space>
        ),
      },
      {
        title: 'Skillset',
        key: 'skillset',
        dataIndex: 'skillset',
        render: (value) => (
          <Space size={[0, 8]}>
            {value.map((skill: any) => (
              <Tag key={skill}>{skill}</Tag>
            ))}
          </Space>
        ),
      },
      {
        title: '',
        key: 'action',
        render: (value) => (
          <Row justify="end" gutter={[8, 8]}>
            <Col>
              <EmployeeLink id={value.id}>
                <Button
                  type="text-primary"
                  size="small"
                  icon={<EyeOutlined />}
                />
              </EmployeeLink>
            </Col>
            <Col>
              <Link href={ROUTES.EDIT_EMPLOYEE(value.id)}>
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
