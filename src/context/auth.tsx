import dayjs from 'dayjs'
import { createContext } from '@dwarvesf/react-utils'
import { ROUTES } from 'constants/routes'
import { useEffect, useState } from 'react'
import { WithChildren } from 'types/common'
import { useGoogleLogin } from '@react-oauth/google'
import { client } from 'libs/apis'
import { notification } from 'antd'
import { parseJWT } from 'utils/string'
import { getCookie, setCookie, removeCookie } from 'utils/cookie'
import { useAsyncEffect } from '@dwarvesf/react-hooks'
import { ViewEmployeeData } from 'types/schema'

interface AuthContextValues {
  isAuthenticated: boolean
  isAuthenticating: boolean
  user?: ViewEmployeeData
  login: () => void
  logout: () => void
  revalidate: () => void
}

export const AUTH_TOKEN_KEY = 'fortress-token'
export const LOGIN_REDIRECTION_KEY = 'fortress-redirection-key'

const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'auth',
})

const AuthContextProvider = ({ children }: WithChildren) => {
  const [authToken, setAuthToken] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)
  const [user, setUser] = useState<ViewEmployeeData>()
  const [fetchTrigger, setFetchTrigger] = useState(Date.now())

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const {
          data: { accessToken, employee },
        } = await client.login(codeResponse.code, window.location.origin)

        if (accessToken) {
          client.setAuthToken(accessToken)
          setAuthToken(accessToken)

          const jwtObj = parseJWT(accessToken)
          const expiryTime = dayjs.unix(jwtObj?.exp)

          setCookie(AUTH_TOKEN_KEY, accessToken, {
            expires: expiryTime.toDate(),
            domain: window.location.hostname,
          })

          if (employee) {
            setIsAuthenticating(false)
            setUser(employee)
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
    setUser(undefined)
    client.clearAuthToken()
    removeCookie(AUTH_TOKEN_KEY, {
      domain: window.location.hostname,
    })
  }

  const revalidate = () => setFetchTrigger(Date.now())

  useEffect(() => {
    if (!window.location.href.includes(ROUTES.LOGIN)) {
      window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
    }
  }, [authToken])

  useAsyncEffect(async () => {
    const authToken = getCookie(AUTH_TOKEN_KEY)

    if (authToken) {
      client.setAuthToken(authToken)
      setAuthToken(authToken)
      try {
        const profile = await client.getProfile()
        setUser(profile.data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsAuthenticating(false)
      }
    } else {
      setIsAuthenticating(false)
    }
  }, [fetchTrigger]) // eslint-disable-line

  const isAuthenticated = Boolean(authToken) && !isAuthenticating

  return (
    <Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        user,
        login,
        logout,
        revalidate,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContextProvider, useAuthContext }
