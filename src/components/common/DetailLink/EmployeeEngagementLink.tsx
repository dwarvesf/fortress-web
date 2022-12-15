import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  id: string
}

export const EmployeeEngagementLink = (props: Props) => {
  const { id, children } = props

  return (
    <Link href={ROUTES.EMPLOYEE_ENGAGEMENT(id)}>
      <a>{children}</a>
    </Link>
  )
}
