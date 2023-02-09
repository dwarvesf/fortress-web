import { Card } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { ProjectAvatar } from 'components/common/AvatarWithName'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { ViewAuditSummaries, ViewAuditSummary } from 'types/schema'
import {
  getActionItemsTrendStatusColor,
  getTrendByPercentage,
  getTrendStatusColor,
} from 'utils/score'

interface Props {
  data: ViewAuditSummaries
  isLoading: boolean
}

const SummaryTdRender = ({
  value,
  hasFloatingPoint = false,
  isActionItemsStat = false,
}: {
  value: { value: number; trend: number }
  hasFloatingPoint?: boolean
  isActionItemsStat?: boolean
}) => (
  <div style={{ display: 'flex', alignItems: 'end' }}>
    <span>{hasFloatingPoint ? value.value.toFixed(1) : value.value}</span>
    {getTrendByPercentage(value.trend) && (
      <span
        style={{
          color: isActionItemsStat
            ? getActionItemsTrendStatusColor(value.trend)
            : getTrendStatusColor(value.trend),

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

  const { push } = useRouter()

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
      title: 'Scores',
      children: [
        {
          title: 'Health',
          key: 'health',
          dataIndex: 'health',
          render: (value) => <SummaryTdRender value={value} hasFloatingPoint />,
          sorter: (a, b) =>
            a.health && b.health ? a.health.value! - b.health.value! : 0,
        },
        {
          title: 'Audit',
          key: 'audit',
          dataIndex: 'audit',
          render: (value) => <SummaryTdRender value={value} hasFloatingPoint />,
          sorter: (a, b) =>
            a.audit && b.audit ? a.audit.value! - b.audit.value! : 0,
        },
      ],
    },
    {
      title: 'Action Items',
      children: [
        {
          title: 'New',
          key: 'newItem',
          dataIndex: 'newItem',
          render: (value) => (
            <SummaryTdRender value={value} isActionItemsStat />
          ),
          sorter: (a, b) =>
            a.newItem && b.newItem ? a.newItem.value! - b.newItem.value! : 0,
        },
        {
          title: 'Resolved',
          key: 'resolvedItem',
          dataIndex: 'resolvedItem',
          render: (value) => (
            <SummaryTdRender value={value} isActionItemsStat />
          ),
          sorter: (a, b) =>
            a.resolvedItem && b.resolvedItem
              ? a.resolvedItem.value! - b.resolvedItem.value!
              : 0,
        },
      ],
    },
  ]
  return (
    <Card
      title="Quarterly Summary"
      style={{ height: '100%' }}
      bodyStyle={{ padding: '1px 0 0' }}
    >
      <Table
        dataSource={dataset}
        columns={columns}
        rowKey={(row) => row.id || ''}
        pagination={false}
        scroll={{ x: 'max-content', y: 240 }}
        loading={isLoading}
        onRow={(record) => ({
          onClick: (e) => {
            if (e.defaultPrevented) return
            push(ROUTES.PROJECT_DETAIL(record.code!))
          },
        })}
      />
    </Card>
  )
}
