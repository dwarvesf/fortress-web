import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HomePage = () => {
  const { replace } = useRouter()

  useEffect(() => {
    replace(ROUTES.DASHBOARD)
  }, []) // eslint-disable-line

  return null
}

export default HomePage
