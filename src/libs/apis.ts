import { AuthUser, AuthResponse } from 'types/schema'
import fetcher from './fetcher'

export interface Response<T> {
  data: T
}

// keys for swr
export const GET_PATHS = {
  getUsers: '/users',
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
