import { FeedbackType } from 'constants/feedbackTypes'
import { Pagination } from './Pagination'

export class FeedbackListFilter extends Pagination {
  status?: string[]
  type?: FeedbackType[]
}
