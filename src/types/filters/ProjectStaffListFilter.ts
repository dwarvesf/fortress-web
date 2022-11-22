import { Pagination } from './Pagination'

export class ProjectStaffListFilter extends Pagination {
  status?: string

  constructor(status = '') {
    super()
    this.status = status
  }
}
