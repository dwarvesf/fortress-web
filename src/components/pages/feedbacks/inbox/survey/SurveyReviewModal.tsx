import { List, Modal, Space, Tag, ModalProps } from 'antd'
import { Button } from 'components/common/Button'
import { ViewFeedbackDetail, ViewQuestionAnswer } from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { FeedbackPreviewField } from 'components/common/Feedbacks/FeedbackPreviewField'
import { useRouter } from 'next/router'
import { FeedbackSubtype } from 'constants/feedbackTypes'

interface Props extends ModalProps {
  isOpen: boolean
  answers: ViewQuestionAnswer[]
  detail: ViewFeedbackDetail
  onCancel: () => void
  onOk?: () => void
}

export const SurveyReviewModal = (props: Props) => {
  const { isOpen, answers = [], detail, onCancel, onOk, ...rest } = props
  const {
    query: { subtype },
  } = useRouter()

  const title =
    {
      [FeedbackSubtype.PEER_REVIEW]: (
        <Space direction="vertical">
          <Space>
            <span>{detail?.reviewer?.displayName || '-'}</span>
            <Tag>{capitalizeFirstLetter(detail?.relationship || '-')}</Tag>
          </Space>
          {detail?.title && <small>{detail?.title}</small>}
        </Space>
      ),
      [FeedbackSubtype.ENGAGEMENT]: detail.title,
    }[subtype as string] || '-'

  if (!detail) {
    return null
  }

  return (
    <Modal
      open={isOpen}
      width={768}
      onCancel={onCancel}
      footer={[
        <Button type="default" onClick={onCancel}>
          Cancel
        </Button>,
        <Button type="primary" onClick={onOk}>
          Send
        </Button>,
      ]}
      title={title}
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
