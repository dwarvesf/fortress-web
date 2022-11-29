import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Space, Tabs } from 'antd'
import { Button } from 'components/common/Button'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { client, GET_PATHS } from 'libs/apis'
import { ProjectWorkUnitListFilter } from 'types/filters/ProjectWorkUnitListFilter'
import { ViewProjectData } from 'types/schema'
import { WorkUnitTable } from './WorkUnitTable'

interface Props {
  data: ViewProjectData
}

export const WorkUnits = (props: Props) => {
  const { data: project } = props

  const { filter: activeFilter } = useFilter(
    new ProjectWorkUnitListFilter('active'),
  )
  const { filter: archivedFilter } = useFilter(
    new ProjectWorkUnitListFilter('archived'),
  )

  const { tabKey, setTabKey } = useTabWithQuery({ queryKey: 'workUnitsTab' })

  const {
    data: activeData,
    loading: isActiveLoading,
    mutate: mutateActive,
  } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList(project.id || ''), activeFilter],
    () => client.getProjectWorkUnits(project.id || '', activeFilter),
  )
  // eslint-disable-next-line
  const activeWorkUnits = activeData?.data || []

  const {
    data: archivedData,
    loading: isArchivedLoading,
    mutate: mutateArchived,
  } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList(project.id || ''), archivedFilter],
    () => client.getProjectWorkUnits(project.id || '', archivedFilter),
  )
  // eslint-disable-next-line
  const archivedWorkUnits = archivedData?.data || []

  // const {
  //   isOpen: isAddNewWorkUnitDialogOpen,
  //   onOpen: openAddNewWorkUnitDialog,
  //   onClose: closeAddNewWorkUnitDialog,
  // } = useDisclosure()

  const onTabChange = (tabKey: string) => {
    setTabKey(tabKey)
  }

  const mutate = () => {
    mutateActive()
    mutateArchived()
  }

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
                // onClick={openAddNewWorkUnitDialog}
              >
                Add New
              </Button>
            }
            items={[
              {
                key: 'active',
                label: `Active (${activeWorkUnits.length})`,
                children: (
                  <WorkUnitTable
                    data={activeWorkUnits}
                    isLoading={isActiveLoading}
                    onAfterAction={mutate}
                  />
                ),
              },
              {
                key: 'archived',
                label: `Archived (${archivedWorkUnits.length})`,
                children: (
                  <WorkUnitTable
                    data={archivedWorkUnits}
                    isLoading={isArchivedLoading}
                    onAfterAction={mutate}
                  />
                ),
              },
            ]}
          />
        </Card>
      </Space>
      {/* {isAddNewWorkUnitDialogOpen && (
        <MemberFormModal
          key={tabKey}
          isOpen={isAddNewWorkUnitDialogOpen}
          onClose={closeAddNewWorkUnitDialog}
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
      )} */}
    </>
  )
}
