import { Card } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { ProjectAvatar } from 'components/common/AvatarWithName'
import { ViewAuditSummaries, ViewAuditSummary } from 'types/schema'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'

interface Props {
  data: ViewAuditSummaries
  isLoading: boolean
}

const SummaryTdRender = ({
  value,
}: {
  value: { value: number; trend: number }
}) => (
  <div style={{ display: 'flex', alignItems: 'end' }}>
    <span>{value.value.toFixed(1)}</span>
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

export const WorkStatusSummaryCard = (props: Props) => {
  const { data, isLoading } = props

  const dataset = data.summary || []

  const columns: ColumnsType<ViewAuditSummary> = [
    {
      title: 'Name',
      key: 'name',
      fixed: 'left',
      render: (value) => <ProjectAvatar project={value} />,
    },
    {
      title: 'Size',
      key: 'size',
      dataIndex: 'size',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) => (a.size && b.size ? a.size.value! - b.size.value! : 0),
    },
    {
      title: 'Health score',
      key: 'health',
      dataIndex: 'health',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) =>
        a.health && b.health ? a.health.value! - b.health.value! : 0,
    },
    {
      title: 'Audit score',
      key: 'audit',
      dataIndex: 'audit',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) =>
        a.audit && b.audit ? a.audit.value! - b.audit.value! : 0,
    },
    {
      title: 'New items',
      key: 'newItem',
      dataIndex: 'newItem',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) =>
        a.newItem && b.newItem ? a.newItem.value! - b.newItem.value! : 0,
    },
    {
      title: 'Resolved items',
      key: 'resolvedItem',
      dataIndex: 'resolvedItem',
      render: (value) => <SummaryTdRender value={value} />,
      sorter: (a, b) =>
        a.resolvedItem && b.resolvedItem
          ? a.resolvedItem.value! - b.resolvedItem.value!
          : 0,
    },
  ]
  return (
    <Card
      title="Quarterly Summary"
      style={{ height: '100%' }}
      bodyStyle={{ padding: '1px 0 24px' }}
    >
      <Table
        dataSource={dataset}
        columns={columns}
        rowKey={(row) => row.id || ''}
        pagination={false}
        scroll={{ x: 'max-content', y: 250 }}
        loading={isLoading}
      />
    </Card>
  )
}
