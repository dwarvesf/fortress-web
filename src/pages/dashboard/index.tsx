import { Space, Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import Projects from 'components/pages/dashboard/projects/Projects'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import Resources from 'components/pages/dashboard/resources/Resources'
import Engagement from 'components/pages/dashboard/engagement/Engagement'

const DashboardPage = () => {
  const { tabKey = 'projects', setTabKey } = useTabWithQuery()

  return (
    <>
      <SEO title="Dashboard" />

      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
          },
        ]}
      />

      <PageHeader title="Dashboard" />

      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Tabs
          defaultActiveKey={tabKey}
          onTabClick={(t) => setTabKey(t)}
          items={[
            {
              key: 'projects',
              label: `Projects`,
              children: <Projects />,
            },
            {
              key: 'resources',
              label: `Resources`,
              children: <Resources />,
            },
            {
              key: 'engagement',
              label: `Engagement`,
              children: <Engagement />,
            },
          ]}
        />
      </Space>
    </>
  )
}

export default DashboardPage
