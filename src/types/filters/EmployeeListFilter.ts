import { RequestGetListEmployeeInput } from 'types/schema'
import { Pagination } from './Pagination'

export class EmployeeListFilter
  extends Pagination
  implements RequestGetListEmployeeInput
{
  keyword?
  chapters?
  positions?
  projects?
  seniorities?
  stacks?
  workingStatuses?

  constructor({
    keyword = '',
    chapters = [],
    positions = [],
    projects = [],
    seniorities = [],
    stacks = [],
    workingStatuses = [],
  }: RequestGetListEmployeeInput = {}) {
    super()
    this.keyword = keyword
    this.chapters = chapters
    this.positions = positions
    this.projects = projects
    this.seniorities = seniorities
    this.stacks = stacks
    this.workingStatuses = workingStatuses
  }
}
