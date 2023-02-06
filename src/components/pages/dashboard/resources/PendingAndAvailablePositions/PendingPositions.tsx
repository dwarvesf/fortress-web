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

const columns: ColumnsType<ViewAvailableSlot> = [
  {
    title: 'Position',
    dataIndex: 'positions',
    key: 'positions',
    render: (value?: ViewPosition[]) =>
      value?.map((each) => each.name).join(', ') || '-',
    fixed: 'left',
  },
  {
    title: 'Seniority',
    dataIndex: 'seniority',
    key: 'seniority',
    render: (value?: ViewSeniority) => value?.name || '-',
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    render: (value?: ViewBasicProjectInfo) =>
      value ? <ProjectAvatar project={value} /> : '-',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (value: DeploymentType) => deploymentTypes[value],
  },
  {
    title: 'Created at',
    dataIndex: 'createdAt',
    key: 'createdAt',
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
      scroll={{ x: 'max-content', y: 370 }}
    />
  )
}
