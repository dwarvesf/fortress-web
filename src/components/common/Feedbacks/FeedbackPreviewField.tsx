import { List, Tag } from 'antd'
import { AgreementLevel, agreementLevels } from 'constants/agreementLevel'
import { statusColors } from 'constants/colors'
import { FeedbackQuestionType } from 'constants/feedbackTypes'
import { ViewQuestionAnswer } from 'types/schema'
import { ItemIndex } from '../ItemIndex'

export const FeedbackPreviewField = ({
  index,
  answer,
}: {
  index: number
  answer: ViewQuestionAnswer
}) => {
  switch (answer.type) {
    case FeedbackQuestionType.GENERAL: {
      return (
        <List.Item style={{ alignItems: 'start' }}>
          <List.Item.Meta
            avatar={<ItemIndex active>{index + 1}</ItemIndex>}
            title={<strong>{answer.content}</strong>}
            description={answer.answer}
          />
        </List.Item>
      )
    }
    case FeedbackQuestionType.LIKERT_SCALE: {
      return (
        <List.Item style={{ alignItems: 'start' }}>
          <List.Item.Meta
            avatar={<ItemIndex active>{index + 1}</ItemIndex>}
            title={<strong>{answer.content}</strong>}
            description={answer.note}
          />
          <Tag
            color={statusColors[answer.answer || '']}
            style={{ minWidth: 110, textAlign: 'center' }}
          >
            {agreementLevels[answer.answer as AgreementLevel]}
          </Tag>
        </List.Item>
      )
    }
    default: {
      return null
    }
  }
}