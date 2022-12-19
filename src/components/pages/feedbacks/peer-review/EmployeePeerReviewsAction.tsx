import { useDisclosure } from '@dwarvesf/react-hooks'
import { Delete, PreviewOpen } from '@icon-park/react'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { SurveyParticipantStatus } from 'constants/status'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ViewFeedBackReviewDetail, ViewPeerReviewer } from 'types/schema'
import { SurveyReviewModal } from '../inbox/survey/SurveyReviewModal'

interface Props {
  employeePeerReviewDetail: ViewPeerReviewer
  onAfterDelete: () => void
}

export const EmployeePeerReviewsAction = (props: Props) => {
  const { employeePeerReviewDetail, onAfterDelete } = props

  const { query } = useRouter()

  const { data: reviewDetail } = useFetchWithCache(
    [
      GET_PATHS.getSurveyReviewDetail(
        query.id as string,
        query.topicId as string,
        employeePeerReviewDetail.eventReviewerID as string,
      ),
    ],
    () =>
      client.getSurveyReviewDetail(
        query.id as string,
        query.topicId as string,
        employeePeerReviewDetail.eventReviewerID as string,
      ),
  )

  const transformDataToViewFeedbackDetail = (
    data?: ViewFeedBackReviewDetail,
  ) => ({
    answers: data?.questions,
    employeeID: data?.employee?.id,
    eventID: employeePeerReviewDetail.eventReviewerID,
    relationship: data?.relationship,
    reviewer: data?.reviewer,
    title: data?.topicName,
  })

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
        [reviewDetail?.data?.reviewer?.id] as string[],
      )

      notification.success({
        message: 'Peer performance review deleted successfully!',
      })

      onAfterDelete()
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not delete peer performance review',
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
      <Col>
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
      </Col>
      <Col>
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
      </Col>

      <SurveyReviewModal
        isPreviewing={false}
        isOpen={isPreviewDialogOpen}
        onCancel={closePreviewDialog}
        answers={reviewDetail?.data?.questions || []}
        detail={transformDataToViewFeedbackDetail(reviewDetail?.data)}
        centered
      />
    </Row>
  )
}
