import { Card, Tabs } from 'antd'
import { EmployeeTable } from './EmployeeTable'
import { PositionTable } from './PositionTable'

export const PendingAndAvailableTable = () => {
  return (
    <Card bodyStyle={{ padding: '12px 24px' }}>
      <Tabs
        items={[
          {
            key: 'pending',
            label: `Pending (3)`,
            children: <PositionTable />,
          },
          {
            key: 'available',
            label: `Available (2)`,
            children: <PositionTable />,
          },
        ]}
      />
      <Tabs
        style={{ marginTop: 10 }}
        items={[
          {
            key: 'pending',
            label: `Pending (3)`,
            children: <EmployeeTable />,
          },
          {
            key: 'available',
            label: `Available (2)`,
            children: <EmployeeTable />,
          },
        ]}
      />
    </Card>
  )
}
