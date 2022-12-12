import { Col, Row } from 'antd'
import { workloadAverageColors } from 'constants/colors'
import {
  WorkloadAverageStatuses,
  workloadAverageStatuses,
} from 'constants/workloadAverageStatus'
import { WorkloadAverageIcon } from './WorkloadAverageIcon'

const evaluations = [
  {
    evaluation: WorkloadAverageStatuses.ALL_BORING_STUFF,
    value: 10,
  },
  { evaluation: WorkloadAverageStatuses.NOTHING_NEW, value: 12 },
  { evaluation: WorkloadAverageStatuses.NOT_MUCH, value: 24 },
  { evaluation: WorkloadAverageStatuses.FEW_THINGS, value: 15 },
  { evaluation: WorkloadAverageStatuses.A_LOT, value: 9 },
]

export const WorkloadAveragePopover = () => {
  return (
    <>
      <span style={{ fontSize: 17 }}>
        <strong>3.2</strong>/<strong>5</strong>
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
