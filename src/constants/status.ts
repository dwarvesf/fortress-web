export enum EmployeeStatus {
  LEFT = 'left',
  ONBOARDING = 'on-boarding',
  PROBATION = 'probation',
  FULLTIME = 'full-time',
  CONTRACTOR = 'contractor',
}

export const employeeStatuses: Record<EmployeeStatus, string> = {
  [EmployeeStatus.LEFT]: 'Left',
  [EmployeeStatus.ONBOARDING]: 'On Boarding',
  [EmployeeStatus.PROBATION]: 'Probation',
  [EmployeeStatus.FULLTIME]: 'Full-time',
  [EmployeeStatus.CONTRACTOR]: 'Contractor',
}

export enum ProjectMemberStatus {
  PENDING = 'pending',
  ONBOARDING = 'on-boarding',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const projectMemberStatuses: Record<ProjectMemberStatus, string> = {
  [ProjectMemberStatus.PENDING]: 'Pending',
  [ProjectMemberStatus.ONBOARDING]: 'On Boarding',
  [ProjectMemberStatus.ACTIVE]: 'Active',
  [ProjectMemberStatus.INACTIVE]: 'Inactive',
}

export enum ProjectWorkUnitStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export const projectWorkUnitStatuses: Record<ProjectWorkUnitStatus, string> = {
  [ProjectWorkUnitStatus.ACTIVE]: 'Active',
  [ProjectWorkUnitStatus.ARCHIVED]: 'Archived',
}

export enum PeerReviewStatus {
  DRAFT = 'draft',
  INPROGRESS = 'in-progress',
  DONE = 'done',
}

export const peerReviewStatuses: Record<PeerReviewStatus, string> = {
  [PeerReviewStatus.DRAFT]: 'Draft',
  [PeerReviewStatus.INPROGRESS]: 'In progress',
  [PeerReviewStatus.DONE]: 'Done',
}

export enum PeerReviewServeyStatus {
  DONE = 'done',
  SENT = 'sent',
}

export const peerReviewServeyStatuses: Record<PeerReviewServeyStatus, string> =
  {
    [PeerReviewServeyStatus.DONE]: 'Done',
    [PeerReviewServeyStatus.SENT]: 'Sent',
  }

export enum MemberPeerReviewsStatuses {
  DONE = 'done',
  SENT = 'sent',
  DRAFT = 'draft',
}

export const memberPeerReviewsStatuses: Record<
  MemberPeerReviewsStatuses,
  string
> = {
  [MemberPeerReviewsStatuses.DONE]: 'Done',
  [MemberPeerReviewsStatuses.SENT]: 'Sent',
  [MemberPeerReviewsStatuses.DRAFT]: 'Draft',
}
