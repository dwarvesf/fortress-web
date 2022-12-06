import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { AddParticipantsModal } from './AddParticipantsModal'
import { PeerReviewDetail } from './mockData'

interface Props {
  peerReviewDetail: PeerReviewDetail
}

export const PeerReviewEventDetailActions = (props: Props) => {
  const { peerReviewDetail } = props
  const {
    isOpen: isAddParticipantsModalOpen,
    onOpen: openAddParticipantsModal,
    onClose: closeAddParticipantsModal,
  } = useDisclosure()

  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <Tooltip title="View">
          <Button type="text-primary" size="small" icon={<EyeOutlined />} />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="Edit">
          <Button
            type="text-primary"
            size="small"
            icon={<EditOutlined />}
            onClick={openAddParticipantsModal}
          />
        </Tooltip>
      </Col>
      <Col>
        <Tooltip title="Delete">
          <Button type="text-primary" size="small" icon={<DeleteOutlined />} />
        </Tooltip>
      </Col>

      <AddParticipantsModal
        isOpen={isAddParticipantsModalOpen}
        onClose={closeAddParticipantsModal}
        onAfterSubmit={() => {}}
        peerReviewDetail={peerReviewDetail}
      />
    </Row>
  )
}
