import { Col, Modal, Row, Space, Tag } from 'antd'
import { ItemIndex } from 'components/common/ItemIndex'

interface Props {
  isOpen: boolean
  values: any
  data: any
  onCancel: () => void
  onOk: () => void
}

export const PeerPerformanceReviewPreviewModal = (props: Props) => {
  const { isOpen, values = {}, data = [], onCancel, onOk } = props

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      okText="Send"
      onOk={onOk}
      width={768}
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
