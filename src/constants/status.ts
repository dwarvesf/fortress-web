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
