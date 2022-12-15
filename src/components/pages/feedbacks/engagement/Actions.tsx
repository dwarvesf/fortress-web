import { EyeOutlined } from '@ant-design/icons'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { EngagementEventLink } from 'components/common/DetailLink'
import { ViewSurvey } from 'types/schema'

interface Props {
  record: ViewSurvey
}

export const Actions = (props: Props) => {
  const { record } = props

  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <EngagementEventLink id={record.id}>
          <Tooltip title="View">
            <Button type="text-primary" size="small" icon={<EyeOutlined />} />
          </Tooltip>
        </EngagementEventLink>
      </Col>
    </Row>
  )
}
