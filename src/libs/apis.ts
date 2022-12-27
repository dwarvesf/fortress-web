import {
  ViewAuthData,
  ViewProfileData,
  ViewEmployeeListDataResponse,
  ViewProjectListDataResponse,
  ViewMetaData,
  ViewEmployeeData,
  ViewAccountRoleResponse,
  ViewPositionResponse,
  ViewSeniorityResponse,
  RequestCreateEmployeeInput,
  RequestUpdateInfoInput,
  ViewProjectData,
  ViewProjectMemberListResponse,
  RequestUpdateEmployeeGeneralInfoInput,
  ViewUpdateGeneralEmployeeResponse,
  RequestUpdateSkillsInput,
  ViewUpdateSkillsEmployeeResponse,
  ViewStackResponse,
  ViewChapterResponse,
  RequestUpdatePersonalInfoInput,
  ViewUpdatePersonalEmployeeResponse,
  ViewProjectMember,
  RequestUpdateMemberInput,
  RequestAssignMemberInput,
  RequestCreateProjectInput,
  ViewCreateProjectData,
  RequestUpdateProjectGeneralInfoInput,
  ViewUpdateProjectGeneralInfoResponse,
  RequestUpdateContactInfoInput,
  ViewUpdateProjectContactInfoResponse,
  ViewWorkUnit,
  ViewEmployeeContentData,
  RequestCreateWorkUnitBody,
  RequestUpdateWorkUnitBody,
  ViewMessageResponse,
  ViewListSurveyResponse,
  RequestCreateSurveyFeedbackInput,
  ViewListFeedbackResponse,
  ViewFeedbackDetailResponse,
  RequestSubmitBody,
  ViewListSurveyDetailResponse,
  RequestSendSurveyInput,
  ViewSurveyTopicDetailResponse,
  RequestUpdateTopicReviewersBody,
  ViewFeedbackReviewDetailResponse,
} from 'types/schema'
import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { ProjectMemberListFilter } from 'types/filters/ProjectMemberListFilter'
import { ProjectWorkUnitListFilter } from 'types/filters/ProjectWorkUnitListFilter'
import { FeedbackListFilter } from 'types/filters/FeedbackListFilter'
import { SurveyListFilter } from 'types/filters/SurveyListFilter'
import { SurveyDetailFilter } from 'types/filters/SurveyDetailFilter'
import qs from 'qs'
import fetcher from './fetcher'

const BASE_URL = process.env.BASE_URL

export interface Response<T> {
  data: T
}

type Headers = Record<string, string>

// keys for swr
export const GET_PATHS = {
  getUsers: '/users',
  getEmployees: '/employees',
  getProjects: '/projects',
  getProjectMemberList: (id: string) => `/projects/${id}/members`,
  getFeedbacks: '/feedbacks',
  getAccountStatusMetadata: '/metadata/account-statuses',
  getPositionMetadata: '/metadata/positions',
  getAccountRoleMetadata: '/metadata/account-roles',
  getSeniorityMetadata: '/metadata/seniorities',
  getProjectStatusMetadata: '/metadata/project-statuses',
  getStackMetadata: '/metadata/stacks',
  getCountryMetadata: '/metadata/countries',
  getChapterMetadata: '/metadata/chapters',
  getSurveys: '/surveys',
  getSurveyDetail: (id: string) => `/surveys/${id}`,
  getSurveyTopic: (id: string, topicId: string) =>
    `/surveys/${id}/topics/${topicId}`,
  getSurveyReviewDetail: (id: string, topicID: string, reviewerID: string) =>
    `/surveys/${id}/topics/${topicID}/reviews/${reviewerID}`,
}
export interface Meta {
  page?: number
  size?: number
  sort?: string
  total?: number
}

class Client {
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  privateHeaders: HeadersInit = {
    ...this.headers,
  }

  public get formDataHeaders(): Headers {
    const cloned = Object.assign({}, this.privateHeaders) as Headers
    // Browsers will auto-set Content-Type and other things when formData is used
    // Content-Type must not be present for form data to work
    delete cloned['Content-Type']
    return cloned
  }

  public setAuthToken(token: string) {
    this.privateHeaders = {
      ...this.privateHeaders,
      Authorization: `Bearer ${token}`,
    }
  }

  public clearAuthToken() {
    this.privateHeaders = { ...this.headers }
  }

