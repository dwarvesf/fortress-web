import { Avatar, Space } from 'antd'
import { EmployeeLink } from '../DetailLink'

interface Props {
  user: any
  avatarSize?: number
}

export const AvatarWithName = (props: Props) => {
  const { user, avatarSize = 24 } = props

  return (
    <EmployeeLink id={user.id}>
      <Space direction="horizontal">
        <Avatar
          src={user.image}
          size={avatarSize}
          icon={!user.image && user.name.slice(0, 1)}
        />
        <span>{user.name}</span>
      </Space>
    </EmployeeLink>
  )
}
