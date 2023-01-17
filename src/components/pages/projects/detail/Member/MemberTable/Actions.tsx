import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Button } from 'components/common/Button'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { Permission } from 'constants/permission'
import { format } from 'date-fns'
import { client } from 'libs/apis'
import { useState } from 'react'
import { ViewProjectMember } from 'types/schema'
import { getErrorMessage } from 'utils/string'
import { MemberFormModal } from '../MemberForm/MemberFormModal'

export const Actions = ({
  projectID,
  record,
  onAfterAction,
}: {
  projectID: string
  record: ViewProjectMember
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

      if (record.employeeID) {
        await client.deleteProjectMember(
          projectID,
          record.projectMemberID || '',
        )
      } else {
        await client.deleteProjectSlot(projectID, record.projectSlotID || '')
      }

      notification.success({
        message: 'Project member deleted successfully!',
      })

      onAfterAction()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(error, 'Could not delete this project member'),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const confirmDelete = () => {
    Modal.confirm({
      content: 'Are you sure you want to delete this project member?',
      okButtonProps: { loading: isLoading },
      onOk: onDelete,
    })
  }

  return (
    <>
      <Row justify="end" gutter={[8, 8]}>
        <AuthenticatedContent
          permission={Permission.PROJECTMEMBERS_EDIT}
          as={Col}
        >
          <Tooltip title="Edit">
            <Button
              type="text-primary"
              size="small"
              icon={<Icon icon="icon-park-outline:edit" width={20} />}
              onClick={openEditDialog}
            />
          </Tooltip>
        </AuthenticatedContent>
        <AuthenticatedContent
          permission={Permission.PROJECTMEMBERS_DELETE}
          as={Col}
        >
          <Tooltip title="Delete">
            <Button
              type="text-primary"
              size="small"
              icon={<Icon icon="icon-park-outline:delete" width={20} />}
              onClick={confirmDelete}
            />
          </Tooltip>
        </AuthenticatedContent>
      </Row>
      {isEditDialogOpen && (
        <MemberFormModal
          isEditing
          projectID={projectID}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          projectSlotID={record.projectSlotID}
          projectMemberID={record.projectMemberID}
          initialValues={{
            ...record,
            positions:
              record.positions?.map((position) => position.id || '') || [],
            joinedDate: record.joinedDate
              ? format(new Date(record.joinedDate), SERVER_DATE_FORMAT)
              : undefined,
            leftDate: record.leftDate
              ? format(new Date(record.leftDate), SERVER_DATE_FORMAT)
              : undefined,
            seniorityID: record.seniority?.id || '',
          }}
          onAfterSubmit={onAfterAction}
        />
      )}
    </>
  )
}
