import { Card, Tag } from 'antd'
import { LineChart } from 'components/common/LineChart'
import { useMemo } from 'react'
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

  const collectedQuarters = dataset.map((d) => d.quarter || '') // collected quarters (possibly skipping 1 or some quarters)
  const filledQuarters = fillQuarters(collectedQuarters) // after filling gap or expanding

  const filledDataset = useMemo(() => {
    // among the records from data (possibly skipping a quarter)
    // get the index of the first quarter from left to right that has any field > 0
    // meaning all the left side of this has all field = 0
    let firstCollectedIndex: number = -1
    for (let i = 0; i < dataset.length; i++) {
      if (dataset[i].avg && dataset[i].avg! > 0) {
        firstCollectedIndex = i
        break
      }
    }

    // among the records from data (possibly skipping a quarter)
    // get the index of the first quarter from right to left that has any field > 0
    // meaning all the right side of this has all field = 0
    let lastCollectedIndex: number = -1
    for (let i = dataset.length - 1; i >= 0; i--) {
      if (dataset[i].avg && dataset[i].avg! > 0) {
        lastCollectedIndex = i
        break
      }
    }

    return filledQuarters.map((q, i) => {
      if (collectedQuarters.includes(q)) {
        // quarters that already appears in the data
        if (
          firstCollectedIndex > -1 &&
          lastCollectedIndex > -1 &&
          firstCollectedIndex <= collectedQuarters.indexOf(q) &&
          collectedQuarters.indexOf(q) <= lastCollectedIndex
          // check if is in the range of the 2 index got above
          // so that we slice all the empty quarters outside the has-data-quarter-interval
        ) {
          return dataset[collectedQuarters.indexOf(q)]
        }
      }

      // otherwise (quarters that were filled)
      if (
        i >= filledQuarters.indexOf(collectedQuarters[firstCollectedIndex]) &&
        i <= filledQuarters.indexOf(collectedQuarters[lastCollectedIndex])
        // check if this quarter if inside the has-data-quarter-interval
        // a bit complex since we are working between to quarters arrays
        // Collected: e.g. _______, q4/2021, _______, q2/2022
        // Filled:    e.g. q3/2021, q4/2021, q1/2022, q2/2022
      ) {
        // fill with the record with data of 0
        return {
          quarter: q,
          avg: 0,
          trend: {
            avg: 0,
          },
        }
      }

      // other cases, outside of the has-data-quarter-interval
      return {
        quarter: q,
      }
    })
  }, [collectedQuarters, dataset, filledQuarters])

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
      isAnimationActive={(dataset || []).length >= 4}
    />
  )
}
