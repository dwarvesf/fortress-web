import { Pagination } from './Pagination'

export class ProjectMemberListFilter extends Pagination {
  status?: string
  preload?: boolean

  constructor(status = '') {
    super()
    this.status = status
  }
}
