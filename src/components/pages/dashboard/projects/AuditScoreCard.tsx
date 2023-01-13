import { Card as AntCard, Col, Space, Tabs } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import {
  getTrendScoreColor,
  getTrendStatusColor,
  getTrendByPercentage,
} from 'utils/score'
import { StatisticBlock } from '../StatisticBlock'
import { AuditScoreAverageChart } from './AuditScoreAverageChart'

const mockAuditScoreAvgData: { project: any; auditScore: any[] } = {
  // TODO: update type
  project: {
    id: '8dc3be2e-19a4-4942-8a79-56db391a0b15',
    name: 'Fortress',
    type: 'dwarves',
    status: 'active',
    code: 'fortress',
  },
  auditScore: [
    {
      quarter: 'Q3/2022',
      value: 1,
      trend: null,
    },
    {
      quarter: 'Q4/2022',
      value: 3,
      trend: 200,
    },
    {
      quarter: 'Q1/2023',
      value: 2,
      trend: -33.33,
    },
    {
      quarter: 'Q2/2023',
      value: 1.5,
      trend: -25,
    },
  ],
}

const Card = styled(AntCard)`
  .ant-card-extra {
    padding: 0;
    width: 130px;
    min-width: 100px;
  }
`

export const AuditScoreCard = () => {
  const [currentTab, setCurrentTab] = useState<string>('average')
  const dataset = mockAuditScoreAvgData.auditScore

  return (
    <Col span={12}>
      <Card
        bodyStyle={{
          height: '100%',
          fontSize: 16,
        }}
        title="Audit Score"
        extra={
          <Tabs
            defaultActiveKey="average"
            items={[
              {
                key: 'average',
                label: `Average`,
              },
              {
                key: 'group',
                label: `Group`,
              },
            ]}
            onTabClick={setCurrentTab}
          />
        }
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
          {currentTab === 'average' ? (
            <Space direction="vertical" size={12}>
              {dataset.length > 2 ? (
                <StatisticBlock
                  stat={dataset[dataset.length - 1].value}
                  postfix={getTrendByPercentage(
                    dataset[dataset.length - 2].value,
                    dataset[dataset.length - 1].value,
                    dataset[dataset.length - 1].trend,
                  )}
                  statColor={getTrendScoreColor(
                    'workload',
                    dataset[dataset.length - 2].value,
                    dataset[dataset.length - 1].value,
                  )}
                  postfixColor={getTrendStatusColor(
                    dataset[dataset.length - 1].trend,
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
                <AuditScoreAverageChart dataset={dataset} />
              </div>
            </Space>
          ) : null}
        </div>
      </Card>
    </Col>
  )
}
