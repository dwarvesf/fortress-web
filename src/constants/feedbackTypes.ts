export enum FeedbackType {
  SURVEY = 'survey',
  APPRECIATION = 'appreciation',
  FEEDBACK = 'feedback',
}

export const feedbackTypes: Record<FeedbackType, string> = {
  [FeedbackType.SURVEY]: 'Survey',
  [FeedbackType.APPRECIATION]: 'Appreciation',
  [FeedbackType.FEEDBACK]: 'Feedback',
}
