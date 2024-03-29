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

export enum SurveyEventStatus {
  DRAFT = 'draft',
  INPROGRESS = 'in-progress',
  DONE = 'done',
}

export const surveyEventStatuses: Record<SurveyEventStatus, string> = {
  [SurveyEventStatus.DRAFT]: 'Draft',
  [SurveyEventStatus.INPROGRESS]: 'In progress',
  [SurveyEventStatus.DONE]: 'Done',
}

export enum SurveyParticipantStatus {
  DONE = 'done',
  SENT = 'sent',
  DRAFT = 'draft',
}

export const surveyParticipantStatuses: Record<
  SurveyParticipantStatus,
  string
> = {
  [SurveyParticipantStatus.DONE]: 'Done',
  [SurveyParticipantStatus.SENT]: 'Sent',
  [SurveyParticipantStatus.DRAFT]: 'Draft',
}

// TODO: import from schema
export enum ModelEventReviewerStatus {
  EventReviewerStatusDone = 'done',
  EventReviewerStatusDraft = 'draft',
  EventReviewerStatusNew = 'new',
  EventReviewerStatusNone = 'none',
}

export const feedbackStatuses: Record<ModelEventReviewerStatus, string> = {
  [ModelEventReviewerStatus.EventReviewerStatusDone]: 'Done',
  [ModelEventReviewerStatus.EventReviewerStatusDraft]: 'Draft',
  [ModelEventReviewerStatus.EventReviewerStatusNew]: 'New',
  [ModelEventReviewerStatus.EventReviewerStatusNone]: 'None',
}

export enum ProjectStatus {
  ONBOARDING = 'on-boarding',
  PAUSED = 'paused',
  ACTIVE = 'active',
  CLOSED = 'closed',
}

export const projectStatuses: Record<ProjectStatus, string> = {
  [ProjectStatus.ONBOARDING]: 'On Boarding',
  [ProjectStatus.PAUSED]: 'Paused',
  [ProjectStatus.ACTIVE]: 'Active',
  [ProjectStatus.CLOSED]: 'Closed',
}
