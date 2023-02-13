import { chartColors } from 'constants/colors'
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
  XAxisProps,
  YAxisProps,
} from 'recharts'
import { CategoricalChartProps } from 'recharts/types/chart/generateCategoricalChart'
import { AxisDomain, DataKey } from 'recharts/types/util/types'

interface AxisProps {
  xAxisDataKey?: string
  xAxisTicks?: (string | number)[]
  xAxisTick?: ReactElement
  xAxisDomain?: AxisDomain
  xAxisStyle?: CSSProperties
  xAxisProps?: XAxisProps
  yAxisDataKey?: string
  yAxisTicks?: (string | number)[]
  yAxisDomain?: AxisDomain
  yAxisStyle?: CSSProperties
  yAxisProps?: YAxisProps
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
  hasLegend?: boolean
  customLegendRenderer?: (props: any) => JSX.Element
  linesOpacity?: Record<string, number>
  isAnimationActive?: boolean
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
    xAxisProps,
    yAxisDataKey,
    yAxisTicks = [0, 1, 2, 3, 4, 5],
    yAxisDomain = [0, 5],
    yAxisStyle,
    yAxisProps,
    customToolTip,
    hasLegend = false,
    customLegendRenderer,
    linesOpacity,
    isAnimationActive = true,
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
        margin={{ left: 12, right: 16, top: hasLegend ? 0 : 14 }}
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
          {...xAxisProps}
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
          {...yAxisProps}
        />
        {hasLegend && (
          <Legend verticalAlign="top" content={customLegendRenderer} />
        )}

        {customToolTip ? <Tooltip content={customToolTip} /> : <Tooltip />}

        {typeof lineDataKeys === 'string' ? (
          <Line
            dataKey={lineDataKeys!}
            stroke={Object.values(chartColors)[0]}
            strokeWidth={1.75}
            animationDuration={600}
            isAnimationActive={isAnimationActive}
          />
        ) : (
          ((lineDataKeys as (string | DataKey<any>)[]) || []).map((k, i) => (
            <Line
              key={String(k!)}
              dataKey={k!}
              stroke={
                Object.values(chartColors)[
                  i % Object.values(chartColors).length
                ]
              }
              strokeWidth={1.75}
              animationDuration={600}
              opacity={linesOpacity ? linesOpacity[String(k)] : 1}
              isAnimationActive={isAnimationActive}
            />
          ))
        )}
      </Chart>
    </ResponsiveContainer>
  )
}
