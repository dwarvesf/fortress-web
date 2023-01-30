import { Card, Tabs } from 'antd'
import { useState } from 'react'
import { PendingPositions } from './PendingPositions'
import { AvailablePositions } from './AvailablePositions'

export const PendingAndAvailablePositions = () => {
  const [currentTab, setCurrentTab] = useState<'pending' | 'available'>(
    'pending',
  )

  return (
    <Card
      style={{ height: 500, display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ padding: '8px 0', height: 500 }}
      title={
        <Tabs
          defaultActiveKey={currentTab}
          onTabClick={(key) => setCurrentTab(key as 'pending' | 'available')}
          items={[
            {
              key: 'pending',
              label: `Pending (3)`,
            },
            {
              key: 'available',
              label: `Available (2)`,
            },
          ]}
        />
      }
    >
      {
        {
          pending: <PendingPositions />,
          available: <AvailablePositions />,
        }[currentTab]
      }
    </Card>
  )
}
