import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  id: string
  topicId: string
}

export const MemberPeerReviewsLink = (props: Props) => {
  const { id, topicId, children } = props

  return (
    <Link href={ROUTES.MEMBER_PEER_REVIEWS(id, topicId)}>
      <a>{children}</a>
    </Link>
  )
}
