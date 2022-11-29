import { PlusCircleOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Card, Space, Tabs } from 'antd'
import { Button } from 'components/common/Button'
import { ProjectWorkUnitStatus } from 'constants/status'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { client, GET_PATHS } from 'libs/apis'
import { ProjectWorkUnitListFilter } from 'types/filters/ProjectWorkUnitListFilter'
import { ViewProjectData } from 'types/schema'
import { WorkUnitModal } from './WorkUnitModal'
import { WorkUnitTable } from './WorkUnitTable'

interface Props {
  data: ViewProjectData
}

export const WorkUnits = (props: Props) => {
  const { data: project } = props

  const { filter: activeFilter } = useFilter(
    new ProjectWorkUnitListFilter(ProjectWorkUnitStatus.ACTIVE),
  )
  const { filter: archivedFilter } = useFilter(
    new ProjectWorkUnitListFilter(ProjectWorkUnitStatus.ARCHIVED),
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

  const {
    isOpen: isAddNewWorkUnitDialogOpen,
    onOpen: openAddNewWorkUnitDialog,
    onClose: closeAddNewWorkUnitDialog,
  } = useDisclosure()

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
                onClick={openAddNewWorkUnitDialog}
              >
                Add New
              </Button>
            }
            items={[
              {
                key: ProjectWorkUnitStatus.ACTIVE,
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
                key: ProjectWorkUnitStatus.ARCHIVED,
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
      {isAddNewWorkUnitDialogOpen && (
        <WorkUnitModal
          key={tabKey}
          isOpen={isAddNewWorkUnitDialogOpen}
          onClose={closeAddNewWorkUnitDialog}
          onAfterSubmit={mutate}
        />
      )}
    </>
  )
}
