import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  id?: string
}

export const EngagementEventLink = (props: Props) => {
  const { id, children } = props

  return (
    <Link href={id ? ROUTES.ENGAGEMENT_EVENT_DETAIL(id) : ROUTES.ENGAGEMENT}>
      <a>{children}</a>
    </Link>
  )
}
