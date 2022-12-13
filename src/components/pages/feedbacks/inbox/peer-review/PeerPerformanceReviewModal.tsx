import { Col, Modal, Row, Space, Tag } from 'antd'
import { ItemIndex } from 'components/common/ItemIndex'
import { Button } from 'components/common/Button'
import { ViewFeedbackDetail, ViewQuestionAnswer } from 'types/schema'
import { capitalizeFirstLetter } from 'utils/string'

interface Props {
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
      title={
        <Space direction="vertical">
          <Space>
            <span>{detail.reviewer?.displayName}</span>
            <Tag>{capitalizeFirstLetter(detail.relationship || '-')}</Tag>
          </Space>
          <small>{detail.title}</small>
        </Space>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size={24}>
        {answers.map((answer, index: number) => {
          return (
            <Row key={index} gutter={24} wrap={false}>
              <Col>
                <ItemIndex active>{index + 1}</ItemIndex>
              </Col>
              <Col flex={1}>
                <Space direction="vertical">
                  <div>
                    <b>{answer.content}</b>
                  </div>
                  <div>{answer.answer || '-'}</div>
                </Space>
              </Col>
            </Row>
          )
        })}
      </Space>
    </Modal>
  )
}
