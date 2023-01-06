import { Card, Col, Divider, Row, Space } from 'antd'
import { EngagementAverageProps } from 'pages/dashboard'
import { CSSProperties, Dispatch, SetStateAction, useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  CartesianAxisProps,
} from 'recharts'
import styled from 'styled-components'
import { theme } from 'styles'
import { capitalizeFirstLetter } from 'utils/string'
import { StatisticBlock } from '../StatisticBlock'

interface Props {
  data: EngagementAverageProps
  currentQuarter: string
  setCurrentQuarter: Dispatch<SetStateAction<string>>
  filterCategory: string
  style?: CSSProperties
}

const CardLabel = styled.div`
  margin-bottom: 8px;
`

const CustomizedAxisTick = ({
  x,
  y,
  payload,
  currentQuarter,
  setCurrentQuarter,
}: CartesianAxisProps & {
  payload?: any
  currentQuarter: string
  setCurrentQuarter: Dispatch<SetStateAction<string>>
}) => {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        fontWeight: currentQuarter === payload.value ? 600 : 400,
        fontSize: 14,
      }}
    >
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fill={theme.colors.gray700}
        onClick={() => setCurrentQuarter(payload.value)}
      >
        {payload.value}
      </text>
    </g>
  )
}
const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload?.length) {
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
        <div>
          {payload.map((item) => (
            <div key={item.dataKey}>
              <span> Average: </span>
              <strong style={{ color: theme.colors.primary }}>
                {item.value}
              </strong>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return null
}

const EngagementFeedbacksRow = ({
  data,
}: {
  data: { label: string; value: number }[]
}) => {
  return (
    <Space
      direction="vertical"
      split={<Divider style={{ margin: 0 }} />}
      style={{ width: '100%', fontSize: 14 }}
    >
      {data.map((d) => (
        <Row style={{ width: '100%' }} justify="space-between">
          <Col>
            <span style={{ color: theme.colors.gray500 }}>{d.label}</span>
          </Col>
          <Col>
            <span>{d.value}</span>
          </Col>
        </Row>
      ))}
    </Space>
  )
}

export const EngagementAverageCard = (props: Props) => {
  const {
    data,
    style,
    currentQuarter,
    setCurrentQuarter,
    filterCategory,
    ...rest
  } = props

  const currentQuarterData = useMemo(() => {
    const currentData = data.dataset?.find((d) => d.name === currentQuarter)

    return currentData
  }, [currentQuarter, data])

  return (
    <Card
      style={{ width: '30%', flexGrow: 1, ...style }}
      {...rest}
      bodyStyle={{
        height: '100%',
        fontSize: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          gap: 12,
        }}
      >
        <strong>{data?.question || 'a'}</strong>

        <Space direction="vertical" size={12}>
          <StatisticBlock
            stat={currentQuarterData?.average || 0}
            postfix="/5"
          />

          <CardLabel>Avg. score of the whole company</CardLabel>

          <div
            style={{
              overflowX: 'visible',
              overflowY: 'hidden',
            }}
          >
            <ResponsiveContainer width="100%" height={230} minWidth={320}>
              <LineChart data={(data?.dataset || []).slice(-4)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={
                    <CustomizedAxisTick
                      currentQuarter={currentQuarter}
                      setCurrentQuarter={setCurrentQuarter}
                    />
                  }
                  tickLine={false}
                  padding={{ left: 12 }}
                  height={30}
                />
                <YAxis
                  type="number"
                  ticks={[1, 3, 5]}
                  domain={[0, 5]}
                  tickLine={false}
                  fontSize={14}
                  width={14}
                />
                <Tooltip content={<CustomTooltip />} />

                <Line
                  type="monotone"
                  dataKey="average"
                  stroke={theme.colors.primary}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <CardLabel>
            Avg. score by{' '}
            <strong>{capitalizeFirstLetter(filterCategory)}</strong>
          </CardLabel>
          <EngagementFeedbacksRow
            data={[
              {
                label: 'Design',
                value: currentQuarterData?.feedbacks?.design || 0,
              },
              {
                label: 'Operation',
                value: currentQuarterData?.feedbacks?.operation || 0,
              },
              {
                label: 'Engineering',
                value: currentQuarterData?.feedbacks?.engineering || 0,
              },
            ]}
          />
        </Space>
      </div>
    </Card>
  )
}
