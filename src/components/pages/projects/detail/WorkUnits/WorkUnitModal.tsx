import { Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { client } from 'libs/apis'
import { useState } from 'react'
import { RequestCreateWorkUnitBody } from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { WorkUnitForm } from './WorkUnitForm'

interface Props {
  isOpen: boolean
  isEditing?: boolean
  projectID: string
  rowID?: string
  initialValues?: Partial<RequestCreateWorkUnitBody>
  onClose: () => void
  onAfterSubmit: () => void
}

export const WorkUnitModal = (props: Props) => {
  const {
    isOpen,
    isEditing = false,
    rowID = '',
    projectID,
    initialValues,
    onClose,
    onAfterSubmit,
  } = props

  const [form] = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: RequestCreateWorkUnitBody) => {
    try {
      setIsSubmitting(true)

      if (!isEditing) {
        await client.addProjectWorkUnit(projectID, values)
      } else {
        await client.editProjectWorkUnit(projectID, rowID, values)
      }

      notification.success({
        message: `Work unit ${isEditing ? 'updated' : 'created'} successfully!`,
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          `Could not ${isEditing ? 'update' : 'create'} work unit`,
        ),
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
        projectID={projectID}
        isEditing={isEditing}
        form={form}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
