import { WorkUnitType } from 'constants/workUnitTypes'

export class WorkUnitDistributionsFilter {
  name?: string
  sort: 'asc' | 'desc'
  type?: WorkUnitType

  constructor() {
    this.sort = 'desc'
  }
}
