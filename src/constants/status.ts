export type EmployeeStatus =
  | 'left'
  | 'on-boarding'
  | 'probation'
  | 'full-time'
  | 'contractor'

export const employeeStatuses: Record<EmployeeStatus, string> = {
  left: 'Left',
  'on-boarding': 'On Boarding',
  probation: 'Probation',
  'full-time': 'Full-time',
  contractor: 'Contractor',
}

export type ProjectMemberStatus =
  | 'pending'
  | 'on-boarding'
  | 'active'
  | 'inactive'

export const projectMemberStatuses: Record<ProjectMemberStatus, string> = {
  pending: 'Pending',
  'on-boarding': 'On Boarding',
  active: 'Active',
  inactive: 'Inactive',
}

export type WorkUnitStatus = 'active' | 'archived'

export const workUnitStatuses: Record<WorkUnitStatus, string> = {
  active: 'Active',
  archived: 'Archived',
}

export type PeerReviewStatus = 'draft' | 'in-progress' | 'done'

export const peerReviewStatuses: Record<PeerReviewStatus, string> = {
  draft: 'Draft',
  'in-progress': 'In progress',
  done: 'Done',
}
