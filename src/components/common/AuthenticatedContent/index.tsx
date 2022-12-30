import { useAuthContext } from 'context/auth'
import { Fragment } from 'react'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  permission?: string
  as?: React.ElementType
}

export const AuthenticatedContent = (props: Props) => {
  const { children, permission, as: Wrapper = Fragment } = props
  const { permissions } = useAuthContext()

  if (permission && !permissions.includes(permission)) {
    return null
  }

  return <Wrapper>{children}</Wrapper>
}
