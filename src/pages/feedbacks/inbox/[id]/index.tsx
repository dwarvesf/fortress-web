import { PeerFormanceReviewForm } from 'components/pages/feedbacks/inbox/peer-review/PeerPerformanceReviewForm'
import { FeedbackSubtype, FeedbackType } from 'constants/feedbackTypes'
import { useRouter } from 'next/router'

const Default = () => {
  const {
    query: { type, subtype },
  } = useRouter()

  switch (type) {
    case FeedbackType.SURVEY: {
      switch (subtype) {
        case FeedbackSubtype.PEER_REVIEW: {
          return <PeerFormanceReviewForm />
        }
        default: {
          return null
        }
      }
    }
    default: {
      return null
    }
  }
}

export default Default
