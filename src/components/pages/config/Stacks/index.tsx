import { useDisclosure } from '@dwarvesf/react-hooks'
import { Avatar, Space } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { Button } from 'components/common/Button'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
import { Permission } from 'constants/permission'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useMemo } from 'react'
import { ViewStack } from 'types/schema'
import { StackFormModal } from './StackForm/StackFormModal'
import { Actions } from './StackTable/Actions'

export const Stacks = () => {
  const {
    isOpen: isAddNewStackDialogOpen,
    onOpen: openAddNewStackDialog,
    onClose: closeAddNewStackDialog,
  } = useDisclosure()

  const {
    data: stacksData,
    loading,
    mutate,
  } = useFetchWithCache([GET_PATHS.getStackMetadata], () => {
    return client.getStackMetadata()
  })
  const stacks = stacksData?.data || []

  const columns = useMemo(() => {
    return [
      {
        title: 'Avatar',
        key: 'avatar',
        dataIndex: 'avatar',
        render: (value, record) =>
          value ? (
            <Avatar src={value} size={24} />
          ) : (
            <Avatar size={24} icon={record.name?.slice(0, 1)} />
          ),
      },
      {
        title: 'Name',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: 'Code',
        key: 'code',
        dataIndex: 'code',
      },
      {
        title: '',
        key: 'actions',
        render: (value) => <Actions record={value} onAfterAction={mutate} />,
      },
    ] as ColumnsType<ViewStack>
  }, [mutate])

  return (
    <>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Button
          type="primary"
          onClick={openAddNewStackDialog}
          style={{ marginLeft: 'auto', display: 'block' }}
        >
          Add New
        </Button>
        <div>
          <TotalResultCount
            count={stacks.length}
            permission={Permission.PROJECTS_READ_FULLACCESS}
          />
          <Table
            loading={loading}
            dataSource={stacks}
            columns={columns}
            rowKey={(row) => row.id as string}
            pagination={false}
            scroll={{ x: 'max-content' }}
          />
        </div>
      </Space>
      {isAddNewStackDialogOpen && (
        <StackFormModal
          isOpen={isAddNewStackDialogOpen}
          onCancel={closeAddNewStackDialog}
          onAfterSubmit={mutate}
        />
      )}
    </>
  )
}
