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

export const workloadLevels: Record<AgreementLevel, string> = {
  [AgreementLevel.STRONGLY_DISAGREE]: 'Breeze',
  [AgreementLevel.DISAGREE]: 'Could handle more',
  [AgreementLevel.MIXED]: 'Manageable',
  [AgreementLevel.AGREE]: 'Overwhelming',
  [AgreementLevel.STRONGLY_AGREE]: `Can't keep up`,
}

export const deadlineLevels: Record<AgreementLevel, string> = {
  [AgreementLevel.STRONGLY_DISAGREE]: 'Very uncertain',
  [AgreementLevel.DISAGREE]: 'Some what uncertain',
  [AgreementLevel.MIXED]: 'Neutral',
  [AgreementLevel.AGREE]: 'Some what confident',
  [AgreementLevel.STRONGLY_AGREE]: 'Very confident',
}

export const learningLevels: Record<AgreementLevel, string> = {
  [AgreementLevel.STRONGLY_DISAGREE]: 'Very little',
  [AgreementLevel.DISAGREE]: 'Some what',
  [AgreementLevel.MIXED]: 'Moderate',
  [AgreementLevel.AGREE]: 'A lot',
  [AgreementLevel.STRONGLY_AGREE]: 'Extremely',
}
