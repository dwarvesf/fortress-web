import { Tabs } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { General } from 'components/pages/employees/detail/General'

const Default = () => {
  return (
    <>
      <PageHeader title="John Doe" />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <General />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Document" key="2">
          Document
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default Default
