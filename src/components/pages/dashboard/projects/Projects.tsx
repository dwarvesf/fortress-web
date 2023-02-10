import { Col, Row } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import { useState } from 'react'
import { getTrendByPercentage, getTrendStatusColor } from 'utils/score'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { GET_PATHS, client } from 'libs/apis'
import { ViewAudit, ViewEngineeringHealth } from 'types/schema'
import { theme } from 'styles'
import { StatisticBlock } from '../StatisticBlock'
import { CardWithTabs } from './CardWithTabs'
import { AverageDatasetChart } from './AverageDatasetChart'
import { ProjectSizeCard } from './ProjectSizeCard'
import { WorkSurveyDomainCard } from './WorkSurveyDomainCard'
import { GroupDatasetChart } from './GroupDatasetChart'
import { AuditEventsCard } from './AuditEventsCard'
import { WorkStatusSummaryCard } from './WorkStatusSummaryCard'
import { ActionItemsCard } from './ActionItemsCard'

const averageDatasetRenderer = (
  dataset: (ViewAudit | ViewEngineeringHealth)[],
) => {
  const datasetArray = dataset || []

  const statisticBlockRenderer = () => {
    if (datasetArray.length === 0) {
      return <StatisticBlock statColor={theme.colors.gray700} />
    }
    if (datasetArray.length === 1) {
      return (
        <StatisticBlock
          stat={
            (datasetArray[datasetArray.length - 1].avg || 0) >= 1
              ? (datasetArray[datasetArray.length - 1].avg || 1).toFixed(1)
              : undefined
          }
          statColor={theme.colors.gray700}
        />
      )
    }
    if (datasetArray.length > 1) {
      return (
        <StatisticBlock
          stat={
            (datasetArray[datasetArray.length - 1].avg || 0) >= 1
              ? (datasetArray[datasetArray.length - 1].avg || 1).toFixed(1)
              : undefined
          }
          statColor={theme.colors.gray700}
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

const groupDatasetRenderer = (dataset: any) => {
  const datasetArray = dataset || []

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <GroupDatasetChart
        dataKeys={
          datasetArray.length > 0 && datasetArray[0].trend
            ? (Object.keys(datasetArray[0].trend) as string[])
            : []
        }
        dataset={datasetArray}
      />
    </div>
  )
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

  const { data: auditEventsData, loading: isAuditEventsLoading } =
    useFetchWithCache(
      [GET_PATHS.getProjectsAuditEvents, selectedProjectId],
      () => client.getProjectsAuditEvents(selectedProjectId),
    )

  const { data: projectsSummaryData, loading: isProjectsSummaryLoading } =
    useFetchWithCache([GET_PATHS.getProjectsSummary], () =>
      client.getProjectsSummary(),
    )

  const {
    data: projectsActionItemSquashData,
    loading: isProjectsActionItemSquashLoading,
  } = useFetchWithCache(
    [GET_PATHS.getProjectsActionItemSquash, selectedProjectId],
    () => client.getProjectsActionItemSquash(selectedProjectId),
  )

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24} xl={{ span: 8 }}>
          <ProjectSizeCard
            data={projectsSizesData || {}}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            isLoading={isProjectsSizesLoading}
          />
        </Col>
        <Col span={24} xl={{ span: 16 }}>
          <WorkStatusSummaryCard
            data={projectsSummaryData?.data || {}}
            isLoading={isProjectsSummaryLoading}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {['workload', 'deadline', 'learning'].map((k) => (
          <Col span={24} lg={{ span: 8 }} key={k}>
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
          fetcher={() => client.getProjectsAuditScore(selectedProjectId)}
          childrenRenderers={[averageDatasetRenderer, groupDatasetRenderer]}
        />
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24} xl={{ span: 8 }}>
          <AuditEventsCard
            data={auditEventsData?.data || []}
            isLoading={isAuditEventsLoading}
          />
        </Col>
        <Col span={24} xl={{ span: 16 }}>
          <ActionItemsCard
            data={projectsActionItemSquashData?.data || {}}
            isLoading={isProjectsActionItemSquashLoading}
          />
        </Col>
      </Row>
    </>
  )
}

export default Projects
