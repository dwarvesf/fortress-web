import { DefaultOptionType } from 'antd/lib/select'
import fetcher from './fetcher'

export interface Response<T> {
  data: T
}

export interface AuthResponse {
  accessToken: string
  employee: AuthUser
}

export interface AuthUser {
  address?: string
  avatar: string
  birthday: string
  createdAt?: string
  deletedAt?: string
  displayName: string
  fullName: string
  gender: string
  horoscope?: string
  id: string
  joinedDate?: string
  leftDate?: string
  mbti?: string
  personalEmail: string
  phoneNumber: string
  status?: string
  teamEmail: string
  updatedAt?: string
}

export interface SelectOption extends Partial<DefaultOptionType> {
  code: string
  name: string
  id?: string
  createdAt?: string
  updatedAt?: string
}

// keys for swr
export const GET_PATHS = {
  getUsers: '/users',
  getStatusSelectOptions: '/metadata/account-statuses',
  getPositionSelectOptions: '/metadata/positions',
  getAccountRoleSelectOptions: '/metadata/account-roles',
  getSenioritySelectOptions: '/metadata/seniorities',
}

const BASE_URL = process.env.BASE_URL

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
    return fetcher<Response<AuthResponse>>(`${BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ code, redirectUrl }),
    })
  }

  public getProfile() {
    return fetcher<Response<AuthUser>>(`${BASE_URL}/profile`, {
      headers: { ...this.privateHeaders },
    })
  }
}

const client = new Client()

export { client }
