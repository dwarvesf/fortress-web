import { Card, Empty, Spin } from 'antd'
import { Dispatch, SetStateAction, useMemo } from 'react'
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
  const dataset = useMemo(() => data?.data || [], [data])

  const renderProjectsSizes = useMemo(() => {
    if (isLoading) {
      return (
        <Spin
          size="large"
          style={{
            padding: 16,
            height: 330,
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
            height: 330,
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
  }, [dataset, isLoading, selectedProjectId, setSelectedProjectId])

  return (
    <Card title="Project Size" bodyStyle={{ padding: 8 }}>
      <div
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {renderProjectsSizes}
      </div>
    </Card>
  )
}
