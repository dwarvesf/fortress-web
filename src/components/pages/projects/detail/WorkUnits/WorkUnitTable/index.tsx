import { Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { AvatarArray } from 'components/common/AvatarArray'
import { useMemo } from 'react'
import { ViewStack, ViewWorkUnit } from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { Actions } from './Actions'

export const WorkUnitTable = ({
  data,
  isLoading,
  onAfterAction,
}: {
  data: ViewWorkUnit[]
  isLoading: boolean
  onAfterAction: () => void
}) => {
  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
        fixed: 'left',
      },
      {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
        render: (value) => capitalizeFirstLetter(value),
      },
      {
        title: 'Members',
        key: 'members',
        dataIndex: 'members',
        render: (value) =>
          value && value.length ? <AvatarArray data={value} /> : '-',
      },
      {
        title: 'Stacks',
        key: 'stacks',
        dataIndex: 'stacks',
        render: (value: ViewStack[]) =>
          value && value.length ? (
            <Space size={[0, 8]}>
              {value.map((stack) => (
                <Tag key={stack.id}>{stack.name}</Tag>
              ))}
            </Space>
          ) : (
            '-'
          ),
      },
      {
        title: 'URL',
        key: 'url',
        dataIndex: 'url',
        render: (value) =>
          value ? (
            <a href={value} target="_blank" rel="noreferrer" className="styled">
              {value}
            </a>
          ) : (
            '-'
          ),
      },
      {
        key: 'actions',
        render: (value) => (
          <Actions record={value} onAfterAction={onAfterAction} />
        ),
        fixed: 'right',
      },
    ] as ColumnsType<ViewWorkUnit>
  }, [onAfterAction])

  return (
    <Table
      loading={isLoading}
      rowKey={(row) => row.id || '-'}
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{ x: 'max-content' }}
    />
  )
}
