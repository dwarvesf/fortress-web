import { Select, Space, Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import Engagement from 'components/pages/dashboard/engagement/Engagement'
import { useState } from 'react'

// mock interface, this should be base on the filter (department, seniority,...) and provided by BE
interface Feedbacks {
  design?: number
  operation?: number
  engineering?: number
}

interface Dataset {
  name?: string
  average?: number
  feedbacks?: Feedbacks
}

export interface EngagementAverageProps {
  question?: string
  dataset?: Dataset[]
}

export const mockData: EngagementAverageProps[] = [
  {
    question: 'Do I know what is expected of me at work?',
    dataset: [
      {
        name: 'Q1/2022',
        average: 2.4,
        feedbacks: {
          design: 3,
          operation: 2,
          engineering: 2.2,
        },
      },
      {
        name: 'Q2/2022',
        average: 4,
        feedbacks: {
          design: 3,
          operation: 4.5,
          engineering: 4.5,
        },
      },
      {
        name: 'Q3/2022',
        average: 3.5,
        feedbacks: {
          design: 4,
          operation: 3.1,
          engineering: 3.4,
        },
      },
      {
        name: 'Q4/2022',
        average: 5,
        feedbacks: {
          design: 5,
          operation: 5,
          engineering: 5,
        },
      },
      {
        name: 'Q1/2023',
        average: 4.5,
        feedbacks: {
          design: 3.5,
          operation: 5,
          engineering: 5,
        },
      },
    ],
  },
  {
    question:
      'Do I have the materials and equipment I need to do my work right?',
    dataset: [
      {
        name: 'Q1/2022',
        average: 2.4,
        feedbacks: {
          design: 3,
          operation: 2,
          engineering: 2.2,
        },
      },
      {
        name: 'Q2/2022',
        average: 2,
        feedbacks: {
          design: 1.5,
          operation: 2.5,
          engineering: 2,
        },
      },
      {
        name: 'Q3/2022',
        average: 3.2,
        feedbacks: {
          design: 4,
          operation: 2.2,
          engineering: 3.4,
        },
      },
      {
        name: 'Q4/2022',
        average: 3,
        feedbacks: {
          design: 3,
          operation: 2.7,
          engineering: 3.3,
        },
      },
      {
        name: 'Q1/2023',
        average: 5,
        feedbacks: {
          design: 5,
          operation: 5,
          engineering: 5,
        },
      },
    ],
  },
  {
    question: 'Do I have the opportunity to do what I do best every day?',
    dataset: [
      {
        name: 'Q1/2022',
        average: 2.4,
        feedbacks: {
          design: 3,
          operation: 2,
          engineering: 2.2,
        },
      },
      {
        name: 'Q2/2022',
        average: 3,
        feedbacks: {
          design: 3,
          operation: 3.5,
          engineering: 2.5,
        },
      },
      {
        name: 'Q3/2022',
        average: 4,
        feedbacks: {
          design: 4,
          operation: 4.1,
          engineering: 3.9,
        },
      },
      {
        name: 'Q4/2022',
        average: 5,
        feedbacks: {
          design: 5,
          operation: 5,
          engineering: 5,
        },
      },
      {
        name: 'Q1/2023',
        average: 0,
        feedbacks: {
          design: 0,
          operation: 0,
          engineering: 0,
        },
      },
    ],
  },
]

const DashboardPage = () => {
  const [filterCategory, setFilterCategory] = useState<string>('department')

  return (
    <>
      <SEO title="Dashboard - Inbox" />

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
          defaultActiveKey="engagement"
          onTabClick={() => {}}
          tabBarExtraContent={
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
          }
          items={[
            // {
            //   key: 'projects',
            //   label: `Projects`,
            //   children: <>Projects</>,
            // },
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
