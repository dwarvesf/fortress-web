import { Icon } from '@iconify/react'
import { Space, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { UserAvatar } from 'components/common/AvatarWithName'
import { TagArray } from 'components/common/TagArray'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import {
  ViewAvailableEmployee,
  ViewBasicProjectInfo,
  ViewPosition,
  ViewSeniority,
  ViewStack,
} from 'types/schema'

const columns: ColumnsType<ViewAvailableEmployee> = [
  {
    title: 'Name',
    key: 'name',
    render: (value?: ViewAvailableEmployee) =>
      value ? <UserAvatar user={value} /> : '-',
    fixed: 'left',
  },
  {
    title: 'Seniority',
    dataIndex: 'seniority',
    key: 'seniority',
    render: (value?: ViewSeniority) => value?.name || '-',
  },
  {
    title: 'Positions',
    key: 'positions',
    dataIndex: 'positions',
    render: (value?: ViewPosition[]) => (
      <TagArray value={value || []} maxTag={2} color="blue" />
    ),
  },
  {
    title: 'Stacks',
    key: 'stacks',
    dataIndex: 'stacks',
    render: (value?: ViewStack[]) => (
      <TagArray value={value || []} maxTag={2} color="green" />
    ),
  },
  {
    title: 'Projects',
    key: 'projects',
    dataIndex: 'projects',
    render: (value?: ViewBasicProjectInfo[]) => (
      <TagArray
        value={value || []}
        content={(project) => (
          <Link href={ROUTES.PROJECT_DETAIL(project.code || '')}>
            <a>
              <Space size={4}>
                {project.name}
                <Icon icon="icon-park-outline:link" />
              </Space>
            </a>
          </Link>
        )}
        maxTag={2}
      />
    ),
  },
]

interface Props {
  data: ViewAvailableEmployee[]
  loading: boolean
}

export const AvailablePositions = ({ data, loading }: Props) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(row) => row.id || ''}
      pagination={false}
      scroll={{ x: 'max-content', y: 370 }}
    />
  )
}
