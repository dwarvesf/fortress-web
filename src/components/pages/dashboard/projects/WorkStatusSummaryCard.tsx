import { Card } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'

const mockData = {
  data: {
    summary: [
      {
        id: '8dc3be2e-19a4-4942-8a79-56db391a0b15',
        name: 'Fortress',
        code: 'fortress',
        size: {
          value: 3,
          trend: 0,
        },
        health: {
          value: 3.8,
          trend: -2.56,
        },
        audit: {
          value: 3.5,
          trend: -2.78,
        },
        newItem: {
          value: 6,
          trend: -50,
        },
        resolvedItem: {
          value: 3,
          trend: 0,
        },
      },
      {
        id: 'dfa182fc-1d2d-49f6-a877-c01da9ce4207',
        name: 'Lorem ipsum',
        code: 'lorem-ipsum',
        size: {
          value: 3,
          trend: 0,
        },
        health: {
          value: 3.5,
          trend: -2.78,
        },
        audit: {
          value: 3.9,
          trend: 2.63,
        },
        newItem: {
          value: 27,
          trend: 50,
        },
        resolvedItem: {
          value: 2,
          trend: -33.33,
        },
      },
    ],
  },
}

const SummaryTdRender = ({
  value,
}: {
  value: { value: number; trend: number }
}) => (
  <div style={{ display: 'flex', alignItems: 'end' }}>
    <span>{value.value}</span>
    {getTrendByPercentage(value.trend) && (
      <span
        style={{
          color: getTrendStatusColor(value.trend),
          fontSize: 13,
        }}
      >
        {getTrendByPercentage(value.trend)}
      </span>
    )}
  </div>
)

export const WorkStatusSummaryCard = () => {
  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: 'Size',
      key: 'size',
      dataIndex: 'size',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) => a.health.value! - b.health.value!,
    },
    {
      title: 'Health score',
      key: 'health',
      dataIndex: 'health',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) => a.health.value! - b.health.value!,
    },
    {
      title: 'Audit score',
      key: 'audit',
      dataIndex: 'audit',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) => a.audit.value! - b.audit.value!,
    },
    {
      title: 'New items',
      key: 'newItem',
      dataIndex: 'newItem',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) => a.newItem.value! - b.newItem.value!,
    },
    {
      title: 'Resolved items',
      key: 'resolvedItem',
      dataIndex: 'resolvedItem',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) => a.resolvedItem.value! - b.resolvedItem.value!,
    },
  ]
  return (
    <Card
      title="Quarterly Summary"
      style={{ height: '100%' }}
      bodyStyle={{ height: 'calc(100% - 42.14px)' }}
    >
      <Table
        dataSource={mockData.data.summary}
        columns={columns}
        rowKey={(row) => row.id || ''}
        pagination={false}
        scroll={{ x: 'max-content' }}
        style={{
          height: '100%',
          overflow: 'auto',
        }}
      />
    </Card>
  )
}
