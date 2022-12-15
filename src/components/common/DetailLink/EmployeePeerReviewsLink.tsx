import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  id: string
  topicId: string
}

export const EmployeePeerReviewsLink = (props: Props) => {
  const { id, topicId, children } = props

  return (
    <Link href={ROUTES.EMPLOYEE_PEER_REVIEWS(id, topicId)}>
      <a>{children}</a>
    </Link>
  )
}