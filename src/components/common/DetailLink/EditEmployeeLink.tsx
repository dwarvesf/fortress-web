import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  id: string
}

export const EditEmployeeLink = (props: Props) => {
  const { id, children } = props

  return (
    <Link href={ROUTES.EDIT_EMPLOYEE(id)}>
      <a>{children}</a>
    </Link>
  )
}
