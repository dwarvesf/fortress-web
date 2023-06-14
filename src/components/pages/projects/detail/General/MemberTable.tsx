import { Space, Tag } from 'antd'
import Table, { ColumnType } from 'antd/lib/table'
import { UserAvatar } from 'components/common/AvatarWithName'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import { Permission } from 'constants/permission'
import { useAuthContext } from 'context/auth'
import { ModelPosition, ViewPosition, ViewProjectMember } from 'types/schema'

const columns: (ColumnType<ViewProjectMember> & {
  permission?: string
})[] = [
  {
    title: 'Name',
    key: 'name',
    render: (value) =>
      value.displayName ? (
        <Space>
          <UserAvatar user={value} />
          {value.isLead && <Tag color="red">Lead</Tag>}
        </Space>
      ) : (
        'TBD'
      ),
    fixed: 'left',
  },
  {
    title: 'Positions',
    key: 'positions',
    dataIndex: 'positions',
    render: (value: ViewPosition[]) =>
      value && value.length ? (
        <Space size={[0, 8]}>
          {value.map((position: ModelPosition) => (
            <Tag key={position.id}>{position.name}</Tag>
          ))}
        </Space>
      ) : (
        '-'
      ),
  },
  {
    title: 'Seniority',
    key: 'seniority',
    dataIndex: 'seniority',
    render: (value) => value?.name || '-',
  },
  {
    title: 'Deployment Type',
    key: 'deploymentType',
    dataIndex: 'deploymentType',
    render: (value) => (value ? deploymentTypes[value as DeploymentType] : '-'),
    permission: Permission.PROJECTS_READ_FULLACCESS,
  },
]

export const MemberTable = ({ data }: { data: ViewProjectMember[] }) => {
  const { permissions } = useAuthContext()

  return (
    <Table
      rowKey={(row) => row.employeeID || ''}
      columns={columns.flatMap(({ permission, ...col }) =>
        permission && !permissions.includes(permission) ? [] : [col],
      )}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
