import { Col, notification, Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { ViewWorkUnit } from 'types/schema'
import { useState } from 'react'
import { client } from 'libs/apis'
import { ProjectWorkUnitStatus } from 'constants/status'
import { useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { getErrorMessage } from 'utils/string'
import { AuthenticatedContent } from 'components/common/AuthenticatedContent'
import { Permission } from 'constants/permission'
import { WorkUnitModal } from '../WorkUnitModal'

export const Actions = ({
  record,
  onAfterAction,
}: {
  record: ViewWorkUnit
  onAfterAction: () => void
}) => {
  const {
    isOpen: isEditWorkUnitDialogOpen,
    onOpen: openEditWorkUnitDialog,
    onClose: closeEditWorkUnitDialog,
  } = useDisclosure()

  const [isLoading, setIsLoading] = useState(false)
  const isActive = record.status === ProjectWorkUnitStatus.ACTIVE
  const projectID = record.projectID || ''

  const onArchiveUnarchive = async () => {
    try {
      setIsLoading(true)

      if (isActive) {
        await client.archiveProjectWorkUnit(projectID, record.id || '')
      } else {
        await client.unarchiveProjectWorkUnit(projectID, record.id || '')
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
        <AuthenticatedContent
          permission={Permission.PROJECTWORKUNITS_EDIT}
          as={Col}
        >
          <Tooltip title="Edit">
            <Button
              type="text-primary"
              size="small"
              icon={<Icon icon="icon-park-outline:edit" width={20} />}
              onClick={openEditWorkUnitDialog}
            />
          </Tooltip>
        </AuthenticatedContent>
        <AuthenticatedContent
          permission={Permission.PROJECTWORKUNITS_EDIT}
          as={Col}
        >
          <Tooltip title={isActive ? 'Archive' : 'Unarchive'}>
            <Button
              type="text-primary"
              size="small"
              icon={
                isActive ? (
                  <Icon icon="icon-park-outline:folder-download" width={20} />
                ) : (
                  <Icon icon="icon-park-outline:folder-upload" width={20} />
                )
              }
              onClick={onArchiveUnarchive}
              loading={isLoading}
            />
          </Tooltip>
        </AuthenticatedContent>
      </Row>
      {isEditWorkUnitDialogOpen && (
        <WorkUnitModal
          projectID={projectID}
          isEditing
          initialValues={{
            name: record.name || '',
            type: record.type || '',
            status: record.status || ProjectWorkUnitStatus.ACTIVE,
            members: (record.members || []).map((m) => m.employeeID || ''),
            stacks: (record.stacks || []).map((s) => s.id || ''),
            url: record.url || '',
          }}
          rowID={record.id || ''}
          isOpen={isEditWorkUnitDialogOpen}
          onClose={closeEditWorkUnitDialog}
          onAfterSubmit={onAfterAction}
        />
      )}
    </>
  )
}
