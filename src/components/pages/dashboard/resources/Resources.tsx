import { Col, Row } from 'antd'
import { PendingAndAvailablePositions } from './PendingAndAvailablePositions'
import { UtilizationChart } from './UtilizationChart'
import { WorkSurveyResult } from './WorkSurveyResult'
import { WorkUnitDistribution } from './WorkUnitDistribution'

const Resources = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} xl={{ span: 8 }}>
        <UtilizationChart />
      </Col>
      <Col span={24} xl={{ span: 16 }}>
        <PendingAndAvailablePositions />
      </Col>
      <Col span={24} xl={{ span: 12 }}>
        <WorkUnitDistribution />
      </Col>
      <Col span={24} xl={{ span: 12 }}>
        <WorkSurveyResult />
      </Col>
    </Row>
  )
}

export default Resources
