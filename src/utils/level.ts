import {
  AgreementLevel,
  agreementLevels,
  deadlineLevels,
  learningLevels,
  workloadLevels,
} from 'constants/agreementLevel'
import { DomainTypes } from 'constants/feedbackTypes'
import { ModelLikertScaleCount } from 'types/schema'
import { camelToSnakeCase } from './string'

export const renderDomainLevels = (
  domain: DomainTypes,
): Record<AgreementLevel, string> => {
  if (domain === 'workload') {
    return workloadLevels
  }
  if (domain === 'deadline') {
    return deadlineLevels
  }
  if (domain === 'learning') {
    return learningLevels
  }
  return agreementLevels
}

// this function is used for getting likert-scale key that has the value !== 0
// the use case is when getting the specific likert-scale answer from a member
export const getWorkSurveyDetailReview = (
  count: ModelLikertScaleCount,
): AgreementLevel | undefined => {
  let result

  Object.keys(count).forEach((k) => {
    if (count[k as keyof ModelLikertScaleCount]! > 0) {
      result = camelToSnakeCase(k) as AgreementLevel
    }
  })

  return result
}
