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
  outerRadius,
  fill,
  percent,
}: PieLabelRenderProps) => {
  const sin = Math.sin(-Number(midAngle) * RADIAN)
  const cos = Math.cos(-Number(midAngle) * RADIAN)
  const startX = Number(cx) + Number(outerRadius) * cos
  const startY = Number(cy) + Number(outerRadius) * sin
  const middleX = Number(cx) + (Number(outerRadius) + 10) * cos
  const middleY = Number(cy) + (Number(outerRadius) + 12) * sin
  const endX = middleX + (cos >= 0 ? 1 : -1) * 10
  const endY = middleY

  return (
    <g>
      <path
        d={`M${startX},${startY}L${middleX},${middleY}L${endX},${endY}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={endX} cy={endY} r={2} fill={fill} stroke="none" />
      <text
        x={endX >= Number(cx) ? endX + 20 : endX - 20}
        y={endY >= Number(cy) ? endY + 12 : endY - 4.5}
        textAnchor="middle"
        fill={theme.colors.gray600}
        style={{
          userSelect: 'none',
          fontSize: 13,
        }}
      >
        {name.length > 10 ? `${name.slice(0, 8)}...` : name}
      </text>
      <text
        x={endX >= Number(cx) ? endX + 20 : endX - 20}
        y={endY >= Number(cy) ? endY + 24 : endY + 7.5}
        textAnchor="middle"
        fill={theme.colors.gray500}
        style={{
          userSelect: 'none',
          fontSize: 10,
        }}
      >
        {`(${(Number(percent) * 100).toFixed(0)}%)`}
      </text>
    </g>
  )
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
          outerRadius={111}
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
