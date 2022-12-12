import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { MemberPeerReviewStatus } from 'constants/status'
import { useState } from 'react'
import { PeerPerformanceReviewModal } from '../inbox/peer-review/PeerPerformanceReviewModal'
import { MemberPeerReviewDetail } from './mockData'

interface Props {
  memberPeerReviewDetail: MemberPeerReviewDetail
}

const mockData = [
  {
    question: 'Does this employee effectively communicate with others?',
    type: 'textarea',
    name: '1',
  },
  {
    question:
      'How effective of a leader is this person, either through direct management or influence?',
    type: 'textarea',
    name: '2',
  },
  {
    question:
      'Does this person find creative solutions, and own the solution to problems? Are they proactive or reactive?',
    type: 'textarea',
    name: '3',
  },
  {
    question: "How would you rate the quality of the employee's work?",
    type: 'textarea',
    name: '4',
  },
  {
    question: 'How well does this person set and meet deadlines?',
    type: 'textarea',
    name: '5',
  },
  {
    question: 'How well does this person embody our culture?',
    type: 'textarea',
    name: '6',
  },
  {
    question:
      'If you could give this person one piece of constructive advice to make them more effective in their role, what would you say?',
    type: 'textarea',
    name: '7',
  },
]

export const MemberPeerReviewsAction = (props: Props) => {
  const { memberPeerReviewDetail } = props

  const {
    isOpen: isPreviewDialogOpen,
    onOpen: openPreviewDialog,
    onClose: closePreviewDialog,
  } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)

      notification.success({
        message: 'Peer performance review deleted successfully!',
      })
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
          <strong>{memberPeerReviewDetail.reviewer?.displayName}</strong>?
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
            icon={<EyeOutlined />}
            onClick={openPreviewDialog}
            disabled={
              memberPeerReviewDetail.status !== MemberPeerReviewStatus.DONE
            }
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
            disabled={
              memberPeerReviewDetail.status !== MemberPeerReviewStatus.DRAFT
            }
          />
        </Tooltip>
      </Col>

      <PeerPerformanceReviewModal
        data={mockData}
        isPreviewing={false}
        // peerReviewData={memberPeerReviewDetail}
        values={new Array(8).fill('Lorem Ipsum')}
        isOpen={isPreviewDialogOpen}
        onCancel={closePreviewDialog}
      />
    </Row>
  )
}
