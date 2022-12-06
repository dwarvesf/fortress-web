import { EyeOutlined } from '@ant-design/icons'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { FeedbackInboxDetailLink } from 'components/common/DetailLink/FeedbackInboxDetailLink'
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
        <FeedbackInboxDetailLink id={record.id}>
          <Tooltip title="View">
            <Button type="text-primary" size="small" icon={<EyeOutlined />} />
          </Tooltip>
        </FeedbackInboxDetailLink>
      </Col>
    </Row>
  )
}
