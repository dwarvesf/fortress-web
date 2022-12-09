import { FeedbackSubtype } from 'constants/feedbackTypes'
import { Pagination } from './Pagination'

export class SurveyListFilter extends Pagination {
  subtype?: FeedbackSubtype

  constructor(subtype?: FeedbackSubtype) {
    super()
    this.subtype = subtype
  }
}
