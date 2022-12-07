import { Pagination } from './Pagination'

export class EmployeeListFilter extends Pagination {
  preload?: boolean
  workingStatus?: string[]
}
