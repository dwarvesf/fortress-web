import { Avatar, Card, Col, Row, Space } from 'antd'
import { AvatarArray } from 'components/common/AvatarArray'
import { ProjectAvatar, UserAvatar } from 'components/common/AvatarWithName'
import { chartColors } from 'constants/colors'
import { ROUTES } from 'constants/routes'
import { WorkUnitType, workUnitTypes } from 'constants/workUnitTypes'
import Link from 'next/link'
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
import {
  ViewSummaryWorkUnitDistributionData,
  ViewWorkUnitDistribution,
} from 'types/schema'
import { capitalizeFirstLetter, getFirstLetterCapitalized } from 'utils/string'

const YAxisSize = 150
const maxDisplayItems = 8

const CustomTooltip = ({
  active,
  payload,
  label,
  data,
  tooltip,
}: TooltipProps<string | number, string> & {
  data: ViewWorkUnitDistribution[]
  tooltip: WorkUnitType
}) => {
  if (active && payload && payload.length) {
    const { development, management, learning, training } =
      data.find((each) => each.employee?.id === label) || {}
    const item = payload.find((each) => each.dataKey === tooltip)

    return (
      <Card
        bordered={false}
        bodyStyle={{
          padding: 12,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Row align="middle" gutter={5}>
          <Col
            style={{
              width: 16,
              height: 16,
              background: item?.color,
              marginRight: 5,
            }}
          />
          <Col>{capitalizeFirstLetter(item?.name)}</Col>
          <Col>({item?.value})</Col>
        </Row>
        <Space direction="vertical" style={{ paddingLeft: 21, paddingTop: 10 }}>
          {tooltip === 'development' &&
            development?.workUnits?.map((each) => (
              <div key={`development_${each.project?.id}_${each.workUnitName}`}>
                <ProjectAvatar
                  project={each.project!}
                  renderName={(name) => name}
                />{' '}
                - {each.workUnitName}
              </div>
            ))}
          {tooltip === 'management' &&
            management?.workUnits?.map((each) => (
              <div
                key={`management_workUnits_${each.project?.id}_${each.workUnitName}`}
              >
                <ProjectAvatar
                  project={each.project!}
                  renderName={(name) => name}
                />{' '}
                - {each.workUnitName}
              </div>
            ))}
          {tooltip === 'management' &&
            management?.projectHeads?.map((each) => (
              <div
                key={`management_projectHeads_${each.project?.id}_${each.position}`}
              >
                <ProjectAvatar
                  project={each.project!}
                  renderName={(name) => name}
                />{' '}
                - {each.position}
              </div>
            ))}
          {tooltip === 'learning' &&
            learning?.workUnits?.map((each) => (
              <div key={`learning_${each.project?.id}_${each.workUnitName}`}>
                <ProjectAvatar
                  project={each.project!}
                  renderName={(name) => name}
                />{' '}
                - {each.workUnitName}
              </div>
            ))}
          {tooltip === 'training' && training?.mentees?.length && (
            <>
              <div>Mentor:</div>
              {training.mentees.slice(0, 3).map((each) => (
                <div key={`training_${each.username}`}>
                  <UserAvatar user={each} isLink={false} />
                </div>
              ))}
              {training.mentees.length > 3 && (
                <AvatarArray data={training.mentees.slice(3)} />
              )}
            </>
          )}
          {tooltip === 'training' && training?.workUnits?.length && (
            <>
              <div>Training:</div>
              <ul style={{ paddingLeft: 30 }}>
                {training.workUnits.map((each) => (
                  <li key={`training_${each.workUnitName}`}>
                    {each.workUnitName}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Space>
      </Card>
    )
  }
  return null
}

const CustomLegend = ({
  payload,
  summary,
}: LegendProps & { summary: ViewSummaryWorkUnitDistributionData }) => {
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
            <div>
              {summary[data.value as keyof ViewSummaryWorkUnitDistributionData]}
              %
            </div>
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
}: Record<string, any> & {
  data: ViewWorkUnitDistribution[]
  chartHeight: number
}) => {
  const employee = data.find(
    (each) => each.employee?.id === payload.value,
  )?.employee

  if (chartHeight && payload.coordinate > chartHeight) {
    return null
  }

  return (
    <foreignObject
      x={props.x - YAxisSize}
      y={props.y - 12}
      width={YAxisSize}
      height={24}
    >
      <Space
        align="center"
        style={{ width: '100%', justifyContent: 'flex-end' }}
      >
        <Link href={ROUTES.EMPLOYEE_DETAIL(employee?.username!)}>
          <a
            className="styled"
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            {employee?.displayName}
          </a>
        </Link>
        <Avatar
          src={employee?.avatar}
          size={24}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
        >
          {!employee?.avatar && (
            <span style={{ fontSize: 16 }}>
              {getFirstLetterCapitalized(
                employee?.displayName || employee?.fullName,
              )}
            </span>
          )}
        </Avatar>
      </Space>
    </foreignObject>
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
  data: ViewWorkUnitDistribution[]
  summary: ViewSummaryWorkUnitDistributionData
}

export const WorkUnitDistributionChart = ({ data, summary }: Props) => {
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 })
  const [padding, setPadding] = useState({ top: 0, bottom: 0 })
  const [tooltip, setTooltip] = useState<WorkUnitType>()

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
      <ResponsiveContainer width="100%" height={380} minWidth={450}>
        <BarChart
          data={data.map((each) => ({
            ...each,
            development: each.development?.total,
            learning: each.learning?.total,
            management: each.management?.total,
            training: each.training?.total,
          }))}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" tickLine={false} />
          <YAxis
            dataKey="employee.id"
            type="category"
            tickLine={false}
            axisLine={false}
            tick={<CustomTick data={data} chartHeight={chartSize.height} />}
            width={YAxisSize}
            padding={padding}
          />
          <Tooltip
            cursor={
              maxDisplayItems / data.length < 1 ? (
                <rect
                  x={YAxisSize + 1 + chartSize.width}
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
              ) : (
                false
              )
            }
            content={
              tooltip ? (
                <CustomTooltip data={data} tooltip={tooltip} />
              ) : (
                () => null
              )
            }
          />
          <Legend content={<CustomLegend summary={summary} />} />
          {Object.keys(workUnitTypes).map((key, i) => (
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
              onMouseOver={() => setTooltip(key as WorkUnitType)}
              onMouseOut={() => setTooltip(undefined)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
