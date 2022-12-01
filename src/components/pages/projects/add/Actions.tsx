import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Col, Modal, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { SERVER_DATE_FORMAT } from 'constants/date'
import { format } from 'date-fns'
import { Meta } from 'libs/apis'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  PkgHandlerProjectAssignMemberInput,
  ViewEmployeeListDataResponse,
  ViewPositionResponse,
  ViewProjectMember,
  ViewSeniorityResponse,
} from 'types/schema'
import { ProjectMemberModal } from './ProjectMemberModal'

export const Actions = ({
  rowData,
  getDataOnSubmit,
  tableData,
  memberData,
  setMemberData,
}: {
  rowData: ViewProjectMember
  getDataOnSubmit?: (
    e: ViewEmployeeListDataResponse & Meta,
    s: ViewSeniorityResponse,
    p: ViewPositionResponse,
  ) => void
  tableData: ViewProjectMember[]
  memberData: PkgHandlerProjectAssignMemberInput[]
  setMemberData: Dispatch<SetStateAction<PkgHandlerProjectAssignMemberInput[]>>
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

      const rowIndex = tableData.findIndex(
        (d) => JSON.stringify(d) === JSON.stringify(rowData),
      )

      const currentMemberData = memberData

      const newMemberData: PkgHandlerProjectAssignMemberInput[] = []
      currentMemberData.forEach((item, j) => {
        if (j !== rowIndex) {
          newMemberData.push(item)
        }
      })

      setMemberData(newMemberData)

      notification.success({
        message: 'Project member deleted successfully!',
      })
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
        <ProjectMemberModal
          isEditing
          rowIndex={tableData.findIndex(
            (d) => JSON.stringify(d) === JSON.stringify(rowData),
          )}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          initialValues={{
            ...rowData,
            deploymentType: rowData.deploymentType,
            positions:
              rowData.positions?.map((position) => position.id || '') || [],
            joinedDate: rowData.joinedDate
              ? format(new Date(rowData.joinedDate), SERVER_DATE_FORMAT)
              : undefined,
            leftDate: rowData.leftDate
              ? format(new Date(rowData.leftDate), SERVER_DATE_FORMAT)
              : undefined,
            seniorityID: rowData.seniority?.id || '',
          }}
          memberData={memberData}
          setMemberData={setMemberData}
          getDataOnSubmit={getDataOnSubmit}
        />
      )}
    </>
  )
}