  public login(code: string, redirectUrl: string) {
    return fetcher<Response<ViewAuthData>>(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ code, redirectUrl }),
    })
  }

  public getProfile() {
    return fetcher<Response<ViewProfileData>>(`${BASE_URL}/profile`, {
      headers: { ...this.privateHeaders },
    })
  }

  public updateProfile(data: Partial<RequestUpdateInfoInput>) {
    return fetcher<Response<ViewProfileData>>(`${BASE_URL}/profile`, {
      headers: { ...this.privateHeaders },
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  public getEmployees(filter: EmployeeListFilter) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewEmployeeListDataResponse & Meta>(
      `${BASE_URL}/employees?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getEmployee(id: string) {
    return fetcher<Response<ViewEmployeeData>>(`${BASE_URL}/employees/${id}`, {
      headers: { ...this.privateHeaders },
    })
  }

  public updateEmployeeStatus(id: string, employeeStatus: string) {
    return fetcher<Response<ViewEmployeeData>>(
      `${BASE_URL}/employees/${id}/employee-status`,
      {
        method: 'PUT',
        headers: { ...this.privateHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeStatus,
        }),
      },
    )
  }

  public getProjects(filter: ProjectListFilter) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewProjectListDataResponse & Meta>(
      `${BASE_URL}/projects?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getProject(id: string) {
    return fetcher<Response<ViewProjectData>>(`${BASE_URL}/projects/${id}`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getProjectMemberList(
    projectId: string,
    filter: ProjectMemberListFilter,
  ) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewProjectMemberListResponse & Meta>(
      `${BASE_URL}/projects/${projectId}/members?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public updateProjectStatus(id: string, status: string) {
    return fetcher<Response<ViewEmployeeData>>(
      `${BASE_URL}/projects/${id}/status`,
      {
        method: 'PUT',
        headers: { ...this.privateHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
        }),
      },
    )
  }

  public getSenioritiesMetadata() {
    return fetcher<ViewSeniorityResponse>(`${BASE_URL}/metadata/seniorities`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getPositionsMetadata() {
    return fetcher<ViewPositionResponse>(`${BASE_URL}/metadata/positions`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getAccountRolesMetadata() {
    return fetcher<ViewAccountRoleResponse>(
      `${BASE_URL}/metadata/account-roles`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getProjectStatusMetadata = () => {
    return fetcher<Response<ViewMetaData[]>>(
      `${BASE_URL}/metadata/project-statuses`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getStackMetadata = () => {
    return fetcher<ViewStackResponse>(`${BASE_URL}/metadata/stacks`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getChaptersMetadata = () => {
    return fetcher<ViewChapterResponse>(`${BASE_URL}/metadata/chapters`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getCountryMetadata = () => {
    return fetcher<Response<ViewMetaData[]>>(`${BASE_URL}/metadata/countries`, {
      headers: { ...this.privateHeaders },
    })
  }

  public createNewEmployee(data: RequestCreateEmployeeInput) {
    return fetcher<Response<ViewEmployeeData>>(`${BASE_URL}/employees`, {
      method: 'POST',
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify(data),
    })
  }

  public updateEmployeeGeneralInfo(
    id: string,
    data: RequestUpdateEmployeeGeneralInfoInput,
  ) {
    return fetcher<ViewUpdateGeneralEmployeeResponse>(
      `${BASE_URL}/employees/${id}/general-info`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public updateEmployeeSkills(id: string, data: RequestUpdateSkillsInput) {
    return fetcher<ViewUpdateSkillsEmployeeResponse>(
      `${BASE_URL}/employees/${id}/skills`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public updateEmployeePersonalInfo(
    id: string,
    data: RequestUpdatePersonalInfoInput,
  ) {
    return fetcher<ViewUpdatePersonalEmployeeResponse>(
      `${BASE_URL}/employees/${id}/personal-info`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public createNewProject(data: RequestCreateProjectInput) {
    return fetcher<Response<ViewCreateProjectData>>(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify(data),
    })
  }

  public createProjectMember(
    projectId: string,
    data: Partial<RequestAssignMemberInput>,
  ) {
    return fetcher<Response<ViewProjectMember>>(
      `${BASE_URL}/projects/${projectId}/members`,
      {
        method: 'POST',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public updateProjectMember(
    projectId: string,
    data: Partial<RequestUpdateMemberInput>,
  ) {
    return fetcher<Response<ViewProjectMember>>(
      `${BASE_URL}/projects/${projectId}/members`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public deleteProjectMember(projectId: string, memberId: string) {
    return fetcher<any>(
      `${BASE_URL}/projects/${projectId}/members/${memberId}`,
      {
        method: 'DELETE',
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public unassignProjectMember(projectId: string, memberId: string) {
    return fetcher<any>(
      `${BASE_URL}/projects/${projectId}/members/${memberId}`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public updateProjectGeneralInfo(
    id: string,
    data: Partial<RequestUpdateProjectGeneralInfoInput>,
  ) {
    return fetcher<ViewUpdateProjectGeneralInfoResponse>(
      `${BASE_URL}/projects/${id}/general-info`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public updateProjectContactInfo(
    id: string,
    data: Partial<RequestUpdateContactInfoInput>,
  ) {
    return fetcher<ViewUpdateProjectContactInfoResponse>(
      `${BASE_URL}/projects/${id}/contact-info`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public getProjectWorkUnits(
    projectId: string,
    filter: ProjectWorkUnitListFilter,
  ) {
    const queryString = qs.stringify(filter)

    return fetcher<Response<ViewWorkUnit[]>>(
      `${BASE_URL}/projects/${projectId}/work-units?${queryString}`,
      {
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public archiveProjectWorkUnit(projectId: string, workUnitId: string) {
    return fetcher(
      `${BASE_URL}/projects/${projectId}/work-units/${workUnitId}/archive`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public unarchiveProjectWorkUnit(projectId: string, workUnitId: string) {
    return fetcher(
      `${BASE_URL}/projects/${projectId}/work-units/${workUnitId}/unarchive`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public uploadProfileAvatar(file: FormData) {
    return fetcher<Response<ViewEmployeeContentData>>(
      `${BASE_URL}/profile/upload-avatar`,
      {
        method: 'POST',
        headers: {
          ...this.formDataHeaders,
        },
        body: file,
      },
    )
  }

  public addProjectWorkUnit(
    projectId: string,
    data: RequestCreateWorkUnitBody,
  ) {
    return fetcher<Response<ViewWorkUnit[]>>(
      `${BASE_URL}/projects/${projectId}/work-units`,
      {
        method: 'POST',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public editProjectWorkUnit(
    projectId: string,
    workUnitId: string,
    data: RequestUpdateWorkUnitBody,
  ) {
    return fetcher<ViewMessageResponse>(
      `${BASE_URL}/projects/${projectId}/work-units/${workUnitId}`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public getPersonalFeedbacks(filter: FeedbackListFilter) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewListFeedbackResponse>(
      `${BASE_URL}/feedbacks?${queryString}`,
      {
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public getPersonalFeedback(eventID: string, topicID: string) {
    return fetcher<ViewFeedbackDetailResponse>(
      `${BASE_URL}/feedbacks/${eventID}/topics/${topicID}`,
      {
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public submitPersonalFeedback(
    eventID: string,
    topicID: string,
    data: RequestSubmitBody,
  ) {
    return fetcher<ViewFeedbackDetailResponse>(
      `${BASE_URL}/feedbacks/${eventID}/topics/${topicID}/submit`,
      {
        method: 'POST',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public getSurveys(filter: SurveyListFilter) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewListSurveyResponse & Meta>(
      `${BASE_URL}/surveys?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public createSurvey(data: RequestCreateSurveyFeedbackInput) {
    return fetcher<ViewMessageResponse>(`${BASE_URL}/surveys`, {
      method: 'POST',
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify(data),
    })
  }

  public getSurveyDetail(id: string, filter: SurveyDetailFilter) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewListSurveyDetailResponse & Meta>(
      `${BASE_URL}/surveys/${id}?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public deleteSurvey(id: string) {
    return fetcher<ViewMessageResponse>(`${BASE_URL}/surveys/${id}`, {
      method: 'DELETE',
      headers: {
        ...this.privateHeaders,
      },
    })
  }

  public deleteSurveyTopic(id: string, topicId: string) {
    return fetcher<ViewMessageResponse>(
      `${BASE_URL}/surveys/${id}/topics/${topicId}`,
      {
        method: 'DELETE',
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public sendSurvey(id: string, data: RequestSendSurveyInput) {
    return fetcher<ViewMessageResponse>(`${BASE_URL}/surveys/${id}/send`, {
      method: 'POST',
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify(data),
    })
  }

  public getSurveyTopic(id: string, topicId: string) {
    return fetcher<ViewSurveyTopicDetailResponse>(
      `${BASE_URL}/surveys/${id}/topics/${topicId}`,
      {
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public updateSurveyReviewers(
    id: string,
    topicId: string,
    data: RequestUpdateTopicReviewersBody,
  ) {
    return fetcher<ViewMessageResponse>(
      `${BASE_URL}/surveys/${id}/topics/${topicId}/employees`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public markSurveyAsDone(id: string) {
    return fetcher<ViewMessageResponse>(`${BASE_URL}/surveys/${id}/done`, {
      method: 'PUT',
      headers: {
        ...this.privateHeaders,
      },
    })
  }

  public getSurveyReviewDetail(
    id: string,
    topicID: string,
    reviewerID: string,
  ) {
    return fetcher<ViewFeedbackReviewDetailResponse>(
      `${BASE_URL}/surveys/${id}/topics/${topicID}/reviews/${reviewerID}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public removeSurveyParticipants(
    id: string,
    topicID: string,
    reviewerIDs: string[],
  ) {
    return fetcher<ViewFeedbackReviewDetailResponse>(
      `${BASE_URL}/surveys/${id}/topics/${topicID}/employees`,
      {
        method: 'DELETE',
        headers: { ...this.privateHeaders },
        body: JSON.stringify({ reviewerIDs }),
      },
    )
  }

  public uploadEmployeeAvatar(id: string, file: FormData) {
    return fetcher<Response<ViewEmployeeContentData>>(
      `${BASE_URL}/employees/${id}/upload-avatar`,
      {
        method: 'POST',
        headers: {
          ...this.formDataHeaders,
        },
        body: file,
      },
    )
  }
}

const client = new Client()

export { client }
