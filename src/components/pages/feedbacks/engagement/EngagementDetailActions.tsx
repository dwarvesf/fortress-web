import { PreviewOpen } from '@icon-park/react'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'

export const EngagementDetailActions = () => {
  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <Tooltip title="View">
          <Button
            type="text-primary"
            size="small"
            icon={<PreviewOpen size={20} />}
          />
        </Tooltip>
      </Col>
    </Row>
  )
}
