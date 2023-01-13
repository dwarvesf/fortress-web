import { Col, Row } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import { ProjectSizeProps } from 'pages/dashboard'
import { useState } from 'react'
import {
  getTrendByPercentage,
  getTrendScoreColor,
  getTrendStatusColor,
} from 'utils/score'
import { StatisticBlock } from '../StatisticBlock'
import { CardWithTabs } from './CardWithTabs'
import { AverageDatasetChart } from './AverageDatasetChart'
import { ProjectSizeCard } from './ProjectSizeCard'
import { WorkSurveyDomainCard } from './WorkSurveyDomainCard'

const mockProjectSizeData: ProjectSizeProps = {
  dataset: [
    { id: '1', name: 'Fortress', value: 400 },
    { id: '2', name: 'Setel', value: 350 },
    { id: '3', name: 'SP Digital', value: 275 },
    { id: '4', name: 'Konvoy', value: 225 },
    { id: '5', name: 'iCrosschain', value: 200 },
    { id: '6', name: 'Droppii', value: 150 },
  ],
}

const mockWorkSurveyData: { project: any; workSurveys: any[] } = {
  // TODO: update type
  project: {
    id: '8dc3be2e-19a4-4942-8a79-56db391a0b15',
    name: 'Fortress',
    type: 'dwarves',
    status: 'active',
    code: 'fortress',
  },
  workSurveys: [
    {
      endDate: '28/02',
      workload: 4.5,
      deadline: 2.5,
      learning: 1,
      trend: null,
    },
    {
      endDate: '21/02',
      workload: 3.2,
      deadline: 3.2,
      learning: 3.2,
      trend: {
        workload: -40.63,
        deadline: 21.88,
        learning: 220,
      },
    },
    {
      endDate: '07/02',
      workload: 3.2,
      deadline: 2.8,
      learning: 2.8,
      trend: {
        workload: 0,
        deadline: -14.29,
        learning: -14.29,
      },
    },
    {
      endDate: '23/01',
      workload: 5,
      deadline: 0,
      learning: 3.5,
      trend: {
        workload: 56.25,
        deadline: 0,
        learning: 25,
      },
    },
    {
      endDate: '09/01',
      workload: 3.5,
      deadline: 1,
      learning: 5,
      trend: {
        workload: -30,
        deadline: 0,
        learning: 42.86,
      },
    },
    {
      endDate: '01/01',
      workload: 2.5,
      deadline: 5,
      learning: 5,
      trend: {
        workload: -28.57,
        deadline: 400,
        learning: 0,
      },
    },
  ],
}

const mockEngineeringHealthAvgData: {
  project: any
  engineeringHealth: any[]
} = {
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

const mockAuditScoreAvgData: {
  project: any
  auditScore: any[]
} = {
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

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')

  const averageDatasetRenderer = (dataset: any[]) => {
    // TODO: update type
    return (
      <>
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
          <AverageDatasetChart dataset={dataset} />
        </div>
      </>
    )
  }

  const groupDatasetRenderer = () => null

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24} lg={{ span: 12 }} xl={{ span: 8 }}>
          <ProjectSizeCard
            data={mockProjectSizeData}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {['workload', 'deadline', 'learning'].map((k) => (
          <Col span={8} key={k}>
            <WorkSurveyDomainCard
              data={mockWorkSurveyData}
              domain={k as Exclude<DomainTypes, 'engagement'>}
            />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <CardWithTabs
          title="Engineering Health"
          tabKeys={['average', 'group']}
          fetchers={[
            async () => mockEngineeringHealthAvgData.engineeringHealth,
            async () => [],
          ]}
          swrKeys={['engineering-health-average', 'engineering-health-group']}
          childrenRenderers={[averageDatasetRenderer, groupDatasetRenderer]}
        />

        <CardWithTabs
          title="Audit Score"
          tabKeys={['average', 'group']}
          fetchers={[
            async () => mockAuditScoreAvgData.auditScore,
            async () => [],
          ]}
          swrKeys={['audit-score-average', 'audit-score-group']}
          childrenRenderers={[averageDatasetRenderer, groupDatasetRenderer]}
        />
      </Row>
    </>
  )
}

export default Projects
