import { Col, Input, Pagination, Row, Space, Tooltip } from 'antd'
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
  ModelChapter,
  ModelPosition,
  ModelSeniority,
  ModelStack,
  ViewBasicEmployeeInfo,
  ViewChapter,
  ViewEmployeeData,
  ViewEmployeeProjectData,
  ViewPosition,
  ViewProjectData,
  ViewStack,
} from 'types/schema'
import { useFilter } from 'hooks/useFilter'
import debounce from 'lodash.debounce'
import { theme } from 'styles'
import { TagArray } from 'components/common/TagArray'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PreviewOpen, Star, Link as IconLink } from '@icon-park/react'
import { SEO } from 'components/common/SEO'
import { LinkWithIcon } from 'components/common/LinkWithIcon'
import { fullListPagination } from 'types/filters/Pagination'

interface ColumnProps {
  filter: EmployeeListFilter
  positionsData: ModelPosition[]
  projectsData: ViewProjectData[]
  stacksData: ModelStack[]
  chaptersData: ModelChapter[]
  senioritiesData: ModelSeniority[]
}

const columns = ({
  filter,
  positionsData,
  projectsData,
  stacksData,
  chaptersData,
  senioritiesData,
}: ColumnProps): ColumnsType<ViewEmployeeData> => [
  {
    title: 'Employee',
    render: (value) => (value ? <UserAvatar user={value} /> : 'TBD'),
    fixed: 'left',
  },
  {
    title: 'Positions',
    key: 'positions',
    dataIndex: 'positions',
    render: (value?: ViewPosition[]) => (
      <TagArray value={value} maxTag={2} color="blue" />
    ),
    filteredValue: filter.positions,
    filters: positionsData.map((each) => ({
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
        content={(project) => (
          <Link href={ROUTES.PROJECT_DETAIL(project.id || '')}>
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
    filters: projectsData.map((each) => ({
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
    filters: stacksData.map((each) => ({
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
        content={(chapter) =>
          chapter.leadID === record.id ? (
            <Tooltip title={`${chapter.name} lead`}>
              {chapter.name} <Star style={{ color: theme.colors.primary }} />
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
    filters: chaptersData.map((each) => ({
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
    filters: senioritiesData.map((each) => ({
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

const Default = () => {
  const { query } = useRouter()
  const queryFilter = query.filter ? JSON.parse(query.filter as string) : {}

  const [value, setValue] = useState((query.keyword || '') as string)
  const { filter, setFilter } = useFilter(
    new EmployeeListFilter({ ...queryFilter }),
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
  const { data: projectsData } = useFetchWithCache(
    [GET_PATHS.getProjects],
    () =>
      client.getProjects({ ...new ProjectListFilter(), ...fullListPagination }),
  )
  const { data: stacksData } = useFetchWithCache(
    [GET_PATHS.getStackMetadata],
    () => client.getStackMetadata(),
  )
  const { data: chaptersData } = useFetchWithCache(
    [GET_PATHS.getChapterMetadata],
    () => client.getChaptersMetadata(),
  )
  const { data: senioritiesData } = useFetchWithCache(
    [GET_PATHS.getSeniorityMetadata],
    () => client.getSenioritiesMetadata(),
  )

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
          columns={columns({
            filter,
            positionsData: positionsData?.data || [],
            projectsData: projectsData?.data || [],
            stacksData: stacksData?.data || [],
            chaptersData: chaptersData?.data || [],
            senioritiesData: senioritiesData?.data || [],
          })}
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
            onChange={(page) => setFilter({ page })}
            total={data?.total}
            pageSize={filter.size}
            hideOnSinglePage
            size="small"
          />
        </Row>
      </Space>
    </>
  )
}

export default Default
