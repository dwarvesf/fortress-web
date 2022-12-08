import { Avatar } from 'antd'
import { theme } from 'styles'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {}

export const ItemIndex = (props: Props) => {
  const { children } = props

  return (
    <Avatar
      size="small"
      style={{
        backgroundColor: 'rgba(225, 63, 94, 0.3)',
        color: theme.colors.primary,
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {children}
    </Avatar>
  )
}
