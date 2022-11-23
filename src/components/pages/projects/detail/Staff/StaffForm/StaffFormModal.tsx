import { Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { StaffForm, StaffFormValues } from './StaffForm'

interface Props {
  isOpen: boolean
  isEditing?: boolean
  initialValues?: StaffFormValues
  projectSlotID?: string
  onClose: () => void
  onAfterSubmit: () => void
}

export const StaffFormModal = (props: Props) => {
  const {
    query: { id: projectId },
  } = useRouter()

  const {
    isOpen,
    isEditing = false,
    initialValues,
    projectSlotID = '',
    onClose,
    onAfterSubmit,
  } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: StaffFormValues) => {
    try {
      setIsSubmitting(true)

      if (!isEditing) {
        await client.createProjectMember(projectId as string, values)
      } else {
        await client.updateProjectMember(projectId as string, {
          ...values,
          projectSlotID,
        })
      }

      notification.success({
        message: `Member ${isEditing ? 'updated' : 'created'} successfully!`,
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message:
          error?.message ||
          `Could not ${isEditing ? 'update' : 'create'} the member!`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        onClose()
        form.resetFields()
      }}
      onOk={form.submit}
      okButtonProps={{ loading: isSubmitting }}
      destroyOnClose
      title={`${isEditing ? 'Edit' : 'Create New'} Member`}
    >
      <StaffForm
        form={form}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
