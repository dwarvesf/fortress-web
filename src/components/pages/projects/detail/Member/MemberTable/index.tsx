import { Space, Table, Tag } from 'antd'
import { ColumnsType, ColumnType } from 'antd/lib/table'
import { UserAvatar } from 'components/common/AvatarWithName'
import { DATE_FORMAT } from 'constants/date'
import { format } from 'utils/date'
import { useMemo } from 'react'
import {
  ModelPosition,
  ModelSeniority,
  ViewPosition,
  ViewProjectMember,
} from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { formatCurrency } from 'utils/currency'
import { useAuthContext } from 'context/auth'
import { Permission } from 'constants/permission'
import { Actions } from './Actions'

export const MemberTable = ({
  projectID,
  data,
  isLoading,
  onAfterAction,
}: {
  projectID: string
  data: ViewProjectMember[]
  isLoading: boolean
  onAfterAction: () => void
}) => {
  const { permissions } = useAuthContext()
  const columns: (ColumnType<ViewProjectMember> & {
    permission?: string
  })[] = useMemo(() => {
    return [
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
          value && value.length > 0 ? (
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
        title: 'Start Date',
        key: 'startDate',
        dataIndex: 'startDate',
        render: (value) => (value ? format(value, DATE_FORMAT) : '-'),
      },
      {
        title: 'End Date',
        key: 'endDate',
        dataIndex: 'endDate',
        render: (value) => (value ? format(value, DATE_FORMAT) : '-'),
      },
      {
        title: 'Rate',
        key: 'rate',
        dataIndex: 'rate',
        render: (value, record) =>
          value
            ? formatCurrency(value, {
                currency: record.currency?.name,
                showSymbol: !!record.currency?.name,
              })
            : '-',
        permission: Permission.PROJECTMEMBERS_RATE_READ,
      },
      {
        title: 'Notes',
        key: 'note',
        dataIndex: 'note',
        render: (value) => (
          <div style={{ whiteSpace: 'pre-wrap' }}>{value || '-'}</div>
        ),
      },
      {
        key: 'actions',
        render: (value) => (
          <Actions
            projectID={projectID}
            record={value}
            onAfterAction={onAfterAction}
          />
        ),
        fixed: 'right',
      },
    ] as ColumnsType<ViewProjectMember>
  }, [projectID, onAfterAction])

  return (
    <Table
      loading={isLoading}
      rowKey={(row) => row.projectSlotID || '-'}
      columns={columns.flatMap(({ permission, ...col }) =>
        permission && !permissions.includes(permission) ? [] : [col],
      )}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
