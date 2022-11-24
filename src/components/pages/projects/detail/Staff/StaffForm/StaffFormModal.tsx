import { Modal, notification } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
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

  const { data: allData } = useFetchWithCache(
    [GET_PATHS.getProjectStaffList, projectId],
    () =>
      client.getProjectStaffList(projectId as string, {
        page: 1,
        size: 999,
      }),
  )
  // eslint-disable-next-line
  const allMembers = allData?.data || []

  const excludedEmployeeIds = useMemo(() => {
    return allMembers.map((member) => member.employeeID || '')
  }, [allMembers])

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
        excludedEmployeeIds={excludedEmployeeIds}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
