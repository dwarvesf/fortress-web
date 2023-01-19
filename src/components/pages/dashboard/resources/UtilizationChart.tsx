import { Card, Col, Row, Space } from 'antd'
import { chartTrendColors } from 'constants/colors'
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
import { capitalizeFirstLetter } from 'utils/string'

const data = [
  {
    name: '08/2022',
    staffed: 58,
    shadow: 8,
    available: 5,
  },
  {
    name: '09/2022',
    staffed: 65,
    shadow: 8,
    available: 2,
  },
  {
    name: '10/2022',
    staffed: 65,
    shadow: 5,
    available: 5,
  },
  {
    name: '11/2022',
    staffed: 56,
    shadow: 8,
    available: 6,
  },
  {
    name: '12/2022',
    staffed: 60,
    shadow: 10,
    available: 6,
  },
  {
    name: '01/2023',
    staffed: 52,
    shadow: 6,
    available: 4,
  },
  {
    name: '02/2023',
    staffed: 58,
    shadow: 10,
    available: 7,
  },
]

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
        <strong>{label}</strong>
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

export const UtilizationChart = () => {
  return (
    <Card title="Resource Utilization">
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        <ResponsiveContainer width="100%" height={350} minWidth={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickLine={false} />
            <YAxis width={40} tickLine={false} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              content={<CustomTooltip />}
            />
            <Legend content={<CustomLegend />} />
            {['staffed', 'shadow', 'available'].map((key, i) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={Object.values(chartTrendColors)[i]}
                maxBarSize={40}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
