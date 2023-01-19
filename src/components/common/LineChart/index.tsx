import { CSSProperties, ReactElement } from 'react'
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart as Chart,
  Legend,
} from 'recharts'
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart'
import { AxisDomain, DataKey } from 'recharts/types/util/types'

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
  lineDataKeys?: (string | DataKey<any>)[]
  customToolTip?: ReactElement
  strokeColors: string[]
  hasLegend?: boolean
  customLegendRenderer?: (props: any) => JSX.Element
  linesOpacity?: Record<string, number>
}

export const LineChart = (props: Props) => {
  const {
    width,
    minWidth,
    height,
    minHeight,
    dataset = [],
    lineDataKeys,
    xAxisDataKey,
    xAxisTicks,
    xAxisTick,
    xAxisDomain = [''],
    xAxisStyle,
    yAxisDataKey,
    yAxisTicks,
    yAxisDomain,
    yAxisStyle,
    customToolTip,
    strokeColors,
    hasLegend = false,
    customLegendRenderer,
    linesOpacity,
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
        {hasLegend && (
          <Legend verticalAlign="top" content={customLegendRenderer} />
        )}

        {customToolTip ? <Tooltip content={customToolTip} /> : <Tooltip />}

        {typeof lineDataKeys === 'string' ? (
          <Line
            dataKey={lineDataKeys!}
            stroke={strokeColors[0]}
            strokeWidth={1.5}
            animationDuration={600}
          />
        ) : (
          ((lineDataKeys as (string | DataKey<any>)[]) || []).map((k, i) => (
            <Line
              dataKey={k!}
              stroke={strokeColors[i % strokeColors.length]}
              strokeWidth={1.5}
              animationDuration={600}
              opacity={linesOpacity ? linesOpacity[String(k)] : 1}
            />
          ))
        )}
      </Chart>
    </ResponsiveContainer>
  )
}
