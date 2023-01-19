import { Col, Row } from 'antd'
import { UtilizationChart } from './UtilizationChart'

const Resources = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} xl={{ span: 8 }}>
        <UtilizationChart />
      </Col>
    </Row>
  )
}

export default Resources
