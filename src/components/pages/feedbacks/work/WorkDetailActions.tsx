import { useDisclosure } from '@dwarvesf/react-hooks'
import { PreviewOpen } from '@icon-park/react'
import { Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { GET_PATHS, client } from 'libs/apis'
import { ViewTopic } from 'types/schema'
import { SurveyResultModal } from '../SurveyResultModal'

interface Props {
  record: ViewTopic
}

export const WorkDetailActions = (props: Props) => {
  const { record } = props

  const {
    isOpen: isWorkResultDialogOpen,
    onOpen: openWorkResultDialog,
    onClose: closeWorkResultDialog,
  } = useDisclosure()

  const { data } = useFetchWithCache(
    [GET_PATHS.getSurveyTopic(record.eventID as string, record.id as string)],
    () => client.getSurveyTopic(record.eventID as string, record.id as string),
  )

  const detail = data?.data

  return (
    <>
      <Row justify="end" gutter={[8, 8]}>
        <Tooltip title="View">
          <Button
            type="text-primary"
            size="small"
            icon={<PreviewOpen size={20} />}
            onClick={openWorkResultDialog}
          />
        </Tooltip>
      </Row>

      {detail?.participants![0].eventReviewerID !== undefined && (
        <SurveyResultModal
          onCancel={closeWorkResultDialog}
          isOpen={isWorkResultDialogOpen}
          eventID={record.eventID}
          topicID={record.id}
          reviewID={detail?.participants![0].eventReviewerID!}
        />
      )}
    </>
  )
}
