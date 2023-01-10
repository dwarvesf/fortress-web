import { Card, Tag } from 'antd'
import { AreaChart } from 'components/common/AreaChart'
import { CartesianAxisProps, TooltipProps } from 'recharts'
import { theme } from 'styles'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'

interface Props {
  dataset: any[] // TODO: update type
  dataKey: string
}

const CustomTooltip = (
  record: TooltipProps<any, any> & { dataKey: string },
) => {
  const { dataKey } = record

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
                    {item?.value || 0}
                  </strong>
                ) : (
                  <>
                    <strong style={{ color: theme.colors.primary }}>
                      {item?.value || 0}
                    </strong>{' '}
                    <Tag
                      color={getTrendStatusColor(item.payload.trend[dataKey])}
                    >
                      {getTrendByPercentage(
                        item.payload[dataKey],
                        item.payload.trend[dataKey],
                      )}
                    </Tag>
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

export const WorkSurveyDomainAreaChart = (props: Props) => {
  const { dataset, dataKey } = props
  return (
    <AreaChart
      width="100%"
      height={230}
      minWidth={350}
      dataset={dataset}
      lineDataKey={dataKey}
      xAxisDataKey="endDate"
      xAxisTick={
        <CustomAxisTick currentEvent={dataset[dataset.length - 1].endDate} />
      }
      yAxisTicks={[1, 3, 5]}
      yAxisDomain={[0, 5]}
      customToolTip={<CustomTooltip dataKey={dataKey} />}
    />
  )
}
