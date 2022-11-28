import { PlusCircleOutlined } from '@ant-design/icons'
import { Card, Space, Tabs } from 'antd'
import { Button } from 'components/common/Button'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { useTabWithQuery } from 'hooks/useTabWithQuery'
import { GET_PATHS } from 'libs/apis'
import { ProjectWorkUnitListFilter } from 'types/filters/ProjectWorkUnitListFilter'
import { ViewProjectData } from 'types/schema'
import { WorkUnitTable } from './WorkUnitTable'

const mockData = {
  active: [
    {
      id: 1,
      name: 'Fortress Web',
      type: 'repository',
      members: [
        {
          projectMemberID: '7310b51a-3855-498b-99ab-41aa82934269',
          projectSlotID: 'bdc64b18-4c5f-4025-827a-f5b91d599dc7',
          employeeID: 'ecea9d15-05ba-4a4e-9787-54210e3b98ce',
          fullName: 'Nguyễn Hoàng Huy',
          displayName: 'Huy Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/2830497479497502617.png',
          status: 'active',
          isLead: false,
          deploymentType: 'shadow',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: '35149aab-0506-4eb3-9300-c706ccbf2bde',
          projectSlotID: '1406fcce-6f90-4e0f-bea1-c373e2b2b5b1',
          employeeID: '8d7c99c0-3253-4286-93a9-e7554cb327ef',
          fullName: 'Nguyễn Hải Nam',
          displayName: 'Nam Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/8399103964540935617.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: '5a9a07aa-e8f3-4b62-b9ad-0f057866dc6c',
          projectSlotID: 'b25bd3fa-eb6d-49d5-b278-7aacf4594f79',
          employeeID: 'eeae589a-94e3-49ac-a94c-fcfb084152b2',
          fullName: 'Nguyễn Ngô Lập',
          displayName: 'Lap Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/2870969541970972723.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: 'fcd5c16f-40fd-48b6-9649-410691373eea',
          projectSlotID: 'ce379dc0-95be-471a-9227-8e045a5630af',
          employeeID: '608ea227-45a5-4c8a-af43-6c7280d96340',
          fullName: 'Tiêu Quang Huy',
          displayName: 'Huy Tieu',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/3c420751-bb9a-4878-896e-2f10f3a633d6_avatar2535921977139052349.png',
          status: 'active',
          isLead: false,
          deploymentType: 'shadow',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: 'a225b5f9-f90c-41bc-bb34-266449217ced',
          projectSlotID: '1d16ffef-4224-43bb-a56b-ca62565f8a53',
          employeeID: 'd389d35e-c548-42cf-9f29-2a599969a8f2',
          fullName: 'Nguyễn Trần Minh Thảo',
          displayName: 'Thao Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/5348640939694049226.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: '7c530681-b0a9-4856-a8e6-cfe8ea729b73',
          projectSlotID: '5c803594-5d8e-477a-8012-72c6245cf03c',
          employeeID: '37e00d47-de69-4ac8-991b-cf3e39565c00',
          fullName: 'Phùng Thị Thương Thương',
          displayName: 'Thuong Phung',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/7186955696154477566.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: '825e4fd3-45f6-4c5d-8446-9340eaeca7d1',
          projectSlotID: 'bc0114bf-24e0-4ff0-b530-1471816c72a3',
          employeeID: '347745af-3523-43e2-bb08-1ad5a433cc9e',
          fullName: 'Nguyễn Đình Nam',
          displayName: 'Nam Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/7985134680611865693.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
      ],
      stacks: [
        {
          id: '0ecf47c8-cca4-4c30-94bb-054b1124c44f',
          name: 'Golang',
          code: 'golang',
        },
        {
          id: 'fa0f4e46-7eab-4e5c-9d31-30489e69fe2e',
          name: 'React',
          code: 'react',
        },
        {
          id: 'b403ef95-4269-4830-bbb6-8e56e5ec0af4',
          name: 'Google Cloud',
          code: 'gcloud',
        },
      ],
      url: 'https://google.com.vn',
    },
  ],
  archived: [
    {
      id: 1,
      name: 'Fortress API',
      type: 'repository',
      members: [
        {
          projectMemberID: '7310b51a-3855-498b-99ab-41aa82934269',
          projectSlotID: 'bdc64b18-4c5f-4025-827a-f5b91d599dc7',
          employeeID: 'ecea9d15-05ba-4a4e-9787-54210e3b98ce',
          fullName: 'Nguyễn Hoàng Huy',
          displayName: 'Huy Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/2830497479497502617.png',
          status: 'active',
          isLead: false,
          deploymentType: 'shadow',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: '35149aab-0506-4eb3-9300-c706ccbf2bde',
          projectSlotID: '1406fcce-6f90-4e0f-bea1-c373e2b2b5b1',
          employeeID: '8d7c99c0-3253-4286-93a9-e7554cb327ef',
          fullName: 'Nguyễn Hải Nam',
          displayName: 'Nam Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/8399103964540935617.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: '5a9a07aa-e8f3-4b62-b9ad-0f057866dc6c',
          projectSlotID: 'b25bd3fa-eb6d-49d5-b278-7aacf4594f79',
          employeeID: 'eeae589a-94e3-49ac-a94c-fcfb084152b2',
          fullName: 'Nguyễn Ngô Lập',
          displayName: 'Lap Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/2870969541970972723.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: 'fcd5c16f-40fd-48b6-9649-410691373eea',
          projectSlotID: 'ce379dc0-95be-471a-9227-8e045a5630af',
          employeeID: '608ea227-45a5-4c8a-af43-6c7280d96340',
          fullName: 'Tiêu Quang Huy',
          displayName: 'Huy Tieu',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/3c420751-bb9a-4878-896e-2f10f3a633d6_avatar2535921977139052349.png',
          status: 'active',
          isLead: false,
          deploymentType: 'shadow',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: 'a225b5f9-f90c-41bc-bb34-266449217ced',
          projectSlotID: '1d16ffef-4224-43bb-a56b-ca62565f8a53',
          employeeID: 'd389d35e-c548-42cf-9f29-2a599969a8f2',
          fullName: 'Nguyễn Trần Minh Thảo',
          displayName: 'Thao Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/5348640939694049226.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: '7c530681-b0a9-4856-a8e6-cfe8ea729b73',
          projectSlotID: '5c803594-5d8e-477a-8012-72c6245cf03c',
          employeeID: '37e00d47-de69-4ac8-991b-cf3e39565c00',
          fullName: 'Phùng Thị Thương Thương',
          displayName: 'Thuong Phung',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/7186955696154477566.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
        {
          projectMemberID: '825e4fd3-45f6-4c5d-8446-9340eaeca7d1',
          projectSlotID: 'bc0114bf-24e0-4ff0-b530-1471816c72a3',
          employeeID: '347745af-3523-43e2-bb08-1ad5a433cc9e',
          fullName: 'Nguyễn Đình Nam',
          displayName: 'Nam Nguyen',
          avatar:
            'https://s3-ap-southeast-1.amazonaws.com/fortress-images/7985134680611865693.png',
          status: 'active',
          isLead: false,
          deploymentType: 'official',
          joinedDate: null,
          leftDate: null,
          rate: '0',
          discount: '0',
          seniority: null,
          positions: [],
        },
      ],
      stacks: [
        {
          id: '0ecf47c8-cca4-4c30-94bb-054b1124c44f',
          name: 'Golang',
          code: 'golang',
        },
        {
          id: 'fa0f4e46-7eab-4e5c-9d31-30489e69fe2e',
          name: 'React',
          code: 'react',
        },
        {
          id: 'b403ef95-4269-4830-bbb6-8e56e5ec0af4',
          name: 'Google Cloud',
          code: 'gcloud',
        },
      ],
      url: 'https://google.com.vn',
    },
  ],
}

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
    // () => client.getProjectMemberList(project.id || '', activeFilter),
    () => ({ data: mockData.active }),
  )
  // eslint-disable-next-line
  const activeWorkUnits = activeData?.data || []

  const {
    data: archivedData,
    loading: isArchivedLoading,
    mutate: mutateArchived,
  } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList(project.id || ''), archivedFilter],
    // () => client.getProjectMemberList(project.id || '', archivedFilter),
    () => ({ data: mockData.archived }),
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
