import { Col, Row, Space, Typography } from 'antd'

interface Props {
  title: React.ReactNode
  rightRender?: React.ReactNode
}

export const PageHeader = (props: Props) => {
  const { title, rightRender } = props

  return (
    <Row gutter={[16, 16]} justify="space-between">
      <Col>
        <Space align="center">
          <Typography.Title level={3}>{title}</Typography.Title>
        </Space>
      </Col>
      {rightRender && (
        <Col>
          <Row gutter={[8, 8]}>{rightRender}</Row>
        </Col>
      )}
    </Row>
  )
}
