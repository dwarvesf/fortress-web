import { Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { PageSpinner } from 'components/common/PageSpinner'
import { General } from 'components/pages/employees/detail/General'
import { ROUTES } from 'constants/routes'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'

const Default = () => {
  const {
    query: { id },
  } = useRouter()

  const { tabKey = 'general', setTabKey } = useTabWithQuery()

  const { data, loading } = useFetchWithCache(
    [GET_PATHS.getEmployees, id],
    () => client.getEmployee(id as string),
  )
  const employee = data?.data

  if (loading || !employee) {
    return <PageSpinner />
  }

  return (
    <>
      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
          {
            label: 'Employees',
            href: ROUTES.EMPLOYEES,
          },
          {
            label: employee.displayName || '-',
          },
        ]}
      />

      <PageHeader title={employee?.displayName || ''} />
      <Tabs
        defaultActiveKey={tabKey}
        onTabClick={setTabKey}
        items={[
          {
            key: 'general',
            label: 'General',
            children: <General data={employee} />,
          },
          // {
          //   key: 'document',
          //   label: 'Document',
          //   children: 'Document',
          // },
        ]}
      />
    </>
  )
}

export default Default
