import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ProjectAvatar, UserAvatar } from 'components/common/AvatarWithName'
import { TagArray } from 'components/common/TagArray'
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
    width: 100,
    render: (value?: ViewSeniority) => value?.name || '-',
  },
  {
    title: 'Positions',
    key: 'positions',
    dataIndex: 'positions',
    width: 100,
    render: (value?: ViewPosition[]) => (
      <TagArray value={value || []} maxTag={2} color="blue" />
    ),
  },
  {
    title: 'Stacks',
    key: 'stacks',
    dataIndex: 'stacks',
    width: 100,
    render: (value?: ViewStack[]) => (
      <TagArray value={value || []} maxTag={2} color="green" />
    ),
  },
  {
    title: 'Projects',
    key: 'projects',
    dataIndex: 'projects',
    width: 100,
    render: (value?: ViewBasicProjectInfo[]) => (
      <TagArray
        value={value || []}
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
      scroll={{ x: 'max-content', y: 390 }}
    />
  )
}
