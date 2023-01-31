import { Card } from 'antd'
import { PieChart } from 'components/common/PieChart'
import { Dispatch, SetStateAction } from 'react'
import { TooltipProps } from 'recharts'
import { theme } from 'styles'
import { ModelProjectSize } from 'types/schema'

interface Props {
  dataset: ModelProjectSize[]
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
              {item.value > 1 ? ' members' : ' member'}
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return null
}

export const ProjectSizeChart = (props: Props) => {
  const { dataset, selectedProjectId, setSelectedProjectId } = props

  return (
    <PieChart
      width="100%"
      minWidth={375}
      height={330}
      dataset={dataset}
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
