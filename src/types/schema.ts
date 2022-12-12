/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface EmployeeCreateEmployeeInput {
  displayName?: string
  fullName: string
  personalEmail: string
  positions: string[]
  roleID: string
  salary: number
  seniorityID: string
  status: string
  teamEmail: string
}

export interface EmployeeUpdateGeneralInfoInput {
  discordID?: string
  email: string
  fullName: string
  githubID?: string
  lineManagerID?: string
  notionID?: string
  phone: string
}

export interface EmployeeUpdatePersonalInfoInput {
  address: string
  dob: string
  gender: string
  personalEmail: string
}

export interface EmployeeUpdateSkillsInput {
  chapters: string[]
  leadingChapters?: string[]
  positions: string[]
  seniority: string
  stacks: string[]
}

export interface FeedbackBasicEventQuestionInput {
  answer?: string
  eventQuestionID: string
  note?: string
}

export interface FeedbackCreateSurveyFeedbackInput {
  quarter: string
  type: string
  year: number
}

export interface FeedbackPerformanceReviewInput {
  participants: string[]
  topicID: string
}

export interface FeedbackPerformanceReviewListInput {
  reviewList: FeedbackPerformanceReviewInput[]
}

export interface FeedbackSubmitBody {
  answers: FeedbackBasicEventQuestionInput[]
  status: ModelEventReviewerStatus
}

export interface ModelChapter {
  code?: string
  createdAt?: string
  deletedAt?: string
  id?: string
  lead_id?: string
  name?: string
  updatedAt?: string
}

export interface ModelCountry {
  cities?: string[]
  code?: string
  createdAt?: string
  deletedAt?: string
  id?: string
  name?: string
  updatedAt?: string
}

export enum ModelEventReviewerStatus {
  EventReviewerStatusNone = 'none',
  EventReviewerStatusNew = 'new',
  EventReviewerStatusDraft = 'draft',
  EventReviewerStatusDone = 'done',
}

export enum ModelHeadPosition {
  HeadPositionTechnicalLead = 'technical-lead',
  HeadPositionDeliveryManager = 'delivery-manager',
  HeadPositionAccountManager = 'account-manager',
  HeadPositionSalePerson = 'sale-person',
}

export interface ModelPosition {
  code?: string
  createdAt?: string
  deletedAt?: string
  id?: string
  name?: string
  updatedAt?: string
}

export enum ModelProjectStatus {
  ProjectStatusOnBoarding = 'on-boarding',
  ProjectStatusActive = 'active',
  ProjectStatusPaused = 'paused',
  ProjectStatusClosed = 'closed',
}

