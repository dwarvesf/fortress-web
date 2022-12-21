import { AgreementLevel } from 'constants/agreementLevel'
import { ViewDomain } from 'types/schema'

export const mapScoreToLikertScale = (model: ViewDomain): AgreementLevel => {
  if (!model.average) {
    return AgreementLevel.STRONGLY_DISAGREE
  }
  if (model?.average <= 1.5) {
    return AgreementLevel.STRONGLY_DISAGREE
  }
  if (model?.average <= 2.5) {
    return AgreementLevel.DISAGREE
  }
  if (model?.average <= 3.5) {
    return AgreementLevel.MIXED
  }
  if (model?.average <= 4.5) {
    return AgreementLevel.AGREE
  }
  return AgreementLevel.STRONGLY_AGREE
}
