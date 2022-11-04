import { createContext } from '@dwarvesf/react-utils'
import { Session } from 'next-auth'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
// import { useCallback, useState } from 'react'
import { WithChildren } from 'types/common'

interface AuthContextValues {
  isLogin: boolean
  login: () => void
  logout: () => void
  session: Session | null
}

const [Provider, useAuthContext] = createContext<AuthContextValues>({
  name: 'auth',
})

const AuthContextProvider = ({ children }: WithChildren) => {
  const { data: session, status } = useSession()

  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
    setIsLogin(status === 'authenticated' && session !== null)
  }, [session, status])

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
