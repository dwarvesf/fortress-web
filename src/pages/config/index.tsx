import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { ROUTES } from 'constants/routes'

const Default = () => {
  return (
    <>
      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
          {
            label: 'Config',
          },
        ]}
      />

      <div>Config</div>
    </>
  )
}

export default Default
