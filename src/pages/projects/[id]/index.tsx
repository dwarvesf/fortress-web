import { Tabs } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { General } from 'components/pages/projects/detail/General'
import { Staff } from 'components/pages/projects/detail/Staff'

const Default = () => {
  return (
    <>
      <PageHeader title="Fortress" />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <General />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Staff" key="2">
          <Staff />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Performance" key="3">
          Performance
        </Tabs.TabPane>
        <Tabs.TabPane tab="Stakeholders" key="4">
          Stakeholders
        </Tabs.TabPane>
        <Tabs.TabPane tab="Document" key="5">
          Document
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default Default
