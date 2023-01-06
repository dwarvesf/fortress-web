import { AgreementLevel } from 'constants/agreementLevel'

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
