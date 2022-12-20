import { useDisclosure } from '@dwarvesf/react-hooks'
import { PreviewOpen } from '@icon-park/react'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { SurveyParticipantStatus } from 'constants/status'
import { ViewTopic } from 'types/schema'
import { EngagementSurveyResultModal } from './EngagementSurveyResultModal'

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
            icon={<PreviewOpen size={20} />}
            onClick={openPreviewDialog}
            disabled={engagementDetail.status !== SurveyParticipantStatus.DONE}
          />
        </Tooltip>
      </Col>

      {isPreviewDialogOpen && (
        <EngagementSurveyResultModal
          isOpen={isPreviewDialogOpen}
          onCancel={closePreviewDialog}
          engagementDetail={engagementDetail}
        />
      )}
    </Row>
  )
}
