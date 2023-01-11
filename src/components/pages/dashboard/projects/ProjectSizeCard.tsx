import { Card } from 'antd'
import { ProjectSizeProps } from 'pages/dashboard'
import { Dispatch, SetStateAction } from 'react'
import { ProjectSizeChart } from './ProjectSizeChart'

interface Props {
  data: ProjectSizeProps
  selectedProjectId: string
  setSelectedProjectId: Dispatch<SetStateAction<string>>
}

export const ProjectSizeCard = (props: Props) => {
  const { data, selectedProjectId, setSelectedProjectId } = props

  return (
    <Card title="Project Size" bodyStyle={{ padding: 8 }}>
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        <ProjectSizeChart
          data={data}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
        />
      </div>
    </Card>
  )
}
