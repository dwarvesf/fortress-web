import { Card, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { ProjectAvatar } from 'components/common/AvatarWithName'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { ViewAuditSummaries, ViewAuditSummary } from 'types/schema'
import {
  getActionItemsTrendStatusColor,
  getTrendByPercentage,
  getTrendStatusColor,
} from 'utils/score'

interface Props {
  data: ViewAuditSummaries
  selectedProjectId: string
  setSelectedProjectId: Dispatch<SetStateAction<string>>
  isLoading: boolean
}

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
  const { data, selectedProjectId, setSelectedProjectId, isLoading } = props

  const dataset = useMemo(() => data.summary || [], [data])

  useEffect(() => {
    const selectedProject = dataset.find((d) => d.id === selectedProjectId)
    const selectedProjectRowIndex = dataset.indexOf(selectedProject!)

    const a = document.querySelectorAll('div.ant-table-body')

    if (a.length) {
      a[0]!.scrollTo({
        top: selectedProjectRowIndex * 57.18,
        behavior: 'smooth',
      })
    }
  }, [dataset, selectedProjectId])

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
      <SummaryTable
        rowClassName={(record) => {
          // @ts-ignore
          return record?.id === selectedProjectId ? 'highlight' : ''
        }}
        dataSource={dataset}
        columns={columns}
        rowKey={(row: ViewAuditSummary) => row.id || ''}
        pagination={false}
        scroll={{ x: 'max-content', y: 240 }}
        loading={isLoading}
        onRow={(record: ViewAuditSummary) => ({
          onClick: (e) => {
            if (e.defaultPrevented) return
            if (record.id) {
              setSelectedProjectId(record.id)
            }
          },
        })}
      />
    </Card>
  )
}
