export enum FeedbackType {
  SURVEY = 'survey',
  FEEDBACK = 'feedback',
}

export enum FeedbackSubtype {
  APPRECIATION = 'appreciation',
  COMMENT = 'comment',
  PEER_REVIEW = 'peer-review',
  ENGAGEMENT = 'engagement',
  WORK = 'work',
}

export const feedbackTypes: Record<FeedbackType, string> = {
  [FeedbackType.SURVEY]: 'Survey',
  [FeedbackType.FEEDBACK]: 'Feedback',
}

export const feedbackSubtypes: Record<
  FeedbackType,
  Partial<Record<FeedbackSubtype, string>>
> = {
  [FeedbackType.SURVEY]: {
    [FeedbackSubtype.PEER_REVIEW]: 'Peer Review',
    [FeedbackSubtype.ENGAGEMENT]: 'Engagment',
    [FeedbackSubtype.WORK]: 'Work',
  },
  [FeedbackType.FEEDBACK]: {
    [FeedbackSubtype.APPRECIATION]: 'Appreciation',
    [FeedbackSubtype.COMMENT]: 'Comment',
  },
}

export enum FeedbackQuestionType {
  GENERAL = 'general',
  LIKERT_SCALE = 'likert-scale',
}
