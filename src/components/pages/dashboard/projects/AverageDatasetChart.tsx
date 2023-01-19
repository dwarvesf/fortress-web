import { Card, Tag } from 'antd'
import { LineChart } from 'components/common/LineChart'
import { CartesianAxisProps, TooltipProps } from 'recharts'
import { theme } from 'styles'
import { ViewAudit, ViewEngineeringHealth } from 'types/schema'
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
                  <strong style={{ color: theme.colors.primary }}>
                    {item?.value === 0 ? 'No data' : item?.value.toFixed(1)}
                  </strong>
                ) : (
                  <>
                    <strong style={{ color: theme.colors.primary }}>
                      {item?.value === 0 ? 'No data' : item?.value.toFixed(1)}
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

  return (
    <LineChart
      width="100%"
      height={250}
      minWidth={320}
      dataset={dataset}
      lineDataKeys="avg"
      xAxisDataKey="quarter"
      xAxisTick={
        <CustomAxisTick
          currentEvent={dataset[dataset.length - 1]?.quarter || ''}
        />
      }
      yAxisTicks={[1, 3, 5]}
      yAxisDomain={[0, 5]}
      customToolTip={<CustomTooltip />}
      strokeColors={[theme.colors.primary]}
    />
  )
}
