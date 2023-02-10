import { useDebounce } from '@dwarvesf/react-hooks'
import { Card, Input, Row, Space, Tabs } from 'antd'
import { DomainTypes } from 'constants/feedbackTypes'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useState } from 'react'
import { capitalizeFirstLetter } from 'utils/string'
import { WorkSurveyTable } from './WorkSurveyTable'

export const WorkSurveyResult = () => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 300)
  const { data } = useFetchWithCache(
    [GET_PATHS.getResourceWorkSurveySummaries, debouncedValue],
    () => client.getResourceWorkSurveySummaries(debouncedValue),
  )

  return (
    <Card
      style={{ height: 500, display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ padding: 0, height: 500 }}
    >
      <Tabs
        tabBarStyle={{ padding: '0 24px', margin: 0, height: 42 }}
        items={['workload', 'deadline', 'learning'].map((key) => ({
          key,
          label: capitalizeFirstLetter(key),
          children: (
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row justify="end" style={{ padding: 8 }}>
                <Input
                  placeholder="Search by name"
                  className="bordered"
                  style={{ maxWidth: 300 }}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                  }}
                />
              </Row>
              <WorkSurveyTable
                domain={key as DomainTypes}
                data={data?.data?.find((each) => each.type === key)}
              />
            </Space>
          ),
        }))}
      />
    </Card>
  )
}
