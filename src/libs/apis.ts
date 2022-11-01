// keys for swr
export const GET_PATHS = {
  getUsers: '/users',
}

class Client {
  headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
}

const client = new Client()

export { client }
