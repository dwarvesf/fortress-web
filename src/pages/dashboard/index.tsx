import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const DashboardPage = () => {
  const { push } = useRouter()

  useEffect(() => {
    push(ROUTES.PROJECTS)
  }, []) // eslint-disable-line

  return (
    <>
      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
          },
        ]}
      />

      <div>Dashboard</div>
    </>
  )
}

export default DashboardPage
