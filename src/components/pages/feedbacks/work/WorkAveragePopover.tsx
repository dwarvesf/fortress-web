import { Col, Row } from 'antd'
import { AgreementLevel } from 'constants/agreementLevel'
import { likertScalesColors } from 'constants/colors'
import { DomainTypes } from 'constants/feedbackTypes'
import { ViewDomain } from 'types/schema'
import { renderDomainLevels } from 'utils/level'
import { WorkAverageIcon } from './WorkAverageIcon'

interface Props {
  domain: DomainTypes
  record: ViewDomain
}

export const WorkAveragePopover = (props: Props) => {
  const { domain, record } = props

  const levels = renderDomainLevels(domain)

  return (
    <>
      {typeof record.average === 'number' && (
        <span style={{ fontSize: 17 }}>
          <strong>{record?.average || 0}</strong>
          <span style={{ fontSize: 14 }}>/5</span>
        </span>
      )}
      <Row style={{ maxWidth: 200, marginTop: 8 }} gutter={[0, 8]}>
        {Object.entries(record?.count || {}).length ? (
          Object.entries(record?.count || {}).map((e, i) => (
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
                  backgroundColor={`${
                    likertScalesColors[e[0] as keyof typeof likertScalesColors]
                      .background
                  }`}
                />
                <span style={{ marginLeft: 8 }}>
                  {levels[e[0] as AgreementLevel]}
                </span>
              </div>
              <span style={{ fontSize: 17 }}>{e[1]}</span>
            </Col>
          ))
        ) : (
          <span style={{ textAlign: 'center', width: '100%' }}>
            No survey data
          </span>
        )}
      </Row>
    </>
  )
}
