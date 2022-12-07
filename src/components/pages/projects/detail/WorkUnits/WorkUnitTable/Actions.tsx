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
  record,
  onAfterAction,
}: {
  record: ViewWorkUnit
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
  const isArchiving = record.status === ProjectWorkUnitStatus.ACTIVE

  const onArchiveUnarchive = async () => {
    try {
      setIsLoading(true)

      if (isArchiving) {
        await client.archiveProjectWorkUnit(
          projectId as string,
          record.id || '',
        )
      } else {
        await client.unarchiveProjectWorkUnit(
          projectId as string,
          record.id || '',
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
          initialValues={{
            name: record.name || '',
            type: record.type || '',
            status: record.status || ProjectWorkUnitStatus.ACTIVE,
            members: (record.members || []).map((m) => m.employeeID || ''),
            stacks: (record.stacks || []).map((s) => s.id || ''),
            url: record.url || '',
          }}
          rowID={record.id}
          isOpen={isEditWorkUnitDialogOpen}
          onClose={closeEditWorkUnitDialog}
          onAfterSubmit={onAfterAction}
        />
      )}
    </>
  )
}
