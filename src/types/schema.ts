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

export interface GithubComDwarvesfFortressApiPkgHandlerEmployeeEditSkillsInput {
  chapter?: string
  positions: string[]
  seniority: string
  stacks: string[]
}

export interface GithubComDwarvesfFortressApiPkgHandlerProjectCreateProjectInput {
  accountManagerID: string
  countryID: string
  deliveryManagerID?: string
  name: string
  startDate?: string
  status: string
  type: string
}

export interface ModelChapter {
  code?: string
  createdAt?: string
  deletedAt?: string
  id?: string
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

export interface ModelPosition {
  code?: string
  createdAt?: string
  deletedAt?: string
  id?: string
  name?: string
  updatedAt?: string
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

export interface PkgHandlerEmployeeEditSkillsInput {
  chapter?: string
  positions: string[]
  seniority: string
  stacks: string[]
}

export interface PkgHandlerProjectCreateProjectInput {
  accountManagerID: string
  countryID: string
  deliveryManagerID?: string
  name: string
  startDate?: string
  status: string
  type: string
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

export interface ViewCreateProjectData {
  accountManager?: ViewProjectHead
  createdAt?: string
  deletedAt?: string
  deliveryManager?: ViewProjectHead
  id?: string
  name?: string
  startDate?: string
  status?: string
  type?: string
  updatedAt?: string
}

export interface ViewEditEmployeeResponse {
  data?: ViewEmployeeData
}

export interface ViewEmployeeData {
  accountStatus?: string
  address?: string
  avatar?: string
  birthday?: string
  chapter?: ModelChapter
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
  lineManager?: ViewBasisEmployeeInfo
  mbti?: string
  notionID?: string
  personalEmail?: string
  phoneNumber?: string
  positions?: ModelPosition[]
  projects?: ViewEmployeeProjectData[]
  roles?: ModelRole[]
  seniority?: ModelSeniority
  /** working info */
  status?: string
  teamEmail?: string
  updatedAt?: string
}

export interface ViewEmployeeListDataResponse {
  data?: ViewEmployeeData[]
}

export interface ViewEmployeeProjectData {
  id?: string
  name?: string
}

export interface ViewErrorResponse {
  error?: string
  errors?: ViewApiError[]
}

export interface ViewMetaData {
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
  deletedAt?: string
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
  displayName?: string
  employeeID?: string
  fullName?: string
  isLead?: boolean
  position?: string
  status?: string
}

export interface ViewSeniorityResponse {
  data?: ModelSeniority[]
}

export interface ViewStackResponse {
  data?: ModelChapter[]
}

export interface ViewUpdateEmployeeStatusResponse {
  data?: ViewEmployeeData
}

export interface ViewUpdateProjectStatusResponse {
  data?: ViewUpdatedProject
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
