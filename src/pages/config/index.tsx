import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SEO } from 'components/common/SEO'

const Default = () => {
  return (
    <>
      <SEO title="Config" />
      <Breadcrumb
        items={[
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
