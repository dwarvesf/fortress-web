import { Card, Empty, Spin } from 'antd'
import { Dispatch, SetStateAction } from 'react'
import { ModelProjectSize } from 'types/schema'
import { ProjectSizeChart } from './ProjectSizeChart'

interface Props {
  data: ModelProjectSize[]
  selectedProjectId: string
  setSelectedProjectId: Dispatch<SetStateAction<string>>
  isLoading: boolean
}

export const ProjectSizeCard = (props: Props) => {
  const { data, selectedProjectId, setSelectedProjectId, isLoading } = props

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
    if (!isLoading && data.length === 0) {
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
        data={data}
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
