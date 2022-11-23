import { PlusCircleOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Card, Pagination, Row, Space, Tabs } from 'antd'
import { Button } from 'components/common/Button'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { client, GET_PATHS } from 'libs/apis'
import { useMemo } from 'react'
import { ProjectStaffListFilter } from 'types/filters/ProjectStaffListFilter'
import { ViewProjectData } from 'types/schema'
import { StaffFormModal } from './StaffForm/StaffFormModal'
import { StaffTable } from './StaffTable'

interface Props {
  data: ViewProjectData
}

export const Staff = (props: Props) => {
  const { data: project } = props

  const { filter: allFilter, setFilter: setAllFilter } = useFilter(
    new ProjectStaffListFilter(),
  )
  const { filter: pendingFilter, setFilter: setPendingFilter } = useFilter(
    new ProjectStaffListFilter('pending'),
  )
  const { filter: onboardingFilter, setFilter: setOnboardingFilter } =
    useFilter(new ProjectStaffListFilter('on-boarding'))
  const { filter: activeFilter, setFilter: setActiveFilter } = useFilter(
    new ProjectStaffListFilter('active'),
  )
  const { filter: inactiveFilter, setFilter: setInactiveFilter } = useFilter(
    new ProjectStaffListFilter('inactive'),
  )

  const { tabKey, setTabKey } = useTabWithQuery({ queryKey: 'staffTab' })

  const {
    data: allData,
    loading: isAllLoading,
    mutate: mutateAll,
  } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList(project.id || ''), allFilter],
    () => client.getProjectStaffList(project.id || '', allFilter),
  )
  // eslint-disable-next-line
  const allMembers = allData?.data || []

  const {
    data: pendingData,
    loading: isPendingLoading,
    mutate: mutatePending,
  } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList(project.id || ''), pendingFilter],
    () => client.getProjectStaffList(project.id || '', pendingFilter),
  )
  // eslint-disable-next-line
  const pendingMembers = pendingData?.data || []

  const {
    data: onboardingData,
    loading: isOnboardingLoading,
    mutate: mutateOnboarding,
  } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList(project.id || ''), onboardingFilter],
    () => client.getProjectStaffList(project.id || '', onboardingFilter),
  )
  // eslint-disable-next-line
  const onboardingMembers = onboardingData?.data || []

  const {
    data: activeData,
    loading: isActiveLoading,
    mutate: mutateActive,
  } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList(project.id || ''), activeFilter],
    () => client.getProjectStaffList(project.id || '', activeFilter),
  )
  // eslint-disable-next-line
  const activeMembers = activeData?.data || []

  const {
    data: inactiveData,
    loading: isInactiveLoading,
    mutate: mutateInactive,
  } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList(project.id || ''), inactiveFilter],
    () => client.getProjectStaffList(project.id || '', inactiveFilter),
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

  const mutate = () => {
    mutateAll()
    mutatePending()
    mutateOnboarding()
    mutateActive()
    mutateInactive()
  }

  const paginationRender = useMemo(() => {
    let filter: any
    let data: any
    let setFilter: any

    switch (tabKey) {
      case 'pending': {
        filter = pendingFilter
        data = pendingData
        setFilter = setPendingFilter

        break
      }
      case 'on-boarding': {
        filter = onboardingFilter
        data = onboardingData
        setFilter = setOnboardingFilter

        break
      }
      case 'active': {
        filter = activeFilter
        data = activeData
        setFilter = setActiveFilter

        break
      }
      case 'inactive': {
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
          onChange={(page) => setFilter({ page })}
          total={data?.total}
          pageSize={filter.size}
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
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={openAddNewMemberDialog}
              >
                Add New
              </Button>
            }
            items={[
              {
                key: '',
                label: `All (${allMembers.length})`,
                children: (
                  <StaffTable
                    data={allMembers}
                    isLoading={isAllLoading}
                    onAfterAction={mutate}
                  />
                ),
              },
              {
                key: 'pending',
                label: `Pending (${pendingMembers.length})`,
                children: (
                  <StaffTable
                    data={pendingMembers}
                    isLoading={isPendingLoading}
                    onAfterAction={mutate}
                  />
                ),
              },
              {
                key: 'on-boarding',
                label: `On-boarding (${onboardingMembers.length})`,
                children: (
                  <StaffTable
                    data={onboardingMembers}
                    isLoading={isOnboardingLoading}
                    onAfterAction={mutate}
                  />
                ),
              },
              {
                key: 'active',
                label: `Active (${activeMembers.length})`,
                children: (
                  <StaffTable
                    data={activeMembers}
                    isLoading={isActiveLoading}
                    onAfterAction={mutate}
                  />
                ),
              },
              {
                key: 'inactive',
                label: `Inactive (${inactiveMembers.length})`,
                children: (
                  <StaffTable
                    data={inactiveMembers}
                    isLoading={isInactiveLoading}
                    onAfterAction={mutate}
                  />
                ),
              },
            ]}
          />
        </Card>
        {paginationRender}
      </Space>
      <StaffFormModal
        key={tabKey}
        isOpen={isAddNewMemberDialogOpen}
        onClose={closeAddNewMemberDialog}
        onAfterSubmit={mutate}
        initialValues={{
          employeeID: '',
          positions: [],
          seniorityID: '',
          deploymentType: 'official',
          joinedDate: format(new Date(), SERVER_DATE_FORMAT),
          leftDate: undefined,
          rate: 0,
          discount: 0,
          status: tabKey || 'pending',
          isLead: false,
        }}
      />
    </>
  )
}
