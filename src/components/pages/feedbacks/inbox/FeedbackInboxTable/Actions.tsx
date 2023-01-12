import { Icon } from '@iconify/react'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { ViewFeedback } from 'types/schema'

interface Props {
  record: ViewFeedback
  onAfterAction?: () => void
}

export const Actions = (props: Props) => {
  // eslint-disable-next-line
  const { record, onAfterAction } = props

  return (
    <Row
      justify="end"
      gutter={[8, 8]}
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <Col>
        <Link
          href={`${ROUTES.FEEDBACK_INBOX_DETAIL(record.topicID || '')}?type=${
            record.type
          }&subtype=${record.subtype}&eventID=${record.eventID}`}
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
    </Row>
  )
}
