import { Col, Row } from 'antd'
import { PendingAndAvailableTable } from './PendingAndAvailableTable'
import { UtilizationChart } from './UtilizationChart'

const Resources = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} xl={{ span: 8 }}>
        <UtilizationChart />
      </Col>
      <Col span={24} xl={{ span: 16 }}>
        <PendingAndAvailableTable />
      </Col>
    </Row>
  )
}

export default Resources
