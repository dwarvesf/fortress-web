import { List, Modal, ModalProps } from 'antd'
import { FeedbackPreviewField } from 'components/common/Feedbacks/FeedbackPreviewField'
import { AgreementLevel } from 'constants/agreementLevel'

interface Props extends ModalProps {
  isOpen: boolean
  onClose: () => void
  record: any // TODO: add type
}

export const WorkResultModal = (props: Props) => {
  const { isOpen, onClose, record, ...rest } = props

  return (
    <Modal
      open={isOpen}
      width={768}
      onCancel={onClose}
      footer={null}
      title={`${record?.displayName || '-'}, ${record?.projectName}`}
      {...rest}
    >
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            answer: AgreementLevel.DISAGREE,
            content: 'Question 1',
            type: 'likert-scale',
          },
          {
            answer: AgreementLevel.MIXED,
            content: 'Question 2',
            type: 'likert-scale',
          },
          {
            answer: AgreementLevel.AGREE,
            content: 'Question 3',
            note: 'note',
            type: 'likert-scale',
          },
        ]}
        renderItem={(item, index) => (
          <FeedbackPreviewField answer={item} key={index} index={index} />
        )}
      />
    </Modal>
  )
}
