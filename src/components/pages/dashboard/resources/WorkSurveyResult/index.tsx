import { Card, Tabs } from 'antd'
import { WorkSurveyTable } from './WorkSurveyTable'

export const WorkSurveyResult = () => {
  return (
    <Card
      style={{ height: 500, display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ padding: 0, height: 500 }}
    >
      <Tabs
        tabBarStyle={{ padding: '0 24px', margin: 0, height: 42 }}
        items={[
          {
            key: 'workload',
            label: `Workload`,
            children: <WorkSurveyTable domain="workload" />,
          },
          {
            key: 'deadline',
            label: `Deadline`,
            children: <WorkSurveyTable domain="deadline" />,
          },
          {
            key: 'learning',
            label: `Learning`,
            children: <WorkSurveyTable domain="learning" />,
          },
        ]}
      />
    </Card>
  )
}
