import { Card, Tag } from 'antd'
import { LineChart } from 'components/common/LineChart'
import { CartesianAxisProps, TooltipProps } from 'recharts'
import { theme } from 'styles'
import { ViewAudit, ViewEngineeringHealth } from 'types/schema'
import { fillQuarters } from 'utils/quarter'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'

interface Props {
  dataset: (ViewAudit | ViewEngineeringHealth)[]
}

const CustomTooltip = (record: TooltipProps<any, any>) => {
  if (record.active && record.payload?.length) {
    return (
      <Card
        bordered={false}
        bodyStyle={{
          padding: 12,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <strong>{record.label}</strong>
        <div>
          {record.payload.map((item) => {
            return (
              <span style={{ color: theme.colors.gray700 }} key={item.dataKey}>
                <span>Average: </span>
                {item.payload.trend === null ? (
                  <strong
                    style={{
                      color:
                        item?.value !== 0
                          ? theme.colors.primary
                          : theme.colors.gray700,
                    }}
                  >
                    {item?.value === 0 ? '-' : item?.value.toFixed(1)}
                  </strong>
                ) : (
                  <>
                    <strong
                      style={{
                        color:
                          item?.value !== 0
                            ? theme.colors.primary
                            : theme.colors.gray700,
                      }}
                    >
                      {item?.value === 0 ? '-' : item?.value.toFixed(1)}
                    </strong>{' '}
                    {getTrendByPercentage(item.payload.trend) && (
                      <Tag
                        style={{
                          color: getTrendStatusColor(item.payload.trend),
                          borderColor: getTrendStatusColor(item.payload.trend),
                          backgroundColor: `${getTrendStatusColor(
                            item.payload.trend,
                          )}08`,
                        }}
                      >
                        {getTrendByPercentage(item.payload.trend)}
                      </Tag>
                    )}
                  </>
                )}
              </span>
            )
          })}
        </div>
      </Card>
    )
  }

  return null
}

const CustomAxisTick = ({
  x,
  y,
  payload,
  currentEvent,
}: CartesianAxisProps & {
  payload?: any // TODO: update type
  currentEvent: string
}) => {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{
        fontWeight: 400,
        fontSize: 13,
      }}
    >
      <text
        role="button"
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fill={theme.colors.gray700}
        style={{ fontWeight: payload.value === currentEvent ? 600 : 400 }}
      >
        {payload.value}
      </text>
    </g>
  )
}

export const AverageDatasetChart = (props: Props) => {
  const { dataset } = props

  const collectedQuarters = dataset.map((d) => d.quarter || '')
  const filledQuarters = fillQuarters(collectedQuarters)

  const filledDataset = filledQuarters.map((q) => {
    if (collectedQuarters.includes(q)) {
      return dataset[collectedQuarters.indexOf(q)]
    }
    return {
      quarter: q,
    }
  })

  return (
    <LineChart
      width="100%"
      height={260}
      minWidth={320}
      dataset={filledDataset}
      lineDataKeys={['avg']}
      xAxisDataKey="quarter"
      xAxisTick={
        <CustomAxisTick
          currentEvent={dataset[dataset.length - 1]?.quarter || ''}
        />
      }
      customToolTip={<CustomTooltip />}
    />
  )
}
