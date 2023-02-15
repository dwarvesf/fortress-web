import { Space, Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import Projects from 'components/pages/dashboard/projects/Projects'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import Resources from 'components/pages/dashboard/resources/Resources'
import Engagement from 'components/pages/dashboard/engagement/Engagement'

export const mockData = [
  {
    id: '1',
    name: 'Fortress',
    code: 'fortress',
    size: {
      value: 3,
      trend: 0,
    },
    health: {
      value: 3.8,
      trend: -2.56,
    },
    audit: {
      value: 3.5,
      trend: -2.78,
    },
    newItem: {
      value: 6,
      trend: -50,
    },
    resolvedItem: {
      value: 3,
      trend: 0,
    },
  },
  {
    id: '3',
    name: 'Lorem ipsum3',
    code: 'lorem-ipsum3',
    size: {
      value: 3,
      trend: 0,
    },
    health: {
      value: 3.5,
      trend: -2.78,
    },
    audit: {
      value: 3.9,
      trend: 2.63,
    },
    newItem: {
      value: 27,
      trend: 50,
    },
    resolvedItem: {
      value: 2,
      trend: -33.33,
    },
  },
  {
    id: '2',
    name: 'Lorem ipsum',
    code: 'lorem-ipsum',
    size: {
      value: 3,
      trend: 0,
    },
    health: {
      value: 3.5,
      trend: -2.78,
    },
    audit: {
      value: 3.9,
      trend: 2.63,
    },
    newItem: {
      value: 27,
      trend: 50,
    },
    resolvedItem: {
      value: 2,
      trend: -33.33,
    },
  },
  {
    id: '6',
    name: 'Lorem ipsum6',
    code: 'lorem-ipsum6',
    size: {
      value: 3,
      trend: 0,
    },
    health: {
      value: 3.5,
      trend: -2.78,
    },
    audit: {
      value: 3.9,
      trend: 2.63,
    },
    newItem: {
      value: 27,
      trend: 50,
    },
    resolvedItem: {
      value: 2,
      trend: -33.33,
    },
  },
  {
    id: '9',
    name: 'Lorem ipsum9',
    code: 'lorem-ipsum9',
    size: {
      value: 3,
      trend: 0,
    },
    health: {
      value: 3.5,
      trend: -2.78,
    },
    audit: {
      value: 3.9,
      trend: 2.63,
    },
    newItem: {
      value: 27,
      trend: 50,
    },
    resolvedItem: {
      value: 2,
      trend: -33.33,
    },
  },
  {
    id: '4',
    name: 'Lorem ipsum4',
    code: 'lorem-ipsum4',
    size: {
      value: 3,
      trend: 0,
    },
    health: {
      value: 3.5,
      trend: -2.78,
    },
    audit: {
      value: 3.9,
      trend: 2.63,
    },
    newItem: {
      value: 27,
      trend: 50,
    },
    resolvedItem: {
      value: 2,
      trend: -33.33,
    },
  },
  {
    id: '7',
    name: 'Lorem ipsum7',
    code: 'lorem-ipsum7',
    size: {
      value: 3,
      trend: 0,
    },
    health: {
      value: 3.5,
      trend: -2.78,
    },
    audit: {
      value: 3.9,
      trend: 2.63,
    },
    newItem: {
      value: 27,
      trend: 50,
    },
    resolvedItem: {
      value: 2,
      trend: -33.33,
    },
  },
  {
    id: '5',
    name: 'Lorem ipsum5',
    code: 'lorem-ipsum5',
    size: {
      value: 3,
      trend: 0,
    },
    health: {
      value: 3.5,
      trend: -2.78,
    },
    audit: {
      value: 3.9,
      trend: 2.63,
    },
    newItem: {
      value: 27,
      trend: 50,
    },
    resolvedItem: {
      value: 2,
      trend: -33.33,
    },
  },
  {
    id: '8',
    name: 'Lorem ipsum8',
    code: 'lorem-ipsum8',
    size: {
      value: 3,
      trend: 0,
    },
    health: {
      value: 3.5,
      trend: -2.78,
    },
    audit: {
      value: 3.9,
      trend: 2.63,
    },
    newItem: {
      value: 27,
      trend: 50,
    },
    resolvedItem: {
      value: 2,
      trend: -33.33,
    },
  },
]

export const mockProjectSizeData = [
  {
    id: '1',
    name: 'Fortress',
    code: 'fortress',
    size: 3,
  },
  {
    id: '2',
    name: 'Lorem ipsum',
    code: 'lorem-ipsum',
    size: 3,
  },
  {
    id: '3',
    name: 'Lorem ipsum3',
    code: 'lorem-ipsum3',
    size: 3,
  },
  {
    id: '4',
    name: 'Lorem ipsum4',
    code: 'lorem-ipsum4',
    size: 3,
  },
  {
    id: '5',
    name: 'Lorem ipsum5',
    code: 'lorem-ipsum5',
    size: 3,
  },
  {
    id: '6',
    name: 'Lorem ipsum6',
    code: 'lorem-ipsum6',
    size: 3,
  },
  {
    id: '7',
    name: 'Lorem ipsum7',
    code: 'lorem-ipsum7',
    size: 3,
  },
  {
    id: '8',
    name: 'Lorem ipsum8',
    code: 'lorem-ipsum8',
    size: 3,
  },
  {
    id: '9',
    name: 'Lorem ipsum9',
    code: 'lorem-ipsum9',
    size: 3,
  },
]

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
