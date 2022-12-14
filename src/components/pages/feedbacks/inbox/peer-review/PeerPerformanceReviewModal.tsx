import { List, Modal, Space, Tag, ModalProps } from 'antd'
import { Button } from 'components/common/Button'
import { ViewFeedbackDetail, ViewQuestionAnswer } from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'
import { FeedbackPreviewField } from 'components/common/Feedbacks/FeedbackPreviewField'

interface Props extends ModalProps {
  isPreviewing?: boolean
  isOpen: boolean
  answers: ViewQuestionAnswer[]
  detail: ViewFeedbackDetail
  onCancel: () => void
  onOk?: () => void
}

export const PeerPerformanceReviewModal = (props: Props) => {
  const {
    isPreviewing = true,
    isOpen,
    answers = [],
    detail,
    onCancel,
    onOk,
    ...rest
  } = props

  if (!detail) {
    return null
  }

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
      title={
        <Space direction="vertical">
          <Space>
            <span>{detail?.reviewer?.displayName || '-'}</span>
            <Tag>{capitalizeFirstLetter(detail?.relationship || '-')}</Tag>
          </Space>
          {detail?.title && <small>{detail?.title}</small>}
        </Space>
      }
      {...rest}
    >
      <List
        itemLayout="horizontal"
        dataSource={answers}
        renderItem={(item, index) => {
          return (
            <FeedbackPreviewField answer={item} key={index} index={index} />
          )
        }}
      />
    </Modal>
  )
}
