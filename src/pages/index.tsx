import { Permission } from 'constants/permission'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HomePage = () => {
  const { replace } = useRouter()
  const { permissions } = useAuthContext()

  useEffect(() => {
    if (!permissions.length) return
    if (permissions.includes(Permission.DASHBOARDS_READ)) {
      replace(ROUTES.DASHBOARD)
    } else {
      replace(ROUTES.PROJECTS)
    }
  }, [permissions, replace])

  return null
}

export default HomePage
