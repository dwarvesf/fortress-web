import { Space, Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import { Stacks } from 'components/pages/config/Stacks'
import { useState } from 'react'

const DashboardPage = () => {
  const [currentTab, setCurrentTab] = useState<string>('stacks')

  return (
    <>
      <SEO title="Config" />

      <Breadcrumb
        items={[
          {
            label: 'Config',
          },
        ]}
      />

      <PageHeader title="Config" />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Tabs
          defaultActiveKey={currentTab}
          onTabClick={(t) => setCurrentTab(t)}
          items={[
            {
              key: 'stacks',
              label: 'Stacks',
              children: <Stacks />,
            },
          ]}
        />
      </Space>
    </>
  )
}

export default DashboardPage
