import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { PeerReviewEventLink } from 'components/common/DetailLink'
import { PeerReviewStatus } from 'constants/status'
import { PeerReviewData } from 'pages/feedbacks/peer-review'
import { useState } from 'react'

interface Props {
  record: PeerReviewData
}

export const Actions = (props: Props) => {
  const { record } = props
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)

      notification.success({
        message: 'Peer performance review event deleted sent successfully!',
      })
    } catch (error: any) {
      notification.error({
        message:
          error?.message || 'Could not delete peer performance review event',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDelete = () => {
    Modal.confirm({
      title: 'Delete event',
      content: (
        <>
          Do you want to delete <strong>{record.time}</strong> event?
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
        <PeerReviewEventLink id={record.id}>
          <Tooltip title="View">
            <Button type="text-primary" size="small" icon={<EyeOutlined />} />
          </Tooltip>
        </PeerReviewEventLink>
      </Col>
      <Col>
        <Tooltip title="Delete">
          <Button
            type="text-primary"
            size="small"
            icon={<DeleteOutlined />}
            onClick={confirmDelete}
            disabled={record.status !== PeerReviewStatus.DRAFT}
          />
        </Tooltip>
      </Col>
    </Row>
  )
}
