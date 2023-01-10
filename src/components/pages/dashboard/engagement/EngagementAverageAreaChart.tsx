import { Card } from 'antd'
import { AreaChart } from 'components/common/AreaChart'
import { EngagementAverageProps } from 'pages/dashboard'
import { Dispatch, SetStateAction } from 'react'
import { CartesianAxisProps, TooltipProps } from 'recharts'
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
  payload?: any // TODO: update type
  currentQuarter: string
  setCurrentQuarter: Dispatch<SetStateAction<string>>
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

export const EngagementAverageAreaChart = (props: Props) => {
  const { data, currentQuarter, setCurrentQuarter } = props

  return (
    <AreaChart
      width="100%"
      height={230}
      minWidth={320}
      dataset={(data.dataset || []).slice(-4)}
      lineDataKey="average"
      xAxisDataKey="name"
      xAxisTick={
        <CustomAxisTick
          currentQuarter={currentQuarter}
          setCurrentQuarter={setCurrentQuarter}
        />
      }
      yAxisTicks={[1, 3, 5]}
      yAxisDomain={[0, 5]}
      customToolTip={<CustomTooltip />}
    />
  )
}
