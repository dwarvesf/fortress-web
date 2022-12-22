import { Avatar, Space } from 'antd'
import { getFirstLetterCapitalized } from 'utils/string'

interface Props {
  avatar?: string
  name?: string
  avatarSize?: number
  fontSize?: number
}

export const AvatarWithName = (props: Props) => {
  const { avatar, name, avatarSize = 24, fontSize = 16 } = props

  return (
    <Space direction="horizontal">
      <Avatar src={avatar} size={avatarSize}>
        {!avatar && (
          <span style={{ fontSize }}>{getFirstLetterCapitalized(name)}</span>
        )}
      </Avatar>
      <span>{name}</span>
    </Space>
  )
}
