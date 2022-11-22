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

export type ProjectStaffStatus =
  | 'pending'
  | 'on-boarding'
  | 'active'
  | 'inactive'

export const projectStaffStatuses: Record<ProjectStaffStatus, string> = {
  pending: 'Pending',
  'on-boarding': 'On Boarding',
  active: 'Active',
  inactive: 'Inactive',
}
