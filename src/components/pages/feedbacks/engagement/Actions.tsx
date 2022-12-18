import { PreviewOpen } from '@icon-park/react'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { EmployeeEngagementLink } from 'components/common/DetailLink/EmployeeEngagementLink'

export const Actions = ({ record }: { record: any }) => {
  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <EmployeeEngagementLink id={record.id}>
          <Tooltip title="View">
            <Button
              type="text-primary"
              size="small"
              icon={<PreviewOpen size={20} />}
            />
          </Tooltip>
        </EmployeeEngagementLink>
      </Col>
    </Row>
  )
}
