import { AgreementLevel } from 'constants/agreementLevel'
import { ViewDomain } from 'types/schema'

export const mapScoreToLikertScale = (record: ViewDomain): AgreementLevel => {
  if (!record || !record.average) {
    return AgreementLevel.STRONGLY_DISAGREE
  }
  if (record?.average <= 1.5) {
    return AgreementLevel.STRONGLY_DISAGREE
  }
  if (record?.average <= 2.5) {
    return AgreementLevel.DISAGREE
  }
  if (record?.average <= 3.5) {
    return AgreementLevel.MIXED
  }
  if (record?.average <= 4.5) {
    return AgreementLevel.AGREE
  }
  return AgreementLevel.STRONGLY_AGREE
}
