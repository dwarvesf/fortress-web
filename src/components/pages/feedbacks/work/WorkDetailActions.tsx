import { useDisclosure } from '@dwarvesf/react-hooks'
import { PreviewOpen } from '@icon-park/react'
import { Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { WorkloadResultModal } from './WorkloadResultModal'

interface Props {
  record: any
}

export const WorkDetailActions = (props: Props) => {
  const { record } = props

  const {
    isOpen: isWorkloadResultDialogOpen,
    onOpen: openWorkloadResultDialog,
    onClose: closeWorkloadResultDialog,
  } = useDisclosure()

  return (
    <>
      <Row justify="end" gutter={[8, 8]}>
        <Tooltip title="View">
          <Button
            type="text-primary"
            size="small"
            icon={<PreviewOpen size={20} />}
            onClick={openWorkloadResultDialog}
          />
        </Tooltip>
      </Row>

      <WorkloadResultModal
        onClose={closeWorkloadResultDialog}
        isOpen={isWorkloadResultDialogOpen}
        record={record}
      />
    </>
  )
}
