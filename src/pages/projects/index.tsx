import { Col, Input, Pagination, Row, Space, Tag } from 'antd'
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
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { ViewProjectData } from 'types/schema'
import { useFilter } from 'hooks/useFilter'
import debounce from 'lodash.debounce'
import { transformMetadataToFilterOption } from 'utils/select'
import { statusColors } from 'constants/colors'

const Default = () => {
  const { filter, setFilter } = useFilter(new ProjectListFilter())
  const { data, loading } = useFetchWithCache(
    [GET_PATHS.getProjects, filter],
    () => client.getProjects(filter),
  )
  const projects = data?.data || []

  const { data: projectStatusMetadata } = useFetchWithCache(
    [GET_PATHS.getProjectStatusMetadata],
    () => client.getProjectStatusMetadata(),
    {
      revalidateOnFocus: false,
    },
  )
  const projectStatuses = projectStatusMetadata?.data || []

  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        render: (value) => (
          <ProjectLink id={value.id}>{value.name}</ProjectLink>
        ),
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        filterMultiple: false,
        filters: projectStatuses
          .map(transformMetadataToFilterOption)
          .map(({ text, value = '' }) => ({
            text: <Tag color={statusColors[value]}>{text}</Tag>,
            value,
          })),
        render: (value) => (
          <Tag color={statusColors[value]}>{capitalizeFirstLetter(value)}</Tag>
        ),
      },
      {
        title: 'Lead',
        key: 'technicalLeads',
        dataIndex: 'technicalLeads',
        render: (value) => <AvatarArray data={value} />,
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
        render: (value) => (value ? <AvatarWithName user={value} /> : '-'),
      },
      {
        title: 'Account Manager',
        key: 'accountManager',
        dataIndex: 'accountManager',
        render: (value) => (value ? <AvatarWithName user={value} /> : '-'),
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
    ] as ColumnsType<ViewProjectData>
  }, [JSON.stringify({ projectStatuses, setFilter })]) // eslint-disable-line

  return (
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <PageHeader
        title="Projects"
        rightRender={
          <>
            <Col style={{ width: 256 }}>
              <Input
                placeholder="Search projects"
                bordered
                onChange={debounce(
                  (event) =>
                    setFilter({
                      name: event.target.value,
                    }),
                  300,
                )}
              />
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
        loading={loading}
        dataSource={projects}
        columns={columns}
        rowKey={(row) => row.id || ''}
        pagination={false}
        scroll={{ x: 'max-content' }}
        onChange={(_, filters) => {
          setFilter({
            status: (filters.status?.[0] as string) || '',
          })
        }}
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
