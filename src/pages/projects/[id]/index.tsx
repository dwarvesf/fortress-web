import { Spin, Tabs } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { General } from 'components/pages/projects/detail/General'
import { Staff } from 'components/pages/projects/detail/Staff'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'

const Default = () => {
  const {
    query: { id },
  } = useRouter()
  const { data, loading } = useFetchWithCache([GET_PATHS.getProjects, id], () =>
    client.getProject(id as string),
  )
  const project = data?.data

  if (loading || !project) {
    return <Spin size="large" />
  }

  return (
    <>
      <PageHeader title={project.name || ''} />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="General" key="1">
          <General data={project} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Staff" key="2">
          <Staff />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Performance" key="3">
          Performance
        </Tabs.TabPane>
        <Tabs.TabPane tab="Stakeholders" key="4">
          Stakeholders
        </Tabs.TabPane>
        <Tabs.TabPane tab="Document" key="5">
          Document
        </Tabs.TabPane>
      </Tabs>
    </>
  )
}

export default Default
