import { Button, Modal, notification, Row } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { ProjectMemberStatus } from 'constants/status'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { client, GET_PATHS } from 'libs/apis'
import { useMemo, useState } from 'react'
import { fullListPagination } from 'types/filters/Pagination'
import {
  RequestAssignMemberInput,
  RequestUpdateMemberInput,
} from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { EmployeeFormMeta } from 'types/form/misc'
import { MemberForm, MemberFormValues } from '.'

interface Props {
  isOpen: boolean
  isEditing?: boolean
  initialValues?: MemberFormValues
  projectID: string
  projectSlotID?: string
  projectMemberID?: string
  meta?: EmployeeFormMeta
  onClose: () => void
  onAfterSubmit: () => void
}

export const MemberFormModal = (props: Props) => {
  const {
    isOpen,
    isEditing = false,
    initialValues,
    projectID,
    projectSlotID = '',
    projectMemberID = '',
    meta,
    onClose,
    onAfterSubmit,
  } = props

  const [form] = useForm()
  const [isLoading, setIsLoading] = useState(false)

  const { data: allData } = useFetchWithCache(
    [GET_PATHS.getProjectMemberList, projectID],
    () =>
      client.getProjectMemberList(projectID, {
        ...fullListPagination,
      }),
  )
  // eslint-disable-next-line
  const allMembers = allData?.data || []

  // Keep track of the initial employee ID because we don't want to
  // hide it from the employee options (e.g. what if the user switches around and then
  // settle back for the initial option)
  const initialEmployeeID = initialValues?.employeeID || ''

  // Now get the list of employeeIds that are already active in the project
  // We don't want the users to add another record for them
  const excludedEmployeeIds = useMemo(() => {
    return allMembers
      .map(
        (member) =>
          // Only exclude active members
          (member.status !== ProjectMemberStatus.INACTIVE &&
            member.employeeID) ||
          '',
      )
      .filter((id) => id !== initialEmployeeID)
  }, [allMembers, initialEmployeeID])

  const onSubmit = async (values: MemberFormValues) => {
    try {
      setIsLoading(true)

      if (!isEditing) {
        await client.createProjectMember(projectID, {
          ...values,
          startDate: values.startDate?.format(SERVER_DATE_FORMAT) || '',
          endDate: values.endDate?.format(SERVER_DATE_FORMAT) || '',
        } as RequestAssignMemberInput)
      } else {
        await client.updateProjectMember(projectID, {
          ...values,
          projectSlotID,
          projectMemberID,
          startDate: values.startDate?.format(SERVER_DATE_FORMAT) || '',
          endDate: values.endDate?.format(SERVER_DATE_FORMAT) || '',
        } as RequestUpdateMemberInput)
      }

      notification.success({
        message: `Member ${isEditing ? 'updated' : 'created'} successfully!`,
      })

      onClose()
      onAfterSubmit()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          `Could not ${isEditing ? 'update' : 'create'} the member`,
        ),
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
        <Row justify="end">
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
        meta={meta}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}
