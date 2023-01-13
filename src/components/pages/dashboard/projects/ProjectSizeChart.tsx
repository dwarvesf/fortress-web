import { Card } from 'antd'
import { PieChart } from 'components/common/PieChart'
import { Dispatch, SetStateAction } from 'react'
import { TooltipProps } from 'recharts'
import { theme } from 'styles'
import { ModelProjectSize } from 'types/schema'

interface Props {
  data: ModelProjectSize[]
  selectedProjectId: string
  setSelectedProjectId: Dispatch<SetStateAction<string>>
}

const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
  if (active && payload?.length) {
    return (
      <Card
        bordered={false}
        bodyStyle={{
          padding: 12,
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div>
          {payload.map((item) => (
            <div key={item.dataKey}>
              <strong>{item.name}</strong>
              <br />
              <span>Size: </span>
              <strong style={{ color: theme.colors.primary }}>
                {item.value}
              </strong>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return null
}

export const ProjectSizeChart = (props: Props) => {
  const { data, selectedProjectId, setSelectedProjectId } = props

  return (
    <PieChart
      width="100%"
      minWidth={370}
      height={350}
      dataset={data}
      pieDataKey="size"
      customToolTip={<CustomTooltip />}
      onPieClick={(a) => {
        if (selectedProjectId === a.id) {
          setSelectedProjectId('')
        } else {
          setSelectedProjectId(a.id)
        }
      }}
      selectedPieId={selectedProjectId}
    />
  )
}
