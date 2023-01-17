import { Col, Row } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import { useState } from 'react'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { GET_PATHS, client } from 'libs/apis'
import { theme } from 'styles'

import { StatisticBlock } from '../StatisticBlock'
import { CardWithTabs } from './CardWithTabs'
import { AverageDatasetChart } from './AverageDatasetChart'
import { ProjectSizeCard } from './ProjectSizeCard'
import { WorkSurveyDomainCard } from './WorkSurveyDomainCard'

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

  const { data: projectsSizesData, loading: isProjectsSizesLoading } =
    useFetchWithCache(GET_PATHS.getProjectsSizes, () =>
      client.getProjectsSizes(),
    )

  const {
    data: projectsWorkSurveysData,
    loading: isProjectsWorkSurveysLoading,
  } = useFetchWithCache(
    [GET_PATHS.getProjectsWorkSurveysAverage, selectedProjectId],
    () => client.getProjectsWorkSurveysAverage(selectedProjectId),
  )

  const averageDatasetRenderer = (dataset: any[]) => {
    // TODO: update type
    return (
      <>
        {dataset.length > 2 ? (
          <StatisticBlock
            stat={dataset[dataset.length - 1].value.toFixed(1)}
            postfix={getTrendByPercentage(dataset[dataset.length - 1].trend)}
            statColor={theme.colors.gray700}
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
            data={projectsSizesData || {}}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            isLoading={isProjectsSizesLoading}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {['workload', 'deadline', 'learning'].map((k) => (
          <Col span={8} key={k}>
            <WorkSurveyDomainCard
              data={projectsWorkSurveysData?.data || {}}
              domain={k as Exclude<DomainTypes, 'engagement'>}
              isLoading={isProjectsWorkSurveysLoading}
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
