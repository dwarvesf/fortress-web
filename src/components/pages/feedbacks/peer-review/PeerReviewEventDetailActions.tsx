import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { MemberPeerReviewsLink } from 'components/common/DetailLink/MemberPeerReviewsLink'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ViewTopic } from 'types/schema'
import { AddParticipantsModal } from './AddParticipantsModal'

interface Props {
  topic: ViewTopic
  onAfterDelete: () => void
  onAfterEdit: () => void
}

export const PeerReviewEventDetailActions = (props: Props) => {
  const { topic, onAfterDelete, onAfterEdit } = props
  const {
    isOpen: isAddParticipantsModalOpen,
    onOpen: openAddParticipantsModal,
    onClose: closeAddParticipantsModal,
  } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  const { query } = useRouter()

  const onDelete = async () => {
    if (!topic.eventID || !topic.id) return
    try {
      setIsLoading(true)

      await client.deleteSurveyTopic(topic.eventID, topic.id)

      notification.success({
        message: 'Peer performance review item deleted sent successfully!',
      })

      onAfterDelete()
    } catch (error: any) {
      notification.error({
        message:
          error?.message || 'Could not delete peer performance review item',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDelete = () => {
    Modal.confirm({
      title: 'Delete item',
      content: (
        <>
          Do you want to delete surveys of{' '}
          <strong>{topic.employee?.displayName}</strong>?
        </>
      ),
      okText: 'Delete',
      okButtonProps: { loading: isLoading },
      onOk: onDelete,
    })
  }

  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <MemberPeerReviewsLink
          id={query.id as string}
          memberId={topic.employee?.id!}
        >
          <Tooltip title="View">
            <Button type="text-primary" size="small" icon={<EyeOutlined />} />
          </Tooltip>
        </MemberPeerReviewsLink>
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
          <Button
            type="text-primary"
            size="small"
            icon={<DeleteOutlined />}
            onClick={confirmDelete}
            disabled={!!topic.count?.sent}
          />
        </Tooltip>
      </Col>

      {isAddParticipantsModalOpen && (
        <AddParticipantsModal
          isOpen={isAddParticipantsModalOpen}
          onClose={closeAddParticipantsModal}
          onAfterSubmit={onAfterEdit}
          topic={topic}
        />
      )}
    </Row>
  )
}
