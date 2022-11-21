import { Avatar, Space } from 'antd'
import { ViewEmployeeData, ViewProjectMember } from 'types/schema'
import { EmployeeLink } from '../DetailLink'

interface Props {
  user: Pick<
    ViewEmployeeData & ViewProjectMember,
    'id' | 'employeeID' | 'avatar' | 'displayName' | 'fullName'
  >
  avatarSize?: number
}

export const AvatarWithName = (props: Props) => {
  const { user, avatarSize = 24 } = props
  const name = user.displayName || user.fullName

  return (
    <EmployeeLink id={user.id || user.employeeID || ''}>
      <Space direction="horizontal">
        <Avatar
          src={user.avatar}
          size={avatarSize}
          icon={!name && name?.slice(0, 1)}
        />
        <span>{name}</span>
      </Space>
    </EmployeeLink>
  )
}
