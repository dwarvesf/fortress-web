import { Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { client } from 'libs/apis'
// import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { PkgHandlerProjectCreateWorkUnitBody } from 'types/schema'
import { WorkUnitForm } from './WorkUnitForm'

interface Props {
  isOpen: boolean
  isEditing?: boolean
  rowID?: string
  initialValues?: PkgHandlerProjectCreateWorkUnitBody
  onClose: () => void
  onAfterSubmit: () => void
}

export const WorkUnitModal = (props: Props) => {
  const {
    query: { id: projectId },
  } = useRouter()

  const {
    isOpen,
    isEditing = false,
    rowID,
    initialValues,
    onClose,
    onAfterSubmit,
  } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: PkgHandlerProjectCreateWorkUnitBody) => {
    try {
      setIsSubmitting(true)

      if (!isEditing) {
        await client.addProjectWorkUnit(projectId as string, values)
      } else {
        await client.editProjectWorkUnit(
          projectId as string,
          rowID as string,
          values,
        )
      }

      notification.success({
        message: `Work unit ${isEditing ? 'updated' : 'created'} successfully!`,
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message:
          error?.message ||
          `Could not ${isEditing ? 'update' : 'create'} work unit!`,
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
      title={`${isEditing ? 'Edit' : 'Create new'} Work unit`}
    >
      <WorkUnitForm
        isEditing={isEditing}
        form={form}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
