import { Nullable } from 'types/common'
import { RequestGetListEmployeeInput } from 'types/schema'
import { Pagination } from './Pagination'

export class EmployeeListFilter
  extends Pagination
  implements Nullable<RequestGetListEmployeeInput>
{
  keyword?
  chapters?
  positions?
  projects?
  seniorities?
  stacks?
  workingStatuses?
  lineManagers?

  constructor({
    keyword = '',
    chapters = null,
    positions = null,
    projects = null,
    seniorities = null,
    stacks = null,
    workingStatuses = null,
    lineManagers = null,
  }: Nullable<RequestGetListEmployeeInput> = {}) {
    super()
    this.keyword = keyword
    this.chapters = chapters
    this.positions = positions
    this.projects = projects
    this.seniorities = seniorities
    this.stacks = stacks
    this.workingStatuses = workingStatuses
    this.lineManagers = lineManagers
  }
}
