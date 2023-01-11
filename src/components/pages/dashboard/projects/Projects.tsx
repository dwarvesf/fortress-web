import { Card, Col, Row } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import { ProjectSizeProps } from 'pages/dashboard'
import { useState } from 'react'
import { ProjectSizePieChart } from './ProjectSizePieChart'
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

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24} xl={{ span: 8 }}>
          <Card title="Project Size" bodyStyle={{ padding: 8 }}>
            <div
              style={{
                overflowX: 'auto',
                overflowY: 'hidden',
              }}
            >
              <ProjectSizePieChart
                data={mockProjectSizeData}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={setSelectedProjectId}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 16,
        }}
      >
        {['workload', 'deadline', 'learning'].map((k) => (
          <WorkSurveyDomainCard
            dataset={mockWorkSurveyData.workSurveys}
            domain={k as Exclude<DomainTypes, 'engagement'>}
          />
        ))}
      </div>
    </>
  )
}

export default Projects
