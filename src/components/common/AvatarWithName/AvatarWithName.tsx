import { Avatar, Space as AntSpace } from 'antd'
import styled from 'styled-components'
import { getFirstLetterCapitalized } from 'utils/string'

interface Props {
  avatar?: string
  name?: string
  avatarSize?: number
  fontSize?: number
  renderName?: (value?: string) => React.ReactNode
}

const Space = styled(AntSpace)`
  .ant-space-item:first-child {
    display: flex;
    flex-direction: column;
  }
`

export const AvatarWithName = (props: Props) => {
  const {
    avatar,
    name,
    avatarSize = 24,
    fontSize = 16,
    renderName = (value) => <span>{value}</span>,
  } = props

  return (
    <Space direction="horizontal">
      <Avatar src={avatar} size={avatarSize}>
        {!avatar && (
          <span style={{ fontSize }}>{getFirstLetterCapitalized(name)}</span>
        )}
      </Avatar>
      {renderName(name)}
    </Space>
  )
}
