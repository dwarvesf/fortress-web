import { CSSProperties, ReactElement } from 'react'
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart as Chart,
} from 'recharts'
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart'
import { AxisDomain, DataKey } from 'recharts/types/util/types'
import { theme } from 'styles'

interface AxisProps {
  xAxisDataKey?: string
  xAxisTicks?: (string | number)[]
  xAxisTick?: ReactElement
  xAxisDomain?: AxisDomain
  xAxisStyle?: CSSProperties
  yAxisDataKey?: string
  yAxisTicks?: (string | number)[]
  yAxisDomain?: AxisDomain
  yAxisStyle?: CSSProperties
}

interface Props
  extends AxisProps,
    Omit<CategoricalChartProps, 'width' | 'height'> {
  width: string | number
  minWidth?: string | number
  height: string | number
  minHeight?: string | number
  dataset?: any[]
  lineDataKey?: string | DataKey<any>
  customToolTip?: ReactElement
}

export const AreaChart = (props: Props) => {
  const {
    width,
    minWidth,
    height,
    minHeight,
    dataset = [],
    lineDataKey,
    xAxisDataKey,
    xAxisTicks,
    xAxisTick,
    xAxisDomain,
    xAxisStyle,
    yAxisDataKey,
    yAxisTicks,
    yAxisDomain,
    yAxisStyle,
    customToolTip,
    ...rest
  } = props

  return (
    <ResponsiveContainer
      width={width}
      height={height}
      minWidth={minWidth}
      minHeight={minHeight}
    >
      <Chart
        data={dataset}
        style={{
          marginLeft: -10,
        }}
        {...rest}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xAxisDataKey}
          ticks={xAxisTicks}
          tick={xAxisTick}
          tickLine={false}
          height={30}
          domain={xAxisDomain}
          style={xAxisStyle}
        />
        <YAxis
          dataKey={yAxisDataKey}
          type="number"
          ticks={yAxisTicks}
          domain={yAxisDomain}
          tickLine={false}
          fontSize={13}
          width={26}
          style={yAxisStyle}
        />
        {customToolTip ? <Tooltip content={customToolTip} /> : <Tooltip />}

        <Area
          type="monotone"
          dataKey={lineDataKey!}
          stroke={theme.colors.primary}
          strokeWidth={2}
          fill={theme.colors.pink200}
        />
      </Chart>
    </ResponsiveContainer>
  )
}
