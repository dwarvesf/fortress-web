import { Pagination } from './Pagination'

export class ProjectMemberListFilter extends Pagination {
  status?: string
  distinct?: boolean

  constructor(status = '') {
    super()
    this.status = status
  }
}
