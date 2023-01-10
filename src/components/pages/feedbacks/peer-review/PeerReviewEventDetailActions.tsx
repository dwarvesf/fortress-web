import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Button } from 'components/common/Button'
import { Permission } from 'constants/permission'
import { ROUTES } from 'constants/routes'
import { SurveyEventStatus } from 'constants/status'
import { client } from 'libs/apis'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ViewTopic } from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { AddParticipantsModal } from './AddParticipantsModal'

interface Props {
  topic: ViewTopic
  onAfterDelete: () => void
  onAfterEdit: () => void
  eventStatus?: SurveyEventStatus
}

export const PeerReviewEventDetailActions = (props: Props) => {
  const { topic, onAfterDelete, onAfterEdit, eventStatus } = props
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
        message: getErrorMessage(
          error,
          'Could not delete peer performance review item',
        ),
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
        <Link
          href={ROUTES.EMPLOYEE_PEER_REVIEWS(
            query.id as string,
            topic.id || '',
          )}
        >
          <a>
            <Tooltip title="View">
              <Button
                type="text-primary"
                size="small"
                icon={<Icon icon="icon-park-outline:preview-open" width={20} />}
              />
            </Tooltip>
          </a>
        </Link>
      </Col>
      <AuthenticatedContent permission={Permission.SURVEYS_EDIT} as={Col}>
        <Tooltip title="Edit">
          <Button
            type="text-primary"
            size="small"
            icon={<Icon icon="icon-park-outline:edit" width={20} />}
            onClick={openAddParticipantsModal}
            disabled={eventStatus === SurveyEventStatus.DONE}
          />
        </Tooltip>
      </AuthenticatedContent>
      <AuthenticatedContent permission={Permission.SURVEYS_DELETE} as={Col}>
        <Tooltip title="Delete">
          <Button
            type="text-primary"
            size="small"
            icon={<Icon icon="icon-park-outline:delete" width={20} />}
            onClick={confirmDelete}
            disabled={
              !!topic.count?.sent || eventStatus === SurveyEventStatus.DONE
            }
          />
        </Tooltip>
      </AuthenticatedContent>

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
