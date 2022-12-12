import { Col, Row } from 'antd'
import { workloadAverageColors } from 'constants/colors'
import {
  WorkloadAverageStatus,
  workloadAverageStatuses,
} from 'constants/status'
import { WorkloadAverageIcon } from './WorkloadAverageIcon'

const evaluations = [
  {
    evaluation: WorkloadAverageStatus.ALL_BORING_STUFF,
    value: 10,
  },
  { evaluation: WorkloadAverageStatus.NOTHING_NEW, value: 12 },
  { evaluation: WorkloadAverageStatus.NOT_MUCH, value: 24 },
  { evaluation: WorkloadAverageStatus.FEW_THINGS, value: 15 },
  { evaluation: WorkloadAverageStatus.A_LOT, value: 9 },
]

export const WorkloadAveragePopover = () => {
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
              <WorkloadAverageIcon
                color={`${
                  workloadAverageColors[
                    e.evaluation as keyof typeof workloadAverageColors
                  ]
                }`}
              />
              <span style={{ marginLeft: 8 }}>
                {workloadAverageStatuses[e.evaluation]}
              </span>
            </div>
            <span style={{ fontSize: 17 }}>{e.value}</span>
          </Col>
        ))}
      </Row>
    </>
  )
}
