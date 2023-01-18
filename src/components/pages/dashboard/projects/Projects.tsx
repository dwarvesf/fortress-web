import { Col, Row } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import { useState } from 'react'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { GET_PATHS, client } from 'libs/apis'
import { ViewAudit, ViewEngineeringHealth } from 'types/schema'
import { StatisticBlock } from '../StatisticBlock'
import { CardWithTabs } from './CardWithTabs'
import { AverageDatasetChart } from './AverageDatasetChart'
import { ProjectSizeCard } from './ProjectSizeCard'
import { WorkSurveyDomainCard } from './WorkSurveyDomainCard'

const mockAuditScoreAvgData: {
  data: {
    average: any[]
    groups: any
  }
} = {
  data: {
    average: [
      {
        quarter: 'Q3/2022',
        avg: 1,
        trend: null,
      },
      {
        quarter: 'Q4/2022',
        avg: 3,
        trend: 200,
      },
      {
        quarter: 'Q1/2023',
        avg: 2,
        trend: -33.33,
      },
      {
        quarter: 'Q2/2023',
        avg: 1.5,
        trend: -25,
      },
    ],
    groups: {
      collaboration: [
        {
          quarter: 'Q3/2022',
          avg: 1,
          trend: null,
        },
        {
          quarter: 'Q4/2022',
          avg: 3,
          trend: 200,
        },
        {
          quarter: 'Q1/2023',
          avg: 2,
          trend: -33.33,
        },
        {
          quarter: 'Q2/2023',
          avg: 1.5,
          trend: -25,
        },
      ],
      delivery: [
        {
          quarter: 'Q3/2022',
          avg: 1,
          trend: null,
        },
        {
          quarter: 'Q4/2022',
          avg: 3,
          trend: 200,
        },
        {
          quarter: 'Q1/2023',
          avg: 2,
          trend: -33.33,
        },
        {
          quarter: 'Q2/2023',
          avg: 1.5,
          trend: -25,
        },
      ],
      feedback: [
        {
          quarter: 'Q3/2022',
          avg: 1,
          trend: null,
        },
        {
          quarter: 'Q4/2022',
          avg: 3,
          trend: 200,
        },
        {
          quarter: 'Q1/2023',
          avg: 2,
          trend: -33.33,
        },
        {
          quarter: 'Q2/2023',
          avg: 1.5,
          trend: -25,
        },
      ],
      quality: [
        {
          quarter: 'Q3/2022',
          avg: 1,
          trend: null,
        },
        {
          quarter: 'Q4/2022',
          avg: 3,
          trend: 200,
        },
        {
          quarter: 'Q1/2023',
          avg: 2,
          trend: -33.33,
        },
        {
          quarter: 'Q2/2023',
          avg: 1.5,
          trend: -25,
        },
      ],
    },
  },
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

  const averageDatasetRenderer = (
    dataset: (ViewAudit | ViewEngineeringHealth)[],
  ) => {
    const datasetArray = dataset || []

    const statisticBlockRenderer = () => {
      if (datasetArray.length === 0) {
        return <StatisticBlock />
      }
      if (datasetArray.length === 1) {
        return (
          <StatisticBlock
            stat={(datasetArray[datasetArray.length - 1].avg || 0).toFixed(1)}
          />
        )
      }
      if (datasetArray.length > 1) {
        return (
          <StatisticBlock
            stat={(datasetArray[datasetArray.length - 1].avg || 0).toFixed(1)}
            postfix={getTrendByPercentage(
              datasetArray[datasetArray.length - 1].trend || 0,
            )}
            postfixColor={getTrendStatusColor(
              datasetArray[datasetArray.length - 1].trend || 0,
            )}
          />
        )
      }
    }

    return (
      <>
        {statisticBlockRenderer()}

        <div
          style={{
            width: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          <AverageDatasetChart dataset={datasetArray} />
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
          groupKey="engineering-health"
          title="Engineering Health"
          tabTitles={['average', 'groups']}
          selectedProjectId={selectedProjectId}
          fetcher={() =>
            client.getProjectsEngineeringHealthScore(selectedProjectId)
          }
          childrenRenderers={[averageDatasetRenderer, groupDatasetRenderer]}
        />

        <CardWithTabs
          groupKey="audit-score"
          title="Audit Score"
          tabTitles={['average', 'groups']}
          selectedProjectId={selectedProjectId}
          fetcher={async () => mockAuditScoreAvgData}
          childrenRenderers={[averageDatasetRenderer, groupDatasetRenderer]}
        />
      </Row>
    </>
  )
}

export default Projects
