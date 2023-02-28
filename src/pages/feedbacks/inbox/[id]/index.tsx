import { SurveyForm } from 'components/pages/feedbacks/inbox/survey/SurveyForm'
import { FeedbackType } from 'constants/feedbackTypes'
import { GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { mutate } from 'swr'

const Default = () => {
  const {
    query: { type },
  } = useRouter()

  // Mutate GET_PATHs.getFeedbacks on mount
  // to trigger a refetch of the feedbacks that are being used
  // for unread count. See useUnreadFeedbackCount hook
  useEffect(() => {
    setTimeout(() => {
      mutate([GET_PATHS.getUnreadFeedbacks])
    }, 3000)
  }, [])

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
