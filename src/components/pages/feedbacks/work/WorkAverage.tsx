import { Popover, Button } from 'antd'
import { likertScalesColors } from 'constants/colors'
import { ViewDomain } from 'types/schema'
import { mapScoreToLikertScale } from 'utils/score'
import { capitalizeFirstLetter } from 'utils/string'
import { WorkAverageIcon } from './WorkAverageIcon'
import { WorkAveragePopover } from './WorkAveragePopover'

interface Props {
  record: ViewDomain
}

export const WorkAverage = (props: Props) => {
  const { record } = props

  return (
    <Popover
      placement="bottom"
      title={capitalizeFirstLetter(record?.name || '-')}
      content={<WorkAveragePopover record={record} />}
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
          backgroundColor={`${
            likertScalesColors[mapScoreToLikertScale(record || {})].background
          }`}
          textColor={`${
            likertScalesColors[mapScoreToLikertScale(record || {})].text
          }`}
          label={record?.average || 0}
        />
      </Button>
    </Popover>
  )
}
