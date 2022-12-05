import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  id?: string
}

export const PeerReviewEventLink = (props: Props) => {
  const { id, children } = props

  return (
    <Link href={id ? ROUTES.PEER_REVIEW_EVENT_DETAIL(id) : ROUTES.PEER_REVIEW}>
      <a>{children}</a>
    </Link>
  )
}
