import { Card } from 'antd'
import { LineChart } from 'components/common/LineChart'
import { CartesianAxisProps, TooltipProps } from 'recharts'
import { theme } from 'styles'
import { ViewEngagementDashboard } from 'types/schema'

interface Props {
  data: ViewEngagementDashboard
  currentQuarter: string
  setCurrentQuarter: (currentQuarter: string) => void
}

const CustomAxisTick = ({
  x,
  y,
  payload,
  currentQuarter,
  setCurrentQuarter,
}: CartesianAxisProps & {
  payload?: any // TODO: update type
  currentQuarter: string
  setCurrentQuarter: (currentQuarter: string) => void
}) => {
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{
        cursor: 'pointer',
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
              <span>Average: </span>
              <strong style={{ color: theme.colors.primary }}>
                {Number(item.value || 0).toFixed(1)}
              </strong>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return null
}

export const EngagementAverageChart = (props: Props) => {
  const { data, currentQuarter, setCurrentQuarter } = props

  return (
    <LineChart
      width="100%"
      height={230}
      minWidth={320}
      dataset={(data.stats || []).sort(
        (a, b) =>
          new Date(a.startDate || 0).getTime() -
          new Date(b.startDate || 0).getTime(),
      )}
      lineDataKeys={['point']}
      xAxisDataKey="title"
      xAxisTick={<CustomAxisTick {...{ currentQuarter, setCurrentQuarter }} />}
      yAxisProps={{ width: 30 }}
      customToolTip={<CustomTooltip />}
    />
  )
}
