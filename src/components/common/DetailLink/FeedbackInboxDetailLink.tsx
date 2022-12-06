import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  id: string
}

export const FeedbackInboxDetailLink = (props: Props) => {
  const { id, children } = props

  return (
    <Link href={ROUTES.FEEDBACK_INBOX_DETAIL(id)}>
      <a>{children}</a>
    </Link>
  )
}
