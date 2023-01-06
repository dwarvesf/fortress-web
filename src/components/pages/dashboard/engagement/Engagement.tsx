import { mockData } from 'pages/dashboard'
import { useState } from 'react'
import { EngagementAverageCard } from './EngagementAverageCard'

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
