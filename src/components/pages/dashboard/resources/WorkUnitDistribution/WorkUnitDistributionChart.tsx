import { Card, Col, Row, Space } from 'antd'
import { UserAvatar } from 'components/common/AvatarWithName'
import { chartColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
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
import { ViewBasicEmployeeInfo } from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'

interface ToTalType {
  development?: number
  management?: number
  training?: number
  learning?: number
}

type RecordType = ToTalType & {
  id?: string
  employee?: ViewBasicEmployeeInfo
}

const CustomTooltip = ({
  active,
  payload,
  label,
  data,
}: TooltipProps<string | number, string> & { data: RecordType[] }) => {
  if (active && payload && payload.length) {
    const user = data.find((each) => each.employee?.id === label)?.employee

    return (
      <Card
        bordered={false}
        bodyStyle={{
          padding: 12,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <UserAvatar user={user!} isLink={false} />
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
            <Col>{capitalizeFirstLetter(data.name)}</Col>
            <Col>({data.value}%)</Col>
          </Row>
        ))}
      </Card>
    )
  }
  return null
}

const CustomLegend = ({
  payload,
  total,
}: LegendProps & { total: ToTalType }) => {
  return (
    <Space
      style={{ width: '100%', justifyContent: 'space-evenly', marginTop: 10 }}
    >
      {payload?.map((data) => (
        <Row key={data.value}>
          <div
            style={{
              width: 16,
              height: 16,
              background: data.color,
              margin: '3px 6px 3px 0',
            }}
          />
          <div>
            <div style={{ fontWeight: '500' }}>
              {capitalizeFirstLetter(data.value)}
            </div>
            <div>{total[data.value as keyof ToTalType]}%</div>
          </div>
        </Row>
      ))}
    </Space>
  )
}

const CustomTick = ({
  payload,
  data,
  chartHeight,
  verticalAnchor,
  visibleTicksCount,
  tickFormatter,
  ...props
}: Record<string, any> & { data: RecordType[]; chartHeight: number }) => {
  const { push } = useRouter()
  const employee = data.find(
    (each) => each.employee?.id === payload.value,
  )?.employee

  if (chartHeight && payload.coordinate > chartHeight) {
    return null
  }

  return (
    <g>
      <text {...props}>
        <tspan
          dx={-30}
          dy="0.355em"
          onClick={() => push(ROUTES.EMPLOYEE_DETAIL(employee?.username!))}
        >
          <a>{employee?.displayName}</a>
        </tspan>
      </text>
      <foreignObject x={props.x - 24} y={props.y - 12} width={24} height={24}>
        <img
          src={employee?.avatar}
          alt=""
          width={24}
          height={24}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        />
      </foreignObject>
    </g>
  )
}

const CustomShape = ({
  chartHeight,
  ...props
}: Record<string, any> & { chartHeight: number }) => {
  const { fill, x, y, width, height } = props
  if (chartHeight && y > chartHeight) return null
  const customHeight = Math.max(
    y + height > chartHeight ? chartHeight - y : height,
    0,
  )
  return <rect {...{ x, y, width, height: customHeight }} fill={fill} />
}

interface Props {
  data: RecordType[]
  total: ToTalType
}

export const WorkUnitDistributionChart = ({ data, total }: Props) => {
  const maxDisplayItems = 5
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 })
  const [padding, setPadding] = useState({ top: 0, bottom: 0 })

  const onWheel = (delta: number) => {
    const { top, bottom } = padding
    if (top - delta > 0) {
      setPadding({
        top: 0,
        bottom: bottom + top,
      })
    } else if (bottom + delta > 0) {
      setPadding({
        top: top + bottom,
        bottom: 0,
      })
    } else {
      setPadding({
        top: top - delta,
        bottom: bottom + delta,
      })
    }
  }

  useEffect(() => {
    const paddingBottom =
      (chartSize.height / maxDisplayItems) * data.length - chartSize.height
    if (paddingBottom) {
      setPadding({ top: 0, bottom: -paddingBottom })
    }
  }, [chartSize.height, data.length])

  useEffect(() => {
    const cancelWheel = (e: WheelEvent) =>
      wheelTimeout.current && e.preventDefault()
    document.body.addEventListener('wheel', cancelWheel, { passive: false })
    return () => document.body.removeEventListener('wheel', cancelWheel)
  }, [])

  return (
    <div
      onWheel={(e) => {
        if (wheelTimeout.current) {
          clearTimeout(wheelTimeout.current)
        }
        // flag indicating to lock page scrolling (setTimeout returns a number)
        wheelTimeout.current = setTimeout(() => {
          wheelTimeout.current = null
        }, 300)
        onWheel(e.deltaY)
      }}
    >
      <ResponsiveContainer width="100%" height={300} minWidth={450}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickLine={false} />
          <YAxis
            dataKey="employee.id"
            type="category"
            tickLine={false}
            axisLine={false}
            tick={<CustomTick data={data} chartHeight={chartSize.height} />}
            width={150}
            padding={padding}
          />
          <Tooltip
            cursor={
              <rect
                x={151 + chartSize.width}
                y={
                  (-padding.top /
                    ((chartSize.height / maxDisplayItems) * data.length)) *
                  chartSize.height
                }
                rx={4}
                ry={4}
                width={8}
                height={(maxDisplayItems / data.length) * chartSize.height}
                fill="#ccc"
              />
            }
            content={<CustomTooltip data={data} />}
          />
          <Legend content={<CustomLegend total={total} />} />
          {['development', 'management', 'training', 'learning'].map(
            (key, i) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={Object.values(chartColors)[i]}
                barSize={15}
                shape={<CustomShape chartHeight={chartSize.height} />}
                ref={(ref: any) => {
                  const { width, height } = ref?.props || {}
                  if (
                    width &&
                    height &&
                    (chartSize.width !== width || chartSize.height !== height)
                  ) {
                    setChartSize({ width, height })
                  }
                }}
              />
            ),
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
