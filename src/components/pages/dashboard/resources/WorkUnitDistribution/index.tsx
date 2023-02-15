import { Card, Col, Input, Row, Select } from 'antd'
import { WorkUnitType, workUnitTypes } from 'constants/workUnitTypes'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { client, GET_PATHS } from 'libs/apis'
import debounce from 'lodash.debounce'
import { WorkUnitDistributionsFilter } from 'types/filters/WorkUnitDistributionsFilter'
import { WorkUnitDistributionChart } from './WorkUnitDistributionChart'

export const WorkUnitDistribution = () => {
  const { filter, setFilter } = useFilter(new WorkUnitDistributionsFilter())
  const { data } = useFetchWithCache(
    [GET_PATHS.getResourceWorkUnitDistribution, filter],
    () => client.getResourceWorkUnitDistribution(filter),
  )
  const { data: summary } = useFetchWithCache(
    GET_PATHS.getResourceWorkUnitDistributionSummary,
    () => client.getResourceWorkUnitDistributionSummary(),
  )

  return (
    <Card
      title="Work Unit Distribution"
      style={{ height: 500, display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ padding: 8, height: 500 }}
    >
      <Row gutter={10} style={{ marginBottom: 20 }}>
        <Col span={5}>
          <Select
            style={{ width: '100%' }}
            options={['All', ...Object.keys(workUnitTypes)].map((key) => {
              return {
                value: key,
                label: workUnitTypes[key as WorkUnitType] || 'All',
              }
            })}
            value={filter.type || 'All'}
            onChange={(type: 'All' | WorkUnitType) => {
              setFilter({
                type: type === 'All' ? undefined : type,
              })
            }}
          />
        </Col>
        <Col span={5}>
          <Select
            style={{ width: '100%' }}
            options={[
              { value: 'asc', label: 'Sort ASC' },
              { value: 'desc', label: 'Sort DESC' },
            ]}
            value={filter.sort}
            onChange={(sort) => setFilter({ sort })}
          />
        </Col>
        <Col span={14} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Input
            placeholder="Search by name"
            className="bordered"
            style={{ maxWidth: 300 }}
            onChange={debounce((e) => {
              setFilter({ name: e.target.value })
            }, 300)}
          />
        </Col>
      </Row>
      <WorkUnitDistributionChart
        data={data?.data?.workUnitDistributions || []}
        summary={summary?.data || {}}
      />
    </Card>
  )
}
