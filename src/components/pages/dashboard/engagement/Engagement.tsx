import { EngagementAverageProps } from 'pages/dashboard'
import { useState } from 'react'
import { EngagementAverageCard } from './EngagementAverageCard'

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

const Engagement = ({ filterCategory }: { filterCategory: string }) => {
  const [currentQuarter, setCurrentQuarter] = useState<string>('Q1/2023')

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
      }}
    >
      {mockData.map((d) => (
        <EngagementAverageCard
          key={d.question}
          data={d}
          currentQuarter={currentQuarter}
          setCurrentQuarter={setCurrentQuarter}
          filterCategory={filterCategory}
        />
      ))}
    </div>
  )
}

export default Engagement
