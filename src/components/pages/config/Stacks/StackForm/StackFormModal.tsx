import { Form, Modal, notification } from 'antd'
import { client } from 'libs/apis'
import { useState } from 'react'
import { RequestCreateStackInput } from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { StackForm } from './StackForm'

interface Props {
  stackID?: string
  initialValues?: RequestCreateStackInput
  isEditing?: boolean
  isOpen: boolean
  onCancel: () => void
  onAfterSubmit: () => void
}

export const StackFormModal = (props: Props) => {
  const {
    stackID,
    initialValues,
    isEditing = false,
    isOpen = false,
    onCancel,
    onAfterSubmit,
  } = props

  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (values: RequestCreateStackInput) => {
    try {
      setIsLoading(true)

      if (isEditing) {
        await client.updateStackMetadata(stackID, values)
      } else {
        await client.createStackMetadata(values)
      }

      notification.success({
        message: `Stack ${isEditing ? 'updated' : 'created'} successfully!`,
      })

      onCancel()
      onAfterSubmit()
    } catch (error) {
      notification.error({
        message: getErrorMessage(
          error,
          `Could not ${isEditing ? 'update' : 'create'} the stack`,
        ),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      destroyOnClose
      onCancel={onCancel}
      title={`${isEditing ? 'Edit' : 'Create New'} Stack`}
      okButtonProps={{ onClick: () => form.submit(), loading: isLoading }}
    >
      <StackForm
        form={form}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
