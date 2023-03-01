import { Nullable } from 'types/common'
import { Pagination } from './Pagination'

export interface SurveyDetailFilterProps {
  keyword?: string
  projects?: string[]
  status?: string
  sort?: string
}

export class SurveyDetailFilter extends Pagination {
  keyword?
  projects?
  status?
  sort?

  constructor({
    keyword = '',
    projects = null,
    status = null,
    sort = null,
  }: Nullable<SurveyDetailFilterProps> = {}) {
    super()
    this.keyword = keyword
    this.projects = projects
    this.status = status
    this.sort = sort
  }
}
