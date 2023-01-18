import { useDisclosure } from '@dwarvesf/react-hooks'
import { Avatar, Col, Input, Pagination, Row, Space } from 'antd'
import Table, { ColumnsType } from 'antd/lib/table'
import { Button } from 'components/common/Button'
import { TotalResultCount } from 'components/common/Table/TotalResultCount'
import { Permission } from 'constants/permission'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useFilter } from 'hooks/useFilter'
import { client, GET_PATHS } from 'libs/apis'
import debounce from 'lodash.debounce'
import { useMemo } from 'react'
import { StackFilter } from 'types/filters/StackFilter'
import { ViewStack } from 'types/schema'
import { StackFormModal } from './StackForm/StackFormModal'
import { Actions } from './StackTable/Actions'

export const Stacks = () => {
  const {
    isOpen: isAddNewStackDialogOpen,
    onOpen: openAddNewStackDialog,
    onClose: closeAddNewStackDialog,
  } = useDisclosure()
  const { filter, setFilter } = useFilter(new StackFilter())
  const {
    data: stacksData,
    loading,
    mutate,
  } = useFetchWithCache([GET_PATHS.getStackMetadata, filter], () => {
    return client.getStackMetadata(filter)
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
        <Row justify="end" gutter={[8, 8]}>
          <Col style={{ width: 256 }}>
            <Input
              placeholder="Search stacks"
              bordered
              onChange={debounce(
                (event) =>
                  setFilter({
                    keyword: event.target.value,
                  }),
                300,
              )}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={openAddNewStackDialog}
              style={{ marginLeft: 'auto', display: 'block' }}
            >
              Add New
            </Button>
          </Col>
        </Row>
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
        <Row justify="end">
          <Pagination
            current={filter.page}
            onChange={(page, pageSize) => setFilter({ page, size: pageSize })}
            total={stacksData?.total}
            pageSize={filter.size}
            size="small"
            showSizeChanger
          />
        </Row>
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
