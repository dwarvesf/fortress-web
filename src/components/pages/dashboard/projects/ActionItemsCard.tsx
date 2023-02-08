import { Card, Select, Spin, Tag } from 'antd'
import { chartTrendColors } from 'constants/colors'
import { useMemo, useState } from 'react'
import {
  Bar,
  ComposedChart,
  CartesianAxisProps,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  TooltipProps,
  Line,
} from 'recharts'
import { theme } from 'styles'
import { ViewActionItemSquashReport } from 'types/schema'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'
import { capitalizeFirstLetter } from 'utils/string'

interface Props {
  data: ViewActionItemSquashReport
  isLoading: boolean
}

const CustomTooltip = (record: TooltipProps<any, any>) => {
  if (record.active && record.payload?.length) {
    const item = record.payload[0]

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
          <span style={{ color: theme.colors.gray700 }} key={item.dataKey}>
            {item.payload.trend === null ? (
              <strong
                style={{
                  color:
                    item?.value !== 0
                      ? theme.colors.primary
                      : theme.colors.gray700,
                }}
              >
                {item?.value === 0 ? '-' : item?.value}
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
                  {item?.value === 0 ? '-' : item?.value}
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
        </div>
      </Card>
    )
  }

  return null
}

const CustomXAxisTick = ({
  x,
  y,
  payload,
  currentEvent,
}: CartesianAxisProps & {
  payload?: any
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

const CustomYAxisTick = ({
  x,
  y,
  payload,
}: CartesianAxisProps & {
  payload?: any
}) => {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{
        fontWeight: 400,
        fontSize: 12,
      }}
    >
      <text
        role="button"
        x={0}
        y={0}
        dy={4}
        textAnchor="start"
        fill={theme.colors.primary}
      >
        {payload.value}%
      </text>
    </g>
  )
}

export const ActionItemsCard = (props: Props) => {
  const { data, isLoading } = props

  const [activeTab, setActiveTab] = useState<string>('all')

  const dataset = useMemo(
    () => data[activeTab as keyof ViewActionItemSquashReport] || [],
    [activeTab, data],
  )

  const renderProjectsActionItems = useMemo(() => {
    if (isLoading) {
      return (
        <Spin
          size="large"
          style={{
            padding: 16,
            height: 260,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )
    }

    return (
      <div
        style={{
          marginLeft: -10,
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        <ResponsiveContainer width="100%" height={260} minWidth={400}>
          <ComposedChart
            data={dataset}
            margin={{ left: 4, right: 12, top: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="snapDate"
              tickLine={false}
              tick={
                <CustomXAxisTick
                  currentEvent={dataset[dataset.length - 1]?.snapDate || ''}
                />
              }
              domain={['']}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              width={40}
              tickLine={false}
              fontSize={13}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              width={40}
              tickLine={false}
              fontSize={13}
              tick={<CustomYAxisTick />}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={<CustomTooltip />}
            />
            <Bar
              dataKey="value"
              fill={Object.values(chartTrendColors)[0]}
              stackId="a"
              maxBarSize={40}
              yAxisId="left"
            />
            <Line
              dataKey="trend"
              stroke={theme.colors.primary}
              strokeWidth={1.5}
              animationDuration={600}
              yAxisId="right"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    )
  }, [dataset, isLoading])

  return (
    <Card
      title="Action Items"
      style={{ height: '100%' }}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
      }}
    >
      <Select
        loading={isLoading}
        style={{ width: 100, alignSelf: 'end' }}
        value={activeTab}
        onChange={setActiveTab}
        options={Object.keys(data || {}).map((key) => {
          return {
            label: capitalizeFirstLetter(key),
            value: key,
          }
        })}
      />
      {renderProjectsActionItems}
    </Card>
  )
}
