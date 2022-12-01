import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { ProjectMemberStatus } from 'constants/status'
import { format } from 'date-fns'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { ViewProjectMember } from 'types/schema'
import { MemberFormModal } from '../MemberForm/MemberFormModal'

export const Actions = ({
  data,
  onAfterAction,
}: {
  data: ViewProjectMember
  onAfterAction: () => void
}) => {
  const {
    query: { id: projectId },
  } = useRouter()

  const {
    isOpen: isEditDialogOpen,
    onOpen: openEditDialog,
    onClose: closeEditDialog,
  } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async () => {
    try {
      setIsLoading(true)
      await client.deleteProjectMember(
        projectId as string,
        data.employeeID || '',
      )

      notification.success({
        message: 'Project member deleted successfully!',
      })

      onAfterAction()
    } catch (error: any) {
      notification.error({
        message: error?.message || 'Could not delete this project member!',
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

  if (data.status === ProjectMemberStatus.INACTIVE) {
    return null
  }

  return (
    <>
      <Row justify="end" gutter={[8, 8]}>
        <Col>
          <Tooltip title="Edit">
            <Button
              type="text-primary"
              size="small"
              icon={<EditOutlined />}
              onClick={openEditDialog}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title="Delete">
            <Button
              type="text-primary"
              size="small"
              icon={<DeleteOutlined />}
              onClick={confirmDelete}
            />
          </Tooltip>
        </Col>
      </Row>
      {isEditDialogOpen && (
        <MemberFormModal
          isEditing
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          projectSlotID={data.projectSlotID}
          projectMemberID={data.employeeID}
          initialValues={{
            ...data,
            positions:
              data.positions?.map((position) => position.id || '') || [],
            joinedDate: data.joinedDate
              ? format(new Date(data.joinedDate), SERVER_DATE_FORMAT)
              : undefined,
            leftDate: data.leftDate
              ? format(new Date(data.leftDate), SERVER_DATE_FORMAT)
              : undefined,
            seniorityID: data.seniority?.id || '',
          }}
          onAfterSubmit={onAfterAction}
        />
      )}
    </>
  )
}