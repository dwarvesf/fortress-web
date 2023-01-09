import { Card } from 'antd'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  PieLabelRenderProps,
  Tooltip,
  TooltipProps,
} from 'recharts'
import { theme } from 'styles'

interface Props {
  data: any // TODO: add type
  selectedProjectId: string
  setSelectedProjectId: Dispatch<SetStateAction<string>>
}

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  name,
  midAngle,
  outerRadius,
}: PieLabelRenderProps) => {
  const radius = Number(outerRadius) * 1.25
  const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN)
  const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN)

  return (
    <g>
      <text
        x={x}
        y={y}
        textAnchor={x > Number(cx) ? 'start' : 'end'}
        fill={theme.colors.gray600}
        style={{
          userSelect: 'none',
          fontSize: 13,
        }}
      >
        {name.length > 10 ? `${name.slice(0, 8)}...` : name}
      </text>
    </g>
  )
}

const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
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
        <div>
          {payload.map((item) => (
            <div key={item.dataKey}>
              <strong>{item.name}</strong>
              <br />
              <span>Size: </span>
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

const getPieSectorFillColor = (
  payloadId: string,
  selectedProjectId: string,
) => {
  if (selectedProjectId === '') {
    return theme.colors.primary
  }
  if (selectedProjectId === payloadId) {
    return theme.colors.primary
  }
  return theme.colors.pink200
}

export const ProjectSizePieChart = (props: Props) => {
  const { data, selectedProjectId, setSelectedProjectId } = props
  const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true)

  return (
    <ResponsiveContainer width="100%" height={350} minWidth={370}>
      <PieChart height={400} style={{ cursor: 'default' }}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label={renderCustomizedLabel}
          outerRadius={100}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          onClick={(a) => {
            if (selectedProjectId === a.id) {
              setSelectedProjectId('')
            } else {
              setSelectedProjectId(a.id)
            }
          }}
          style={{ cursor: 'pointer' }}
          onAnimationEnd={() => setIsFirstRendering(false)}
          // only runs animation first time,
          // when a pie is selected, the chart runs animation again and cause labels to fade and appear again
          isAnimationActive={isFirstRendering}
        >
          {data.map((payload: { id: string }) => (
            <Cell
              key={payload.id}
              fill={getPieSectorFillColor(payload.id, selectedProjectId)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Sector />
      </PieChart>
    </ResponsiveContainer>
  )
}
