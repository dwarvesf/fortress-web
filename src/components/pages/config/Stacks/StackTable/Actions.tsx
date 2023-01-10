import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { client } from 'libs/apis'
import { useState } from 'react'
import { ViewStack } from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { StackFormModal } from '../StackForm/StackFormModal'

export const Actions = ({
  record,
  onAfterAction,
}: {
  record: ViewStack
  onAfterAction: () => void
}) => {
  const {
    isOpen: isEditDialogOpen,
    onOpen: openEditDialog,
    onClose: closeEditDialog,
  } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await client.deleteStackMetadata(record.id || '')

      notification.success({
        message: 'Stack deleted successfully!',
      })

      onAfterAction()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not delete this stack'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDelete = () => {
    Modal.confirm({
      content: 'Are you sure you want to delete this stack?',
      okButtonProps: { loading: isLoading },
      onOk: onDelete,
    })
  }

  return (
    <>
      <Row justify="end" gutter={[8, 8]}>
        <Col>
          <Tooltip title="Edit">
            <Button
              type="text-primary"
              size="small"
              icon={<Icon icon="icon-park-outline:edit" width={20} />}
              onClick={openEditDialog}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Delete">
            <Button
              type="text-primary"
              size="small"
              icon={<Icon icon="icon-park-outline:delete" width={20} />}
              onClick={confirmDelete}
            />
          </Tooltip>
        </Col>
      </Row>
      {isEditDialogOpen && (
        <StackFormModal
          stackID={record.id}
          isEditing
          isOpen={isEditDialogOpen}
          onCancel={closeEditDialog}
          initialValues={{
            avatar: record.avatar || '',
            name: record.name || '',
            code: record.code || '',
          }}
          onAfterSubmit={onAfterAction}
        />
      )}
    </>
  )
}
