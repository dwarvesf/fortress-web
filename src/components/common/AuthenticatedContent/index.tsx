import { useAuthContext } from 'context/auth'
import { Fragment } from 'react'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  permission?: string
  role?: string
  as?: React.ElementType
}

export const AuthenticatedContent = (props: Props) => {
  const { children, permission, role, as: Wrapper = Fragment } = props
  const { permissions: userPermissions, role: userRole } = useAuthContext()

  if (role && userRole !== role) {
    return null
  }

  if (permission && !userPermissions.includes(permission)) {
    return null
  }

  return <Wrapper>{children}</Wrapper>
}
