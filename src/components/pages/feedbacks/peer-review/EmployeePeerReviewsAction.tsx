import { useDisclosure } from '@dwarvesf/react-hooks'
import { Delete, PreviewOpen } from '@icon-park/react'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Button } from 'components/common/Button'
import { Permission } from 'constants/permission'
import { SurveyParticipantStatus } from 'constants/status'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ViewPeerReviewer } from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { SurveyResultModal } from '../SurveyResultModal'

interface Props {
  employeePeerReviewDetail: ViewPeerReviewer
  onAfterDelete: () => void
}

export const EmployeePeerReviewsAction = (props: Props) => {
  const { employeePeerReviewDetail, onAfterDelete } = props
  const { query } = useRouter()
  const {
    isOpen: isPreviewDialogOpen,
    onOpen: openPreviewDialog,
    onClose: closePreviewDialog,
  } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await client.removeSurveyParticipants(
        query.id as string,
        query.topicId as string,
        [employeePeerReviewDetail.reviewer?.id] as string[],
      )

      notification.success({
        message: 'Peer performance review deleted successfully!',
      })

      onAfterDelete()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          'Could not delete peer performance review',
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDelete = () => {
    Modal.confirm({
      title: 'Delete performance peer review',
      content: (
        <>
          Do you want to delete peer performance review from{' '}
          <strong>{employeePeerReviewDetail.reviewer?.displayName}</strong>?
        </>
      ),
      okText: 'Delete',
      okButtonProps: { loading: isLoading },
      onOk: onDelete,
    })
  }

  return (
    <Row justify="end" gutter={[8, 8]}>
      <AuthenticatedContent
        permission={Permission.EMPLOYEEEVENTQUESTIONS_READ}
        as={Col}
      >
        <Tooltip title="View">
          <Button
            type="text-primary"
            size="small"
            icon={<PreviewOpen size={20} />}
            onClick={openPreviewDialog}
            disabled={
              employeePeerReviewDetail.status !== SurveyParticipantStatus.DONE
            }
          />
        </Tooltip>
      </AuthenticatedContent>
      <AuthenticatedContent permission={Permission.SURVEYS_EDIT} as={Col}>
        <Tooltip title="Delete">
          <Button
            type="text-primary"
            size="small"
            icon={<Delete size={20} />}
            onClick={confirmDelete}
            disabled={
              employeePeerReviewDetail.status !== SurveyParticipantStatus.DRAFT
            }
          />
        </Tooltip>
      </AuthenticatedContent>

      {isPreviewDialogOpen && (
        <SurveyResultModal
          isOpen={isPreviewDialogOpen}
          onCancel={closePreviewDialog}
          eventID={query.id as string}
          topicID={query.topicId as string}
          reviewID={employeePeerReviewDetail.eventReviewerID}
        />
      )}
    </Row>
  )
}
