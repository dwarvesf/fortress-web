import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Row } from 'antd'
import { Button } from 'components/common/Button'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import { ViewProjectMember } from 'types/schema'
import { StaffFormModal } from '../StaffForm/StaffFormModal'

export const Actions = ({
  data,
  onAfterAction,
}: {
  data: ViewProjectMember
  onAfterAction: () => void
}) => {
  const {
    isOpen: isEditDialogOpen,
    onOpen: openEditDialog,
    onClose: closeEditDialog,
  } = useDisclosure()

  return (
    <>
      <Row justify="end" gutter={[8, 8]}>
        {data.status !== 'inactive' && (
          <Col>
            <Button
              type="text-primary"
              size="small"
              icon={<EditOutlined />}
              onClick={openEditDialog}
            />
          </Col>
        )}
        <Col>
          <Button
            type="text-primary"
            size="small"
            icon={<DeleteOutlined />}
            onClick={onAfterAction}
          />
        </Col>
      </Row>
      <StaffFormModal
        isEditing
        isOpen={isEditDialogOpen}
        onClose={closeEditDialog}
        projectSlotID={data.projectSlotID}
        initialValues={{
          ...data,
          positions: data.positions?.map((position) => position.id || '') || [],
          joinedDate: data.joinedDate
            ? format(new Date(data.joinedDate), SERVER_DATE_FORMAT)
            : undefined,
          leftDate: data.joinedDate
            ? format(new Date(data.joinedDate), SERVER_DATE_FORMAT)
            : undefined,
          seniorityID: data.seniority?.id || '',
        }}
        onAfterSubmit={onAfterAction}
      />
    </>
  )
}
