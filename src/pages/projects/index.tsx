import { Col, Input, Pagination, Row, Space, Tag, Tooltip } from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import Table, { ColumnType } from 'antd/lib/table'
import Link from 'next/link'
import { SimpleAvatarArray } from 'components/common/AvatarArray'
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
import { useAuthContext } from 'context/auth'
import { useMouseDown } from 'hooks/useMouseDown'
import { formatCurrency } from 'utils/currency'
import { ProjectImportance, projectImportances } from 'constants/project'
import { theme } from 'styles'
import { StarTwoTone } from '@ant-design/icons'

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
    sorter: true,
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
    sorter: true,
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
                                Permission.MODEL_PERMISSIONPROJECTSCOMMISSIONRATEREAD
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
                  {each.isLead && <StarTwoTone twoToneColor="orange" />}
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
    filterMultiple: false,
    filteredValue: filter.status ? [filter.status].flat() : [],
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
              const sorterResult = Array.isArray(sorter) ? sorter[0] : sorter
              const sort =
                sorterResult.columnKey && sorterResult.order
                  ? {
                      ascend: `${sorterResult.columnKey}`,
                      descend: `-${sorterResult.columnKey}`,
                    }[sorterResult.order]
                  : undefined
              setFilter({
                status: (filters.status?.[0] as string) || '',
                sort,
              })
            }}
            onRow={(record) => ({
              onMouseDown: openLink(ROUTES.PROJECT_DETAIL(record.code!)),
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
