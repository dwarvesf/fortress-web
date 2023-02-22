import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { CSSProperties } from 'react'
import { ViewEmployeeData, ViewProjectMember } from 'types/schema'
import { AvatarWithName } from './AvatarWithName'

interface Props {
  user: Pick<
    ViewEmployeeData & ViewProjectMember,
    'id' | 'employeeID' | 'avatar' | 'displayName' | 'fullName' | 'username'
  >
  avatarSize?: number
  fontSize?: number
  isLink?: boolean
  style?: CSSProperties
}

export const UserAvatar = (props: Props) => {
  const { user, avatarSize, fontSize, isLink = true, style } = props

  return isLink ? (
    <AvatarWithName
      avatar={user.avatar}
      name={user.displayName || user.fullName}
      renderName={(name) => (
        <Link
          href={ROUTES.EMPLOYEE_DETAIL(user.username || '')}
          className="styled"
        >
          <a className="styled">{name}</a>
        </Link>
      )}
      {...{ avatarSize, fontSize, style }}
    />
  ) : (
    <AvatarWithName
      avatar={user.avatar}
      name={user.displayName || user.fullName}
      renderName={(name) => name}
      {...{ avatarSize, fontSize, style }}
    />
  )
}
