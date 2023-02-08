import { Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ProjectAvatar } from 'components/common/AvatarWithName'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'utils/date'
import {
  ViewAvailableSlot,
  ViewBasicProjectInfo,
  ViewPosition,
  ViewSeniority,
} from 'types/schema'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import { TagArray } from 'components/common/TagArray'

const columns: ColumnsType<ViewAvailableSlot> = [
  {
    title: 'Position',
    dataIndex: 'positions',
    key: 'positions',
    render: (value?: ViewPosition[]) => (
      <TagArray value={value || []} maxTag={2} color="blue" />
    ),
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
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    width: 100,
    render: (value?: ViewBasicProjectInfo) =>
      value ? <ProjectAvatar project={value} /> : '-',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 100,
    render: (value: DeploymentType) => deploymentTypes[value],
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 115,
    render: (value?: string) => (value ? format(value, DATE_FORMAT) : '-'),
  },
]

interface Props {
  data: ViewAvailableSlot[]
  loading: boolean
}

export const PendingPositions = ({ data, loading }: Props) => {
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
