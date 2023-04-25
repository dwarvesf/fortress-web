import { Col, Input, Pagination, Row, Space, Tag, Tooltip } from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import Table, { ColumnType } from 'antd/lib/table'
import Link from 'next/link'
import {
  AvatarWithName,
  ProjectAvatar,
  UserAvatar,
} from 'components/common/AvatarWithName'
import { Button } from 'components/common/Button'
import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import {
  ModelSeniority,
  ViewBasicEmployeeInfo,
  ViewChapter,
  ViewEmployeeData,
  ViewEmployeeProjectData,
  ViewOrganization,
  ViewPosition,
  ViewStack,
} from 'types/schema'
import { useFilter } from 'hooks/useFilter'
import debounce from 'lodash.debounce'
import { theme } from 'styles'
import { TagArray } from 'components/common/TagArray'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'
import { Icon } from '@iconify/react'
import { LinkWithIcon } from 'components/common/LinkWithIcon'
import { fullListPagination } from 'types/filters/Pagination'
import { Permission } from 'constants/permission'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { employeeStatuses, EmployeeStatus } from 'constants/status'
import { statusColors } from 'constants/colors'
import { useAuthContext } from 'context/auth'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
import { format } from 'utils/date'
import { DATE_FORMAT } from 'constants/date'
import { useMouseDown } from 'hooks/useMouseDown'
import { formatCurrency } from 'utils/currency'

