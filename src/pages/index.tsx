import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DashboardPage = () => {
  const { replace } = useRouter()

  useEffect(() => {
    replace(ROUTES.PROJECTS)
  }, [replace])

  return <>Dashboard</>
}

export default DashboardPage
