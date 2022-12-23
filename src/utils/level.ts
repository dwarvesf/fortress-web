import {
  AgreementLevel,
  agreementLevels,
  deadlineLevels,
  learningLevels,
  workloadLevels,
} from 'constants/agreementLevel'
import { DomainTypes } from 'constants/feedbackTypes'

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
