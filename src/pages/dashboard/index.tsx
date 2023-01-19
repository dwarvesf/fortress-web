import { Select, Space, Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import Projects from 'components/pages/dashboard/projects/Projects'
import { useState } from 'react'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import Resources from 'components/pages/dashboard/resources/Resources'

// mock interface, this should be base on the filter (department, seniority,...) and provided by BE
interface Feedbacks {
  design?: number
  operation?: number
  engineering?: number
}

export interface EngagementAverageProps {
  question?: string
  dataset?: {
    name?: string
    average?: number
    feedbacks?: Feedbacks
  }[]
}

const DashboardPage = () => {
  const [filterCategory, setFilterCategory] = useState<string>('department')
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
          tabBarExtraContent={
            tabKey === 'engagement' ? (
              <Select
                style={{ width: 135 }}
                value={filterCategory}
                onChange={setFilterCategory}
                options={[
                  { label: 'Department', value: 'department' },
                  { label: 'Chapter', value: 'chapter' },
                  { label: 'Seniority', value: 'seniority' },
                  { label: 'Project', value: 'project' },
                ]}
              />
            ) : null
          }
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
            // {
            //   key: 'engagement',
            //   label: `Engagement`,
            //   children: <Engagement filterCategory={filterCategory} />,
            // },
          ]}
        />
      </Space>
    </>
  )
}

export default DashboardPage
