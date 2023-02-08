import { Card, Tabs } from 'antd'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { PendingPositions } from './PendingPositions'
import { AvailablePositions } from './AvailablePositions'

export const PendingAndAvailablePositions = () => {
  const { data, loading } = useFetchWithCache(
    GET_PATHS.getResourceAvailability,
    () => client.getResourceAvailability(),
  )

  return (
    <Card
      style={{ height: 500, display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ padding: 0, height: 500 }}
    >
      <Tabs
        tabBarStyle={{ padding: '0 24px', margin: 0, height: 42 }}
        items={[
          {
            key: 'pending',
            label: `Pending (${data?.data?.slots?.length || 0})`,
            children: (
              <PendingPositions
                data={data?.data?.slots || []}
                loading={loading}
              />
            ),
          },
          {
            key: 'available',
            label: `Available (${data?.data?.employees?.length || 0})`,
            children: (
              <AvailablePositions
                data={data?.data?.employees || []}
                loading={loading}
              />
            ),
          },
        ]}
      />
    </Card>
  )
}
