import { Col, Row } from 'antd'
import { AgreementLevel, workLevels } from 'constants/agreementLevel'
import { levelsColors } from 'constants/colors'
import { WorkAverageIcon } from './WorkAverageIcon'

const evaluations = [
  {
    evaluation: AgreementLevel.STRONGLY_DISAGREE,
    value: 10,
  },
  { evaluation: AgreementLevel.DISAGREE, value: 12 },
  { evaluation: AgreementLevel.MIXED, value: 24 },
  { evaluation: AgreementLevel.AGREE, value: 15 },
  { evaluation: AgreementLevel.STRONGLY_AGREE, value: 9 },
]

export const WorkAveragePopover = () => {
  return (
    <>
      <span style={{ fontSize: 17 }}>
        <strong>3.2</strong>/5
      </span>
      <Row style={{ maxWidth: 200, marginTop: 8 }} gutter={[0, 8]}>
        {evaluations.map((e, i) => (
          <Col
            key={i}
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 8,
              alignItems: 'center',
            }}
          >
            <div>
              <WorkAverageIcon color={`${levelsColors[e.evaluation]}`} />
              <span style={{ marginLeft: 8 }}>{workLevels[e.evaluation]}</span>
            </div>
            <span style={{ fontSize: 17 }}>{e.value}</span>
          </Col>
        ))}
      </Row>
    </>
  )
}
