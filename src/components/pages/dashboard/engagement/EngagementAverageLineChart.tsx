import { Card } from 'antd'
import { EngagementAverageProps } from 'pages/dashboard'
import { Dispatch, SetStateAction } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  CartesianAxisProps,
  TooltipProps,
} from 'recharts'
import { theme } from 'styles'

interface Props {
  data: EngagementAverageProps
  currentQuarter: string
  setCurrentQuarter: Dispatch<SetStateAction<string>>
}

const CustomAxisTick = ({
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

export const EngagementAverageLineChart = (props: Props) => {
  const { data, currentQuarter, setCurrentQuarter } = props

  return (
    <ResponsiveContainer width="100%" height={230} minWidth={320}>
      <LineChart
        data={(data?.dataset || []).slice(-4)}
        style={{
          marginLeft: -10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={
            <CustomAxisTick
              currentQuarter={currentQuarter}
              setCurrentQuarter={setCurrentQuarter}
            />
          }
          tickLine={false}
          height={30}
        />
        <YAxis
          type="number"
          ticks={[1, 3, 5]}
          domain={[0, 5]}
          tickLine={false}
          fontSize={13}
          width={26}
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
  )
}
