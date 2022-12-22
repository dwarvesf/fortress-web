// FIXME: use SurveyResultModal when binding API instead of this one

import { List, Modal, ModalProps } from 'antd'
import { FeedbackPreviewField } from 'components/common/Feedbacks/FeedbackPreviewField'
import { AgreementLevel } from 'constants/agreementLevel'

interface Props extends ModalProps {
  isOpen: boolean
  onClose: () => void
  record: any
}

export const WorkResultModal = (props: Props) => {
  const { isOpen, onClose, record, ...rest } = props

  return (
    <Modal
      open={isOpen}
      width={768}
      onCancel={onClose}
      footer={null}
      title={`${record?.title || '-'}`}
      {...rest}
    >
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            answer: AgreementLevel.DISAGREE,
            content: 'How do you feel about your current workload?',
            note: 'Overwhelming',
            type: 'likert-scale',
          },
          {
            answer: AgreementLevel.STRONGLY_AGREE,
            content:
              "How is your confidence in the team's ability to meet the deadline?",
            note: 'Very confident',
            type: 'likert-scale',
          },
          {
            answer: AgreementLevel.AGREE,
            content:
              'How much did you learn from your work and your team in the past two weeks?',
            note: 'A lot',
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
