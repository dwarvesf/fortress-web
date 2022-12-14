import { List, Tag } from 'antd'
import { AgreementLevel, agreementLevels } from 'constants/agreementLevel'
import { statusColors } from 'constants/colors'
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
    case 'general': {
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
    case 'likert-scale': {
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
