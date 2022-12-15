import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DashboardPage = () => {
  const { push } = useRouter()

  useEffect(() => {
    push(ROUTES.PROJECTS)
  }, [push])

  return <>Dashboard</>
}

export default DashboardPage