const Default = () => {
  const { query } = useRouter()
  const { openLink } = useMouseDown()
  const queryFilter = query.filter ? JSON.parse(query.filter as string) : {}

  const { permissions } = useAuthContext()
  const canFilterStatus = permissions.includes(
    Permission.EMPLOYEES_READ_FILTERBYALLSTATUSES,
  )
  const [value, setValue] = useState((query.keyword || '') as string)
  const { filter, setFilter } = useFilter(
    new EmployeeListFilter({
      ...queryFilter,
      workingStatuses: Object.values(EmployeeStatus).filter(
        (status) => status !== EmployeeStatus.LEFT,
      ),
      // Only show DF employees by default
      // FIXME: Should not hardcode. Maybe need BE to provide this somewhere?
      organizations: ['dwarves-foundation'],
    }),
    {
      shouldUpdateToQuery: true,
    },
  )

  const { data, loading } = useFetchWithCache(
    [GET_PATHS.getEmployees, filter],
    () => client.getEmployees(filter),
  )
  const employees = data?.data || []
  const { data: positionsData } = useFetchWithCache(
    [GET_PATHS.getPositionMetadata],
    () => client.getPositionsMetadata(),
  )
  // eslint-disable-next-line
  const positions = positionsData?.data || []
  const { data: projectsData } = useFetchWithCache(
    [GET_PATHS.getProjects],
    () =>
      client.getProjects({ ...new ProjectListFilter(), ...fullListPagination }),
  )
  // eslint-disable-next-line
  const projects = projectsData?.data || []
  const { data: stacksData } = useFetchWithCache(
    [GET_PATHS.getStackMetadata],
    () => client.getStackMetadata(),
  )
  // eslint-disable-next-line
  const stacks = stacksData?.data || []
  const { data: chaptersData } = useFetchWithCache(
    [GET_PATHS.getChapterMetadata],
    () => client.getChaptersMetadata(),
  )
  // eslint-disable-next-line
  const chapters = chaptersData?.data || []
  const { data: senioritiesData } = useFetchWithCache(
    [GET_PATHS.getSeniorityMetadata],
    () => client.getSenioritiesMetadata(),
  )
  // eslint-disable-next-line
  const seniorities = senioritiesData?.data || []
  const { data: lineManagersData } = useFetchWithCache(
    [GET_PATHS.getLineManagers],
    () => client.getLineManagers(),
  )
  // eslint-disable-next-line
  const lineManagers = lineManagersData?.data || []
  const { data: organizationsData } = useFetchWithCache(
    [GET_PATHS.getOrganizationMetadata],
    () => client.getOrganizationMetadata(),
  )
  // eslint-disable-next-line
  const organizations = organizationsData?.data || []

  const columns = useMemo(() => {
    const finalColumns: (ColumnType<ViewEmployeeData> & {
      permission?: string
    })[] = [
      {
        title: 'Employee',
        fixed: 'left',
        render: (value) => (value ? <UserAvatar user={value} /> : 'TBD'),
      },
      {
        title: 'Status',
        key: 'workingStatuses',
        dataIndex: 'status',
        render: (value) => (
          <Tag color={statusColors[value]}>
            {employeeStatuses[value as EmployeeStatus]}
          </Tag>
        ),
        filterSearch: true,
        filteredValue: filter.workingStatuses,
        filters: Object.keys(employeeStatuses)
          .filter(
            (key) => canFilterStatus || (!canFilterStatus && key !== 'left'),
          )
          .map((key) => {
            return {
              text: employeeStatuses[key as EmployeeStatus],
              value: key,
            }
          }),
      },
      {
        title: 'Salary',
        key: 'baseSalary',
        dataIndex: 'baseSalary',
        render: (value) =>
          value
            ? formatCurrency(
                (value.personal_account_amount || 0) +
                  (value.company_account_amount || 0),
                { currency: value.currency?.name },
              )
            : '-',
        permission: Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
      },
      {
        title: 'Positions',
        key: 'positions',
        dataIndex: 'positions',
        render: (value?: ViewPosition[]) => (
          <TagArray value={value} maxTag={2} color="blue" />
        ),
        filterSearch: true,
        filteredValue: filter.positions,
        filters: [
          {
            text: '-',
            value: '-',
          },
          ...positions.map((each) => ({
            text: each.name,
            value: each.code!,
          })),
        ],
      },
      {
        title: 'Projects',
        key: 'projects',
        dataIndex: 'projects',
        render: (value?: ViewEmployeeProjectData[]) => (
          <TagArray
            value={value}
            // eslint-disable-next-line
            content={(project) => (
              <ProjectAvatar
                avatarSize={20}
                project={project}
                style={{ marginLeft: -7 }}
              />
            )}
            maxTag={2}
          />
        ),
        filterSearch: true,
        filteredValue: filter.projects,
        filters: [
          {
            text: '-',
            value: '-',
          },
          ...projects.map((each) => ({
            text: each.name,
            value: each.code!,
          })),
        ],
      },
      {
        title: 'Stacks',
        key: 'stacks',
        dataIndex: 'stacks',
        render: (value: ViewStack[]) => (
          <TagArray value={value} maxTag={2} color="green" />
        ),
        filterSearch: true,
        filteredValue: filter.stacks,
        filters: [
          {
            text: '-',
            value: '-',
          },
          ...stacks.map((each) => ({
            text: each.name,
            value: each.code!,
          })),
        ],
      },
      {
        title: 'Chapters',
        key: 'chapters',
        dataIndex: 'chapters',
        render: (value: ViewChapter[], record) => (
          <TagArray
            value={value}
            // eslint-disable-next-line
            content={(chapter) =>
              chapter.leadID === record.id ? (
                <Tooltip title={`${chapter.name} lead`}>
                  {chapter.name}{' '}
                  <Icon
                    icon="icon-park-outline:star"
                    style={{ color: theme.colors.primary }}
                    width={10}
                  />
                </Tooltip>
              ) : (
                chapter.name
              )
            }
            maxTag={2}
            color="purple"
          />
        ),
        filterSearch: true,
        filteredValue: filter.chapters,
        filters: [
          {
            text: '-',
            value: '-',
          },
          ...chapters.map((each) => ({
            text: each.name,
            value: each.code!,
          })),
        ],
      },
      {
        title: 'Line manager',
        key: 'lineManagers',
        dataIndex: 'lineManager',
        render: (value?: ViewBasicEmployeeInfo) =>
          value ? <UserAvatar user={value} /> : '-',
        filterSearch: true,
        filteredValue: filter.lineManagers,
        filters: [
          {
            text: '-',
            value: '-',
          },
          ...lineManagers.map((each) => ({
            text: each.displayName,
            value: each.id || '',
          })),
        ],
      },
      {
        title: 'Referred By',
        key: 'referredBy',
        dataIndex: 'referredBy',
        render: (value?: ViewBasicEmployeeInfo) =>
          value ? <UserAvatar user={value} /> : '-',
      },
      {
        title: 'Seniority',
        key: 'seniorities',
        dataIndex: 'seniority',
        render: (value?: ModelSeniority) => value?.name || '-',
        filterSearch: true,
        filteredValue: filter.seniorities,
        filters: seniorities.map((each) => ({
          text: each.name,
          value: each.code!,
        })),
      },
      {
        title: 'Organizations',
        key: 'organizations',
        dataIndex: 'organizations',
        render: (value?: ViewOrganization[]) => (
          <TagArray
            value={value}
            maxTag={2}
            color="red"
            // eslint-disable-next-line
            content={(organization) => (
              <AvatarWithName
                avatarSize={20}
                avatar={organization.avatar}
                name={organization.name}
                style={{ marginLeft: -7 }}
              />
            )}
          />
        ),
        filterSearch: true,
        filteredValue: filter.organizations,
        filters: organizations.map((each) => ({
          text: each.name,
          value: each.code!,
        })),
        permission: Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
      },
      {
        title: 'Discord',
        key: 'discordName',
        dataIndex: 'discordName',
        render: (value) => value || '-',
      },
      {
        title: 'Github',
        key: 'githubID',
        dataIndex: 'githubID',
        render: (value) =>
          value ? (
            <LinkWithIcon
              href={value ? `https://github.com/${value}` : ''}
              target="_blank"
              rel="noreferrer"
            >
              {value}
            </LinkWithIcon>
          ) : (
            '-'
          ),
      },
      {
        title: 'Working Email',
        key: 'teamEmail',
        dataIndex: 'teamEmail',
        render: (value) => value || '-',
      },
      {
        title: 'Joined Date',
        key: 'joinedDate',
        dataIndex: 'joinedDate',
        render: (value) => (value ? format(value, DATE_FORMAT) : '-'),
        permission: Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
      },
      {
        title: 'Left Date',
        key: 'leftDate',
        dataIndex: 'leftDate',
        render: (value) => (value ? format(value, DATE_FORMAT) : '-'),
        permission: Permission.EMPLOYEES_READ_GENERALINFO_FULLACCESS,
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
              <Link href={ROUTES.EMPLOYEE_DETAIL(value.username)}>
                <a>
                  <Tooltip title="View Detail">
                    <Button
                      type="text-primary"
                      size="small"
                      icon={
                        <Icon
                          icon="icon-park-outline:preview-open"
                          width={20}
                        />
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

    return finalColumns.flatMap(({ permission, ...col }) =>
      permission && !permissions.includes(permission) ? [] : [col],
    )
  }, [
    canFilterStatus,
    filter,
    positions,
    projects,
    stacks,
    chapters,
    seniorities,
    lineManagers,
    organizations,
    permissions,
  ])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchEmployees = useCallback(
    debounce((keyword: string) => {
      setFilter({ keyword })
    }, 1000),
    [],
  )

  return (
    <>
      <SEO title="Employees" />

      <Breadcrumb
        items={[
          {
            label: 'Employees',
          },
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <PageHeader
          title="Employees"
          rightRender={
            <>
              <Col style={{ width: 256 }}>
                <Input
                  placeholder="Search employees"
                  bordered
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                    searchEmployees(e.target.value)
                  }}
                />
              </Col>
              <AuthenticatedContent
                permission={Permission.EMPLOYEES_CREATE}
                as={Col}
              >
                <Link href={ROUTES.ADD_EMPLOYEE}>
                  <a>
                    <Button type="primary">Add Employee</Button>
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
            dataSource={employees}
            columns={columns}
            rowKey={(row) => row.id as string}
            pagination={false}
            scroll={{ x: 'max-content' }}
            onChange={(_, filters) => {
              setFilter(filters)
            }}
            onRow={(record) => ({
              onMouseDown: openLink(ROUTES.EMPLOYEE_DETAIL(record.username!)),
            })}
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
