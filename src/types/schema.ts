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

export interface GithubComDwarvesfFortressApiPkgHandlerEmployeeCreateEmployeeInput {
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

export interface GithubComDwarvesfFortressApiPkgHandlerEmployeeUpdateGeneralInfoInput {
  discordID?: string
  email: string
  fullName: string
  githubID?: string
  lineManagerID?: string
  notionID?: string
  phone: string
}

export interface GithubComDwarvesfFortressApiPkgHandlerEmployeeUpdatePersonalInfoInput {
  address: string
  dob: string
  gender: string
  personalEmail: string
}

export interface GithubComDwarvesfFortressApiPkgHandlerEmployeeUpdateSkillsInput {
  chapter?: string
  positions: string[]
  seniority: string
  stacks: string[]
}

export interface GithubComDwarvesfFortressApiPkgHandlerProfileUpdateInfoInput {
  discordID?: string
  githubID?: string
  notionID?: string
  phoneNumber: string
  teamEmail: string
}

export interface GithubComDwarvesfFortressApiPkgHandlerProjectAssignMemberInput {
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

export interface GithubComDwarvesfFortressApiPkgHandlerProjectCreateProjectInput {
  accountManagerID: string
  countryID: string
  deliveryManagerID?: string
  members?: GithubComDwarvesfFortressApiPkgHandlerProjectAssignMemberInput[]
  name: string
  startDate?: string
  status: string
  type?: string
}

export interface GithubComDwarvesfFortressApiPkgHandlerProjectUpdateMemberInput {
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
  code?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
  id?: string
  name?: string
  updatedAt?: string
}

export interface PkgHandlerEmployeeCreateEmployeeInput {
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

export interface PkgHandlerEmployeeUpdateGeneralInfoInput {
  discordID?: string
  email: string
  fullName: string
  githubID?: string
  lineManagerID?: string
  notionID?: string
  phone: string
}

export interface PkgHandlerEmployeeUpdatePersonalInfoInput {
  address: string
  dob: string
  gender: string
  personalEmail: string
}

export interface PkgHandlerEmployeeUpdateSkillsInput {
  chapter?: string
  positions: string[]
  seniority: string
  stacks: string[]
}

export interface PkgHandlerProfileUpdateInfoInput {
  discordID?: string
  githubID?: string
  notionID?: string
  phoneNumber: string
  teamEmail: string
}

export interface PkgHandlerProjectAssignMemberInput {
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

export interface PkgHandlerProjectCreateProjectInput {
  accountManagerID: string
  countryID: string
  deliveryManagerID?: string
  members?: PkgHandlerProjectAssignMemberInput[]
  name: string
  startDate?: string
  status: string
  type?: string
}

export interface PkgHandlerProjectUpdateMemberInput {
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

export interface ViewBasisEmployeeInfo {
  avatar?: string
  fullName?: string
  id?: string
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
  status?: string
}

export interface ViewCreateMemberDataResponse {
  data?: ViewCreateMemberData
}

export interface ViewCreateProjectData {
  accountManager?: ViewProjectHead
  createdAt?: string
  deletedAt?: GormDeletedAt
  deliveryManager?: ViewProjectHead
  id?: string
  members?: ViewCreateMemberData[]
  name?: string
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ViewEmployeeData {
  accountStatus?: string
  address?: string
  avatar?: string
  birthday?: string
  chapter?: ModelChapter
  createdAt?: string
  deletedAt?: GormDeletedAt
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
  lineManager?: ViewBasisEmployeeInfo
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
  status?: string
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

export interface ViewMetaData {
  code?: string
  name?: string
}

export interface ViewPosition {
  code?: string
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
  personalEmail?: string
  phoneNumber?: string
  teamEmail?: string
}

export interface ViewProfileDataResponse {
  data?: ViewProfileData
}

export interface ViewProjectData {
  accountManager?: ViewProjectHead
  createdAt?: string
  deletedAt?: GormDeletedAt
  deliveryManager?: ViewProjectHead
  endDate?: string
  id?: string
  members?: ViewProjectMember[]
  name?: string
  salePerson?: ViewProjectHead
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
  displayName?: string
  employeeID?: string
  fullName?: string
  isLead?: boolean
  joinedDate?: string
  leftDate?: string
  position?: string
  positions?: ViewPosition[]
  projectSlotID?: string
  seniority?: string
  status?: string
}

export interface ViewProjectMemberListResponse {
  data?: ViewProjectMember[]
}

export interface ViewRole {
  code?: string
  name?: string
}

export interface ViewSeniorityResponse {
  data?: ModelSeniority[]
}

export interface ViewStack {
  code?: string
  name?: string
}

export interface ViewStackResponse {
  data?: ModelChapter[]
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
  /** basic info */
  fullName?: string
  githubID?: string
  id?: string
  lineManager?: ViewBasisEmployeeInfo
  notionID?: string
  phoneNumber?: string
  teamEmail?: string
  updatedAt?: string
}

export interface ViewUpdatePersonalEmployeeData {
  address?: string
  birthday?: string
  createdAt?: string
  deletedAt?: GormDeletedAt
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
  deletedAt?: GormDeletedAt
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

export interface ViewUpdateProjectStatusResponse {
  data?: ViewUpdatedProject
}

export interface ViewUpdateSkillEmployeeData {
  chapter?: ModelChapter
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
