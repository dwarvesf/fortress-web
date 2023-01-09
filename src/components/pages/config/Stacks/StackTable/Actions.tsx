import { useDisclosure } from '@dwarvesf/react-hooks'
import { Delete, Edit } from '@icon-park/react'
import { Modal, notification, Row, Tooltip } from 'antd'
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
        <Tooltip title="Edit">
          <Button
            type="text-primary"
            size="small"
            icon={<Edit size={20} />}
            onClick={openEditDialog}
          />
        </Tooltip>
        <Tooltip title="Delete">
          <Button
            type="text-primary"
            size="small"
            icon={<Delete size={20} />}
            onClick={confirmDelete}
          />
        </Tooltip>
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
