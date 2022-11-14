import dayjs from 'dayjs'
import { createContext } from '@dwarvesf/react-utils'
import { ROUTES } from 'constants/routes'
import { useEffect, useState } from 'react'
import { WithChildren } from 'types/common'
import { useGoogleLogin } from '@react-oauth/google'
import { AuthUser } from 'types/schema'
import { client } from 'libs/apis'
import { notification } from 'antd'
import { parseJWT, getCookie } from 'utils/string'
import { useAsyncEffect } from '@dwarvesf/react-hooks'

interface AuthContextValues {
  isAuthenticated: boolean
  isAuthenticating: boolean
  login: () => void
  logout: () => void
  user?: AuthUser
}

export const AUTH_TOKEN_KEY = 'fortress-token'
export const LOGIN_REDIRECTION_KEY = 'fortress-redirection-key'

const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'auth',
})

const AuthContextProvider = ({ children }: WithChildren) => {
  const [authToken, setAuthToken] = useState('')
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(true)
  const [user, setUser] = useState<AuthUser>()

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const {
          data: { accessToken, employee },
        } = await client.login(codeResponse.code, window.location.origin)

        if (accessToken) {
          setAuthToken(accessToken)

          const jwtObj = parseJWT(accessToken)
          const expiryTime = dayjs.unix(jwtObj?.exp)

          document.cookie = `${AUTH_TOKEN_KEY}=${accessToken}; expires=${expiryTime.toDate()}`

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

    const now = dayjs()
    document.cookie = `${AUTH_TOKEN_KEY}=; expires=${now.toDate()}`
  }

  useEffect(() => {
    if (!window.location.href.includes(ROUTES.LOGIN)) {
      window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
    }
  }, [authToken])

  useAsyncEffect(async () => {
    const authToken = getCookie(AUTH_TOKEN_KEY)

    if (authToken) {
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
  }, [])

  const isAuthenticated = Boolean(authToken) && !isAuthenticating

  return (
    <Provider
      value={{
        isAuthenticated,
        isAuthenticating,
        login,
        logout,
        user,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContextProvider, useAuthContext }
