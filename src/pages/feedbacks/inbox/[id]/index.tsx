import { SurveyForm } from 'components/pages/feedbacks/inbox/survey/SurveyForm'
import { FeedbackType } from 'constants/feedbackTypes'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const Default = () => {
  const {
    query: { type },
  } = useRouter()

  const content = useMemo(() => {
    switch (type) {
      case FeedbackType.SURVEY: {
        return <SurveyForm />
      }
      default: {
        return null
      }
    }
  }, [type])

  return content
}

export default Default
