import { Avatar, Space } from 'antd'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'

interface Props {
  user: any
  avatarSize?: number
}

export const AvatarWithName = (props: Props) => {
  const { user, avatarSize = 24 } = props

  return (
    <Link href={ROUTES.EMPLOYEE_DETAIL(user.id)} key={user.id}>
      <a>
        <Space direction="horizontal">
          <Avatar
            src={user.image}
            size={avatarSize}
            icon={!user.image && user.name.slice(0, 1)}
          />
          <span>{user.name}</span>
        </Space>
      </a>
    </Link>
  )
}
