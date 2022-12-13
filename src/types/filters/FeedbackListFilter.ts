import { Pagination } from './Pagination'

export class FeedbackListFilter extends Pagination {
  status?: string

  constructor(status = '') {
    super()
    this.status = status
  }
}
