import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  id: string
  memberId: string
}

export const MemberPeerReviewsLink = (props: Props) => {
  const { id, memberId, children } = props

  return (
    <Link href={ROUTES.MEMBER_PEER_REVIEWS(id, memberId)}>
      <a>{children}</a>
    </Link>
  )
}
