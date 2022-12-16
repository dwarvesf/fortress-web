import { Pagination } from './Pagination'

interface Filter {
  workingStatus?: string[]
  keyword?: string
  positionID?: string
  stackID?: string
  projectID?: string
  chapterID?: string
  seniorityID?: string
}

export class EmployeeListFilter extends Pagination implements Filter {
  workingStatus?: string[]
  keyword?: string
  positionID?: string
  stackID?: string
  projectID?: string
  chapterID?: string
  seniorityID?: string

  constructor({
    workingStatus,
    keyword,
    positionID,
    stackID,
    projectID,
    chapterID,
    seniorityID,
  }: Filter = {}) {
    super()
    this.workingStatus = workingStatus
    this.keyword = keyword
    this.positionID = positionID
    this.stackID = stackID
    this.projectID = projectID
    this.chapterID = chapterID
    this.seniorityID = seniorityID
  }
}
