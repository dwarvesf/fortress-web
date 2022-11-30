import { Col, Progress, Row } from 'antd'
import { PeerReviewData } from 'pages/feedbacks/peer-review'

interface Props {
  record: PeerReviewData
}

export const StatusColumn = (props: Props) => {
  const {
    record: { totalCompletedSurveys = 0, totalParticipants = 0 },
  } = props
  const percent = totalParticipants
    ? (totalCompletedSurveys / totalParticipants) * 100
    : 100

  return (
    <Row gutter={10}>
      <Col flex="50px">
        {totalCompletedSurveys}/{totalParticipants}
      </Col>
      <Col flex="auto">
        <Progress percent={percent} showInfo={false} />
      </Col>
    </Row>
  )
}
