import { Space, Tag } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { DeploymentType, deploymentTypes } from 'constants/deploymentTypes'
import { useMemo } from 'react'
import { ModelPosition, ViewPosition, ViewProjectMember } from 'types/schema'

export const MemberTable = ({ data }: { data: ViewProjectMember[] }) => {
  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        render: (value) =>
          value.displayName ? (
            <Space>
              <AvatarWithName user={value} />
              {value.isLead && <Tag color="red">Lead</Tag>}
            </Space>
          ) : (
            'TBD'
          ),
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
        render: (value) =>
          value ? deploymentTypes[value as DeploymentType] : '-',
      },
    ] as ColumnsType<ViewProjectMember>
  }, [])

  return (
    <Table
      rowKey={(row) => row.employeeID || ''}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
