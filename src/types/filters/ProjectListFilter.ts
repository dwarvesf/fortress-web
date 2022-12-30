import { Pagination } from './Pagination'

export class ProjectListFilter extends Pagination {
  status?: string
  name?: string
  type?: string
  sort?: string

  constructor({
    status,
    name,
    type,
    sort,
  }: {
    status?: string
    name?: string
    type?: string
    sort?: string
  } = {}) {
    super()
    this.status = status
    this.name = name
    this.type = type
    this.sort = sort
  }
}
