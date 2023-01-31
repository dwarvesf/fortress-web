import { Card, Tabs } from 'antd'
import { PendingPositions } from './PendingPositions'
import { AvailablePositions } from './AvailablePositions'

export const PendingAndAvailablePositions = () => {
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
            label: `Pending (3)`,
            children: <PendingPositions />,
          },
          {
            key: 'available',
            label: `Available (2)`,
            children: <AvailablePositions />,
          },
        ]}
      />
    </Card>
  )
}
