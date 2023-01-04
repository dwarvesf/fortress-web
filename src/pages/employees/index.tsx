import { Col, Input, Pagination, Row, Space, Tag, Tooltip } from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import Table, { ColumnsType } from 'antd/lib/table'
import Link from 'next/link'
import { UserAvatar } from 'components/common/AvatarWithName'
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
import { PreviewOpen, Star, Link as IconLink } from '@icon-park/react'
import { SEO } from 'components/common/SEO'
import { LinkWithIcon } from 'components/common/LinkWithIcon'
import { fullListPagination } from 'types/filters/Pagination'
import { Permission } from 'constants/permission'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { employeeStatuses, EmployeeStatus } from 'constants/status'
import { statusColors } from 'constants/colors'
import { useAuthContext } from 'context/auth'

const Default = () => {
  const { query } = useRouter()
  const queryFilter = query.filter ? JSON.parse(query.filter as string) : {}

  const { permissions } = useAuthContext()
  // FIXME: Should use a better flag, like: employees.statusRead
  const canFilterStatus = permissions.includes(Permission.EMPLOYEES_CREATE)

  const [value, setValue] = useState((query.keyword || '') as string)
  const { filter, setFilter } = useFilter(
    new EmployeeListFilter({
      ...queryFilter,
      workingStatuses: Object.keys(employeeStatuses),
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

  const columns = useMemo(() => {
    const finalColumns: ColumnsType<ViewEmployeeData> = [
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
        title: 'Positions',
        key: 'positions',
        dataIndex: 'positions',
        render: (value?: ViewPosition[]) => (
          <TagArray value={value} maxTag={2} color="blue" />
        ),
        filteredValue: filter.positions,
        filters: positions.map((each) => ({
          text: each.name,
          value: each.code!,
        })),
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
              <Link href={ROUTES.PROJECT_DETAIL(project.code || '')}>
                <a>
                  <Space size={4}>
                    {project.name}
                    <IconLink />
                  </Space>
                </a>
              </Link>
            )}
            maxTag={2}
          />
        ),
        filteredValue: filter.projects,
        filters: projects.map((each) => ({
          text: each.name,
          value: each.code!,
        })),
      },
      {
        title: 'Stacks',
        key: 'stacks',
        dataIndex: 'stacks',
        render: (value: ViewStack[]) => (
          <TagArray value={value} maxTag={2} color="green" />
        ),
        filteredValue: filter.stacks,
        filters: stacks.map((each) => ({
          text: each.name,
          value: each.code!,
        })),
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
                  <Star style={{ color: theme.colors.primary }} />
                </Tooltip>
              ) : (
                chapter.name
              )
            }
            maxTag={2}
            color="purple"
          />
        ),
        filteredValue: filter.chapters,
        filters: chapters.map((each) => ({
          text: each.name,
          value: each.code!,
        })),
      },
      {
        title: 'Line manager',
        key: 'lineManager',
        dataIndex: 'lineManager',
        render: (value?: ViewBasicEmployeeInfo) =>
          value ? <UserAvatar user={value} /> : '-',
      },
      {
        title: 'Seniority',
        key: 'seniorities',
        dataIndex: 'seniority',
        render: (value?: ModelSeniority) => value?.name || '-',
        filteredValue: filter.seniorities,
        filters: seniorities.map((each) => ({
          text: each.name,
          value: each.code!,
        })),
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
              href={`https://github.com/${value}`}
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
        title: '',
        key: 'actions',
        render: (value) => (
          <Row justify="end" gutter={[8, 8]}>
            <Col>
              <Link href={ROUTES.EMPLOYEE_DETAIL(value.username)}>
                <a>
                  <Tooltip title="View Detail">
                    <Button
                      type="text-primary"
                      size="small"
                      icon={<PreviewOpen size={20} />}
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

    return finalColumns
  }, [
    canFilterStatus,
    filter,
    positions,
    projects,
    stacks,
    chapters,
    seniorities,
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
        />
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