export interface ModelRole {
  code?: string
  createdAt?: string
  deletedAt?: string
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelSeniority {
  code?: string
  createdAt?: string
  deletedAt?: string
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelStack {
  code?: string
  createdAt?: string
  deletedAt?: string
  id?: string
  name?: string
  updatedAt?: string
}

export enum ModelWorkUnitType {
  WorkUnitTypeDevelopment = 'development',
  WorkUnitTypeManagement = 'management',
  WorkUnitTypeTraining = 'training',
  WorkUnitTypeLearning = 'learning',
}

export enum ModelWorkingStatus {
  WorkingStatusOnBoarding = 'on-boarding',
  WorkingStatusLeft = 'left',
  WorkingStatusProbation = 'probation',
  WorkingStatusFullTime = 'full-time',
  WorkingStatusContractor = 'contractor',
}

export interface ProfileUpdateInfoInput {
  discordID?: string
  githubID?: string
  notionID?: string
  personalEmail: string
  phoneNumber: string
  teamEmail: string
}

export interface ProjectAssignMemberInput {
  deploymentType: string
  discount?: number
  employeeID?: string
  isLead?: boolean
  joinedDate?: string
  leftDate?: string
  positions: string[]
  rate: number
  seniorityID: string
  status: string
}

export interface ProjectCreateProjectInput {
  accountManagerID: string
  clientEmail?: string
  countryID: string
  deliveryManagerID?: string
  members?: ProjectAssignMemberInput[]
  name: string
  projectEmail?: string
  startDate?: string
  status: string
  type?: string
}

export interface ProjectCreateWorkUnitBody {
  members?: string[]
  name: string
  stacks: string[]
  status: string
  type: string
  url?: string
}

export interface ProjectUpdateContactInfoInput {
  accountManagerID: string
  clientEmail?: string
  deliveryManagerID?: string
  projectEmail?: string
}

export interface ProjectUpdateGeneralInfoInput {
  countryID: string
  name: string
  stacks?: string[]
  startDate?: string
}

export interface ProjectUpdateMemberInput {
  deploymentType: string
  discount?: number
  employeeID?: string
  isLead?: boolean
  joinedDate?: string
  leftDate?: string
  positions: string[]
  projectSlotID: string
  rate: number
  seniorityID: string
  status: string
}

export interface ProjectUpdateWorkUnitBody {
  members?: string[]
  name: string
  stacks: string[]
  type: ModelWorkUnitType
  url?: string
}

export interface ProjectUpdateWorkUnitInput {
  body?: ProjectUpdateWorkUnitBody
  projectID?: string
  workUnitID?: string
}

export interface ViewAccountRoleResponse {
  data?: ModelRole[]
}

/**
 * validation error details
 */
export interface ViewApiError {
  /** available options incase of field's payload is enums */
  enums?: string[]
  /** the field cause the error */
  field?: string
  /** error message */
  msg?: string
}

export interface ViewAuthData {
  accessToken?: string
  employee?: ViewEmployeeData
}

export interface ViewBasicCountryInfo {
  code?: string
  id?: string
  name?: string
}

export interface ViewBasicEmployeeInfo {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
}

export interface ViewBasicMember {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
}

export interface ViewBasicProjectHeadInfo {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  position?: ModelHeadPosition
}

export interface ViewChapter {
  code?: string
  id?: string
  leadID?: string
  name?: string
}

export interface ViewChapterResponse {
  data?: ModelChapter[]
}

export interface ViewCitiesResponse {
  data?: string[]
}

export interface ViewCountriesResponse {
  data?: ModelCountry[]
}

export interface ViewCreateMemberData {
  avatar?: string
  deploymentType?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  isLead?: boolean
  positions?: ViewPosition[]
  projectMemberID?: string
  projectSlotID?: string
  seniority?: ModelSeniority
  status?: string
}

export interface ViewCreateMemberDataResponse {
  data?: ViewCreateMemberData
}

export interface ViewCreateProjectData {
  accountManager?: ViewProjectHead
  clientEmail?: string
  country?: ViewBasicCountryInfo
  createdAt?: string
  deletedAt?: string
  deliveryManager?: ViewProjectHead
  id?: string
  members?: ViewCreateMemberData[]
  name?: string
  projectEmail?: string
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ViewEmployeeContentData {
  url?: string
}

export interface ViewEmployeeContentDataResponse {
  data?: ViewEmployeeContentData
}

export interface ViewEmployeeData {
  address?: string
  avatar?: string
  birthday?: string
  chapters?: ViewChapter[]
  createdAt?: string
  deletedAt?: string
  discordID?: string
  displayName?: string
  /** basic info */
  fullName?: string
  gender?: string
  githubID?: string
  horoscope?: string
  id?: string
  joinedDate?: string
  leftDate?: string
  lineManager?: ViewBasicEmployeeInfo
  mbti?: string
  notionID?: string
  personalEmail?: string
  phoneNumber?: string
  positions?: ViewPosition[]
  projects?: ViewEmployeeProjectData[]
  roles?: ViewRole[]
  seniority?: ModelSeniority
  stacks?: ViewStack[]
  /** working info */
  status?: ModelWorkingStatus
  teamEmail?: string
  updatedAt?: string
}

export interface ViewEmployeeListDataResponse {
  data?: ViewEmployeeData[]
}

export interface ViewEmployeeProjectData {
  deploymentType?: string
  id?: string
  name?: string
  positions?: ViewPosition[]
}

export interface ViewErrorResponse {
  error?: string
  errors?: ViewApiError[]
}

export interface ViewFeedBackReviewDetail {
  employee?: ViewBasicEmployeeInfo
  questions?: ViewQuestionAnswer[]
  relationship?: string
  reviewer?: ViewBasicEmployeeInfo
  topicName?: string
}

export interface ViewFeedback {
  author?: ViewBasicEmployeeInfo
  employeeID?: string
  eventID?: string
  eventReviewerID?: string
  isRead?: boolean
  lastUpdated?: string
  projectID?: string
  status?: string
  subtype?: string
  title?: string
  topicID?: string
  type?: string
}

export interface ViewFeedbackCount {
  done?: number
  sent?: number
  total?: number
}

export interface ViewFeedbackDetail {
  answers?: ViewQuestionAnswer[]
  employeeID?: string
  eventID?: string
  reviewer?: ViewBasicEmployeeInfo
  status?: string
  title?: string
  topicID?: string
}

export interface ViewFeedbackDetailResponse {
  data?: ViewFeedbackDetail
}

export interface ViewFeedbackReviewDetailResponse {
  data?: ViewFeedBackReviewDetail
}

export interface ViewGetQuestionResponse {
  data?: ViewQuestion[]
}

export interface ViewListFeedbackResponse {
  data?: ViewFeedback[]
}

export interface ViewListSurveyDetailResponse {
  data?: ViewSurveyDetail[]
}

export interface ViewListSurveyResponse {
  data?: ViewSurvey[]
}

export interface ViewListWorkUnitResponse {
  data?: ViewWorkUnit[]
}

export interface ViewMessageResponse {
  message?: string
}

export interface ViewMetaData {
  code?: string
  id?: string
  name?: string
}

export interface ViewPosition {
  code?: string
  id?: string
  name?: string
}

export interface ViewPositionResponse {
  data?: ModelPosition[]
}

export interface ViewProfileData {
  avatar?: string
  birthday?: string
  discordID?: string
  displayName?: string
  fullName?: string
  gender?: string
  githubID?: string
  id?: string
  notionID?: string
  personalEmail?: string
  phoneNumber?: string
  teamEmail?: string
}

export interface ViewProfileDataResponse {
  data?: ViewProfileData
}

export interface ViewProjectData {
  accountManager?: ViewProjectHead
  clientEmail?: string
  country?: ViewBasicCountryInfo
  createdAt?: string
  deletedAt?: string
  deliveryManager?: ViewProjectHead
  endDate?: string
  id?: string
  industry?: string
  members?: ViewProjectMember[]
  name?: string
  projectEmail?: string
  salePerson?: ViewProjectHead
  stacks?: ViewStack[]
  startDate?: string
  status?: string
  technicalLeads?: ViewProjectHead[]
  type?: string
  updatedAt?: string
}

export interface ViewProjectHead {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
}

export interface ViewProjectListDataResponse {
  data?: ViewProjectData[]
}

export interface ViewProjectMember {
  avatar?: string
  deploymentType?: string
  discount?: number
  displayName?: string
  employeeID?: string
  fullName?: string
  isLead?: boolean
  joinedDate?: string
  leftDate?: string
  positions?: ViewPosition[]
  projectMemberID?: string
  projectSlotID?: string
  rate?: number
  seniority?: ModelSeniority
  status?: string
}

export interface ViewProjectMemberListResponse {
  data?: ViewProjectMember[]
}

export interface ViewQuestion {
  category?: string
  content?: string
  id?: string
  order?: number
  subcategory?: string
  type?: string
}

export interface ViewQuestionAnswer {
  answer?: string
  content?: string
  eventQuestionID?: string
  note?: string
  order?: number
  type?: string
}

export interface ViewRole {
  code?: string
  id?: string
  name?: string
}

export interface ViewSeniorityResponse {
  data?: ModelSeniority[]
}

export interface ViewStack {
  code?: string
  id?: string
  name?: string
}

export interface ViewStackResponse {
  data?: ModelChapter[]
}

export interface ViewSubmitFeedback {
  answers?: ViewQuestionAnswer[]
  employeeID?: string
  eventID?: string
  reviewer?: ViewBasicEmployeeInfo
  status?: string
  title?: string
  topicID?: string
}

export interface ViewSubmitFeedbackResponse {
  data?: ViewSubmitFeedback
}

export interface ViewSurvey {
  count?: ViewFeedbackCount
  endDate?: string
  id?: string
  startDate?: string
  status?: string
  subtype?: string
  title?: string
  type?: string
}

export interface ViewSurveyDetail {
  author?: ViewBasicEmployeeInfo
  endDate?: string
  eventID?: string
  startDate?: string
  status?: string
  subtype?: string
  title?: string
  topics?: ViewTopic[]
  type?: string
}

export interface ViewTopic {
  count?: ViewFeedbackCount
  employee?: ViewBasicEmployeeInfo
  eventID?: string
  id?: string
  participants?: ViewBasicEmployeeInfo[]
  subtype?: string
  title?: string
  type?: string
}

export interface ViewUpdateEmployeeStatusResponse {
  data?: ViewEmployeeData
}

export interface ViewUpdateGeneralEmployeeResponse {
  data?: ViewUpdateGeneralInfoEmployeeData
}

export interface ViewUpdateGeneralInfoEmployeeData {
  createdAt?: string
  deletedAt?: string
  discordID?: string
  /** basic info */
  fullName?: string
  githubID?: string
  id?: string
  lineManager?: ViewBasicEmployeeInfo
  notionID?: string
  phoneNumber?: string
  teamEmail?: string
  updatedAt?: string
}

export interface ViewUpdatePersonalEmployeeData {
  address?: string
  birthday?: string
  createdAt?: string
  deletedAt?: string
  gender?: string
  id?: string
  personalEmail?: string
  updatedAt?: string
}

export interface ViewUpdatePersonalEmployeeResponse {
  data?: ViewUpdatePersonalEmployeeData
}

export interface ViewUpdateProfileInfoData {
  createdAt?: string
  deletedAt?: string
  discordID?: string
  githubID?: string
  id?: string
  notionID?: string
  phoneNumber?: string
  /** basic info */
  teamEmail?: string
  updatedAt?: string
}

export interface ViewUpdateProfileInfoResponse {
  data?: ViewUpdateProfileInfoData
}

export interface ViewUpdateProjectContactInfo {
  clientEmail?: string
  projectEmail?: string
  projectHead?: ViewBasicProjectHeadInfo[]
}

export interface ViewUpdateProjectContactInfoResponse {
  data?: ViewUpdateProjectContactInfo
}

export interface ViewUpdateProjectGeneralInfo {
  country?: ViewBasicCountryInfo
  name?: string
  stacks?: ModelStack[]
  startDate?: string
}

export interface ViewUpdateProjectGeneralInfoResponse {
  data?: ViewUpdateProjectGeneralInfo
}

export interface ViewUpdateProjectStatusResponse {
  data?: ViewUpdatedProject
}

export interface ViewUpdateSkillEmployeeData {
  chapters?: ModelChapter[]
  createdAt?: string
  deletedAt?: string
  id?: string
  positions?: ModelPosition[]
  seniority?: ModelSeniority
  stacks?: ModelStack[]
  updatedAt?: string
}

export interface ViewUpdateSkillsEmployeeResponse {
  data?: ViewUpdateSkillEmployeeData
}

export interface ViewUpdatedProject {
  createdAt?: string
  deletedAt?: string
  endDate?: string
  id?: string
  name?: string
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ViewWorkUnit {
  id?: string
  members?: ViewBasicMember[]
  name?: string
  projectID?: string
  stacks?: ViewMetaData[]
  status?: string
  type?: string
  url?: string
}

export interface ViewWorkUnitResponse {
  data?: ViewWorkUnit
}
