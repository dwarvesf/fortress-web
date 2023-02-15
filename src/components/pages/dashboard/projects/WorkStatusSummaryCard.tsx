import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ProjectAvatar } from 'components/common/AvatarWithName'
import { Button } from 'components/common/Button'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import styled from 'styled-components'
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

export const mockData = [
  {
    id: '1',
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
    id: '2',
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
  {
    id: '3',
    name: 'Lorem ipsum3',
    code: 'lorem-ipsum3',
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
  {
    id: '4',
    name: 'Lorem ipsum4',
    code: 'lorem-ipsum4',
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
  {
    id: '5',
    name: 'Lorem ipsum5',
    code: 'lorem-ipsum5',
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
  {
    id: '6',
    name: 'Lorem ipsum6',
    code: 'lorem-ipsum6',
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
  {
    id: '7',
    name: 'Lorem ipsum7',
    code: 'lorem-ipsum7',
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
  {
    id: '8',
    name: 'Lorem ipsum8',
    code: 'lorem-ipsum8',
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
  {
    id: '9',
    name: 'Lorem ipsum9',
    code: 'lorem-ipsum9',
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
]

const SummaryTable = styled(Table)`
  .ant-table-thead {
    tr {
      th {
        &[rowspan='2'],
        &[colspan='2'] {
          padding: 12px;
        }

        &[colspan='2'] {
          background-color: #f8f8f8 !important;
        }

        &[colspan='2']:nth-of-type(2n) {
          background-color: #f5f5f5 !important;
        }
      }

      &:nth-of-type(2) {
        th {
          padding: 12px !important;
        }
      }
    }
  }

  .ant-table-body {
    .ant-table-cell {
      .ant-table-expanded-row-fixed {
        min-height: 239px !important;
      }
    }
  }
`

const SummaryTdRender = ({
  value,
  hasFloatingPoint = false,
}: {
  value: { value: number; trend: number }
  hasFloatingPoint?: boolean
}) => (
  <div style={{ display: 'flex', alignItems: 'end' }}>
    <span>{hasFloatingPoint ? value.value.toFixed(1) : value.value}</span>
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

const SummaryActionItemsTdRender = ({
  value,
}: {
  value: { value: number; trend: number }
}) => (
  <div style={{ display: 'flex', alignItems: 'end' }}>
    <span>{value.value}</span>
    {getTrendByPercentage(value.trend) && (
      <span
        style={{
          color: getActionItemsTrendStatusColor(value.trend),
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

  const scroll = (index: number) => {
    const a = document.querySelector('div.ant-table-body')

    a!.scrollTop = index * 57.18
  }

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
          render: (value) => <SummaryActionItemsTdRender value={value} />,
          sorter: (a, b) =>
            a.newItem && b.newItem ? a.newItem.value! - b.newItem.value! : 0,
        },
        {
          title: 'Resolved',
          key: 'resolvedItem',
          dataIndex: 'resolvedItem',
          render: (value) => <SummaryActionItemsTdRender value={value} />,
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
      bodyStyle={{ padding: '1px 0 20px' }}
    >
      <Button type="default" onClick={() => scroll(2)}>
        a
      </Button>
      <SummaryTable
        dataSource={dataset}
        columns={columns}
        rowKey={(row: ViewAuditSummary) => row.id || ''}
        pagination={false}
        scroll={{ x: 'max-content', y: 250 }}
        loading={isLoading}
        onRow={(record: ViewAuditSummary) => ({
          onClick: (e) => {
            if (e.defaultPrevented) return
            push(ROUTES.PROJECT_DETAIL(record.code!))
          },
        })}
      />
    </Card>
  )
}
