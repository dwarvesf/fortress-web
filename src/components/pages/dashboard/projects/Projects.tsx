import { Card, Col, Row } from 'antd'
import { ProjectSizeProps } from 'pages/dashboard'
import { useState } from 'react'
import { ProjectSizePieChart } from './ProjectSizePieChart'

const mockData: ProjectSizeProps = {
  dataset: [
    { id: '1', name: 'Fortress', value: 400 },
    { id: '2', name: 'Setel', value: 350 },
    { id: '3', name: 'SP Digital', value: 275 },
    { id: '4', name: 'Konvoy', value: 225 },
    { id: '5', name: 'iCrosschain', value: 200 },
    { id: '6', name: 'Droppii', value: 150 },
  ],
}

const Projects = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('')

  return (
    <Row gutter={[8, 8]}>
      <Col span={24} xl={{ span: 8 }}>
        <Card title="Project Size" bodyStyle={{ padding: 8 }}>
          <div
            style={{
              overflowX: 'auto',
              overflowY: 'hidden',
            }}
          >
            <ProjectSizePieChart
              data={mockData}
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
            />
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default Projects
