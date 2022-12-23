import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { AnchorHTMLAttributes } from 'react'

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  id: string
}

export const EmployeeLink = (props: Props) => {
  const { id, children, ...rest } = props

  return (
    <Link href={ROUTES.EMPLOYEE_DETAIL(id)}>
      <a {...rest}>{children}</a>
    </Link>
  )
}
