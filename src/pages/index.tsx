import { Permission } from 'constants/permission'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HomePage = () => {
  const { replace } = useRouter()
  const { isAuthenticated, permissions } = useAuthContext()

  useEffect(() => {
    if (!isAuthenticated || !permissions.length) return
    if (permissions.includes(Permission.PROJECTS_READ)) {
      replace(ROUTES.DASHBOARD)
    } else {
      replace(ROUTES.PROJECTS)
    }
  }, [isAuthenticated, permissions, replace])

  return null
}

export default HomePage
