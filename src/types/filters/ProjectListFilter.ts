import { Nullable } from 'types/common'
import { Pagination } from './Pagination'

interface RequestGetListProjectInput {
  status?: string
  name?: string
  type?: string
  sort?: string
}

export class ProjectListFilter
  extends Pagination
  implements Nullable<RequestGetListProjectInput>
{
  status
  name
  type
  sort

  constructor({
    status = null,
    name = null,
    type = null,
    sort = null,
  }: Nullable<RequestGetListProjectInput> = {}) {
    super()
    this.status = status
    this.name = name
    this.type = type
    this.sort = sort
  }
}
