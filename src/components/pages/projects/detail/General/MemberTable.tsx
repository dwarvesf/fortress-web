import Table, { ColumnsType } from 'antd/lib/table'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { useMemo } from 'react'
import { ViewPosition, ViewProjectMember } from 'types/schema'

export const MemberTable = ({ data }: { data: ViewProjectMember[] }) => {
  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        render: (value) => <AvatarWithName user={value} />,
      },
      {
        title: 'Positions',
        key: 'positions',
        dataIndex: 'positions',
        render: (value: ViewPosition[]) =>
          value?.map((position) => position.name).join(', '),
      },
      {
        title: 'Seniority',
        key: 'seniority',
        dataIndex: 'seniority',
      },
      {
        title: 'Deployment Type',
        key: 'deploymentType',
        dataIndex: 'deploymentType',
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
