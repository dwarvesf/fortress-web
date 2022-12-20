import { List, Modal, ModalProps } from 'antd'
import { ViewTopic } from 'types/schema'
import { FeedbackPreviewField } from 'components/common/Feedbacks/FeedbackPreviewField'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'

interface Props extends ModalProps {
  isOpen: boolean
  onCancel: () => void
  engagementDetail: ViewTopic
}

export const EngagementSurveyResultModal = (props: Props) => {
  const { isOpen, onCancel, engagementDetail } = props
  const { eventID = '', id: topicId = '', reviewID = '' } = engagementDetail
  const { data: reviewDetail } = useFetchWithCache(
    [GET_PATHS.getSurveyReviewDetail(eventID, topicId, reviewID)],
    () => client.getSurveyReviewDetail(eventID, topicId, reviewID),
  )

  return (
    <Modal
      open={isOpen}
      width={768}
      onCancel={onCancel}
      footer={null}
      title={reviewDetail?.data?.topicName}
      centered
    >
      <List
        itemLayout="horizontal"
        dataSource={reviewDetail?.data?.questions}
        renderItem={(item, index) => (
          <FeedbackPreviewField answer={item} key={index} index={index} />
        )}
      />
    </Modal>
  )
}
