import { chartColors } from 'constants/colors'
import { ReactElement } from 'react'
import {
  ResponsiveContainer,
  PieChart as Chart,
  Pie,
  Cell,
  Sector,
  Tooltip,
  PieLabelRenderProps,
} from 'recharts'
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart'
import { DataKey } from 'recharts/types/util/types'
import { theme } from 'styles'

interface Props extends Omit<CategoricalChartProps, 'width' | 'height'> {
  width: string | number
  minWidth?: string | number
  height: string | number
  minHeight?: string | number
  dataset?: any[]
  customLabelRenderer?: ({
    cx,
    cy,
    name,
    midAngle,
    outerRadius,
  }: PieLabelRenderProps) => JSX.Element
  pieDataKey: string | DataKey<any>
  customToolTip?: ReactElement
  onPieClick?: (() => void) | ((a: any) => void)
  selectedPieId?: string
}

const RADIAN = Math.PI / 180

const renderCustomizedLabel = ({
  cx,
  cy,
  name,
  midAngle,
  outerRadius: baseOuterRadius,
  payload,
  percent,
}: PieLabelRenderProps) => {
  let outerRadius

  if (percent! < 0.2) {
    outerRadius = Number(baseOuterRadius) + 5.0
  } else {
    outerRadius = Number(baseOuterRadius)
  }

  const sin = Math.sin(-Number(midAngle) * RADIAN)
  const cos = Math.cos(-Number(midAngle) * RADIAN)
  const startX = Number(cx) + (Number(baseOuterRadius) - 1.5) * cos
  const startY = Number(cy) + (Number(baseOuterRadius) - 1.5) * sin
  const middleX = Number(cx) + (Number(outerRadius) - 1.5 + 10) * cos
  const middleY = Number(cy) + (Number(outerRadius) - 1.5 + 12) * sin
  const endX = middleX + (cos >= 0 ? 1.1 : -1.1) * 10
  const endY = middleY

  return percent! >= 0.1 ? (
    <g>
      <path
        d={`M${startX},${startY}L${middleX},${middleY}L${endX},${endY}`}
        stroke={theme.colors.gray500}
        strokeWidth={1.25}
        fill="none"
      />
      <circle
        cx={endX}
        cy={endY}
        r={2.5}
        fill={theme.colors.gray500}
        stroke="none"
      />
      <text
        x={endX >= Number(cx) ? endX + 5.0 : endX - 5.0}
        y={endY - 2.75}
        textAnchor={endX >= Number(cx) ? 'start' : 'end'}
        fill={theme.colors.gray700}
        style={{
          userSelect: 'none',
          fontSize: 13,
          whiteSpace: 'pre-line',
        }}
      >
        <tspan>{name.length > 12 ? `${name.slice(0, 10)}...` : name}</tspan>
      </text>
      <text
        x={endX >= Number(cx) ? endX + 5.0 : endX - 5.0}
        y={endY + 9.5}
        textAnchor={endX >= Number(cx) ? 'start' : 'end'}
        fill={theme.colors.gray500}
        style={{
          userSelect: 'none',
          fontSize: 11,
        }}
      >
        size: {payload.payload.size}
      </text>
    </g>
  ) : null
}

const getPieSectorFillColor = (
  payloadId: string,
  selectedProjectId: string,
  colorIndex: number,
) => {
  if (selectedProjectId === '') {
    return chartColors[colorIndex % chartColors.length]
  }
  if (selectedProjectId === payloadId) {
    return chartColors[colorIndex % chartColors.length]
  }
  return `${chartColors[colorIndex % chartColors.length]}55`
}

export const PieChart = (props: Props) => {
  const {
    width,
    minWidth,
    height,
    minHeight,
    dataset = [],
    customLabelRenderer,
    pieDataKey,
    customToolTip,
    onPieClick,
    selectedPieId = '',
    ...rest
  } = props

  return (
    <ResponsiveContainer
      width={width}
      height={height}
      minWidth={minWidth}
      minHeight={minHeight}
    >
      <Chart height={400} style={{ cursor: 'default' }} {...rest}>
        <Pie
          data={dataset}
          cx="50%"
          cy="50%"
          label={customLabelRenderer || renderCustomizedLabel}
          innerRadius={65}
          outerRadius={110}
          dataKey={pieDataKey}
          startAngle={90}
          endAngle={-270}
          onClick={onPieClick}
          style={{ cursor: 'pointer' }}
          isAnimationActive={false}
          labelLine={false}
        >
          {dataset.map((payload: { id: string }, index) => (
            <Cell
              key={payload.id}
              fill={getPieSectorFillColor(payload.id, selectedPieId, index)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </Pie>

        {customToolTip ? <Tooltip content={customToolTip} /> : <Tooltip />}

        <Sector />
      </Chart>
    </ResponsiveContainer>
  )
}
