import { Popover, Button } from 'antd'
import { AgreementLevel } from 'constants/agreementLevel'
import { likertScalesColors } from 'constants/colors'
import { ViewDomain } from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { WorkAverageIcon } from './WorkAverageIcon'
import { WorkAveragePopover } from './WorkAveragePopover'

interface Props {
  record: ViewDomain
}

const mapScoreToLikertScale = (model: ViewDomain): AgreementLevel => {
  if (!model.average) {
    return AgreementLevel.STRONGLY_DISAGREE
  }
  if (model?.average <= 1.5) {
    return AgreementLevel.STRONGLY_DISAGREE
  }
  if (model?.average <= 2.5) {
    return AgreementLevel.DISAGREE
  }
  if (model?.average <= 3.5) {
    return AgreementLevel.MIXED
  }
  if (model?.average <= 4.5) {
    return AgreementLevel.AGREE
  }
  return AgreementLevel.STRONGLY_AGREE
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
          color={`${
            likertScalesColors[mapScoreToLikertScale(record || {})].background
          }`}
          label={record?.average || 0}
        />
      </Button>
    </Popover>
  )
}
