import { Col, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { ViewWorkUnit } from 'types/schema'
import { useState } from 'react'
import { client } from 'libs/apis'
import { useRouter } from 'next/router'
import { ProjectWorkUnitStatus } from 'constants/status'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Edit, FolderDownload, FolderUpload } from '@icon-park/react'
import { getErrorMessage } from 'utils/string'
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
  const isActive = record.status === ProjectWorkUnitStatus.ACTIVE

  const onArchiveUnarchive = async () => {
    try {
      setIsLoading(true)

      if (isActive) {
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
          isActive ? 'archived' : 'unarchived'
        } successfully!`,
      })

      onAfterAction()
    } catch (error: any) {
      notification.error({
        message: getErrorMessage(
          error,
          `Could not ${isActive ? 'archive' : 'unarchive'} this work unit`,
        ),
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
              icon={<Edit size={20} />}
              onClick={openEditWorkUnitDialog}
            />
          </Tooltip>
        </Col>
        <Col>
          <Tooltip title={isActive ? 'Archive' : 'Unarchive'}>
            <Button
              type="text-primary"
              size="small"
              icon={
                isActive ? (
                  <FolderDownload size={20} />
                ) : (
                  <FolderUpload size={20} />
                )
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
