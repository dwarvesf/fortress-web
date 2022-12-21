import { Col, Row } from 'antd'
import { agreementLevels } from 'constants/agreementLevel'
import { likertScalesColors } from 'constants/colors'
import { ViewDomain } from 'types/schema'
import { WorkAverageIcon } from './WorkAverageIcon'

interface Props {
  record: ViewDomain
}

export const WorkAveragePopover = (props: Props) => {
  const { record } = props

  return (
    <>
      <span style={{ fontSize: 17 }}>
        <strong>{record?.average || 0}</strong>
        <span style={{ fontSize: 14 }}>/5</span>
      </span>
      <Row style={{ maxWidth: 200, marginTop: 8 }} gutter={[0, 8]}>
        {Object.entries(record?.count || {}).map((e, i) => (
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
              <WorkAverageIcon
                color={`${
                  likertScalesColors[e[0] as keyof typeof likertScalesColors]
                    .background
                }`}
              />
              <span style={{ marginLeft: 8 }}>
                {agreementLevels[e[0] as keyof typeof likertScalesColors]}
              </span>
            </div>
            <span style={{ fontSize: 17 }}>{e[1]}</span>
          </Col>
        ))}
      </Row>
    </>
  )
}
