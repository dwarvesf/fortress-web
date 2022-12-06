import { EyeOutlined } from '@ant-design/icons'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { FeedbackInboxItem } from 'pages/feedbacks/inbox'

interface Props {
  record: FeedbackInboxItem
  onAfterAction?: () => void
}

export const Actions = (props: Props) => {
  // eslint-disable-next-line
  const { record, onAfterAction } = props

  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <Link
          href={`${ROUTES.FEEDBACK_INBOX_DETAIL(record.id)}?type=${
            record.type
          }&subtype=${record.subtype}`}
        >
          <a>
            <Tooltip title="View">
              <Button type="text-primary" size="small" icon={<EyeOutlined />} />
            </Tooltip>
          </a>
        </Link>
      </Col>
    </Row>
  )
}
