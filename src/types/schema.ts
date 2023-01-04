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

export interface GormDeletedAt {
  time?: string
  /** Valid is true if Time is not NULL */
  valid?: boolean
}

export interface ModelChapter {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  lead_id?: string
  name?: string
  updatedAt?: string
}

export interface ModelCountry {
  cities?: string[]
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelLikertScaleCount {
  agree?: number
  disagree?: number
  mixed?: number
  stronglyAgree?: number
  stronglyDisagree?: number
}

export interface ModelPosition {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelRole {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  level?: number
  name?: string
  updatedAt?: string
}

export interface ModelSeniority {
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface ModelStack {
  avatar?: string
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface RequestAddMenteeInput {
  menteeID: string
}

export interface RequestAssignMemberInput {
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

export interface RequestBasicEventQuestionInput {
  answer?: string
  eventQuestionID: string
  note?: string
}

export interface RequestCreateEmployeeInput {
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

export interface RequestCreatePositionInput {
  code: string
  name: string
}

export interface RequestCreateProjectInput {
  accountManagerID: string
  clientEmail?: string
  code?: string
  countryID: string
  deliveryManagerID?: string
  members?: RequestAssignMemberInput[]
  name: string
  projectEmail?: string
  startDate?: string
  status: string
  type?: string
}

export interface RequestCreateStackInput {
  avatar?: string
  code: string
  name: string
}

export interface RequestCreateSurveyFeedbackInput {
  fromDate?: string
  quarter?: string
  toDate?: string
  type: string
  year?: number
}

export interface RequestCreateWorkUnitBody {
  members?: string[]
  name: string
  stacks: string[]
  status: string
  type: string
  url?: string
}

export interface RequestDeleteTopicReviewersBody {
  reviewerIDs?: string[]
}

export interface RequestGetListEmployeeInput {
  chapters?: string[]
  keyword?: string
  /** page index */
  page?: number
  positions?: string[]
  preload?: boolean
  projects?: string[]
  seniorities?: string[]
  /** page size */
  size?: number
  stacks?: string[]
  workingStatuses?: string[]
}

export interface RequestSendSurveyInput {
  topicIDs?: string[]
  type: string
}

export interface RequestSubmitBody {
  answers: RequestBasicEventQuestionInput[]
  status: string
}

export interface RequestUpdateContactInfoInput {
  accountManagerID: string
  clientEmail?: string
  deliveryManagerID?: string
  projectEmail?: string
}

export interface RequestUpdateEmployeeGeneralInfoInput {
  discordID?: string
  discordName?: string
  email: string
  fullName: string
  githubID?: string
  lineManagerID?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  phone: string
}

export interface RequestUpdateInfoInput {
  address?: string
  city?: string
  country?: string
  personalEmail: string
  phoneNumber: string
  placeOfResidence: string
  teamEmail: string
}

export interface RequestUpdateMemberInput {
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

export interface RequestUpdatePersonalInfoInput {
  address: string
  city?: string
  country?: string
  dob: string
  gender: string
  personalEmail: string
  placeOfResidence?: string
}

export interface RequestUpdatePositionBody {
  code?: string
  name?: string
}

export interface RequestUpdateProjectGeneralInfoInput {
  countryID: string
  name: string
  stacks?: string[]
  startDate?: string
}

export interface RequestUpdateSkillsInput {
  chapters: string[]
  leadingChapters?: string[]
  positions: string[]
  seniority: string
  stacks: string[]
}

export interface RequestUpdateStackBody {
  avatar?: string
  code?: string
  name?: string
}

export interface RequestUpdateTopicReviewersBody {
  reviewerIDs?: string[]
}

export interface RequestUpdateWorkUnitBody {
  members?: string[]
  name: string
  stacks: string[]
  type: string
  url?: string
}

export interface RequestUpdateWorkUnitInput {
  body?: RequestUpdateWorkUnitBody
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

export interface ViewAuthUserResponse {
  data?: ViewLoggedInUserData
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
  username?: string
}

export interface ViewBasicMember {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  username?: string
}

export interface ViewBasicProjectHeadInfo {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  position?: string
  username?: string
}

export interface ViewBasicProjectInfo {
  code?: string
  id?: string
  name?: string
  status?: string
  type?: string
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
  username?: string
}

export interface ViewCreateMemberDataResponse {
  data?: ViewCreateMemberData
}

export interface ViewCreateProjectData {
  accountManager?: ViewProjectHead
  clientEmail?: string
  code?: string
  country?: ViewBasicCountryInfo
  createdAt?: string
  deletedAt?: GormDeletedAt
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

export interface ViewDomain {
  average?: number
  count?: ModelLikertScaleCount
  name?: string
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
  city?: string
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
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
  linkedInName?: string
  mbti?: string
  mentees?: ViewMenteeInfo[]
  notionID?: string
  notionName?: string
  personalEmail?: string
  phoneNumber?: string
  placeOfResidence?: string
  positions?: ViewPosition[]
  projects?: ViewEmployeeProjectData[]
  roles?: ViewRole[]
  seniority?: ModelSeniority
  stacks?: ViewStack[]
  /** working info */
  status?: string
  teamEmail?: string
  updatedAt?: string
  username?: string
}

export interface ViewEmployeeListDataResponse {
  data?: ViewEmployeeData[]
}

export interface ViewEmployeeProjectData {
  code?: string
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
  project?: ViewBasicProjectInfo
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
  project?: ViewBasicProjectInfo
  relationship?: string
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
  data?: ViewSurveyDetail
}

export interface ViewListSurveyResponse {
  data?: ViewSurvey[]
}

export interface ViewListWorkUnitResponse {
  data?: ViewWorkUnit[]
}

export interface ViewLoggedInUserData {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  permissions?: string[]
  role?: string
  teamEmail?: string
}

export interface ViewMenteeInfo {
  avatar?: string
  displayName?: string
  fullName?: string
  id?: string
  positions?: ModelPosition[]
  seniority?: ModelSeniority
  username?: string
}

export interface ViewMessageResponse {
  message?: string
}

export interface ViewMetaData {
  code?: string
  id?: string
  name?: string
}

export interface ViewPeerReviewer {
  eventReviewerID?: string
  isForcedDone?: boolean
  relationship?: string
  reviewer?: ViewBasicEmployeeInfo
  status?: string
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
  address?: string
  avatar?: string
  birthday?: string
  city?: string
  country?: string
  discordID?: string
  discordName?: string
  displayName?: string
  fullName?: string
  gender?: string
  githubID?: string
  id?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  personalEmail?: string
  phoneNumber?: string
  placeOfResidence?: string
  teamEmail?: string
  username?: string
}

export interface ViewProfileDataResponse {
  data?: ViewProfileData
}

export interface ViewProjectContentData {
  url?: string
}

export interface ViewProjectContentDataResponse {
  data?: ViewProjectContentData
}

export interface ViewProjectData {
  accountManager?: ViewProjectHead
  allowsSendingSurvey?: boolean
  avatar?: string
  clientEmail?: string
  code?: string
  country?: ViewBasicCountryInfo
  createdAt?: string
  deletedAt?: GormDeletedAt
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

export interface ViewProjectDataResponse {
  data?: ViewProjectData
}

export interface ViewProjectHead {
  avatar?: string
  displayName?: string
  employeeID?: string
  fullName?: string
  username?: string
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
  username?: string
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
  domain?: string
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
  avatar?: string
  code?: string
  id?: string
  name?: string
}

export interface ViewStackResponse {
  data?: ModelStack[]
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
  domains?: ViewDomain[]
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

export interface ViewSurveyTopicDetail {
  employee?: ViewBasicEmployeeInfo
  participants?: ViewPeerReviewer[]
  title?: string
  topicID?: string
}

export interface ViewSurveyTopicDetailResponse {
  data?: ViewSurveyTopicDetail
}

export interface ViewTopic {
  comments?: number
  count?: ViewFeedbackCount
  domains?: ViewDomain[]
  employee?: ViewBasicEmployeeInfo
  eventID?: string
  id?: string
  isForcedDone?: boolean
  participants?: ViewBasicEmployeeInfo[]
  project?: ViewBasicProjectInfo
  reviewID?: string
  status?: string
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
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  /** basic info */
  fullName?: string
  githubID?: string
  id?: string
  lineManager?: ViewBasicEmployeeInfo
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  phoneNumber?: string
  teamEmail?: string
  updatedAt?: string
}

export interface ViewUpdatePersonalEmployeeData {
  address?: string
  birthday?: string
  city?: string
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  gender?: string
  id?: string
  personalEmail?: string
  placeOfResidence?: string
  updatedAt?: string
}

export interface ViewUpdatePersonalEmployeeResponse {
  data?: ViewUpdatePersonalEmployeeData
}

export interface ViewUpdateProfileInfoData {
  address?: string
  city?: string
  country?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  discordID?: string
  discordName?: string
  githubID?: string
  id?: string
  linkedInName?: string
  notionEmail?: string
  notionID?: string
  notionName?: string
  phoneNumber?: string
  placeOfResidence?: string
  /** basic info */
  teamEmail?: string
  updatedAt?: string
  username?: string
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
  deletedAt?: GormDeletedAt
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
  deletedAt?: GormDeletedAt
  endDate?: string
  id?: string
  name?: string
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ViewWorkUnit {
  code?: string
  id?: string
  members?: ViewBasicMember[]
  name?: string
  projectID?: string
  stacks?: ViewStack[]
  status?: string
  type?: string
  url?: string
}

export interface ViewWorkUnitResponse {
  data?: ViewWorkUnit
}
