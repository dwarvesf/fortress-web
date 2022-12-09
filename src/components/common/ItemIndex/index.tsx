import { Avatar } from 'antd'
import { theme } from 'styles'
import { WithChildren } from 'types/common'

interface Props extends WithChildren {
  active?: boolean
}

export const ItemIndex = (props: Props) => {
  const { children, active } = props

  return (
    <Avatar
      size="small"
      style={{
        fontSize: 12,
        fontWeight: 700,
        ...(active
          ? {
              backgroundColor: 'rgba(225, 63, 94, 0.3)',
              color: theme.colors.primary,
            }
          : {}),
      }}
    >
      {children}
    </Avatar>
  )
}
