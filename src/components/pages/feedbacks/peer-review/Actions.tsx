import { Icon } from '@iconify/react'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Button } from 'components/common/Button'
import { Permission } from 'constants/permission'
import { ROUTES } from 'constants/routes'
import { SurveyEventStatus } from 'constants/status'
import { client } from 'libs/apis'
import Link from 'next/link'
import { useState } from 'react'
import { ViewSurvey } from 'types/schema'
import { getErrorMessage } from 'utils/string'

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
        message: getErrorMessage(
          error,
          'Could not delete peer performance review event',
        ),
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
        <Link href={ROUTES.PEER_REVIEW_EVENT_DETAIL(record.id || '')}>
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
      <AuthenticatedContent permission={Permission.SURVEYS_DELETE} as={Col}>
        <Tooltip title="Delete">
          <Button
            type="text-primary"
            size="small"
            icon={<Icon icon="icon-park-outline:delete" width={20} />}
            onClick={confirmDelete}
            disabled={record.status !== SurveyEventStatus.DRAFT}
          />
        </Tooltip>
      </AuthenticatedContent>
    </Row>
  )
}
