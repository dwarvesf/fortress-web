import { useDisclosure } from '@dwarvesf/react-hooks'
import { Card, Pagination, Row, Space, Tabs } from 'antd'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Button } from 'components/common/Button'
import { mutate } from 'swr'
import { DeploymentType } from 'constants/deploymentTypes'
import { Permission } from 'constants/permission'
import { ProjectMemberStatus } from 'constants/status'
import moment from 'moment'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { client, GET_PATHS } from 'libs/apis'
import { useMemo } from 'react'
import { ProjectMemberListFilter } from 'types/filters/ProjectMemberListFilter'
import { ViewProjectData } from 'types/schema'
import { DEFAULT_CURRENCY_SYMBOL } from 'constants/currency'
import { MemberFormModal } from './MemberForm/MemberFormModal'
import { MemberTable } from './MemberTable'

interface Props {
  data: ViewProjectData
}

export const Member = (props: Props) => {
  const { data: project } = props

  const { filter: allFilter, setFilter: setAllFilter } = useFilter(
    new ProjectMemberListFilter(),
  )
  const { filter: pendingFilter, setFilter: setPendingFilter } = useFilter(
    new ProjectMemberListFilter(ProjectMemberStatus.PENDING),
  )
  const { filter: onboardingFilter, setFilter: setOnboardingFilter } =
    useFilter(new ProjectMemberListFilter(ProjectMemberStatus.ONBOARDING))
  const { filter: activeFilter, setFilter: setActiveFilter } = useFilter(
    new ProjectMemberListFilter(ProjectMemberStatus.ACTIVE),
  )
  const { filter: inactiveFilter, setFilter: setInactiveFilter } = useFilter(
    new ProjectMemberListFilter(ProjectMemberStatus.INACTIVE),
  )

  const { tabKey, setTabKey } = useTabWithQuery({
    queryKey: 'memberTab',
    defaultValue: ProjectMemberStatus.ACTIVE,
  })

  const {
    data: allData,
    loading: isAllLoading,
    mutate: mutateAll,
  } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList(project.id!), allFilter],
    () => client.getProjectMemberList(project.id || '', allFilter),
  )
  // eslint-disable-next-line
  const allMembers = allData?.data || []

  const {
    data: pendingData,
    loading: isPendingLoading,
    mutate: mutatePending,
  } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList(project.id!), pendingFilter],
    () => client.getProjectMemberList(project.id || '', pendingFilter),
  )
  // eslint-disable-next-line
  const pendingMembers = pendingData?.data || []

  const {
    data: onboardingData,
    loading: isOnboardingLoading,
    mutate: mutateOnboarding,
  } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList(project.id!), onboardingFilter],
    () => client.getProjectMemberList(project.id || '', onboardingFilter),
  )
  // eslint-disable-next-line
  const onboardingMembers = onboardingData?.data || []

  const {
    data: activeData,
    loading: isActiveLoading,
    mutate: mutateActive,
  } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList(project.id!), activeFilter],
    () => client.getProjectMemberList(project.id || '', activeFilter),
  )
  // eslint-disable-next-line
  const activeMembers = activeData?.data || []

  const {
    data: inactiveData,
    loading: isInactiveLoading,
    mutate: mutateInactive,
  } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList(project.id!), inactiveFilter],
    () => client.getProjectMemberList(project.id || '', inactiveFilter),
  )
  // eslint-disable-next-line
  const inactiveMembers = inactiveData?.data || []

  const {
    isOpen: isAddNewMemberDialogOpen,
    onOpen: openAddNewMemberDialog,
    onClose: closeAddNewMemberDialog,
  } = useDisclosure()

  const onTabChange = (tabKey: string) => {
    setTabKey(tabKey)
    setAllFilter({ page: 1 })
    setPendingFilter({ page: 1 })
    setOnboardingFilter({ page: 1 })
    setActiveFilter({ page: 1 })
    setInactiveFilter({ page: 1 })
  }

  const reload = () => {
    mutateAll()
    mutatePending()
    mutateOnboarding()
    mutateActive()
    mutateInactive()
    mutate([GET_PATHS.getProjects, project.code])
  }

  const paginationRender = useMemo(() => {
    let filter: any
    let data: any
    let setFilter: any

    switch (tabKey) {
      case ProjectMemberStatus.PENDING: {
        filter = pendingFilter
        data = pendingData
        setFilter = setPendingFilter

        break
      }
      case ProjectMemberStatus.ONBOARDING: {
        filter = onboardingFilter
        data = onboardingData
        setFilter = setOnboardingFilter

        break
      }
      case ProjectMemberStatus.ACTIVE: {
        filter = activeFilter
        data = activeData
        setFilter = setActiveFilter

        break
      }
      case ProjectMemberStatus.INACTIVE: {
        filter = inactiveFilter
        data = inactiveData
        setFilter = setInactiveFilter

        break
      }
      default: {
        filter = allFilter
        data = allData
        setFilter = setAllFilter

        break
      }
    }

    return (
      <Row justify="end">
        <Pagination
          current={filter.page}
          onChange={(page, pageSize) => setFilter({ page, pageSize })}
          total={data?.total}
          pageSize={filter.size}
          size="small"
          showSizeChanger
        />
      </Row>
    )
  }, [
    tabKey,
    allData,
    pendingData,
    onboardingData,
    activeData,
    inactiveData,
    allFilter,
    pendingFilter,
    onboardingFilter,
    activeFilter,
    inactiveFilter,
    setAllFilter,
    setPendingFilter,
    setOnboardingFilter,
    setActiveFilter,
    setInactiveFilter,
  ])

  return (
    <>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Card bodyStyle={{ padding: 0 }}>
          <Tabs
            defaultActiveKey={tabKey}
            tabBarStyle={{ padding: '20px 20px 0' }}
            onTabClick={onTabChange}
            tabBarExtraContent={
              <AuthenticatedContent
                permission={Permission.PROJECTMEMBERS_CREATE}
              >
                <Button type="primary" onClick={openAddNewMemberDialog}>
                  Add New
                </Button>
              </AuthenticatedContent>
            }
            items={[
              {
                key: ProjectMemberStatus.ACTIVE,
                label: `Active (${activeData?.total || 0})`,
                children: (
                  <MemberTable
                    projectID={project.id || ''}
                    data={activeMembers}
                    isLoading={isActiveLoading}
                    onAfterAction={reload}
                  />
                ),
              },
              {
                key: ProjectMemberStatus.PENDING,
                label: `Pending (${pendingData?.total || 0})`,
                children: (
                  <MemberTable
                    projectID={project.id || ''}
                    data={pendingMembers}
                    isLoading={isPendingLoading}
                    onAfterAction={reload}
                  />
                ),
              },
              {
                key: ProjectMemberStatus.ONBOARDING,
                label: `On-boarding (${onboardingData?.total || 0})`,
                children: (
                  <MemberTable
                    projectID={project.id || ''}
                    data={onboardingMembers}
                    isLoading={isOnboardingLoading}
                    onAfterAction={reload}
                  />
                ),
              },
              {
                key: ProjectMemberStatus.INACTIVE,
                label: `Inactive (${inactiveData?.total || 0})`,
                children: (
                  <MemberTable
                    projectID={project.id || ''}
                    data={inactiveMembers}
                    isLoading={isInactiveLoading}
                    onAfterAction={reload}
                  />
                ),
              },
              {
                key: '',
                label: `All (${allData?.total || 0})`,
                children: (
                  <MemberTable
                    projectID={project.id || ''}
                    data={allMembers}
                    isLoading={isAllLoading}
                    onAfterAction={reload}
                  />
                ),
              },
            ]}
          />
        </Card>
        {paginationRender}
      </Space>
      {isAddNewMemberDialogOpen && (
        <MemberFormModal
          key={tabKey}
          projectID={project.id || ''}
          isOpen={isAddNewMemberDialogOpen}
          onClose={closeAddNewMemberDialog}
          onAfterSubmit={reload}
          initialValues={{
            employeeID: undefined,
            positions: [],
            seniorityID: undefined,
            deploymentType: DeploymentType.OFFICIAL,
            startDate: moment(),
            endDate: undefined,
            rate: 0,
            discount: 0,
            status: tabKey || ProjectMemberStatus.PENDING,
            isLead: false,
          }}
          meta={{
            currency: DEFAULT_CURRENCY_SYMBOL,
          }}
        />
      )}
    </>
  )
}
