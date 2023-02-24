import { Space, Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import Projects from 'components/pages/dashboard/projects/Projects'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import Resources from 'components/pages/dashboard/resources/Resources'
import Engagement from 'components/pages/dashboard/engagement/Engagement'
import { useMemo } from 'react'
import { Permission } from 'constants/permission'
import { useAuthContext } from 'context/auth'

const DashboardPage = () => {
  const { permissions } = useAuthContext()
  const { tabKey = 'projects', setTabKey } = useTabWithQuery()

  const tabs = useMemo(() => {
    return [
      {
        key: 'projects',
        label: `Projects`,
        children: <Projects />,
        permission: Permission.DASHBOARDS_PROJECTS_READ,
      },
      {
        key: 'resources',
        label: `Resources`,
        children: <Resources />,
        permission: Permission.DASHBOARDS_RESOURCES_READ,
      },
      {
        key: 'engagement',
        label: `Engagement`,
        children: <Engagement />,
        permission: Permission.DASHBOARDS_ENGAGEMENT_READ,
      },
    ].filter((i) => permissions.includes(i.permission))
  }, [permissions])

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
          items={tabs}
        />
      </Space>
    </>
  )
}

export default DashboardPage
