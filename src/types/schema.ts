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

export interface ViewChapterResponse {
  data?: ModelChapter[]
}

export interface ViewCitiesResponse {
  data?: string[]
}

export interface ViewCountriesResponse {
  data?: ModelCountry[]
}

export interface ViewEmployeeData {
  address?: string
  avatar?: string
  birthday?: string
  createdAt?: string
  deletedAt?: string
  displayName?: string
  /** basic info */
  fullName?: string
  gender?: string
  horoscope?: string
  id?: string
  joinedDate?: string
  leftDate?: string
  mbti?: string
  personalEmail?: string
  phoneNumber?: string
  /** working info */
  status?: string
  teamEmail?: string
  updatedAt?: string
}

export interface ViewEmployeeListDataResponse {
  data?: ViewEmployeeData[]
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
  discordId?: string
  displayName?: string
  fullName?: string
  gender?: string
  githubId?: string
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

export interface ViewUpdateEmployeeStatusResponse {
  data?: ViewEmployeeData
}

export interface AuthResponse {
  accessToken: string
  employee: AuthEmployee
}

export interface AuthEmployee {
  address: string
  avatar: string
  birthday: string
  createdAt: string
  deletedAt: string
  displayName: string
  fullName: string
  gender: string
  horoscope: string
  id: string
  joinedDate: string
  leftDate: string
  mbti: string
  personalEmail: string
  phoneNumber: string
  status: string
  teamEmail: string
  updatedAt: string
}
