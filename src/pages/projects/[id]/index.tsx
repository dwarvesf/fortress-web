import { Spin, Tabs } from 'antd'
import { PageHeader } from 'components/common/PageHeader'
import { General } from 'components/pages/projects/detail/General'
import { Staff } from 'components/pages/projects/detail/Staff'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'

const Default = () => {
  const {
    query: { id },
  } = useRouter()

  const { tabKey = '1', setTabKey } = useTabWithQuery()

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
      <Tabs
        defaultActiveKey={tabKey}
        onTabClick={setTabKey}
        items={[
          {
            key: '1',
            label: 'General',
            children: <General data={project} />,
          },
          {
            key: '2',
            label: 'Staff',
            children: <Staff data={project} />,
          },
          {
            key: '3',
            label: 'Performance',
            children: 'Performance',
          },
          {
            key: '4',
            label: 'Stakeholders',
            children: 'Stakeholders',
          },
          {
            key: '5',
            label: 'Document',
            children: 'Document',
          },
        ]}
      />
    </>
  )
}

export default Default
