import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { EngagementSurveyForm } from 'components/pages/feedbacks/inbox/engagement/EngagementSurveyForm'
import { PeerFormanceReviewForm } from 'components/pages/feedbacks/inbox/peer-review/PeerPerformanceReviewForm'
import { FeedbackSubtype, FeedbackType } from 'constants/feedbackTypes'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const Default = () => {
  const {
    query: { type, subtype, id },
  } = useRouter()

  const content = useMemo(() => {
    switch (type) {
      case FeedbackType.SURVEY: {
        switch (subtype) {
          case FeedbackSubtype.PEER_REVIEW: {
            return <PeerFormanceReviewForm />
          }
          case FeedbackSubtype.ENGAGEMENT: {
            return <EngagementSurveyForm />
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
  }, [type, subtype])

  return (
    <>
      <Breadcrumb
        items={[
          {
            label: 'Dashboard',
            href: ROUTES.DASHBOARD,
          },
          {
            label: 'Feedbacks',
          },
          {
            label: 'Inbox',
            href: ROUTES.INBOX,
          },
          {
            label: id || '-',
          },
        ]}
      />

      {content}
    </>
  )
}

export default Default
