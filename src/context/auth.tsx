import { createContext, isSSR } from '@dwarvesf/react-utils'
import { ROUTES } from 'constants/routes'
import { Session } from 'next-auth'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useMemo } from 'react'
import { WithChildren } from 'types/common'

interface AuthContextValues {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  session: Session | null
}

export const AUTH_TOKEN_KEY = 'fortress-token'
export const LOGIN_REDIRECTION_KEY = 'fortress-redirection-key'

const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'auth',
})

const AuthContextProvider = ({ children }: WithChildren) => {
  const { data: session } = useSession()

  const isAuthenticated = useMemo(() => {
    const authenticated = isSSR()
      ? false
      : Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY))
    return authenticated || session !== null
  }, [session])

  useEffect(() => {
    if (!window.location.href.includes(ROUTES.LOGIN)) {
      window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
    }
  }, [session])

  // TODO: bind API and implement login and logout functions with localStorage's setItem and removeItem

  return (
    <Provider
      value={{
        isAuthenticated,
        login: () => signIn('google'),
        logout: () => signOut(),
        session,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContextProvider, useAuthContext }
