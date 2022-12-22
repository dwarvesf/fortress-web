import { ROUTES } from 'constants/routes'
import { WithChildren } from 'types/common'
import { LinkWithIcon } from '../LinkWithIcon'

interface Props extends WithChildren {
  id: string
}

export const EmployeeLink = (props: Props) => {
  const { id, children } = props

  return (
    <LinkWithIcon href={ROUTES.EMPLOYEE_DETAIL(id)}>{children}</LinkWithIcon>
  )
}
