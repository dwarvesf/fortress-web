import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import { ProjectListFilter } from 'types/filters/ProjectListFilter'
import { ProjectStaffListFilter } from 'types/filters/ProjectStaffListFilter'
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
  PkgHandlerEmployeeCreateEmployeeInput,
  PkgHandlerProfileUpdateInfoInput,
  ViewProjectData,
  ViewProjectMemberListResponse,
  PkgHandlerEmployeeUpdateGeneralInfoInput,
  ViewUpdateGeneralInfoEmployeeData,
} from 'types/schema'
import qs from 'qs'
import fetcher from './fetcher'

const BASE_URL = process.env.BASE_URL

export interface Response<T> {
  data: T
}

// keys for swr
export const GET_PATHS = {
  getUsers: '/users',
  getEmployees: '/employees',
  getProjects: '/projects',
  getProjectStaffList: (id: string) => `/projects/${id}/members`,
  getAccountStatusMetadata: '/metadata/account-statuses',
  getPositionMetadata: '/metadata/positions',
  getAccountRoleMetadata: '/metadata/account-roles',
  getSeniorityMetadata: '/metadata/seniorities',
  getProjectStatusMetadata: '/metadata/project-statuses',
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

  public updateProfile(data: Partial<PkgHandlerProfileUpdateInfoInput>) {
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

  public getProjectStaffList(
    projectId: string,
    filter: ProjectStaffListFilter,
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

  public createNewEmployee(data: PkgHandlerEmployeeCreateEmployeeInput) {
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
    data: PkgHandlerEmployeeUpdateGeneralInfoInput,
  ) {
    return fetcher<Response<ViewUpdateGeneralInfoEmployeeData>>(
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
}

const client = new Client()

export { client }
