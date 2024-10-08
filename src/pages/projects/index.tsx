import { Icon } from '@iconify/react'
import { Col, Input, Pagination, Row, Space, Tag, Tooltip } from 'antd'
import Table, { ColumnType } from 'antd/lib/table'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { SimpleAvatarArray } from 'components/common/AvatarArray'
import { ProjectAvatar, UserAvatar } from 'components/common/AvatarWithName'
import { Button } from 'components/common/Button'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
import { statusColors } from 'constants/colors'
import { Permission } from 'constants/permission'
import { ProjectImportance, projectImportances } from 'constants/project'
import { ROUTES } from 'constants/routes'
import { ProjectStatus, projectStatuses } from 'constants/status'
import { useAuthContext } from 'context/auth'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { useMouseDown } from 'hooks/useMouseDown'
import { GET_PATHS, client } from 'libs/apis'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { theme } from 'styles'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { ViewMetaData, ViewProjectData, ViewProjectMember } from 'types/schema'
import { formatCurrency } from 'utils/currency'
import { transformMetadataToFilterOption } from 'utils/select'

interface ColumnProps {
  filter: ProjectListFilter
  projectStatusData: ViewMetaData[]
}

const columns = ({
  filter,
  projectStatusData,
}: ColumnProps): (ColumnType<ViewProjectData> & {
  permission?: string
})[] => [
  {
    title: 'Name',
    render: (value) => <ProjectAvatar project={value} />,
    fixed: 'left',
  },
  {
    title: 'Monthly Revenue',
    key: 'monthlyChargeRate',
    dataIndex: 'monthlyChargeRate',
    render: (value, record) =>
      value ? formatCurrency(value, { currency: record.currency?.name }) : '-',
    sorter: { multiple: 1 },
    permission: Permission.PROJECTS_READ_MONTHLYREVENUE,
  },
  {
    title: 'Important',
    key: 'importantLevel',
    dataIndex: 'importantLevel',
    render: (value?: ProjectImportance) =>
      value ? (
        <Tag color={statusColors[value]}>{projectImportances[value]}</Tag>
      ) : (
        '-'
      ),
    width: 110,
    sorter: { multiple: 2 },
    permission: Permission.PROJECTS_READ_FULLACCESS,
  },
  {
    title: 'Lead Rating',
    key: 'leadRating',
    dataIndex: 'leadRating',
    render: (value) => value || '-',
    width: 107,
    permission: Permission.PROJECTS_READ_FULLACCESS,
  },
  {
    title: 'Account Rating',
    key: 'accountRating',
    dataIndex: 'accountRating',
    render: (value) => value || '-',
    width: 135,
    permission: Permission.PROJECTS_READ_FULLACCESS,
  },
  {
    title: 'Delivery Rating',
    key: 'deliveryRating',
    dataIndex: 'deliveryRating',
    render: (value) => value || '-',
    width: 132,
    permission: Permission.PROJECTS_READ_FULLACCESS,
  },
  {
    title: 'PICs',
    key: 'pics',
    className: 'no-padding-td',
    render: (value?: ViewProjectData) => {
      const pics = Object.values(
        [
          ...(value?.technicalLeads || []),
          ...(value?.deliveryManagers || []),
          ...(value?.accountManagers || []),
          ...(value?.salePersons || []),
        ].reduce(
          (prev, curr) => ({
            ...prev,
            [String(curr.employeeID)]: curr,
          }),
          {},
        ),
      )
      return pics.length ? (
        <SimpleAvatarArray
          data={pics}
          wrapperStyle={{ width: '100%', padding: 16 }}
          tooltip={
            <Space
              direction="vertical"
              size="large"
              style={{
                color: theme.colors.black,
                padding: 10,
              }}
            >
              {[
                {
                  label: 'Lead',
                  data: value?.technicalLeads || [],
                },
                {
                  label: 'Delivery Managers',
                  data: value?.deliveryManagers || [],
                },
                {
                  label: 'Account Managers',
                  data: value?.accountManagers || [],
                },
                {
                  label: 'Sale Persons',
                  data: value?.salePersons || [],
                },
              ].map(
                ({ label, data }) =>
                  !!data.length && (
                    <div key={label}>
                      <div
                        style={{
                          color: '#8f8f8f',
                          fontSize: '80%',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          marginBottom: 7,
                        }}
                      >
                        {label}
                      </div>
                      <Space direction="vertical" style={{ padding: '0 10px' }}>
                        {data.map((each) => (
                          <Space key={`t${label}_${each.employeeID}`}>
                            <UserAvatar user={each} />
                            <AuthenticatedContent
                              permission={
                                Permission.PROJECTS_COMMISSIONRATE_READ
                              }
                            >
                              {`- ${each.finalCommissionRate}%`}
                            </AuthenticatedContent>
                          </Space>
                        ))}
                      </Space>
                    </div>
                  ),
              )}
            </Space>
          }
        />
      ) : (
        <div style={{ padding: 16 }}>TBD</div>
      )
    },
  },
  {
    title: 'Members',
    key: 'members',
    dataIndex: 'members',
    className: 'no-padding-td',
    render: (value?: ViewProjectMember[]) =>
      value?.length ? (
        <SimpleAvatarArray
          data={value}
          wrapperStyle={{ width: '100%', padding: 16 }}
          tooltip={
            <Space
              direction="vertical"
              style={{ color: theme.colors.black, padding: '10px 20px' }}
            >
              {value.map((each) => (
                <Space key={each.employeeID}>
                  <UserAvatar user={each} />
                  {each.isLead && '⭐'}
                </Space>
              ))}
            </Space>
          }
        />
      ) : (
        <div style={{ padding: 16 }}>-</div>
      ),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    filterSearch: true,
    filterMultiple: true,
    filteredValue: filter.status,
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
    permission: Permission.PROJECTS_READ_FULLACCESS,
  },
  {
    title: '',
    key: 'actions',
    render: (value) => (
      <Row
        justify="end"
        gutter={[8, 8]}
        onClick={(event) => {
          event.stopPropagation()
        }}
      >
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
  const { permissions } = useAuthContext()
  const { query } = useRouter()
  const queryFilter = query.filter ? JSON.parse(query.filter as string) : {}
  const { openLink } = useMouseDown()

  const { filter, setFilter } = useFilter(
    new ProjectListFilter({
      status: [ProjectStatus.ONBOARDING, ProjectStatus.ACTIVE],
      ...queryFilter,
    }),
    { shouldUpdateToQuery: true },
  )
  const debouncedSetFilter = useMemo(
    () => debounce(setFilter, 300),
    [setFilter],
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
                  defaultValue={filter.name || ''}
                  onChange={(event) =>
                    debouncedSetFilter({ name: event.target.value })
                  }
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
          <TotalResultCount
            count={data?.total}
            permission={Permission.PROJECTS_CREATE}
          />
          <Table
            loading={loading}
            dataSource={projects}
            columns={columns({ filter, projectStatusData }).flatMap(
              ({ permission, ...col }) =>
                permission && !permissions.includes(permission) ? [] : [col],
            )}
            rowKey={(row) => row.id || ''}
            pagination={false}
            scroll={{ x: 'max-content' }}
            onChange={(_, filters, sorter) => {
              const sorterResults = Array.isArray(sorter) ? sorter : [sorter]
              const sort = sorterResults
                .flatMap((each) =>
                  each.columnKey && each.order
                    ? [
                        {
                          ascend: `${each.columnKey}`,
                          descend: `-${each.columnKey}`,
                        }[each.order],
                      ]
                    : [],
                )
                .join(',')
              setFilter({
                status: (filters.status as string[]) || [],
                sort,
              })
            }}
            onRow={(record) => ({
              onClick: openLink(ROUTES.PROJECT_DETAIL(record.code!)),
              onAuxClick: openLink(ROUTES.PROJECT_DETAIL(record.code!)),
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
