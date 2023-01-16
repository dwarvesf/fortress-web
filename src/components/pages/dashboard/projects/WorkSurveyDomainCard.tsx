import { Icon } from '@iconify/react'
import { Card, Space, Spin } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import { useMemo } from 'react'
import {
  getTrendByPercentage,
  getTrendScoreColor,
  getTrendStatusColor,
} from 'utils/score'
import { capitalizeFirstLetter } from 'utils/string'
import { StatisticBlock } from '../StatisticBlock'
import { WorkSurveyDomainChart } from './WorkSurveyDomainChart'

interface Props {
  data: { project: any; workSurveys: any[] } // TODO: update type
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

    if (dataset.length === 1) {
      return (
        <StatisticBlock
          stat={dataset[dataset.length - 1][domain]}
          postfix={<Icon icon="ic:baseline-minus" />}
          statColor={getTrendScoreColor(
            domain,
            0,
            dataset[dataset.length - 1][domain],
          )}
        />
      )
    }

    if (dataset.length > 1) {
      return (
        <StatisticBlock
          stat={dataset[dataset.length - 1][domain]}
          postfix={getTrendByPercentage(
            dataset[dataset.length - 2][domain],
            dataset[dataset.length - 1][domain],
            dataset[dataset.length - 1].trend[domain],
          )}
          statColor={getTrendScoreColor(
            domain,
            dataset[dataset.length - 2][domain],
            dataset[dataset.length - 1][domain],
          )}
          postfixColor={getTrendStatusColor(
            dataset[dataset.length - 1].trend[domain],
          )}
          isLoading={isLoading}
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
