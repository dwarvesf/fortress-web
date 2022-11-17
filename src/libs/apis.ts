import { EmployeeListFilter } from 'types/filters/EmployeeListFilter'
import {
  ViewAuthData,
  ViewProfileData,
  ViewEmployeeListDataResponse,
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
  getStatusSelectOptions: '/metadata/account-statuses',
  getPositionSelectOptions: '/metadata/positions',
  getAccountRoleSelectOptions: '/metadata/account-roles',
  getSenioritySelectOptions: '/metadata/seniorities',
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

  public getEmployees(filter: EmployeeListFilter) {
    const queryString = qs.stringify(filter)

    return fetcher<ViewEmployeeListDataResponse & Meta>(
      `${BASE_URL}/employees?${queryString}`,
      {
        headers: { ...this.privateHeaders },
      },
    )
  }
}

const client = new Client()

export { client }
