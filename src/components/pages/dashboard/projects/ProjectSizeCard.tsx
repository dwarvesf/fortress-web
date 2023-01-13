import { Card, Empty, Spin } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { ViewProjectSizeResponse } from 'types/schema'
import { ProjectSizeChart } from './ProjectSizeChart'

interface Props {
  data: ViewProjectSizeResponse
  selectedProjectId: string
  setSelectedProjectId: Dispatch<SetStateAction<string>>
  isLoading: boolean
}

export const ProjectSizeCard = (props: Props) => {
  const { data, selectedProjectId, setSelectedProjectId, isLoading } = props
  const dataset = data?.data || []

  const renderProjectsSizes = () => {
    if (isLoading) {
      return (
        <Spin
          size="large"
          style={{
            padding: 16,
            height: 350,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )
    }
    if (!isLoading && dataset.length === 0) {
      return (
        <Empty
          style={{
            padding: 16,
            height: 350,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )
    }
    return (
      <ProjectSizeChart
        dataset={dataset}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
      />
    )
  }

  return (
    <Card title="Project Size" bodyStyle={{ padding: 8 }}>
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {renderProjectsSizes()}
      </div>
    </Card>
  )
}
