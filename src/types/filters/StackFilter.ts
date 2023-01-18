import { Pagination } from './Pagination'

export class StackFilter extends Pagination {
  keyword?: string

  constructor(keyword?: string) {
    super()
    this.keyword = keyword
  }
}
