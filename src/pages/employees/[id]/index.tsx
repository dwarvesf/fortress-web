import { Spin, Tabs } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { General } from 'components/pages/employees/detail/General'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'

const Default = () => {
  const {
    query: { id },
  } = useRouter()

  const { data, loading } = useFetchWithCache(
    [GET_PATHS.getEmployees, id],
    () => client.getEmployee(id as string),
  )
  const employee = data?.data

  if (loading || !employee) {
    return <Spin size="large" />
  }

  return (
    <>
      <PageHeader title={employee?.displayName || ''} />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <General data={employee} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Document" key="2">
          Document
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default Default
