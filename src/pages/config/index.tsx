import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'
import { ROUTES } from 'constants/routes'

const Default = () => {
  return (
    <>
      <SEO title="Config" />
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
