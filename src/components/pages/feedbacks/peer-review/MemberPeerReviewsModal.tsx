import { Col, Modal, Row, Space, Tag } from 'antd'
import { MemberRelationship, memberRelationship } from 'constants/relationship'
import styled from 'styled-components'
import { MemberPeerReviewDetail } from './mockData'

const FieldIndex = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  background-color: rgba(225, 63, 94, 0.3);
  background-opacity: 0.1;
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
`

interface Props {
  isOpen: boolean
  values: any
  questionData: any
  peerReviewData: MemberPeerReviewDetail
  onCancel: () => void
}

export const MemberPeerReviewsModal = (props: Props) => {
  const {
    isOpen,
    values = {},
    questionData = [],
    peerReviewData,
    onCancel,
  } = props

  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      footer={null}
      width={768}
      title={
        <Space direction="vertical">
          <Space>
            <span>{peerReviewData.reviewer?.displayName}</span>
            <Tag>
              {
                memberRelationship[
                  peerReviewData.relationship as MemberRelationship
                ]
              }
            </Tag>
          </Space>
          <small>John Doe - Peer review Q1/Q2 2022</small>
        </Space>
      }
    >
      <Space direction="vertical" style={{ width: '100%' }} size={24}>
        {questionData.map((field: any, index: any) => {
          return (
            <Row key={index} gutter={24} wrap={false}>
              <Col>
                <FieldIndex>{index + 1}</FieldIndex>
              </Col>
              <Col flex={1}>
                <Space direction="vertical">
                  <div>
                    <b>{field.question}</b>
                  </div>
                  <div>{values[index]}</div>
                </Space>
              </Col>
            </Row>
          )
        })}
      </Space>
    </Modal>
  )
}
