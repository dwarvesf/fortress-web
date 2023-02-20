import { AgreementLevel } from './agreementLevel'
import { DomainTypes } from './feedbackTypes'

type WorkSurvey = {
  [domain in DomainTypes]: {
    [agreementLevel in AgreementLevel]: {
      name: string
      background: string
      text: string
    }
  }
}

export const workSurveys: WorkSurvey = {
  workload: {
    [AgreementLevel.STRONGLY_DISAGREE]: {
      name: 'Breeze',
      background: '#ffd666',
      text: 'black',
    },
    [AgreementLevel.DISAGREE]: {
      name: 'Could handle more',
      background: '#597ef7',
      text: 'white',
    },
    [AgreementLevel.MIXED]: {
      name: 'Manageable',
      background: '#788896',
      text: 'white',
    },
    [AgreementLevel.AGREE]: {
      name: 'Overwhelming',
      background: 'orange',
      text: 'white',
    },
    [AgreementLevel.STRONGLY_AGREE]: {
      name: `Can't keep up`,
      background: '#ff4d4f',
      text: 'white',
    },
  },
  deadline: {
    [AgreementLevel.STRONGLY_DISAGREE]: {
      name: 'Very uncertain',
      background: '#ff4d4f',
      text: 'white',
    },
    [AgreementLevel.DISAGREE]: {
      name: 'Some what uncertain',
      background: '#ffd666',
      text: 'black',
    },
    [AgreementLevel.MIXED]: {
      name: 'Neutral',
      background: '#788896',
      text: 'white',
    },
    [AgreementLevel.AGREE]: {
      name: 'Some what confident',
      background: '#597ef7',
      text: 'white',
    },
    [AgreementLevel.STRONGLY_AGREE]: {
      name: 'Very confident',
      background: '#1aae9f',
      text: 'white',
    },
  },
  learning: {
    [AgreementLevel.STRONGLY_DISAGREE]: {
      name: 'Very little',
      background: '#ff4d4f',
      text: 'white',
    },
    [AgreementLevel.DISAGREE]: {
      name: 'Some what',
      background: '#ffd666',
      text: 'black',
    },
    [AgreementLevel.MIXED]: {
      name: 'Moderate',
      background: '#788896',
      text: 'white',
    },
    [AgreementLevel.AGREE]: {
      name: 'A lot',
      background: '#597ef7',
      text: 'white',
    },
    [AgreementLevel.STRONGLY_AGREE]: {
      name: 'Extremely',
      background: '#1aae9f',
      text: 'white',
    },
  },
  engagement: {
    [AgreementLevel.STRONGLY_DISAGREE]: {
      name: '-',
      background: '#ff4d4f',
      text: 'white',
    },
    [AgreementLevel.DISAGREE]: {
      name: '-',
      background: '#ffd666',
      text: 'black',
    },
    [AgreementLevel.MIXED]: {
      name: '-',
      background: '#788896',
      text: 'white',
    },
    [AgreementLevel.AGREE]: {
      name: '-',
      background: '#597ef7',
      text: 'white',
    },
    [AgreementLevel.STRONGLY_AGREE]: {
      name: '-',
      background: '#1aae9f',
      text: 'white',
    },
  },
}
