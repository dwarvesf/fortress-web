import { List, Tag } from 'antd'
import { AgreementLevel, agreementLevels } from 'constants/agreementLevel'
import { statusColors } from 'constants/colors'
import { FeedbackQuestionType } from 'constants/feedbackTypes'
import styled from 'styled-components'
import { ViewQuestionAnswer } from 'types/schema'
import { ItemIndex } from '../ItemIndex'

const StyledListItem = styled(List.Item)`
  .ant-list-item-meta-description {
    white-space: pre-wrap;
  }
`

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
        <StyledListItem style={{ alignItems: 'start' }}>
          <List.Item.Meta
            avatar={<ItemIndex active>{index + 1}</ItemIndex>}
            title={<strong>{answer.content}</strong>}
            description={answer.answer}
          />
        </StyledListItem>
      )
    }
    case FeedbackQuestionType.LIKERT_SCALE: {
      return (
        <StyledListItem style={{ alignItems: 'start' }}>
          <List.Item.Meta
            avatar={<ItemIndex active>{index + 1}</ItemIndex>}
            title={<strong>{answer.content}</strong>}
            description={answer.note}
          />
          <Tag
            color={statusColors[answer.answer || '']}
            style={{ minWidth: 110, textAlign: 'center' }}
          >
            {agreementLevels[answer.answer as AgreementLevel] || '-'}
          </Tag>
        </StyledListItem>
      )
    }
    default: {
      return null
    }
  }
}
