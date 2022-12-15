import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { PeerReviewEventLink } from 'components/common/DetailLink'
import { SurveyStatus } from 'constants/status'
import { client } from 'libs/apis'
import { useState } from 'react'
import { ViewSurvey } from 'types/schema'

interface Props {
  record: ViewSurvey
  onAfterDelete: () => void
}

export const Actions = (props: Props) => {
  const { record, onAfterDelete } = props
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    if (!record.id) return
    try {
      setIsLoading(true)

      await client.deleteSurvey(record.id)

      notification.success({
        message: 'Peer performance review event deleted sent successfully!',
      })

      onAfterDelete()
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
          Do you want to delete <strong>{record.title}</strong> event?
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
            disabled={record.status !== SurveyStatus.DRAFT}
          />
        </Tooltip>
      </Col>
    </Row>
  )
}
