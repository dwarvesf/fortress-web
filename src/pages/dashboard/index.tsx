import { Select, Space, Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import Engagement from 'components/pages/dashboard/engagement/Engagement'
import Projects from 'components/pages/dashboard/projects/Projects'
import { FEATURES } from 'constants/features'
import { ROUTES } from 'constants/routes'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTabWithQuery } from 'hooks/useTabWithQuery'

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

export interface ProjectSizeProps {
  dataset?: {
    id: string
    name?: string
    value?: number
  }[]
}

const DashboardPage = () => {
  const { push } = useRouter()
  const flags = useFlags()

  const [filterCategory, setFilterCategory] = useState<string>('department')
  const { tabKey = 'projects', setTabKey } = useTabWithQuery()

  useEffect(() => {
    if (flags && !flags[FEATURES.DASHBOARD]) {
      push(ROUTES.PROJECTS)
    }
  }, [flags]) // eslint-disable-line

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
            // {
            //   key: 'resources',
            //   label: `Resources`,
            //   children: <>Resources</>,
            // },
            {
              key: 'engagement',
              label: `Engagement`,
              children: <Engagement filterCategory={filterCategory} />,
            },
          ]}
        />
      </Space>
    </>
  )
}

export default DashboardPage
