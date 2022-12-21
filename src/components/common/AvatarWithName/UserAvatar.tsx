import { ViewEmployeeData, ViewProjectMember } from 'types/schema'
import { EmployeeLink } from '../DetailLink'
import { AvatarWithName } from './AvatarWithName'

interface Props {
  user: Pick<
    ViewEmployeeData & ViewProjectMember,
    'id' | 'employeeID' | 'avatar' | 'displayName' | 'fullName'
  >
  avatarSize?: number
  fontSize?: number
  isLink?: boolean
}

export const UserAvatar = (props: Props) => {
  const { user, avatarSize, fontSize, isLink = true } = props

  return isLink ? (
    <EmployeeLink id={user.id || user.employeeID || ''}>
      <AvatarWithName
        avatar={user.avatar}
        name={user.displayName || user.fullName}
        {...{ avatarSize, fontSize }}
      />
    </EmployeeLink>
  ) : (
    <AvatarWithName
      avatar={user.avatar}
      name={user.displayName || user.fullName}
      {...{ avatarSize, fontSize }}
    />
  )
}
