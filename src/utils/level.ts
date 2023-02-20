import { AgreementLevel } from 'constants/agreementLevel'
import { ModelLikertScaleCount } from 'types/schema'
import { camelToSnakeCase } from './string'

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
