import { Breadcrumb } from 'components/common/Header/Breadcrumb'

const DashboardPage = () => {
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
