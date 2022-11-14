import dayjs from 'dayjs'
import { createContext, isSSR } from '@dwarvesf/react-utils'
import { ROUTES } from 'constants/routes'
import { useEffect, useMemo, useState } from 'react'
import { WithChildren } from 'types/common'
import { useGoogleLogin } from '@react-oauth/google'
import { AuthEmployee } from 'types/schema'
import { client } from 'libs/apis'
import { notification } from 'antd'
import { parseJWT, getCookie } from 'utils/string'

interface AuthContextValues {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  employee?: AuthEmployee
}

export const AUTH_TOKEN_KEY = 'fortress-token'
export const LOGIN_REDIRECTION_KEY = 'fortress-redirection-key'

const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'auth',
})

const AuthContextProvider = ({ children }: WithChildren) => {
  const [authToken, setAuthToken] = useState(() =>
    isSSR() ? '' : getCookie(AUTH_TOKEN_KEY),
  )
  const [employee, setEmployee] = useState<AuthEmployee>()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const { accessToken: token, employee: employeeData } =
          await client.login(codeResponse.code, window.location.origin)

        if (token) {
          const jwtObj = parseJWT(token)
          const expiryTime = dayjs.unix(jwtObj?.exp)

          setAuthToken(token)
          document.cookie = `${AUTH_TOKEN_KEY}=${token}; expires=${expiryTime.toDate()}; domain=${
            window.location.origin
          }`

          if (employeeData) {
            setEmployee(employeeData)
          }
        }
      } catch (error: any) {
        notification.error({
          message: 'Error',
          description: error.message || 'Could not login!',
        })
      }
    },
  })

  const logout = () => {
    setAuthToken('')
    setEmployee(undefined)

    const now = dayjs()
    document.cookie = `${AUTH_TOKEN_KEY}=; expires=${now.toDate()}; domain=${
      window.location.href
    }`
  }

  useEffect(() => {
    if (!window.location.href.includes(ROUTES.LOGIN)) {
      window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
    }

    if (getCookie(AUTH_TOKEN_KEY) === '') {
      setAuthToken('')
    }
  }, [])

  const isAuthenticated = useMemo(() => {
    const authenticated = isSSR() ? false : getCookie(AUTH_TOKEN_KEY) !== ''

    return authenticated && authToken !== ''
  }, [authToken])

  return (
    <Provider
      value={{
        isAuthenticated,
        login,
        logout,
        employee,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContextProvider, useAuthContext }
