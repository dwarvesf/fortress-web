import { Popover, Button } from 'antd'
import { workloadAverageColors } from 'constants/colors'
import { WorkloadAverageIcon } from './WorkloadAverageIcon'
import { WorkloadAveragePopover } from './WorkloadAveragePopover'

type Data = {
  title: string
  average: string
}

interface Props {
  data: Data
}

export const WorkloadAverage = (props: Props) => {
  return (
    <Popover
      placement="bottom"
      title={props.data.title}
      content={<WorkloadAveragePopover />}
    >
      <Button
        style={{
          padding: 0,
          height: 'max-content',
          background: 'none',
          border: 'none',
          borderRadius: '50%',
        }}
      >
        <WorkloadAverageIcon
          color={`${
            workloadAverageColors[
              props.data.average as keyof typeof workloadAverageColors
            ]
          }`}
        />
      </Button>
    </Popover>
  )
}
