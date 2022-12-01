import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { PeerReviewEventLink } from 'components/common/DetailLink'
import { PeerReviewData } from 'pages/feedbacks/peer-review'

interface Props {
  record: PeerReviewData
}

export const Actions = (props: Props) => {
  const { record } = props

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
          <Button type="text-primary" size="small" icon={<DeleteOutlined />} />
        </Tooltip>
      </Col>
    </Row>
  )
}
