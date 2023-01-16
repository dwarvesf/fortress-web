import { AgreementLevel } from 'constants/agreementLevel'
import { ReactElement } from 'react'
import { Icon } from '@iconify/react'
import { DomainTypes } from 'constants/feedbackTypes'

export const mapScoreToLikertScale = (score: number): AgreementLevel => {
  if (!score) {
    return AgreementLevel.STRONGLY_DISAGREE
  }
  if (score <= 1.5) {
    return AgreementLevel.STRONGLY_DISAGREE
  }
  if (score <= 2.5) {
    return AgreementLevel.DISAGREE
  }
  if (score <= 3.5) {
    return AgreementLevel.MIXED
  }
  if (score <= 4.5) {
    return AgreementLevel.AGREE
  }
  return AgreementLevel.STRONGLY_AGREE
}

export const getTrendByPercentage = (
  diffPercentage: number,
): ReactElement | string => {
  if (diffPercentage === 0) {
    return ''
  }
  return (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {diffPercentage > 0 ? (
        <Icon
          icon="material-symbols:arrow-right-alt"
          style={{ rotate: '-45deg' }}
        />
      ) : (
        <Icon
          icon="material-symbols:arrow-right-alt"
          style={{ rotate: '45deg' }}
        />
      )}
      {Math.abs(diffPercentage).toFixed(2)}%
    </span>
  )
}

export const getTrendStatusColor = (trend: number) => {
  if (trend > 0) {
    return '#1aae9f'
  }
  if (trend < 0) {
    return '#ff4d4f'
  }
  return '#788896'
}

// threshold to select color based on the interval ranging from the
// last score and the latest one
const trendColorThresholds: Record<
  Exclude<DomainTypes, 'engagement'>,
  { color: string; from: number; to: number }[]
> = {
  workload: [
    { color: '#1aae9f', from: 0, to: 3.6 }, // Up from 0 to 3.6
    { color: '#1aae9f', from: 5, to: 3.6 }, // Down from 5 to 3.6
    { color: '#ff4d4f', from: 3.6, to: 5 }, // Up from 3.6 to 5
    { color: '#ff4d4f', from: 2.1, to: 0 }, // Down from 2.1 to 0
    { color: '#788896', from: 3.6, to: 2.1 }, // Down from 3.6 to 2.1
    { color: '#ff4d4f', from: 5, to: 0 }, // Since these 2 leads to Down from 2.1 to 0
    { color: '#ff4d4f', from: 3.6, to: 0 },
    { color: '#ff4d4f', from: 0, to: 5 }, // Since this lead to Up from 3.6 to 5
  ],
  deadline: [
    { color: '#1aae9f', from: 0, to: 5 }, // Up from 0 to 5
    { color: '#ff4d4f', from: 3, to: 0 }, // Down from 3 to 0
    { color: '#788896', from: 5, to: 3 }, // Down from 5 to 3
    { color: '#ff4d4f', from: 5, to: 0 }, // Since this lead to Down from 3 to 0
  ],
  learning: [
    { color: '#1aae9f', from: 0, to: 5 },
    { color: '#ff4d4f', from: 3, to: 0 },
    { color: '#788896', from: 5, to: 3 },
    { color: '#ff4d4f', from: 5, to: 0 },
  ],
}

// this util is used for checking if an interval ranging from the last
// score and the latest one is inside another larger interval orderly
const checkIsSubInterval = (range: number[], prev: number, cur: number) => {
  return (
    (range[0] >= prev && prev > cur && cur >= range[1]) || // left bound -> prev -> cur -> right bound
    (range[0] <= prev && prev < cur && cur <= range[1]) // left bound <- prev <- cur <- right bound
  )
}

export const getTrendScoreColor = (
  domain: Exclude<DomainTypes, 'engagement'>,
  curScore: number,
  prevScore?: number,
) => {
  return prevScore
    ? trendColorThresholds[domain].find((t) =>
        checkIsSubInterval([t.from, t.to], prevScore, curScore),
      )?.color || '#788896'
    : '#788896'
}
