import { Card, Space, Spin } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import { useMemo } from 'react'
import { theme } from 'styles'
import { ViewWorkSurveysData } from 'types/schema'
import { getTrendByPercentage, getTrendScoreColor } from 'utils/score'
import { capitalizeFirstLetter } from 'utils/string'
import { StatisticBlock } from '../StatisticBlock'
import { WorkSurveyDomainChart } from './WorkSurveyDomainChart'

interface Props {
  data: ViewWorkSurveysData
  domain: Exclude<DomainTypes, 'engagement'>
  isLoading: boolean
}

export const WorkSurveyDomainCard = (props: Props) => {
  const { data, domain, isLoading } = props

  const dataset = useMemo(() => data?.workSurveys || [], [data?.workSurveys])

  const renderWorkSurveyStatistic = useMemo(() => {
    if (isLoading) {
      return (
        <span style={{ lineHeight: 1, display: 'flex', alignItems: 'end' }}>
          <Spin
            style={{
              height: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </span>
      )
    }

    if (dataset.length === 0) {
      return <StatisticBlock statColor={theme.colors.gray700} />
    }

    if (dataset.length === 1) {
      return (
        <StatisticBlock
          stat={(dataset[dataset.length - 1][domain] || 0).toFixed(1)}
          statColor={theme.colors.gray700}
        />
      )
    }

    if (dataset.length > 1) {
      return (
        <StatisticBlock
          stat={(dataset[dataset.length - 1][domain] || 0).toFixed(1)}
          postfix={getTrendByPercentage(
            dataset[dataset.length - 1].trend![domain] || 0,
          )}
          statColor={theme.colors.gray700}
          postfixColor={getTrendScoreColor(
            domain,
            dataset[dataset.length - 1][domain] || 0,
            dataset[dataset.length - 2][domain],
          )}
        />
      )
    }
  }, [dataset, domain, isLoading])

  return (
    <Card
      bodyStyle={{
        height: '100%',
        fontSize: 16,
      }}
      title={capitalizeFirstLetter(domain)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          gap: 12,
          overflow: 'auto',
        }}
      >
        <Space direction="vertical" size={12}>
          {renderWorkSurveyStatistic}

          <div
            style={{
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
            }}
          >
            <WorkSurveyDomainChart
              dataset={dataset}
              dataKey={domain}
              isLoading={isLoading}
            />
          </div>
        </Space>
      </div>
    </Card>
  )
}
