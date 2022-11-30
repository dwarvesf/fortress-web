import { Space, Tag } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { useMemo } from 'react'
import { ModelPosition, ViewPosition, ViewProjectMember } from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'

export const ProjectMemberTable = ({ data }: { data: ViewProjectMember[] }) => {
  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        render: (value) => (
          <Space>
            <AvatarWithName user={value} />
            {value.isLead && <Tag color="red">Lead</Tag>}
          </Space>
        ),
      },
      {
        title: 'Positions',
        key: 'positions',
        dataIndex: 'positions',
        render: (value: ViewPosition[]) => (
          <Space size={[0, 8]}>
            {value.map((position: ModelPosition) => (
              <Tag key={position.id}>{position.name}</Tag>
            ))}
          </Space>
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
        render: (value) => capitalizeFirstLetter(value),
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
