import { Col, Popover, Row, Space } from 'antd'
import { ProjectAvatar, UserAvatar } from 'components/common/AvatarWithName'
import { chartColors } from 'constants/colors'
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  ViewSummaryWorkUnitDistributionData,
  ViewWorkUnitDistribution,
} from 'types/schema'
import { capitalizeFirstLetter, kebabToPascalCase } from 'utils/string'

interface Props {
  data: ViewWorkUnitDistribution[]
  summary: ViewSummaryWorkUnitDistributionData
}

type WorkUnitDistributionKey = keyof Omit<ViewWorkUnitDistribution, 'employee'>

export const WorkUnitDistributionChart = ({ data, summary }: Props) => {
  const keys = Object.keys(summary) as Array<WorkUnitDistributionKey>
  const colors = keys.reduce<{ [key in WorkUnitDistributionKey]?: string }>(
    (prev, key, index) => ({
      ...prev,
      [key]: Object.values(chartColors)[index],
    }),
    {},
  )
  const maxAmount = data.reduce((max, each) => {
    const currentAmount = keys
      .map((key) => each[key]?.total || 0)
      .reduce((total, amount) => total + amount)
    return max > currentAmount ? max : currentAmount
  }, 0)
  const offset = 4 - (maxAmount % 4)
  const maxDisplay = maxAmount + offset

  const chartRef = useRef<HTMLDivElement>(null)
  const [chartWidth, setChartWidth] = useState(0)
  const titleWidth = 150
  const displayHeight = 300
  const maxRow = 10
  const rowMargin = 2
  const rowHeight = displayHeight / maxRow - rowMargin
  const points = [
    0,
    maxDisplay / 4,
    (maxDisplay / 4) * 2,
    (maxDisplay / 4) * 3,
    maxDisplay,
  ]

  const chart = chartRef.current
  useEffect(() => {
    const handleResize = () => {
      setChartWidth(chart ? chart.clientWidth - titleWidth : 0)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [chart])

  useEffect(() => {
    if (chart && data.length) {
      setChartWidth(chart.clientWidth - titleWidth)
    }
  }, [chart, data])

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          width: '100%',
          height: displayHeight,
          overflowY: 'auto',
          overflowX: 'hidden',
          marginBottom: 10,
        }}
        ref={chartRef}
      >
        <Row
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: displayHeight,
          }}
        >
          <Col flex={`${titleWidth}px`} />
          <Col
            flex={chartWidth ? `${chartWidth}px` : 'auto'}
            style={{
              position: 'relative',
              borderBottom: '2px solid #ccc',
            }}
          >
            {points.map((num) => (
              <Fragment key={num}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    marginLeft: `${(num / maxDisplay) * 100}%`,
                    borderLeft: '1px dashed #ccc',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: -25,
                    left: 0,
                    transform: `translateX(-50%)`,
                    marginLeft: `${(num / maxDisplay) * 100}%`,
                    display: chartWidth ? undefined : 'none',
                  }}
                >
                  {num}
                </div>
              </Fragment>
            ))}
          </Col>
        </Row>
        {data.map((each) => (
          <Row
            key={each.employee?.id}
            style={{
              marginTop: rowMargin,
              height: rowHeight,
            }}
          >
            <Col
              flex={`${titleWidth}px`}
              style={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
              }}
            >
              <UserAvatar
                user={each.employee!}
                style={{
                  flexDirection: 'row-reverse',
                }}
              />
            </Col>
            <Col flex="auto" style={{ display: 'flex', alignItems: 'center' }}>
              {keys.map((key) => (
                <Popover
                  key={key}
                  placement="bottom"
                  overlayInnerStyle={{
                    maxHeight: '50vh',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }}
                  content={
                    <>
                      <Row align="middle" gutter={5}>
                        <Col
                          style={{
                            width: 16,
                            height: 16,
                            background: colors[key],
                            marginRight: 5,
                          }}
                        />
                        <Col>{capitalizeFirstLetter(key)}</Col>
                        <Col>({each[key]?.total || 0})</Col>
                      </Row>
                      <Space
                        direction="vertical"
                        style={{ paddingLeft: 21, paddingTop: 10 }}
                      >
                        {key === 'development' &&
                          each.development?.workUnits?.map((each) => (
                            <div
                              key={`development_${each.project?.id}_${each.workUnitName}`}
                            >
                              <ProjectAvatar project={each.project!} />
                              {' - '}
                              {each.workUnitName}
                            </div>
                          ))}
                        {key === 'management' &&
                          each.management?.workUnits?.map((each) => (
                            <div
                              key={`management_workUnits_${each.project?.id}_${each.workUnitName}`}
                            >
                              <ProjectAvatar project={each.project!} />
                              {' - '}
                              {each.workUnitName}
                            </div>
                          ))}
                        {key === 'management' &&
                          each.management?.projectHeads?.map((each) => (
                            <div
                              key={`management_projectHeads_${each.project?.id}_${each.position}`}
                            >
                              <ProjectAvatar project={each.project!} />
                              {' - '}
                              {kebabToPascalCase(each.position || '')}
                            </div>
                          ))}
                        {key === 'learning' &&
                          each.learning?.workUnits?.map((each) => (
                            <div
                              key={`learning_${each.project?.id}_${each.workUnitName}`}
                            >
                              <ProjectAvatar project={each.project!} />
                              {' - '}
                              {each.workUnitName}
                            </div>
                          ))}
                        {key === 'training' && each.training?.mentees?.length && (
                          <>
                            <div>Mentor:</div>
                            {each.training.mentees.map((each) => (
                              <div key={`training_${each.username}`}>
                                <UserAvatar user={each} />
                              </div>
                            ))}
                          </>
                        )}
                        {key === 'training' &&
                          each.training?.workUnits?.length && (
                            <>
                              <div>Training:</div>
                              <ul style={{ paddingLeft: 30 }}>
                                {each.training.workUnits.map((each) => (
                                  <li key={`training_${each.workUnitName}`}>
                                    {each.workUnitName}
                                  </li>
                                ))}
                              </ul>
                            </>
                          )}
                      </Space>
                    </>
                  }
                >
                  <div
                    key={key}
                    style={{
                      height: 16,
                      width: `${((each[key]?.total || 0) * 100) / maxDisplay}%`,
                      backgroundColor: colors[key],
                    }}
                  />
                </Popover>
              ))}
            </Col>
          </Row>
        ))}
      </div>
      <Space
        style={{ width: '100%', justifyContent: 'space-evenly', marginTop: 20 }}
      >
        {keys.map((key) => (
          <Row key={key}>
            <div
              style={{
                width: 16,
                height: 16,
                background: colors[key],
                margin: '3px 6px 3px 0',
              }}
            />
            <div>
              <div style={{ fontWeight: '500' }}>
                {capitalizeFirstLetter(key)}
              </div>
              <div>{summary[key] || 0}%</div>
            </div>
          </Row>
        ))}
      </Space>
    </div>
  )
}
