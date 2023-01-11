import { AgreementLevel } from 'constants/agreementLevel'
import { ReactElement } from 'react'
import { ArrowRightUp, ArrowRightDown, Pause } from '@icon-park/react'
import { likertScalesColors } from 'constants/colors'
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
  curScore: number,
  statDiff: number,
): ReactElement | string => {
  if (statDiff === 0) {
    if (curScore !== 0) {
      // Which means trend equals 0 because score is unchanged, not because no data collected (auto returns 0)
      return <Pause strokeWidth={5} style={{ rotate: '90deg' }} />
    }
    return ''
  }
  return (
    <>
      {statDiff > 0 ? (
        <ArrowRightUp strokeWidth={5} />
      ) : (
        <ArrowRightDown strokeWidth={5} />
      )}
      {Math.abs(statDiff).toFixed(2)}%
    </>
  )
}

export const getTrendScoreColor = (
  domain: DomainTypes,
  prevScore: number,
  curScore: number,
) => {
  // Workload domain
  if (domain === 'workload') {
    if (curScore > prevScore) {
      if (prevScore >= 0 && curScore <= 3.6) {
        // Up from 0 to 3.6
        return likertScalesColors['strongly-agree'].background
      }
      // Up from 3.6 to 5
      return likertScalesColors['strongly-disagree'].background
    }

    if (prevScore <= 5 && curScore >= 3.6) {
      // Down from 5 to 3.6
      return likertScalesColors['strongly-agree'].background
    }
    if (prevScore <= 2.1 && curScore >= 0) {
      // Down from 2.1 to 0
      return likertScalesColors['strongly-disagree'].background
    }
    // The rest
    return likertScalesColors.mixed.background
  }

  // Other domains
  if (curScore > prevScore) {
    // Up from 0 to 5
    return likertScalesColors['strongly-agree'].background
  }

  if (prevScore <= 3 && curScore >= 0) {
    // Down from 3 to 0
    return likertScalesColors['strongly-disagree'].background
  }
  // The rest
  return likertScalesColors.mixed.background
}

export const getTrendStatusColor = (trend: number) => {
  if (trend > 0) {
    return likertScalesColors['strongly-agree'].background
  }
  if (trend < 0) {
    return likertScalesColors['strongly-disagree'].background
  }
  return likertScalesColors.mixed.background
}
