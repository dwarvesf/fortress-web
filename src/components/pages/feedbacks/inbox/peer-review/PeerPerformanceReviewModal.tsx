import { Col, Modal, Row, Space, Tag } from 'antd'
import { ItemIndex } from 'components/common/ItemIndex'
import { Button } from 'components/common/Button'

interface Props {
  isPreviewing?: boolean
  isOpen: boolean
  values: any
  data: any
  onCancel: () => void
  onOk?: () => void
}

export const PeerPerformanceReviewModal = (props: Props) => {
  const {
    isPreviewing = true,
    isOpen,
    values = {},
    data = [],
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
            <span>Jame Doe</span>
            <Tag>Line Manager</Tag>
          </Space>
          <small>John Doe - Peer review Q1/Q2 2022</small>
        </Space>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size={24}>
        {data.map((field: any, index: any) => {
          return (
            <Row key={index} gutter={24} wrap={false}>
              <Col>
                <ItemIndex active>{index}</ItemIndex>
              </Col>
              <Col flex={1}>
                <Space direction="vertical">
                  <div>
                    <b>{field.question}</b>
                  </div>
                  <div>{values[field.name]}</div>
                </Space>
              </Col>
            </Row>
          )
        })}
      </Space>
    </Modal>
  )
}
