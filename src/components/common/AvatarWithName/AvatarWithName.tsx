import { Avatar, Space } from 'antd'
import { ViewEmployeeData, ViewProjectMember } from 'types/schema'
import { EmployeeLink } from '../DetailLink'

interface Props {
  user: Pick<
    ViewEmployeeData & ViewProjectMember,
    'id' | 'employeeID' | 'avatar' | 'displayName' | 'fullName'
  >
  avatarSize?: number
  isLink?: boolean
}

export const AvatarWithName = (props: Props) => {
  const { user, avatarSize = 24, isLink = true } = props
  const name = user.displayName || user.fullName

  return isLink ? (
    <EmployeeLink id={user.id || user.employeeID || ''}>
      <Space direction="horizontal">
        <Avatar src={user.avatar} size={avatarSize}>
          {user?.avatar === '' && (
            <span style={{ fontSize: 16 }}>
              {name?.slice(0, 1).toUpperCase()}
            </span>
          )}
        </Avatar>
        <span>{name}</span>
      </Space>
    </EmployeeLink>
  ) : (
    <Space direction="horizontal">
      <Avatar
        src={user.avatar}
        size={avatarSize}
        icon={!user.displayName && user.displayName?.slice(0, 1)}
      />
      <span>{user.displayName}</span>
    </Space>
  )
}
