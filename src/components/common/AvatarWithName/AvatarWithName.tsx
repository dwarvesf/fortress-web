import { Avatar, Space as AntSpace, SpaceProps } from 'antd'
import styled from 'styled-components'
import { getFirstLetterCapitalized } from 'utils/string'

interface Props extends SpaceProps {
  avatar?: string
  name?: string
  avatarSize?: number
  fontSize?: number
  renderName?: (value?: string) => React.ReactNode
}

const Space = styled(AntSpace)`
  .ant-space-item:nth-child(2) {
    line-height: 1 !important;
  }
`

export const AvatarWithName = (props: Props) => {
  const {
    avatar,
    name,
    avatarSize = 24,
    fontSize = 16,
    renderName = (value) => <span>{value}</span>,
    align = 'center',
    ...rest
  } = props

  return (
    <Space direction="horizontal" align={align} {...rest}>
      <Avatar src={avatar} size={avatarSize}>
        {!avatar && (
          <span style={{ fontSize }}>{getFirstLetterCapitalized(name)}</span>
        )}
      </Avatar>
      {renderName(name)}
    </Space>
  )
}
