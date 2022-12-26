import { Popover, Button } from 'antd'
import { likertScalesColors } from 'constants/colors'
import { DomainTypes } from 'constants/feedbackTypes'
import { ViewDomain } from 'types/schema'
import { mapScoreToLikertScale } from 'utils/score'
import { capitalizeFirstLetter } from 'utils/string'
import { WorkAverageIcon } from './WorkAverageIcon'
import { WorkAveragePopover } from './WorkAveragePopover'

interface Props {
  domain?: DomainTypes
  record: ViewDomain
  showPopover?: boolean
}

export const WorkAverage = (props: Props) => {
  const { domain = 'engagement', record, showPopover = true } = props

  const renderWorkAverageDot = (
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
  )

  return showPopover && record.average !== 0 ? (
    <Popover
      placement="bottom"
      title={
        typeof record.name === 'string'
          ? capitalizeFirstLetter(record?.name)
          : undefined
      }
      content={<WorkAveragePopover domain={domain} record={record} />}
    >
      {renderWorkAverageDot}
    </Popover>
  ) : (
    renderWorkAverageDot
  )
}
