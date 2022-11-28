import { EditOutlined } from '@ant-design/icons'
import { Col, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
// import { useRouter } from 'next/router'
// import { useState } from 'react'
import { ViewProjectMember } from 'types/schema'
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from 'react-icons/ri'

export const Actions = ({
  data,
  onAfterAction,
}: {
  data: ViewProjectMember
  onAfterAction: () => void
}) => {
  // const {
  //   query: { id: projectId },
  // } = useRouter()

  // const {
  //   isOpen: isEditDialogOpen,
  //   onOpen: openEditDialog,
  //   onClose: closeEditDialog,
  // } = useDisclosure()

  // const [isLoading, setIsLoading] = useState(false)

  const onArchive = () => {
    console.log('Archive')
    onAfterAction()
  }

  const onUnarchive = () => {
    console.log('Unarchive')
    onAfterAction()
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
              // onClick={openEditDialog}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title={data.status === 'archived' ? 'Unarchive' : 'Archive'}>
            <Button
              type="text-primary"
              size="small"
              icon={
                data.status === 'archived' ? (
                  <RiInboxUnarchiveLine />
                ) : (
                  <RiInboxArchiveLine />
                )
              }
              onClick={data.status === 'archived' ? onUnarchive : onArchive}
            />
          </Tooltip>
        </Col>
      </Row>
      {/* {isEditDialogOpen && (
        <MemberFormModal
          isEditing
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          projectSlotID={data.projectSlotID}
          initialValues={{
            ...data,
            positions:
              data.positions?.map((position) => position.id || '') || [],
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
      )} */}
    </>
  )
}
