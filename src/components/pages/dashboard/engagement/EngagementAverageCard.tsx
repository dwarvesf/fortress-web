import { Card, Col, Divider, Row, Space } from 'antd'
import { EngagementAverageProps } from 'pages/dashboard'
import { CSSProperties, Dispatch, SetStateAction, useMemo } from 'react'
import styled from 'styled-components'
import { theme } from 'styles'
import { capitalizeFirstLetter } from 'utils/string'
import { StatisticBlock } from '../StatisticBlock'
import { EngagementAverageChart } from './EngagementAverageChart'

interface Props {
  data: EngagementAverageProps
  currentQuarter: string
  setCurrentQuarter: Dispatch<SetStateAction<string>>
  filterCategory: string
  style?: CSSProperties
}

const CardLabel = styled.div`
  font-size: 15px;
  margin-bottom: 8px;
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
    style,
    currentQuarter,
    setCurrentQuarter,
    filterCategory,
    ...rest
  } = props

  const currentQuarterData = useMemo(() => {
    const currentData = data.dataset?.find((d) => d.name === currentQuarter)

    return currentData
  }, [currentQuarter, data])

  return (
    <Card
      style={{ width: '30%', flexGrow: 1, ...style }}
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
        <strong>{data?.question || '-'}</strong>

        <Space direction="vertical" size={12}>
          <StatisticBlock
            stat={Number(currentQuarterData?.average?.toFixed(1) || 0)}
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
              currentQuarter={currentQuarter}
              setCurrentQuarter={setCurrentQuarter}
            />
          </div>

          <CardLabel>
            Avg. score by{' '}
            <strong>{capitalizeFirstLetter(filterCategory)}</strong>
          </CardLabel>
          <EngagementFeedbacksRow
            data={[
              {
                label: 'Design',
                value: currentQuarterData?.feedbacks?.design || 0,
              },
              {
                label: 'Operation',
                value: currentQuarterData?.feedbacks?.operation || 0,
              },
              {
                label: 'Engineering',
                value: currentQuarterData?.feedbacks?.engineering || 0,
              },
            ]}
          />
        </Space>
      </div>
    </Card>
  )
}
