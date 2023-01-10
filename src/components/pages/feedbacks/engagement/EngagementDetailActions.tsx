import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { SurveyParticipantStatus } from 'constants/status'
import { ViewTopic } from 'types/schema'
import { SurveyResultModal } from '../SurveyResultModal'

interface Props {
  engagementDetail: ViewTopic
}

export const EngagementDetailActions = (props: Props) => {
  const { engagementDetail } = props
  const {
    isOpen: isPreviewDialogOpen,
    onOpen: openPreviewDialog,
    onClose: closePreviewDialog,
  } = useDisclosure()

  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <Tooltip title="View">
          <Button
            type="text-primary"
            size="small"
            icon={<Icon icon="icon-park-outline:preview-open" width={20} />}
            onClick={openPreviewDialog}
            disabled={engagementDetail.status !== SurveyParticipantStatus.DONE}
          />
        </Tooltip>
      </Col>

      {isPreviewDialogOpen && (
        <SurveyResultModal
          isOpen={isPreviewDialogOpen}
          onCancel={closePreviewDialog}
          eventID={engagementDetail.eventID}
          topicID={engagementDetail.id}
          reviewID={engagementDetail.reviewID}
        />
      )}
    </Row>
  )
}
