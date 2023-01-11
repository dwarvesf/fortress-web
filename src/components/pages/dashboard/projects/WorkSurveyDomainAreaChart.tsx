import { Card, Tag } from 'antd'
import { AreaChart } from 'components/common/AreaChart'
import { DomainTypes } from 'constants/feedbackTypes'
import { CartesianAxisProps, TooltipProps } from 'recharts'
import { theme } from 'styles'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'

interface Props {
  dataset: any[] // TODO: update type
  dataKey: Exclude<DomainTypes, 'engagement'>
}

const CustomTooltip = (
  record: TooltipProps<any, any> & {
    dataset: any[]
    dataKey: Exclude<DomainTypes, 'engagement'>
  },
) => {
  const { dataset, dataKey } = record

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
            const currentWorkData = dataset.find(
              (d: any) => d.endDate === item.payload.endDate,
            )
            const currentWorkDataId = dataset.indexOf(currentWorkData)

            return (
              <span style={{ color: theme.colors.gray700 }} key={item.dataKey}>
                <span>Average: </span>
                {item.payload.trend === null ? (
                  <strong style={{ color: theme.colors.primary }}>
                    {item?.value === 0 ? 'No data' : item?.value}
                  </strong>
                ) : (
                  <>
                    <strong style={{ color: theme.colors.primary }}>
                      {item?.value === 0 ? 'No data' : item?.value}
                    </strong>{' '}
                    {getTrendByPercentage(
                      dataset[currentWorkDataId - 1][dataKey],
                      item.payload[dataKey],
                      item.payload.trend[dataKey],
                    ) && (
                      <Tag
                        color={getTrendStatusColor(item.payload.trend[dataKey])}
                      >
                        {getTrendByPercentage(
                          dataset[currentWorkDataId - 1][dataKey],
                          item.payload[dataKey],
                          item.payload.trend[dataKey],
                        )}
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
      customToolTip={<CustomTooltip dataset={dataset} dataKey={dataKey} />}
    />
  )
}
