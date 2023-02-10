import { Icon } from '@iconify/react'
import { Card, Tag } from 'antd'
import { LineChart } from 'components/common/LineChart'
import { auditGroupNames, AuditGroupTypes } from 'constants/auditGroups'
import { useMemo, useState } from 'react'
import { CartesianAxisProps, TooltipProps } from 'recharts'
import { DataKey } from 'recharts/types/util/types'
import { theme } from 'styles'
import { ViewGroupAudit, ViewGroupEngineeringHealth } from 'types/schema'
import { fillQuarters } from 'utils/quarter'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'
import { capitalizeFirstLetter } from 'utils/string'

interface Props {
  type: AuditGroupTypes
  dataKeys:
    | (keyof ViewGroupAudit | keyof ViewGroupEngineeringHealth)[]
    | string[]
  dataset: any[]
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
              <div style={{ color: theme.colors.gray700 }} key={item.dataKey}>
                <span>{capitalizeFirstLetter(item.name)}: </span>
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
                    {getTrendByPercentage(
                      item.payload.trend[item.dataKey!],
                    ) && (
                      <Tag
                        style={{
                          color: getTrendStatusColor(
                            item.payload.trend[item.dataKey!],
                          ),
                          borderColor: getTrendStatusColor(
                            item.payload.trend[item.dataKey!],
                          ),
                          backgroundColor: `${getTrendStatusColor(
                            item.payload.trend[item.dataKey!],
                          )}08`,
                        }}
                      >
                        {getTrendByPercentage(
                          item.payload.trend[item.dataKey!],
                        )}
                      </Tag>
                    )}
                  </>
                )}
              </div>
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

export const GroupDatasetChart = (props: Props) => {
  // 'type' is used for checking whether it is Engineering Health or Audit group
  // to get the names relating to each group
  // 'delivery', 'quality',... for Engineering Health
  // 'frontend', 'backend',... for Audit
  const { type, dataKeys, dataset } = props

  const collectedQuarters = dataset.map((d) => d.quarter || '') // collected quarters (possibly skipping 1 or some quarters)
  const filledQuarters = fillQuarters(collectedQuarters) // after filling gap or expanding

  const filledDataset = useMemo(() => {
    // among the records from data (possibly skipping a quarter)
    // get the index of the first quarter from left to right that has any field > 0
    // meaning all the left side of this has all field = 0
    let firstCollectedIndex: number = -1
    for (let i = 0; i < dataset.length; i++) {
      if (dataKeys.find((k) => dataset[i][k] && dataset[i][k] > 0)) {
        firstCollectedIndex = i
        break
      }
    }

    // among the records from data (possibly skipping a quarter)
    // get the index of the first quarter from right to left that has any field > 0
    // meaning all the right side of this has all field = 0
    let lastCollectedIndex: number = -1
    for (let i = dataset.length - 1; i >= 0; i--) {
      if (dataKeys.find((k) => dataset[i][k] && dataset[i][k] > 0)) {
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
        const names = auditGroupNames[type]
        const namesObj: Record<string, number> = {}

        // generate record from audit group names with data of 0
        for (const name of names) {
          namesObj[name] = 0
        }

        return {
          quarter: q,
          ...namesObj,
          trend: {
            ...namesObj,
          },
        }
      }

      // other cases, outside of the has-data-quarter-interval
      return {
        quarter: q,
      }
    })
  }, [collectedQuarters, dataKeys, dataset, filledQuarters, type])

  const [linesOpacity, setLinesOpacity] = useState<Record<string, number>>(
    () => {
      const obj: Record<string, number> = {}

      ;(dataKeys || [])?.forEach((k: DataKey<any>) => {
        obj[String(k)] = 1
      })
      return obj
    },
  )
  const [selectedDataKey, setSelectedDataKey] = useState<string>('')

  const customLegendRenderer = (props: any) => {
    const { payload } = props

    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          paddingTop: 0,
          paddingBottom: 16,
          height: 'max-content',
        }}
      >
        {payload.map((entry: any, index: number) => {
          return (
            <span
              role="presentation"
              key={`item-${index}`}
              style={{
                marginLeft: 8,
                marginRight: 8,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                width: 153,
                opacity: linesOpacity[entry.dataKey] * 3,
              }}
              onMouseDown={() => {
                const { dataKey } = entry
                const obj: Record<string, number> = {}

                if (selectedDataKey === dataKey) {
                  ;(dataKeys || [])?.forEach((k: DataKey<any>) => {
                    obj[String(k)] = 1
                  })
                  setSelectedDataKey('')
                } else {
                  ;(dataKeys || [])?.forEach((k: DataKey<any>) => {
                    obj[String(k)] = 0.1
                  })
                  obj[dataKey] = 1
                  setSelectedDataKey(String(dataKey))
                }

                setLinesOpacity(obj)
              }}
            >
              <Icon
                icon="material-symbols:line-end-circle-outline"
                color={entry.color}
                style={{ fontSize: 15, marginRight: 2 }}
              />
              <span>
                {capitalizeFirstLetter(entry.value).replace('-', ' ')}
              </span>
              {dataset !== null && dataset.length > 1 ? (
                <span
                  style={{
                    color: getTrendStatusColor(
                      dataset[dataset.length - 1].trend[
                        payload[index].dataKey
                      ] || 0,
                    ),
                    fontSize: 12,
                  }}
                >
                  {getTrendByPercentage(
                    dataset[dataset.length - 1].trend[payload[index].dataKey] ||
                      0,
                  )}
                </span>
              ) : null}
            </span>
          )
        })}
      </div>
    )
  }

  return (
    <LineChart
      width="100%"
      height={302.59}
      minWidth={320}
      dataset={filledDataset}
      lineDataKeys={dataKeys}
      xAxisDataKey="quarter"
      xAxisTick={
        <CustomAxisTick
          currentEvent={dataset[dataset.length - 1]?.quarter || ''}
        />
      }
      customToolTip={<CustomTooltip />}
      hasLegend
      customLegendRenderer={customLegendRenderer}
      linesOpacity={linesOpacity}
      isAnimationActive={(dataset || []).length >= 4}
    />
  )
}
