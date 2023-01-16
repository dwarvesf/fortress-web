import { List, Tag } from 'antd'
import { AgreementLevel } from 'constants/agreementLevel'
import { statusColors } from 'constants/colors'
import { DomainTypes, FeedbackQuestionType } from 'constants/feedbackTypes'
import styled from 'styled-components'
import { ViewQuestionAnswer } from 'types/schema'
import { renderDomainLevels } from 'utils/level'
import { theme } from 'styles'
import { ItemIndex } from '../ItemIndex'

const StyledListItem = styled(List.Item)`
  .ant-list-item-meta-description {
    white-space: pre-wrap;
  }
`

export const FeedbackPreviewField = ({
  index,
  answer,
  isPreviewing = false,
}: {
  index: number
  answer: ViewQuestionAnswer
  isPreviewing?: boolean
}) => {
  const levels = renderDomainLevels(
    (answer?.domain || 'engagement') as DomainTypes,
  )

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
            color={
              isPreviewing
                ? theme.colors.gray700
                : statusColors[answer.answer || '']
            }
            style={{ minWidth: 135, textAlign: 'center' }}
          >
            {levels[answer.answer as AgreementLevel] || 'Not answered yet'}
          </Tag>
        </StyledListItem>
      )
    }
    default: {
      return null
    }
  }
}
