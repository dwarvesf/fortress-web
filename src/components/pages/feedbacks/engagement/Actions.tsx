import { EyeOutlined } from '@ant-design/icons'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { EmployeeEngagementLink } from 'components/common/DetailLink/EmployeeEngagementLink'

export const Actions = ({ record }: { record: any }) => {
  return (
    <Row justify="end" gutter={[8, 8]}>
      <Col>
        <EmployeeEngagementLink id={record.id}>
          <Tooltip title="View">
            <Button type="text-primary" size="small" icon={<EyeOutlined />} />
          </Tooltip>
        </EmployeeEngagementLink>
      </Col>
    </Row>
  )
}
