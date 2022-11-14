import { AuthUser, AuthResponse } from 'types/schema'
import fetcher from './fetcher'

// keys for swr
export const GET_PATHS = {
  getUsers: '/users',
}

const BASE_API_URL = 'https://develop-api.fortress.dwarvesf.com/api/v1'

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
    return fetcher<{ data: AuthResponse }>(`${BASE_API_URL}/auth`, {
      method: 'POST',
      headers: {
        ...this.headers,
      },
      body: JSON.stringify({ code, redirectUrl }),
    })
  }

  public getProfile() {
    return fetcher<{
      data: AuthUser
    }>(`${BASE_API_URL}/profile`, {
      headers: { ...this.privateHeaders },
    })
  }
}

const client = new Client()

export { client }
