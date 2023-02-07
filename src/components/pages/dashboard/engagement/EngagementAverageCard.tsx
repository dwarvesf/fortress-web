import { Card, Col, Divider, Row, Space } from 'antd'
import { CSSProperties, useMemo } from 'react'
import styled from 'styled-components'
import { theme } from 'styles'
import {
  ViewEngagementDashboard,
  ViewEngagementDashboardDetail,
} from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { StatisticBlock } from '../StatisticBlock'
import { EngagementAverageChart } from './EngagementAverageChart'

interface Props {
  data: ViewEngagementDashboard
  detail?: ViewEngagementDashboardDetail
  currentQuarter: string
  setCurrentQuarter: (currentQuarter: string) => void
  filterCategory: string
  style?: CSSProperties
}

const CardLabel = styled.div`
  font-size: 15px;
`

const EngagementFeedbacksRow = ({
  data,
}: {
  data: { label: string; value: number }[]
}) => {
  return (
    <Space
      direction="vertical"
      split={<Divider style={{ margin: 0 }} />}
      style={{ width: '100%', fontSize: 13 }}
    >
      {data.map((d) => (
        <Row style={{ width: '100%' }} justify="space-between" key={d.label}>
          <Col>
            <span style={{ color: theme.colors.gray500 }}>{d.label}</span>
          </Col>
          <Col>
            <span>{d.value}</span>
          </Col>
        </Row>
      ))}
    </Space>
  )
}

export const EngagementAverageCard = (props: Props) => {
  const {
    data,
    detail,
    style,
    currentQuarter,
    setCurrentQuarter,
    filterCategory,
    ...rest
  } = props

  const currentQuarterData = useMemo(() => {
    const currentData = data.stats?.find((d) => d.title === currentQuarter)

    return currentData
  }, [currentQuarter, data])

  return (
    <Card
      style={{ height: '100%', ...style }}
      {...rest}
      bodyStyle={{
        height: '100%',
        fontSize: 16,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          gap: 12,
        }}
      >
        <strong>{data.content || '-'}</strong>

        <Space direction="vertical" size={12}>
          <StatisticBlock
            stat={Number(currentQuarterData?.point?.toFixed(1) || 0)}
            postfix="/5"
          />

          <CardLabel>Avg. score of the whole company</CardLabel>

          <div
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
            }}
          >
            <EngagementAverageChart
              data={data}
              {...{ currentQuarter, setCurrentQuarter }}
            />
          </div>

          <CardLabel>
            Avg. score by{' '}
            <strong>{capitalizeFirstLetter(filterCategory)}</strong>
          </CardLabel>
          <EngagementFeedbacksRow
            data={
              detail?.stats?.map((each) => ({
                label: each.field || '-',
                value: each.point || 0,
              })) || []
            }
          />
        </Space>
      </div>
    </Card>
  )
}
