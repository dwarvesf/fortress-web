import { Col, Input, Pagination, Row, Space, Tooltip } from 'antd'
import { ROUTES } from 'constants/routes'
import { PageHeader } from 'components/common/PageHeader'
import Table, { ColumnsType } from 'antd/lib/table'
import Link from 'next/link'
import { UserAvatar } from 'components/common/AvatarWithName'
import {
  // EditEmployeeLink,
  EmployeeLink,
  ProjectLink,
} from 'components/common/DetailLink'
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
import qs from 'qs'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PreviewOpen, Star } from '@icon-park/react'
import { SEO } from 'components/common/SEO'

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
    filterMultiple: false,
    filteredValue: filter.positionID ? [filter.positionID] : [],
    filters: positionsData.map((each) => ({
      text: each.name,
      value: each.id!,
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
          <ProjectLink id={project.id!}>{project.name}</ProjectLink>
        )}
        maxTag={2}
      />
    ),
    filterMultiple: false,
    filteredValue: filter.projectID ? [filter.projectID] : [],
    filters: projectsData.map((each) => ({
      text: each.name,
      value: each.id!,
    })),
  },
  {
    title: 'Stacks',
    key: 'stacks',
    dataIndex: 'stacks',
    render: (value: ViewStack[]) => (
      <TagArray value={value} maxTag={2} color="green" />
    ),
    filterMultiple: false,
    filteredValue: filter.stackID ? [filter.stackID] : [],
    filters: stacksData.map((each) => ({
      text: each.name,
      value: each.id!,
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
            <Tooltip
              color={theme.colors.primary}
              title={`${chapter.name} lead`}
            >
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
    filterMultiple: false,
    filteredValue: filter.chapterID ? [filter.chapterID] : [],
    filters: chaptersData.map((each) => ({
      text: each.name,
      value: each.id!,
    })),
  },
  {
    title: 'Line-manager',
    key: 'lineManager',
    dataIndex: 'lineManager',
    render: (value?: ViewBasicEmployeeInfo) =>
      value ? <UserAvatar user={value} /> : '-',
  },
  {
    title: 'Seniority',
    key: 'seniority',
    dataIndex: 'seniority',
    render: (value?: ModelSeniority) => value?.name || '-',
    filterMultiple: false,
    filteredValue: filter.seniorityID ? [filter.seniorityID] : [],
    filters: senioritiesData.map((each) => ({
      text: each.name,
      value: each.id!,
    })),
  },
  {
    title: 'Discord ID',
    key: 'discordID',
    dataIndex: 'discordID',
    render: (value) =>
      (
        <a
          href={`https://discord.com/channels/@me/${value}`}
          target="_blank"
          rel="noreferrer"
        >
          {value}
        </a>
      ) || '-',
  },
  {
    title: 'Github ID',
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
    title: 'Working Email',
    key: 'teamEmail',
    dataIndex: 'teamEmail',
    render: (value) =>
      value ? (
        <a href={`mailto:${value}`} target="_blank" rel="noreferrer">
          {value}
        </a>
      ) : (
        '-'
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
                icon={<PreviewOpen size={20} />}
              />
            </Tooltip>
          </EmployeeLink>
        </Col>
        {/* <Col>
          <EditEmployeeLink id={value.id}>
            <Tooltip title="Edit">
              <Button
                type="text-primary"
                size="small"
                icon={<EditOutlined />}
              />
            </Tooltip>
          </EditEmployeeLink>
        </Col> */}
      </Row>
    ),
    fixed: 'right',
  },
]

const Default = () => {
  const { push, pathname, query } = useRouter()
  const [value, setValue] = useState((query.keyword || '') as string)
  const { filter, setFilter } = useFilter(new EmployeeListFilter({ ...query }))
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
    () => client.getProjects(new ProjectListFilter()),
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
      push(
        {
          pathname,
          query: qs.stringify(
            { ...query, keyword: keyword || null },
            { skipNulls: true },
          ),
        },
        undefined,
        { shallow: true },
      )
    }, 1000),
    [],
  )

  return (
    <>
      <SEO title="Employees" />

      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
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
            const newFilter = {
              positionID: filters.positions?.[0] as string,
              projectID: filters.projects?.[0] as string,
              stackID: filters.stacks?.[0] as string,
              chapterID: filters.chapters?.[0] as string,
              seniorityID: filters.seniority?.[0] as string,
            }
            setFilter(newFilter)
            push(
              {
                pathname,
                query: qs.stringify(
                  { ...query, ...newFilter },
                  { skipNulls: true },
                ),
              },
              undefined,
              { shallow: true },
            )
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
