import { Button, Modal, notification, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ProjectMemberStatus } from 'constants/status'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { MemberForm, MemberFormValues } from '.'

interface Props {
  isOpen: boolean
  isEditing?: boolean
  initialValues?: MemberFormValues
  projectSlotID?: string
  projectMemberID?: string
  onClose: () => void
  onAfterSubmit: () => void
}

export const MemberFormModal = (props: Props) => {
  const {
    query: { id: projectId },
  } = useRouter()

  const {
    isOpen,
    isEditing = false,
    initialValues,
    projectSlotID = '',
    projectMemberID = '',
    onClose,
    onAfterSubmit,
  } = props

  const [form] = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const { data: allData } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList, projectId],
    () =>
      client.getProjectMemberList(projectId as string, {
        page: 1,
        size: 999,
      }),
  )
  // eslint-disable-next-line
  const allMembers = allData?.data || []

  // Keep track of the initial employee ID because we don't want to
  // hide it from the employee options (e.g. what if the user switches around and then
  // settle back for the initial option)
  const initialEmployeeID = initialValues?.employeeID || ''
  const excludedEmployeeIds = useMemo(() => {
    return allMembers
      .map((member) => member.employeeID || '')
      .filter((id) => id !== initialEmployeeID)
  }, [allMembers, initialEmployeeID])

  const onSubmit = async (values: MemberFormValues) => {
    try {
      setIsLoading(true)

      const formValues: MemberFormValues = {
        ...values,
        leftDate:
          values.status !== ProjectMemberStatus.INACTIVE ? '' : values.leftDate,
      }

      if (!isEditing) {
        await client.createProjectMember(projectId as string, formValues)
      } else {
        await client.updateProjectMember(projectId as string, {
          ...formValues,
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
      setIsLoading(false)
    }
  }

  const onUnassign = async () => {
    try {
      setIsLoading(true)

      await client.unassignProjectMember(projectId as string, projectMemberID)

      notification.success({
        message: `Member unassigned successfully!`,
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: error?.message || `Could not unassign the member!`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onCancel = () => {
    onClose()
    form.resetFields()
  }

  return (
    <Modal
      open={isOpen}
      destroyOnClose
      onCancel={onCancel}
      title={`${isEditing ? 'Edit' : 'Create New'} Member`}
      footer={
        <Row justify="space-between">
          <span>
            {isEditing &&
              initialValues?.status !== ProjectMemberStatus.PENDING && (
                <Button onClick={onUnassign} loading={isLoading}>
                  Unassign
                </Button>
              )}
          </span>
          <Row>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={form.submit} loading={isLoading} type="primary">
              OK
            </Button>
          </Row>
        </Row>
      }
    >
      <MemberForm
        form={form}
        initialValues={initialValues}
        excludedEmployeeIds={excludedEmployeeIds}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
