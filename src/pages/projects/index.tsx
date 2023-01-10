import { Col, Input, Pagination, Row, Space, Tag, Tooltip } from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import Table, { ColumnsType } from 'antd/lib/table'
import Link from 'next/link'
import { AvatarArray } from 'components/common/AvatarArray'
import { ProjectAvatar, UserAvatar } from 'components/common/AvatarWithName'
import { Button } from 'components/common/Button'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { ViewMetaData, ViewProjectData, ViewProjectMember } from 'types/schema'
import { useFilter } from 'hooks/useFilter'
import debounce from 'lodash.debounce'
import { transformMetadataToFilterOption } from 'utils/select'
import { statusColors } from 'constants/colors'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { Icon } from '@iconify/react'
import { SEO } from 'components/common/SEO'
import { ProjectStatus, projectStatuses } from 'constants/status'
import { useRouter } from 'next/router'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Permission } from 'constants/permission'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'

interface ColumnProps {
  filter: ProjectListFilter
  projectStatusData: ViewMetaData[]
}

const columns = ({
  filter,
  projectStatusData,
}: ColumnProps): ColumnsType<ViewProjectData> => [
  {
    title: 'Name',
    render: (value) => <ProjectAvatar project={value} />,
    fixed: 'left',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    filterSearch: true,
    filterMultiple: false,
    filteredValue: filter.status ? [filter.status] : [],
    filters: projectStatusData
      .map(transformMetadataToFilterOption)
      .map(({ text, value = '' }) => ({
        text: <Tag color={statusColors[value]}>{text}</Tag>,
        value,
      })),
    render: (value?: ProjectStatus) =>
      value ? (
        <Tag color={statusColors[value]}>{projectStatuses[value]}</Tag>
      ) : (
        '-'
      ),
  },
  {
    title: 'Lead',
    key: 'technicalLeads',
    dataIndex: 'technicalLeads',
    render: (value) =>
      value && value.length ? <AvatarArray data={value} /> : '-',
  },
  {
    title: 'Members',
    key: 'members',
    dataIndex: 'members',
    render: (value) =>
      value &&
      value.filter(
        (e: ViewProjectMember) => e.avatar && e.displayName && e.employeeID,
      ).length ? (
        <AvatarArray
          data={value.filter(
            (e: ViewProjectMember) => e.avatar && e.displayName && e.employeeID,
          )}
        />
      ) : (
        '-'
      ),
  },
  {
    title: 'Delivery Manager',
    key: 'deliveryManager',
    dataIndex: 'deliveryManager',
    render: (value) => (value ? <UserAvatar user={value} /> : 'TBD'),
  },
  {
    title: 'Account Manager',
    key: 'accountManager',
    dataIndex: 'accountManager',
    render: (value) => (value ? <UserAvatar user={value} /> : 'TBD'),
  },
  {
    title: '',
    key: 'actions',
    render: (value) => (
      <Row justify="end" gutter={[8, 8]}>
        <Col>
          <Link href={ROUTES.PROJECT_DETAIL(value.code)}>
            <a>
              <Tooltip title="View Detail">
                <Button
                  type="text-primary"
                  size="small"
                  icon={
                    <Icon icon="icon-park-outline:preview-open" width={20} />
                  }
                />
              </Tooltip>
            </a>
          </Link>
        </Col>
      </Row>
    ),
    fixed: 'right',
  },
]

const Default = () => {
  const { query, push } = useRouter()
  const queryFilter = query.filter ? JSON.parse(query.filter as string) : {}

  const { filter, setFilter } = useFilter(
    new ProjectListFilter({ status: ProjectStatus.ACTIVE, ...queryFilter }),
    { shouldUpdateToQuery: true },
  )

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
  const projectStatusData = projectStatusMetadata?.data || []

  return (
    <>
      <SEO title="Projects" />

      <Breadcrumb
        items={[
          {
            label: 'Projects',
          },
        ]}
      />

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
              <AuthenticatedContent
                permission={Permission.PROJECTS_CREATE}
                as={Col}
              >
                <Link href={ROUTES.ADD_PROJECT}>
                  <a>
                    <Button type="primary">Add Project</Button>
                  </a>
                </Link>
              </AuthenticatedContent>
            </>
          }
        />
        <div>
          <TotalResultCount count={data?.total} />
          <Table
            loading={loading}
            dataSource={projects}
            columns={columns({ filter, projectStatusData })}
            rowKey={(row) => row.id || ''}
            pagination={false}
            scroll={{ x: 'max-content' }}
            onChange={(_, filters) => {
              setFilter({
                status: (filters.status?.[0] as string) || '',
              })
            }}
            onRow={(record) => ({
              onClick: (e) => {
                if (e.defaultPrevented) return
                push(ROUTES.PROJECT_DETAIL(record.code!))
              },
            })}
            className="shadowed"
          />
        </div>
        <Row justify="end">
          <Pagination
            current={filter.page}
            onChange={(page, pageSize) => setFilter({ page, size: pageSize })}
            total={data?.total}
            pageSize={filter.size}
            size="small"
            showSizeChanger
          />
        </Row>
      </Space>
    </>
  )
}

export default Default
