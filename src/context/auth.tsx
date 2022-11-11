import { createContext, isSSR } from '@dwarvesf/react-utils'
import { ROUTES } from 'constants/routes'
import { useEffect, useMemo, useState } from 'react'
import { WithChildren } from 'types/common'
import { useGoogleLogin } from '@react-oauth/google'
import { AuthEmployee } from 'types/schema'
import { client } from 'libs/apis'
import { notification } from 'antd'
import { emitter, EVENTS } from 'libs/emitter'

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
  const [authToken, setAuthToken] = useState(() => {
    return isSSR() ? '' : window.localStorage.getItem(AUTH_TOKEN_KEY)
  })
  const [employee, setEmployee] = useState<AuthEmployee>()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const { accessToken: token, employee: employeeData } =
          await client.login(codeResponse.code, window.location.origin)
        if (token) {
          setAuthToken(token)
          window.localStorage.setItem(AUTH_TOKEN_KEY, token)
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
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
  }

  useEffect(() => {
    if (!window.location.href.includes(ROUTES.LOGIN)) {
      window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
    }

    emitter.on(EVENTS.API_ERROR, async (data: any) => {
      if (data.status === 401) {
        logout()
      }
    })

    return () => {
      emitter.off(EVENTS.API_ERROR)
    }
  }, [])

  const isAuthenticated = useMemo(() => {
    const authenticated = isSSR()
      ? false
      : Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY))

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
