import { Card as AntCard, Col, Space, Tabs } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import {
  getTrendScoreColor,
  getTrendStatusColor,
  getTrendByPercentage,
} from 'utils/score'
import { StatisticBlock } from '../StatisticBlock'
import { EngineeringHealthAverageChart } from './EngineeringHealthAverageChart'

const mockEngineeringHealthAvgData: { project: any; engineeringHealth: any[] } =
  {
    // TODO: update type
    project: {
      id: '8dc3be2e-19a4-4942-8a79-56db391a0b15',
      name: 'Fortress',
      type: 'dwarves',
      status: 'active',
      code: 'fortress',
    },
    engineeringHealth: [
      {
        quarter: 'Q3/2022',
        value: 2.8,
        trend: null,
      },
      {
        quarter: 'Q4/2022',
        value: 1,
        trend: -64.29,
      },
      {
        quarter: 'Q1/2023',
        value: 2.5,
        trend: 150,
      },
      {
        quarter: 'Q2/2023',
        value: 4,
        trend: 60,
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

export const EngineeringHealthCard = () => {
  const [currentTab, setCurrentTab] = useState<string>('average')
  const dataset = mockEngineeringHealthAvgData.engineeringHealth

  return (
    <Col span={12}>
      <Card
        bodyStyle={{
          height: '100%',
          fontSize: 16,
        }}
        title="Engineering Health"
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
                <EngineeringHealthAverageChart dataset={dataset} />
              </div>
            </Space>
          ) : null}
        </div>
      </Card>
    </Col>
  )
}
