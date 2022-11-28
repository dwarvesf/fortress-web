import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AvatarWithName } from 'components/common/AvatarWithName'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import { useMemo } from 'react'
import {
  ModelPosition,
  ModelSeniority,
  ViewPosition,
  ViewProjectMember,
} from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { Actions } from './Actions'

export const MemberDetailTable = ({
  data,
  isLoading,
  onAfterAction,
}: {
  data: ViewProjectMember[]
  isLoading: boolean
  onAfterAction: () => void
}) => {
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
            '-'
          ),
        fixed: 'left',
      },
      {
        title: 'Positions',
        key: 'positions',
        dataIndex: 'positions',
        render: (value: ViewPosition[]) =>
          value.length > 0 ? (
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
        render: (value: ModelSeniority) => value?.name || '-',
      },
      {
        title: 'Deployment Type',
        key: 'deploymentType',
        dataIndex: 'deploymentType',
        render: (value) => (value ? capitalizeFirstLetter(value) : '-'),
      },
      {
        title: 'Joined Date',
        key: 'joinedDate',
        dataIndex: 'joinedDate',
        render: (value) => (value ? format(new Date(value), DATE_FORMAT) : '-'),
      },
      {
        title: 'Left Date',
        key: 'leftDate',
        dataIndex: 'leftDate',
        render: (value) => (value ? format(new Date(value), DATE_FORMAT) : '-'),
      },
      {
        key: 'action',
        render: (value) => (
          <Actions data={value} onAfterAction={onAfterAction} />
        ),
        fixed: 'right',
      },
    ] as ColumnsType<ViewProjectMember>
  }, [onAfterAction])

  return (
    <Table
      loading={isLoading}
      rowKey={(row) => row.projectSlotID || '-'}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
