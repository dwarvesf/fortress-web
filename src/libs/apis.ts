import {
  ViewAuthData,
  ViewProfileData,
  ViewEmployeeListDataResponse,
  ViewProjectListDataResponse,
  ViewMetaData,
  ViewEmployeeData,
  ViewRolesResponse,
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
  ViewProjectContentDataResponse,
  ViewAuthUserResponse,
  RequestCreateStackInput,
  RequestUpdateStackBody,
  ViewProjectSizeResponse,
  ViewEngineeringHealthResponse,
  ViewWorkSurveyResponse,
  ViewLineManagersResponse,
  ViewActionItemReportResponse,
  ViewAuditSummariesResponse,
  ViewActionItemSquashReportResponse,
  ViewUnreadFeedbackCountResponse,
  ViewOrganizationsResponse,
  ViewResourceAvailabilityResponse,
  ViewGetEngagementDashboardResponse,
  ViewGetEngagementDashboardDetailResponse,
  ViewGetDashboardResourceUtilizationResponse,
  ViewWorkSurveySummaryResponse,
  ViewWorkUnitDistributionsResponse,
  ViewSummaryWorkUnitDistributionResponse,
  ViewInvoiceTemplateResponse,
  RequestSendInvoiceRequest,
  RequestUpdateBaseSalaryInput,
  ViewUpdateBaseSalaryResponse,
  ViewGetCurrenciesResponse,
  ViewCountriesResponse,
  RequestSubmitOnboardingFormRequest,
  ViewContentDataResponse,
  ViewEmployeeInvitationResponse,
} from 'types/schema'
import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { ProjectMemberListFilter } from 'types/filters/ProjectMemberListFilter'
import { ProjectWorkUnitListFilter } from 'types/filters/ProjectWorkUnitListFilter'
import { FeedbackListFilter } from 'types/filters/FeedbackListFilter'
import { SurveyListFilter } from 'types/filters/SurveyListFilter'
import { SurveyDetailFilter } from 'types/filters/SurveyDetailFilter'
import { StackFilter } from 'types/filters/StackFilter'
import { WorkUnitDistributionsFilter } from 'types/filters/WorkUnitDistributionsFilter'
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
  getUnreadFeedbacks: '/feedbacks/unreads',
  getAccountStatusMetadata: '/metadata/account-statuses',
  getPositionMetadata: '/metadata/positions',
  getRoleMetadata: '/metadata/roles',
  getSeniorityMetadata: '/metadata/seniorities',
  getProjectStatusMetadata: '/metadata/project-statuses',
  getStackMetadata: '/metadata/stacks',
  getCountryMetadata: '/metadata/countries',
  getChapterMetadata: '/metadata/chapters',
  getOrganizationMetadata: '/metadata/organizations',
  getCurrencyMetadata: '/metadata/currency',
  getSurveys: '/surveys',
  getSurveyDetail: (id: string) => `/surveys/${id}`,
  getSurveyTopic: (id: string, topicId: string) =>
    `/surveys/${id}/topics/${topicId}`,
  getSurveyReviewDetail: (id: string, topicID: string, reviewerID: string) =>
    `/surveys/${id}/topics/${topicID}/reviews/${reviewerID}`,
  getProjectsSizes: '/dashboards/projects/sizes',
  getLineManagers: '/line-managers',
  getProjectsWorkSurveysAverage: '/dashboards/projects/work-surveys',
  getProjectsEngineeringHealthScore: '/dashboards/projects/engineering-healths',
  getProjectsAuditScore: '/dashboards/projects/audits',
  getProjectsAuditEvents: '/dashboards/projects/action-items',
  getProjectsSummary: '/dashboards/projects/summary',
  getProjectsActionItemSquash: '/dashboards/projects/action-item-squash',
  getResourceAvailability: '/dashboards/resources/availabilities',
  getDashboardsEngagementInfo: '/dashboards/engagement/info',
  getDashboardsEngagementDetail: '/dashboards/engagement/detail',
  getResourceUtilization: '/dashboards/resources/utilization',
  getResourceWorkSurveySummaries: '/dashboards/resources/work-survey-summaries',
  getResourceWorkUnitDistribution:
    '/dashboards/resources/work-unit-distribution',
  getResourceWorkUnitDistributionSummary:
    '/dashboards/resources/work-unit-distribution-summary',
  getInvoiceTemplate: '/invoices/template',
  getBankAccounts: '/bank-accounts',
  getCompanyInfos: '/company-infos',
  getClients: '/clients',
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

  public getEmployees(data: EmployeeListFilter) {
    return fetcher<ViewEmployeeListDataResponse & Meta>(
      `${BASE_URL}/employees/search`,
      {
        method: 'POST',
        headers: { ...this.privateHeaders },
        body: JSON.stringify(data),
      },
    )
  }

  public getEmployee(id: string) {
    return fetcher<Response<ViewEmployeeData>>(`${BASE_URL}/employees/${id}`, {
      headers: { ...this.privateHeaders },
    })
  }

  public updateEmployeeStatus(id: string, employeeStatus: string, isKeepFwdEmail?: boolean) {
    return fetcher<Response<ViewEmployeeData>>(
      `${BASE_URL}/employees/${id}/employee-status`,
      {
        method: 'PUT',
        headers: { ...this.privateHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeStatus,
          isKeepFwdEmail,
        }),
      },
    )
  }

  public getProjects(filter: ProjectListFilter) {
    const queryString = qs.stringify(filter, {
      arrayFormat: 'repeat',
    })

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
    projectID: string,
    filter: ProjectMemberListFilter,
  ) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewProjectMemberListResponse & Meta>(
      `${BASE_URL}/projects/${projectID}/members?${queryString}`,
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
    return fetcher<ViewRolesResponse>(`${BASE_URL}/metadata/roles`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getProjectStatusMetadata = () => {
    return fetcher<Response<ViewMetaData[]>>(
      `${BASE_URL}/metadata/project-statuses`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getStackMetadata = (filter?: StackFilter) => {
    const queryString = qs.stringify(filter)

    return fetcher<ViewStackResponse & Meta>(
      `${BASE_URL}/metadata/stacks?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public createStackMetadata = (data: RequestCreateStackInput) => {
    return fetcher<ViewStackResponse>(`${BASE_URL}/metadata/stacks`, {
      method: 'POST',
      headers: { ...this.privateHeaders },
      body: JSON.stringify(data),
    })
  }

  public updateStackMetadata = (id: string, data: RequestUpdateStackBody) => {
    return fetcher<ViewStackResponse>(`${BASE_URL}/metadata/stacks/${id}`, {
      method: 'PUT',
      headers: { ...this.privateHeaders },
      body: JSON.stringify(data),
    })
  }

  public deleteStackMetadata = (id: string) => {
    return fetcher<ViewStackResponse>(`${BASE_URL}/metadata/stacks/${id}`, {
      method: 'DELETE',
      headers: { ...this.privateHeaders },
    })
  }

  public getChaptersMetadata = () => {
    return fetcher<ViewChapterResponse>(`${BASE_URL}/metadata/chapters`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getCountryMetadata = () => {
    return fetcher<ViewCountriesResponse>(`${BASE_URL}/metadata/countries`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getOrganizationMetadata = () => {
    return fetcher<ViewOrganizationsResponse>(
      `${BASE_URL}/metadata/organizations`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getCurrencyMetadata = () => {
    return fetcher<ViewGetCurrenciesResponse>(
      `${BASE_URL}/metadata/currencies`,
      {
        headers: { ...this.privateHeaders },
      },
    )
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

  public updateEmployeeBaseSalary(
    id: string,
    data: RequestUpdateBaseSalaryInput,
  ) {
    return fetcher<ViewUpdateBaseSalaryResponse>(
      `${BASE_URL}/employees/${id}/base-salary`,
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
    projectID: string,
    data: Partial<RequestAssignMemberInput>,
  ) {
    return fetcher<Response<ViewProjectMember>>(
      `${BASE_URL}/projects/${projectID}/members`,
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
    projectID: string,
    data: Partial<RequestUpdateMemberInput>,
  ) {
    return fetcher<Response<ViewProjectMember>>(
      `${BASE_URL}/projects/${projectID}/members`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
        body: JSON.stringify(data),
      },
    )
  }

  public deleteProjectMember(projectID: string, memberID: string) {
    return fetcher<any>(
      `${BASE_URL}/projects/${projectID}/members/${memberID}`,
      {
        method: 'DELETE',
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public deleteProjectSlot(projectID: string, slotID: string) {
    return fetcher<any>(`${BASE_URL}/projects/${projectID}/slots/${slotID}`, {
      method: 'DELETE',
      headers: {
        ...this.privateHeaders,
      },
    })
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
    projectID: string,
    filter: ProjectWorkUnitListFilter,
  ) {
    const queryString = qs.stringify(filter)

    return fetcher<Response<ViewWorkUnit[]>>(
      `${BASE_URL}/projects/${projectID}/work-units?${queryString}`,
      {
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public archiveProjectWorkUnit(projectID: string, workUnitId: string) {
    return fetcher(
      `${BASE_URL}/projects/${projectID}/work-units/${workUnitId}/archive`,
      {
        method: 'PUT',
        headers: {
          ...this.privateHeaders,
        },
      },
    )
  }

  public unarchiveProjectWorkUnit(projectID: string, workUnitId: string) {
    return fetcher(
      `${BASE_URL}/projects/${projectID}/work-units/${workUnitId}/unarchive`,
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
    projectID: string,
    data: RequestCreateWorkUnitBody,
  ) {
    return fetcher<Response<ViewWorkUnit[]>>(
      `${BASE_URL}/projects/${projectID}/work-units`,
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
    projectID: string,
    workUnitId: string,
    data: RequestUpdateWorkUnitBody,
  ) {
    return fetcher<ViewMessageResponse>(
      `${BASE_URL}/projects/${projectID}/work-units/${workUnitId}`,
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

    return fetcher<ViewListFeedbackResponse & Meta>(
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
    const queryString = qs.stringify(filter, {
      encode: false,
      arrayFormat: 'repeat',
    })

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

  public uploadProjectAvatar(id: string, file: FormData) {
    return fetcher<Response<ViewProjectContentDataResponse>>(
      `${BASE_URL}/projects/${id}/upload-avatar`,
      {
        method: 'POST',
        headers: {
          ...this.formDataHeaders,
        },
        body: file,
      },
    )
  }

  public getAuth() {
    return fetcher<ViewAuthUserResponse>(`${BASE_URL}/auth/me`, {
      headers: { ...this.privateHeaders },
    })
  }

  public updateProjectsSendSurveyStatus(
    id: string,
    allowsSendingSurvey: boolean,
  ) {
    const queryString = qs.stringify({ allowsSendingSurvey })

    return fetcher<ViewMessageResponse>(
      `${BASE_URL}/projects/${id}/sending-survey-state?${queryString}`,
      {
        method: 'PUT',
        headers: { ...this.privateHeaders },
      },
    )
  }

  public updateEmployeeRole(id: string, roles: string[]) {
    return fetcher<Response<ViewEmployeeData>>(
      `${BASE_URL}/employees/${id}/roles`,
      {
        method: 'PUT',
        headers: { ...this.privateHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roles,
        }),
      },
    )
  }

  public getProjectsSizes() {
    return fetcher<ViewProjectSizeResponse>(
      `${BASE_URL}/dashboards/projects/sizes`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getProjectsWorkSurveysAverage(projectID?: string) {
    const queryString = qs.stringify({ projectID })

    return fetcher<ViewWorkSurveyResponse>(
      `${BASE_URL}/dashboards/projects/work-surveys?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getProjectsEngineeringHealthScore(projectID?: string) {
    const queryString = qs.stringify({ projectID })

    return fetcher<ViewEngineeringHealthResponse>(
      `${BASE_URL}/dashboards/projects/engineering-healths?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getProjectsAuditScore(projectID?: string) {
    const queryString = qs.stringify({ projectID })

    return fetcher<ViewEngineeringHealthResponse>(
      `${BASE_URL}/dashboards/projects/audits?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getLineManagers() {
    return fetcher<ViewLineManagersResponse>(`${BASE_URL}/line-managers`, {
      headers: { ...this.privateHeaders },
    })
  }

  public getProjectsAuditEvents(projectID?: string) {
    const queryString = qs.stringify({ projectID })

    return fetcher<ViewActionItemReportResponse>(
      `${BASE_URL}/dashboards/projects/action-items?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getProjectsSummary() {
    return fetcher<ViewAuditSummariesResponse>(
      `${BASE_URL}/dashboards/projects/summary`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getProjectsActionItemSquash(projectID?: string) {
    const queryString = qs.stringify({ projectID })

    return fetcher<ViewActionItemSquashReportResponse>(
      `${BASE_URL}/dashboards/projects/action-item-squash?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getUnreadFeedbacks() {
    return fetcher<ViewUnreadFeedbackCountResponse>(
      `${BASE_URL}/feedbacks/unreads`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getResourceAvailability() {
    return fetcher<ViewResourceAvailabilityResponse>(
      `${BASE_URL}/dashboards/resources/availabilities`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getDashboardsEngagementInfo() {
    return fetcher<ViewGetEngagementDashboardResponse>(
      `${BASE_URL}/dashboards/engagement/info`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getDashboardsEngagementDetail(filter: string, startDate: string) {
    const queryString = qs.stringify({ filter, startDate })

    return fetcher<ViewGetEngagementDashboardDetailResponse>(
      `${BASE_URL}/dashboards/engagement/detail?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getResourceUtilization() {
    return fetcher<ViewGetDashboardResourceUtilizationResponse>(
      `${BASE_URL}/dashboards/resources/utilization`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getResourceWorkSurveySummaries(keyword?: string) {
    const queryString = qs.stringify({ keyword })

    return fetcher<ViewWorkSurveySummaryResponse>(
      `${BASE_URL}/dashboards/resources/work-survey-summaries?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getResourceWorkUnitDistribution(filter: WorkUnitDistributionsFilter) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewWorkUnitDistributionsResponse>(
      `${BASE_URL}/dashboards/resources/work-unit-distribution?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getResourceWorkUnitDistributionSummary() {
    return fetcher<ViewSummaryWorkUnitDistributionResponse>(
      `${BASE_URL}/dashboards/resources/work-unit-distribution-summary`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public getInvoiceTemplate(projectID: string) {
    const queryString = qs.stringify({ projectID })

    return fetcher<ViewInvoiceTemplateResponse>(
      `${BASE_URL}/invoices/template?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }

  public createInvoice(data: RequestSendInvoiceRequest) {
    return fetcher<ViewMessageResponse>(`${BASE_URL}/invoices/send`, {
      method: 'POST',
      headers: {
        ...this.privateHeaders,
      },
      body: JSON.stringify(data),
    })
  }

  public submitOnboardingForm(
    data: RequestSubmitOnboardingFormRequest,
    token: string,
  ) {
    return fetcher<ViewMessageResponse>(`${BASE_URL}/invite/submit`, {
      method: 'PUT',
      headers: {
        ...this.privateHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    })
  }

  public uploadAsset(formData: FormData, token?: string) {
    return fetcher<ViewContentDataResponse>(`${BASE_URL}/assets/upload`, {
      method: 'POST',
      headers: {
        ...this.formDataHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    })
  }

  public getInviteState(token?: string) {
    return fetcher<ViewEmployeeInvitationResponse>(`${BASE_URL}/invite`, {
      headers: {
        ...this.privateHeaders,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
  }

  public getBankAccounts() {
    // TODO: Types
    return fetcher<any>(`${BASE_URL}/bank-accounts`, {
      headers: {
        ...this.privateHeaders,
      },
    })
  }

  public getCompanyInfos() {
    // TODO: Types
    return fetcher<any>(`${BASE_URL}/company-infos`, {
      headers: {
        ...this.privateHeaders,
      },
    })
  }

  public getClients() {
    // TODO: Types
    return fetcher<any>(`${BASE_URL}/clients`, {
      headers: {
        ...this.privateHeaders,
      },
    })
  }
}

const client = new Client()

export { client }
