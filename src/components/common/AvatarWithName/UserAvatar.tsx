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
}

export const UserAvatar = (props: Props) => {
  const { user, avatarSize, fontSize } = props

  return (
    <AvatarWithName
      avatar={user.avatar}
      name={user.displayName || user.fullName}
      renderName={(name) => (
        <EmployeeLink id={user.id || user.employeeID || ''} className="link">
          {name}
        </EmployeeLink>
      )}
      {...{ avatarSize, fontSize }}
    />
  )
}
