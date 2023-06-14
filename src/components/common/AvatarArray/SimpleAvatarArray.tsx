import { Avatar, Space, Tooltip } from 'antd'
import { CSSProperties } from 'react'
import { theme } from 'styles'
import { ViewEmployeeData, ViewProjectMember } from 'types/schema'
import { getFirstLetterCapitalized } from 'utils/string'

interface Props {
  size?: number
  data?: (ViewEmployeeData & ViewProjectMember)[]
  numOfVisibleAvatar?: number
  tooltip?: JSX.Element
  wrapperStyle?: CSSProperties
}

export const SimpleAvatarArray = (props: Props) => {
  const {
    size = 24,
    data = [],
    numOfVisibleAvatar = 3,
    tooltip,
    wrapperStyle,
  } = props

  const offset = -size / 3

  return (
    <Tooltip title={tooltip} color="white">
      <Space direction="horizontal" size={0} style={wrapperStyle}>
        {data.slice(0, numOfVisibleAvatar).map((user, index: number) => (
          <span
            key={user.id || user.employeeID}
            style={{
              marginLeft: index !== 0 ? offset : 0,
              borderStyle: 'solid',
              borderWidth: 0.5,
              borderColor: theme.colors.white,
            }}
          >
            <Avatar
              src={user.avatar}
              size={size}
              icon={
                !user.avatar &&
                getFirstLetterCapitalized(user.displayName || user.fullName)
              }
            />
          </span>
        ))}
        {data.length > numOfVisibleAvatar ? (
          <Avatar
            size={size}
            icon={`+${data.length - numOfVisibleAvatar}`}
            style={{
              marginLeft: offset,
              borderStyle: 'solid',
              borderWidth: 0.5,
              borderColor: theme.colors.white,
            }}
          />
        ) : null}
      </Space>
    </Tooltip>
  )
}
