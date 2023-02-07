import { Card, Col, Row, Space } from 'antd'
import { chartTrendColors } from 'constants/colors'
import { MONTH_YEAR_FORMAT } from 'constants/date'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  LegendProps,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'
import { format } from 'utils/date'
import { capitalizeFirstLetter } from 'utils/string'

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<string | number, string>) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((total, each) => total + Number(each.value), 0)
    return (
      <Card
        bordered={false}
        bodyStyle={{
          padding: 12,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <strong>{format(label, MONTH_YEAR_FORMAT)}</strong>
        {payload.map((data) => (
          <Row
            key={data.dataKey}
            align="middle"
            gutter={5}
            style={{ marginTop: 3 }}
          >
            <Col
              style={{
                width: 16,
                height: 16,
                background: data.color,
                marginRight: 5,
              }}
            />
            <Col>{data.value}</Col>
            <Col>({((Number(data.value) / total) * 100).toFixed(0)}%)</Col>
          </Row>
        ))}
      </Card>
    )
  }
  return null
}

const CustomLegend = ({ payload }: LegendProps) => {
  return (
    <Space
      style={{ width: '100%', justifyContent: 'space-evenly', marginTop: 10 }}
    >
      {payload?.map((data) => (
        <Row key={data.value} align="middle">
          <div
            style={{
              width: 16,
              height: 16,
              background: data.color,
              marginRight: 5,
            }}
          />
          <div>{capitalizeFirstLetter(data.value)}</div>
        </Row>
      ))}
    </Space>
  )
}

const CustomTick = ({
  verticalAnchor,
  visibleTicksCount,
  tickFormatter,
  payload,
  ...props
}: any) => {
  const { x, y } = props
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        {...props}
        x={0}
        y={0}
        dx={-16}
        dy={20}
        transform="rotate(-45)"
        fontWeight={payload.index === 3 ? 700 : 400}
      >
        {format(payload.value, MONTH_YEAR_FORMAT)}
      </text>
    </g>
  )
}

const CustomShape = ({ tooltipPayload, tooltipPosition, ...props }: any) => {
  return <rect {...props} opacity={props.index === 3 ? 1 : 0.7} />
}

export const UtilizationChart = () => {
  const { data } = useFetchWithCache(GET_PATHS.getResourceUtilization, () =>
    client.getResourceUtilization(),
  )

  return (
    <Card
      title="Resource Utilization"
      style={{ height: 500, display: 'flex', flexDirection: 'column' }}
    >
      <div
        style={{
          marginLeft: -10,
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        <ResponsiveContainer width="100%" height={410} minWidth={300}>
          <BarChart data={data?.data} margin={{ left: 4, right: 12 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              fontSize={13}
              tickFormatter={() => ''}
              tick={<CustomTick />}
              height={60}
            />
            <YAxis width={40} tickLine={false} fontSize={13} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={<CustomTooltip />}
            />
            <Legend content={<CustomLegend />} />
            {['official', 'shadow', 'available'].map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={Object.values(chartTrendColors)[i]}
                maxBarSize={40}
                shape={<CustomShape />}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
