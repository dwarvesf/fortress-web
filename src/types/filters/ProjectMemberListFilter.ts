import { Pagination } from './Pagination'

export class ProjectMemberListFilter extends Pagination {
  status?: string

  constructor(status = '') {
    super()
    this.status = status
  }
}
