import { createContext, isSSR } from '@dwarvesf/react-utils'
import { ROUTES } from 'constants/routes'
import { useEffect, useMemo } from 'react'
import { WithChildren } from 'types/common'
import { useGoogleLogin } from '@react-oauth/google'

interface AuthContextValues {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  session: null
}

export const AUTH_TOKEN_KEY = 'fortress-token'
export const LOGIN_REDIRECTION_KEY = 'fortress-redirection-key'

const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'auth',
})

const AuthContextProvider = ({ children }: WithChildren) => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: 'auth-code',
  })

  const isAuthenticated = useMemo(() => {
    const authenticated = isSSR()
      ? false
      : Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY))
    return authenticated
  }, [])

  useEffect(() => {
    if (!window.location.href.includes(ROUTES.LOGIN)) {
      window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
    }
  }, [])

  // TODO: bind API and implement login and logout functions with localStorage's setItem and removeItem

  return (
    <Provider
      value={{
        isAuthenticated,
        login,
        logout: () => undefined,
        session: null,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContextProvider, useAuthContext }
