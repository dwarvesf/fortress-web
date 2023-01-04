import { Spin, Tabs } from 'antd'
import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { PageHeader } from 'components/common/PageHeader'
import { SEO } from 'components/common/SEO'
import { General } from 'components/pages/projects/detail/General'
import { Member } from 'components/pages/projects/detail/Member'
import { WorkUnits } from 'components/pages/projects/detail/WorkUnits'
import { Permission } from 'constants/permission'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'

const Default = () => {
  const {
    query: { id },
  } = useRouter()
  const { permissions } = useAuthContext()

  const { tabKey = 'general', setTabKey } = useTabWithQuery()

  const { data, loading } = useFetchWithCache([GET_PATHS.getProjects, id], () =>
    client.getProject(id as string),
  )
  const project = data?.data

  if (loading || !project) {
    return <Spin size="large" />
  }

  return (
    <>
      <SEO title={`Projects - ${project?.name || '-'}`} />

      <Breadcrumb
        items={[
          {
            label: 'Projects',
            href: ROUTES.PROJECTS,
          },
          {
            label: project?.name || '-',
          },
        ]}
      />

      <PageHeader title={project.name || ''} />
      <Tabs
        defaultActiveKey={tabKey}
        onTabClick={setTabKey}
        items={[
          {
            key: 'general',
            label: 'General',
            children: <General data={project} />,
          },
          {
            key: 'members',
            label: 'Members',
            children: <Member data={project} />,
            permission: Permission.PROJECTMEMBERS_READ,
          },
          // {
          //   key: 'performance',
          //   label: 'Performance',
          //   children: 'Performance',
          // },
          {
            key: 'work-units',
            label: 'Work Units',
            children: <WorkUnits data={project} />,
            permission: Permission.PROJECTWORKUNITS_READ,
          },
          // {
          //   key: 'stakeholders',
          //   label: 'Stakeholders',
          //   children: 'Stakeholders',
          // },
          // {
          //   key: 'documents',
          //   label: 'Document',
          //   children: 'Document',
          // },
        ].filter(({ permission, ...item }) =>
          permission && !permissions.includes(permission) ? null : item,
        )}
      />
    </>
  )
}

export default Default
