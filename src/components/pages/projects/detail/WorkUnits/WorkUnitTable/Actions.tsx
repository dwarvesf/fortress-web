import { EditOutlined } from '@ant-design/icons'
import { Col, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { ViewWorkUnit } from 'types/schema'
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from 'react-icons/ri'
import { useState } from 'react'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'

export const Actions = ({
  data,
  onAfterAction,
}: {
  data: ViewWorkUnit
  onAfterAction: () => void
}) => {
  const {
    query: { id: projectId },
  } = useRouter()

  // const {
  //   isOpen: isEditDialogOpen,
  //   onOpen: openEditDialog,
  //   onClose: closeEditDialog,
  // } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)

  const onArchiveUnarchive = async () => {
    const isArchiving = data.status === 'active'

    try {
      setIsLoading(true)

      if (isArchiving) {
        await client.archiveProjectWorkUnit(projectId as string, data.id || '')
      } else {
        await client.unarchiveProjectWorkUnit(
          projectId as string,
          data.id || '',
        )
      }

      notification.success({
        message: `Work unit ${
          isArchiving ? 'archived' : 'unarchived'
        } successfully!`,
      })

      onAfterAction()
    } catch (error: any) {
      notification.error({
        message:
          error?.message ||
          `Could not ${isArchiving ? 'archive' : 'unarchive'} this work unit!`,
      })
    } finally {
      setIsLoading(false)
    }
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
              onClick={onArchiveUnarchive}
              loading={isLoading}
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
