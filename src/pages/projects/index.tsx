import { Col, Input, Pagination, Row, Space, Tag, Tooltip } from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import Table, { ColumnsType } from 'antd/lib/table'
import Link from 'next/link'
import { AvatarArray } from 'components/common/AvatarArray'
import { ProjectAvatar, UserAvatar } from 'components/common/AvatarWithName'
import { ProjectLink } from 'components/common/DetailLink'
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
import { PreviewOpen } from '@icon-park/react'
import { SEO } from 'components/common/SEO'
import { ProjectStatus, projectStatuses } from 'constants/status'

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
          <ProjectLink id={value.id}>
            <Tooltip title="View Detail">
              <Button
                type="text-primary"
                size="small"
                icon={<PreviewOpen size={20} />}
              />
            </Tooltip>
          </ProjectLink>
        </Col>
        {/* <Col>
            <Link href={ROUTES.EDIT_PROJECT(value.id)}>
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
          </Col> */}
      </Row>
    ),
    fixed: 'right',
  },
]

const Default = () => {
  const { filter, setFilter } = useFilter(
    new ProjectListFilter({ status: ProjectStatus.ACTIVE }),
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
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
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
          columns={columns({ filter, projectStatusData })}
          rowKey={(row) => row.id || ''}
          pagination={false}
          scroll={{ x: 'max-content' }}
          onChange={(_, filters) => {
            setFilter({
              status: (filters.status?.[0] as string) || '',
            })
          }}
          className="shadowed"
        />
        <Row justify="end">
          <Pagination
            current={filter.page}
            onChange={(page) => setFilter({ page })}
            total={data?.total}
            pageSize={filter.size}
            hideOnSinglePage
          />
        </Row>
      </Space>
    </>
  )
}

export default Default
