import { Popover, Button } from 'antd'
import { levelsColors } from 'constants/colors'
import { WorkAverageIcon } from './WorkAverageIcon'
import { WorkAveragePopover } from './WorkAveragePopover'

type Data = {
  title: string
  average: string
}

interface Props {
  data: Data
}

export const WorkAverage = (props: Props) => {
  return (
    <Popover
      placement="bottom"
      title={props.data.title}
      content={<WorkAveragePopover />}
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
        <WorkAverageIcon
          color={`${
            levelsColors[props.data.average as keyof typeof levelsColors]
              .background
          }`}
        />
      </Button>
    </Popover>
  )
}
