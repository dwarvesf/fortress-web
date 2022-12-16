import { Pagination } from './Pagination'

export class SurveyDetailFilter extends Pagination {
  keyword?: string

  constructor(keyword?: string) {
    super()
    this.keyword = keyword
  }
}
