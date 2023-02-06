import { Col, Row, Select } from 'antd'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useEffect, useState } from 'react'
import { EngagementAverageCard } from './EngagementAverageCard'

const Engagement = () => {
  const [filterCategory, setFilterCategory] = useState<string>('chapter')
  const [currentDate, setCurrentDate] = useState({
    quarter: '',
    startDate: '',
  })
  const { data: engagementData } = useFetchWithCache(
    GET_PATHS.getDashboardsEngagementInfo,
    () => client.getDashboardsEngagementInfo(),
  )
  const { data: engagementDetail } = useFetchWithCache(
    [
      GET_PATHS.getDashboardsEngagementDetail,
      filterCategory,
      currentDate.startDate,
    ],
    () =>
      currentDate.startDate
        ? client.getDashboardsEngagementDetail(
            filterCategory,
            currentDate.startDate,
          )
        : undefined,
  )

  // quarter is used for display and clicking event of x axis
  // startDate is used for detail api, with YYYY-MM-DD format
  // timestamp is used for sorting since api not returning a correct order
  const quarterMapping = engagementData?.data?.[0]?.stats
    ?.map((each) => ({
      quarter: each.title,
      startDate: each.startDate?.slice(0, 10),
      timestamp: new Date(each.startDate || 0).getTime(),
    }))
    // desc sort, get the current quarter at index 0
    .sort((a, b) => b.timestamp - a.timestamp)
  const currentQuarter = currentDate.quarter
  const setCurrentQuarter = (quarter: string) => {
    const currentDate = quarterMapping?.find((each) => each.quarter === quarter)
    setCurrentDate({
      quarter: currentDate?.quarter || '',
      startDate: currentDate?.startDate || '',
    })
  }

  const defaultDate = quarterMapping?.[0]
  useEffect(() => {
    if (
      defaultDate?.quarter &&
      defaultDate?.startDate &&
      !currentDate.quarter
    ) {
      setCurrentDate({
        quarter: defaultDate.quarter,
        startDate: defaultDate.startDate,
      })
    }
  }, [currentDate, defaultDate])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Select
          style={{ width: 135 }}
          value={filterCategory}
          onChange={setFilterCategory}
          options={[
            // { label: 'Department', value: 'department' },
            { label: 'Chapter', value: 'chapter' },
            { label: 'Seniority', value: 'seniority' },
            { label: 'Project', value: 'project' },
          ]}
        />
      </Col>
      {engagementData?.data?.map((data) => (
        <Col span={24} lg={12} xl={8} key={data.questionID}>
          <EngagementAverageCard
            data={data}
            detail={engagementDetail?.data?.find(
              (detail) => detail.questionID === data.questionID,
            )}
            filterCategory={filterCategory}
            {...{ currentQuarter, setCurrentQuarter }}
          />
        </Col>
      ))}
    </Row>
  )
}

export default Engagement
