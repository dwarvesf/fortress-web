import { ModalProps } from 'antd'
import { ViewFeedbackDetail, ViewFeedBackReviewDetail } from 'types/schema'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { SurveyReviewModal } from './inbox/survey/SurveyReviewModal'

const transformDataToViewFeedbackDetail = (
  data?: ViewFeedBackReviewDetail,
): ViewFeedbackDetail => ({
  answers: data?.questions,
  employeeID: data?.employee?.id,
  eventID: data?.reviewer?.id,
  relationship: data?.relationship,
  reviewer: data?.reviewer,
  title: data?.topicName,
})

interface Props extends ModalProps {
  isOpen: boolean
  onCancel: () => void
  eventID?: string
  topicID?: string
  reviewID?: string
}

export const SurveyResultModal = (props: Props) => {
  const { isOpen, onCancel, eventID = '', topicID = '', reviewID = '' } = props
  const { data: reviewDetail } = useFetchWithCache(
    [GET_PATHS.getSurveyReviewDetail(eventID, topicID, reviewID)],
    () => client.getSurveyReviewDetail(eventID, topicID, reviewID),
  )

  return (
    <SurveyReviewModal
      isPreviewing={false}
      isOpen={isOpen}
      onCancel={onCancel}
      answers={reviewDetail?.data?.questions || []}
      detail={transformDataToViewFeedbackDetail(reviewDetail?.data)}
      centered
    />
  )
}
