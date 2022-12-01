import { Col, Progress, Row } from 'antd'

interface Props {
  done?: number
  total?: number
}

export const ProgressColumn = (props: Props) => {
  const { done = 0, total = 0 } = props
  const percent = total ? (done / total) * 100 : 100

  return (
    <Row gutter={10}>
      <Col flex="50px">
        {done}/{total}
      </Col>
      <Col flex="auto">
        <Progress percent={percent} showInfo={false} />
      </Col>
    </Row>
  )
}
