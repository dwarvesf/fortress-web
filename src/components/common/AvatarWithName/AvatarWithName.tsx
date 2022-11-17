import { Avatar, Space } from 'antd'
import { ViewEmployeeData } from 'types/schema'
import { EmployeeLink } from '../DetailLink'

interface Props {
  user: ViewEmployeeData
  avatarSize?: number
}

export const AvatarWithName = (props: Props) => {
  const { user, avatarSize = 24 } = props

  return (
    <EmployeeLink id={user.id || ''}>
      <Space direction="horizontal">
        <Avatar
          src={user.avatar}
          size={avatarSize}
          icon={!user.displayName && user.displayName?.slice(0, 1)}
        />
        <span>{user.displayName}</span>
      </Space>
    </EmployeeLink>
  )
}
