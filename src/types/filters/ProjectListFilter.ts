import { Pagination } from './Pagination'

export class ProjectListFilter extends Pagination {
  status?: string
  name?: string
  type?: string

  constructor({
    status,
    name,
    type,
  }: {
    status?: string
    name?: string
    type?: string
  } = {}) {
    super()
    this.status = status
    this.name = name
    this.type = type
  }
}
