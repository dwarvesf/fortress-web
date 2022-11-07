import { createContext, isSSR } from '@dwarvesf/react-utils'
import { Session } from 'next-auth'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { WithChildren } from 'types/common'

interface AuthContextValues {
  isLogin: boolean
  login: () => void
  logout: () => void
  session: Session | null
}

const AUTH_TOKEN_KEY = 'fortress-token'

const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'auth',
})

const AuthContextProvider = ({ children }: WithChildren) => {
  const { data: session, status } = useSession()

  const [isLogin, setIsLogin] = useState<boolean>(() => {
    return isSSR()
      ? false
      : Boolean(window.localStorage.getItem(AUTH_TOKEN_KEY))
  })

  useEffect(() => {
    setIsLogin(status === 'authenticated' && session !== null)
  }, [session, status])

  // TODO: bind API and implement login and logout functions with localStorage's setItem and removeItem

  return (
    <Provider
      value={{
        isLogin,
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
