import { Card, Space } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import {
  getTrendByPercentage,
  getTrendScoreColor,
  getTrendStatusColor,
} from 'utils/score'
import { capitalizeFirstLetter } from 'utils/string'
import { StatisticBlock } from '../StatisticBlock'
import { WorkSurveyDomainAreaChart } from './WorkSurveyDomainAreaChart'

interface Props {
  dataset: any[] // TODO: update type
  domain: DomainTypes
}

export const WorkSurveyDomainCard = (props: Props) => {
  const { dataset, domain } = props

  return (
    <Card
      style={{
        width: '30%',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
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
        }}
      >
        <Space direction="vertical" size={12}>
          {dataset.length > 2 ? (
            <StatisticBlock
              stat={dataset[dataset.length - 1][domain]}
              postfix={getTrendByPercentage(
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
            />
          ) : null}

          <div
            style={{
              width: '100%',
              overflowX: 'auto',
              overflowY: 'hidden',
            }}
          >
            <WorkSurveyDomainAreaChart dataset={dataset} dataKey={domain} />
          </div>
        </Space>
      </div>
    </Card>
  )
}
