import { Pagination } from './Pagination'

export class EmployeeListFilter extends Pagination {
  workingStatus?: string[]
  keyword?: string

  constructor({ workingStatus }: { workingStatus?: string[] } = {}) {
    super()
    this.workingStatus = workingStatus
  }
}
