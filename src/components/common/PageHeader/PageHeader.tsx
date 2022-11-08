import { Col, Row, Typography } from 'antd'

interface Props {
  title: string
  rightRender?: React.ReactNode
}

export const PageHeader = (props: Props) => {
  const { title, rightRender } = props

  return (
    <Row gutter={[16, 16]} justify="space-between">
      <Col>
        <Typography.Title level={3}>{title}</Typography.Title>
      </Col>
      {rightRender && (
        <Col>
          <Row gutter={[8, 8]}>{rightRender}</Row>
        </Col>
      )}
    </Row>
  )
}
