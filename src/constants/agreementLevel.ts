export enum AgreementLevel {
  STRONGLY_DISAGREE = 'strongly-disagree',
  DISAGREE = 'disagree',
  MIXED = 'mixed',
  AGREE = 'agree',
  STRONGLY_AGREE = 'strongly-agree',
}

export const agreementLevels: Record<AgreementLevel, string> = {
  [AgreementLevel.STRONGLY_DISAGREE]: 'Strongly disagree',
  [AgreementLevel.DISAGREE]: 'Disagree',
  [AgreementLevel.MIXED]: 'Mixed',
  [AgreementLevel.AGREE]: 'Agree',
  [AgreementLevel.STRONGLY_AGREE]: 'Strongly agree',
}
