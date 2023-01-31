import { Icon } from '@iconify/react'
import { Card, Col, Row, Space, Spin } from 'antd'
import { chartTrendColors } from 'constants/colors'
import { useMemo, useCallback } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  TooltipProps,
  LegendProps,
  CartesianAxisProps,
} from 'recharts'
import { theme } from 'styles'
import { ViewActionItemTrend, ViewAuditActionItemReport } from 'types/schema'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'
import { capitalizeFirstLetter } from 'utils/string'

interface Props {
  data: ViewAuditActionItemReport[]
  isLoading: boolean
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<string | number, string>) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((total, each) => total + Number(each.value), 0)
    return (
      <Card
        bordered={false}
        bodyStyle={{
          padding: 12,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <strong>{label}</strong>
        {payload.map((data) => (
          <Row
            key={data.dataKey}
            align="middle"
            gutter={5}
            style={{ marginTop: 3 }}
          >
            <Col
              style={{
                width: 16,
                height: 16,
                background: data.color,
                marginRight: 5,
              }}
            />
            <Col>{data.value}</Col>
            <Col>({((Number(data.value) / total) * 100).toFixed(0)}%)</Col>
          </Row>
        ))}
      </Card>
    )
  }
  return null
}

const CustomLegend = ({ payload }: LegendProps) => {
  return (
    <Space
      style={{ width: '100%', justifyContent: 'space-evenly', marginTop: 10 }}
    >
      {payload?.map((data) => (
        <Row key={data.value} align="middle">
          <div
            style={{
              width: 16,
              height: 16,
              background: data.color,
              marginRight: 5,
            }}
          />
          <div>{capitalizeFirstLetter(data.value)}</div>
        </Row>
      ))}
    </Space>
  )
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

export const AuditEventsCard = (props: Props) => {
  const { data, isLoading } = props

  const dataset = useMemo(() => data || [], [data])

  const customLegendRenderer = useCallback(
    (props: any) => {
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
                  width: 120,
                }}
              >
                <Icon
                  icon="material-symbols:square"
                  color={entry.color}
                  style={{ fontSize: 20, marginRight: 2 }}
                />
                <span>
                  {capitalizeFirstLetter(entry.value).replace('-', ' ')}
                </span>
                {dataset !== null && dataset.length > 1 ? (
                  <span
                    style={{
                      color: getTrendStatusColor(
                        (dataset[dataset.length - 1].trend || {})[
                          payload[index].dataKey as keyof ViewActionItemTrend
                        ] || 0,
                      ),
                      fontSize: 12,
                    }}
                  >
                    {getTrendByPercentage(
                      (dataset[dataset.length - 1].trend || {})[
                        payload[index].dataKey as keyof ViewActionItemTrend
                      ] || 0,
                    )}
                  </span>
                ) : null}
              </span>
            )
          })}
        </div>
      )
    },
    [dataset],
  )

  const renderProjectsSizes = useMemo(() => {
    if (isLoading) {
      return (
        <Spin
          size="large"
          style={{
            padding: 16,
            height: 300,
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
        <ResponsiveContainer width="100%" height={300} minWidth={320}>
          <BarChart data={dataset} margin={{ left: 4, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" />

            <Legend verticalAlign="top" content={customLegendRenderer} />

            <XAxis
              dataKey="quarter"
              tickLine={false}
              tick={
                <CustomAxisTick
                  currentEvent={dataset[dataset.length - 1]?.quarter || ''}
                />
              }
              domain={['']}
            />
            <YAxis
              width={40}
              tickLine={false}
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              fontSize={13}
            />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={<CustomTooltip />}
            />

            <Legend content={<CustomLegend />} />

            {(dataset.length > 1 && dataset[dataset.length - 1].trend
              ? (Object.keys(
                  dataset[dataset.length - 1].trend || {},
                ) as string[])
              : []
            ).map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={Object.values(chartTrendColors)[i]}
                maxBarSize={40}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }, [customLegendRenderer, dataset, isLoading])

  return (
    <Card
      title="Audit Events"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        overflow: 'auto',
      }}
    >
      {renderProjectsSizes}
    </Card>
  )
}
