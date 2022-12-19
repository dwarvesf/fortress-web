import { List, Modal } from 'antd'
import { Button } from 'components/common/Button'
import { FeedbackPreviewField } from 'components/common/Feedbacks/FeedbackPreviewField'
import { ViewFeedbackDetail, ViewQuestionAnswer } from 'types/schema'

interface Props {
  isPreviewing?: boolean
  isOpen: boolean
  answers: ViewQuestionAnswer[]
  detail: ViewFeedbackDetail
  onCancel: () => void
  onOk?: () => void
}

export const EngagementSurveyPreviewModal = (props: Props) => {
  const {
    isPreviewing = true,
    isOpen,
    answers = [],
    detail,
    onCancel,
    onOk,
    ...rest
  } = props

  return (
    <Modal
      open={isOpen}
      width={768}
      onCancel={onCancel}
      footer={
        isPreviewing
          ? [
              <Button type="default" onClick={onCancel}>
                Cancel
              </Button>,
              <Button type="primary" onClick={onOk}>
                Send
              </Button>,
            ]
          : null
      }
      title={detail?.reviewer?.displayName || '-'}
      {...rest}
    >
      <List
        itemLayout="horizontal"
        dataSource={answers}
        renderItem={(item, index) => (
          <FeedbackPreviewField answer={item} key={index} index={index} />
        )}
      />
    </Modal>
  )
}
