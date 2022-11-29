import { EditOutlined } from '@ant-design/icons'
import { Col, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { ViewWorkUnit } from 'types/schema'
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from 'react-icons/ri'
import { useState } from 'react'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { ProjectWorkUnitStatus } from 'constants/status'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { WorkUnitModal } from '../WorkUnitModal'

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

  const {
    isOpen: isEditWorkUnitDialogOpen,
    onOpen: openEditWorkUnitDialog,
    onClose: closeEditWorkUnitDialog,
  } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)
  const isArchiving = data.status === ProjectWorkUnitStatus.ACTIVE

  const onArchiveUnarchive = async () => {
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
              onClick={openEditWorkUnitDialog}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title={isArchiving ? 'Archive' : 'Unarchive'}>
            <Button
              type="text-primary"
              size="small"
              icon={
                isArchiving ? <RiInboxArchiveLine /> : <RiInboxUnarchiveLine />
              }
              onClick={onArchiveUnarchive}
              loading={isLoading}
            />
          </Tooltip>
        </Col>
      </Row>
      {isEditWorkUnitDialogOpen && (
        <WorkUnitModal
          isEditing
          // TODO: transform table data to form data
          // initialValues={data}
          isOpen={isEditWorkUnitDialogOpen}
          onClose={closeEditWorkUnitDialog}
          onAfterSubmit={onAfterAction}
        />
      )}
    </>
  )
}
