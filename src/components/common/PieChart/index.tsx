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
          outerRadius={100}
          dataKey={pieDataKey}
          startAngle={90}
          endAngle={-270}
          onClick={onPieClick}
          style={{ cursor: 'pointer' }}
          isAnimationActive={false}
        >
          {dataset.map((payload: { id: string }) => (
            <Cell
              key={payload.id}
              fill={getPieSectorFillColor(payload.id, selectedPieId)}
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
