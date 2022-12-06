import { Col, Input, Pagination, Row, Space, Tag, Tooltip } from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import { useMemo } from 'react'
import Table, { ColumnsType } from 'antd/lib/table'
import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { EmployeeLink, ProjectLink } from 'components/common/DetailLink'
import { Button } from 'components/common/Button'
import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { ModelPosition, ViewEmployeeData, ViewStack } from 'types/schema'
import { useFilter } from 'hooks/useFilter'
import debounce from 'lodash.debounce'

const Default = () => {
  const { filter, setFilter } = useFilter(new EmployeeListFilter())
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.getEmployees, filter],
    () => client.getEmployees(filter),
  )
  const employees = data?.data || []

  const columns = useMemo(() => {
    return [
      {
        title: 'Employee',
        render: (value) => <AvatarWithName user={value} />,
        fixed: 'left',
      },
      {
        title: 'Discord',
        key: 'discordID',
        dataIndex: 'discordID',
        render: (value) => value || '-',
      },
      {
        title: 'Notion',
        key: 'notionID',
        dataIndex: 'notionID',
        render: (value) => value || '-',
      },
      {
        title: 'Email',
        key: 'teamEmail',
        dataIndex: 'teamEmail',
        render: (value) => (
          <a href={`mailto:${value}`} target="_blank" rel="noreferrer">
            {value}
          </a>
        ),
      },
      {
        title: 'Github',
        key: 'githubID',
        dataIndex: 'githubID',
        render: (value) =>
          value ? (
            <a
              href={`https://github.com/${value}`}
              target="_blank"
              rel="noreferrer"
            >
              {value}
            </a>
          ) : (
            '-'
          ),
      },
      {
        title: 'Positions',
        key: 'positions',
        dataIndex: 'positions',
        render: (value) => (
          <Space size={[0, 8]}>
            {value.map((position: ModelPosition) => (
              <Tag key={position.id}>{position.name}</Tag>
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
        title: 'Stacks',
        key: 'stacks',
        dataIndex: 'stacks',
        render: (value) => (
          <Space size={[0, 8]}>
            {value?.map((stack: ViewStack) => (
              <Tag key={stack.code}>{stack.name}</Tag>
            ))}
          </Space>
        ),
      },
      {
        title: '',
        key: 'actions',
        render: (value) => (
          <Row justify="end" gutter={[8, 8]}>
            <Col>
              <EmployeeLink id={value.id}>
                <Tooltip title="View Detail">
                  <Button
                    type="text-primary"
                    size="small"
                    icon={<EyeOutlined />}
                  />
                </Tooltip>
              </EmployeeLink>
            </Col>
            <Col>
              <Link href={ROUTES.EDIT_EMPLOYEE(value.id)}>
                <a>
                  <Tooltip title="Edit">
                    <Button
                      type="text-primary"
                      size="small"
                      icon={<EditOutlined />}
                    />
                  </Tooltip>
                </a>
              </Link>
            </Col>
          </Row>
        ),
        fixed: 'right',
      },
    ] as ColumnsType<ViewEmployeeData>
  }, [])

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        title="Employees"
        rightRender={
          <>
            <Col style={{ width: 256 }}>
              <Input
                placeholder="Search employees"
                bordered
                onChange={debounce(
                  (event) => console.log(event.target.value),
                  300,
                )}
              />
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
        loading={loading}
        dataSource={employees}
        columns={columns}
        rowKey={(row) => row.id as string}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <Row justify="end">
        <Pagination
          current={filter.page}
          onChange={(page) => setFilter({ page })}
          total={data?.total}
          pageSize={filter.size}
        />
      </Row>
    </Space>
  )
}

export default Default
