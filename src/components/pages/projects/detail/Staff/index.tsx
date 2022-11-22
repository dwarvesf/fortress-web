import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Pagination, Row, Space, Tabs } from 'antd'
import { Button } from 'components/common/Button'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { client, GET_PATHS } from 'libs/apis'
import { useMemo, useState } from 'react'
import { ProjectStaffListFilter } from 'types/filters/ProjectStaffListFilter'
import { ViewProjectData } from 'types/schema'
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

  const [currentTabKey, setCurrentTabKey] = useState('')

  const { data: allData, loading: isAllLoading } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList(project.id || ''), allFilter],
    () => client.getProjectStaffList(project.id || '', allFilter),
  )
  // eslint-disable-next-line
  const allMembers = allData?.data || []

  const { data: pendingData, loading: isPendingLoading } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList(project.id || ''), pendingFilter],
    () => client.getProjectStaffList(project.id || '', pendingFilter),
  )
  // eslint-disable-next-line
  const pendingMembers = pendingData?.data || []

  const { data: onboardingData, loading: isOnboardingLoading } =
    useFetchWithCache(
      [GET_PATHS.getProjectStaffList(project.id || ''), onboardingFilter],
      () => client.getProjectStaffList(project.id || '', onboardingFilter),
    )
  // eslint-disable-next-line
  const onboardingMembers = onboardingData?.data || []

  const { data: activeData, loading: isActiveLoading } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList(project.id || ''), activeFilter],
    () => client.getProjectStaffList(project.id || '', activeFilter),
  )
  // eslint-disable-next-line
  const activeMembers = activeData?.data || []

  const { data: inactiveData, loading: isInactiveLoading } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList(project.id || ''), inactiveFilter],
    () => client.getProjectStaffList(project.id || '', inactiveFilter),
  )
  // eslint-disable-next-line
  const inactiveMembers = inactiveData?.data || []

  const onTabChange = (tabKey: string) => {
    setCurrentTabKey(tabKey)
    setAllFilter({ page: 1 })
    setPendingFilter({ page: 1 })
    setOnboardingFilter({ page: 1 })
    setActiveFilter({ page: 1 })
    setInactiveFilter({ page: 1 })
  }

  const paginationRender = useMemo(() => {
    let filter: any
    let data: any
    let setFilter: any

    switch (currentTabKey) {
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
    currentTabKey,
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
    <Space direction="vertical" size={24} style={{ width: '100%' }}>
      <Card bodyStyle={{ padding: 0 }}>
        <Tabs
          defaultActiveKey="active"
          tabBarStyle={{ padding: '20px 20px 0' }}
          onTabClick={onTabChange}
          tabBarExtraContent={
            <Button type="primary" icon={<PlusCircleOutlined />}>
              Add New
            </Button>
          }
          items={[
            {
              key: '',
              label: `All (${allMembers.length})`,
              children: (
                <StaffTable data={allMembers} isLoading={isAllLoading} />
              ),
            },
            {
              key: 'pending',
              label: `Pending (${pendingMembers.length})`,
              children: (
                <StaffTable
                  data={pendingMembers}
                  isLoading={isPendingLoading}
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
                />
              ),
            },
            {
              key: 'active',
              label: `Active (${activeMembers.length})`,
              children: (
                <StaffTable data={activeMembers} isLoading={isActiveLoading} />
              ),
            },
            {
              key: 'inactive',
              label: `Inactive (${inactiveMembers.length})`,
              children: (
                <StaffTable
                  data={inactiveMembers}
                  isLoading={isInactiveLoading}
                />
              ),
            },
          ]}
        />
      </Card>
      {paginationRender}
    </Space>
  )
}
