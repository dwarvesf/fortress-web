import { Card, Spin, Tag } from 'antd'
import { LineChart } from 'components/common/LineChart'
import { DomainTypes } from 'constants/feedbackTypes'
import { CartesianAxisProps, TooltipProps } from 'recharts'
import { theme } from 'styles'
import { getTrendByPercentage, getTrendScoreColor } from 'utils/score'

interface Props {
  dataset: any[] // TODO: update type
  dataKey: Exclude<DomainTypes, 'engagement'>
  isLoading: boolean
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
            const currentWorkSurveyData = dataset.find(
              (d: any) => d.endDate === item.payload.endDate,
            )
            const currentWorkSurveyDataId = dataset.indexOf(
              currentWorkSurveyData,
            )

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
                    {getTrendByPercentage(item.payload.trend[dataKey]) && (
                      <Tag
                        style={{
                          color: getTrendScoreColor(
                            dataKey,
                            item.payload[dataKey],
                            dataset[currentWorkSurveyDataId - 1][dataKey],
                          ),
                          borderColor: getTrendScoreColor(
                            dataKey,
                            item.payload[dataKey],
                            dataset[currentWorkSurveyDataId - 1][dataKey],
                          ),
                          backgroundColor: `${getTrendScoreColor(
                            dataKey,
                            item.payload[dataKey],
                            dataset[currentWorkSurveyDataId - 1][dataKey],
                          )}08`,
                        }}
                      >
                        {getTrendByPercentage(item.payload.trend[dataKey])}
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

export const WorkSurveyDomainChart = (props: Props) => {
  const { dataset, dataKey, isLoading } = props
  return isLoading ? (
    <Spin
      size="large"
      style={{
        height: 230,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  ) : (
    <LineChart
      width="100%"
      height={230}
      minWidth={350}
      dataset={dataset}
      lineDataKeys={[dataKey]}
      xAxisDataKey="endDate"
      xAxisTick={
        <CustomAxisTick
          currentEvent={dataset[dataset.length - 1]?.endDate || ''}
        />
      }
      yAxisTicks={[1, 3, 5]}
      yAxisDomain={[0, 5]}
      customToolTip={<CustomTooltip dataset={dataset} dataKey={dataKey} />}
      strokeColors={[theme.colors.primary]}
    />
  )
}
