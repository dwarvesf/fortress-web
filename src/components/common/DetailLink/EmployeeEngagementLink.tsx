import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  id: string
}

export const EmployeeEngagementLink = (props: Props) => {
  const { id, children } = props

  return (
    <Link href={id ? ROUTES.EMPLOYEE_ENGAGEMENT_DETAIL(id) : ROUTES.ENGAGEMENT}>
      <a>{children}</a>
    </Link>
  )
}
