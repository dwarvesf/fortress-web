import { Breadcrumb } from 'components/common/Header/Breadcrumb'
import { SurveyForm } from 'components/pages/feedbacks/inbox/survey/SurveyForm'
import { FeedbackType } from 'constants/feedbackTypes'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

const Default = () => {
  const {
    query: { type, id },
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
