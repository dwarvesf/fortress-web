import { Avatar, Space, Tooltip } from 'antd'
import { theme } from 'styles'
import { AvatarWithName } from '../AvatarWithName'
import { EmployeeLink } from '../DetailLink'

interface Props {
  size?: number
  data?: (any & { image?: string; name?: string })[]
  numOfVisibleAvatar?: number
}

export const AvatarArray = (props: Props) => {
  const { size = 24, data = [], numOfVisibleAvatar = 3 } = props

  const offset = -size / 3

  return (
    <Space direction="horizontal" size={0}>
      {data.slice(0, numOfVisibleAvatar).map((user: any, index: number) => {
        return (
          <EmployeeLink id={user.id} key={user.id}>
            <Tooltip
              title={
                <span style={{ color: theme.colors.black }}>{user.name}</span>
              }
              color="white"
            >
              <Avatar
                src={user.image}
                size={size}
                style={{
                  marginLeft: index !== 0 ? offset : 0,
                  borderStyle: 'solid',
                  borderWidth: 0.5,
                  borderColor: theme.colors.white,
                }}
                icon={!user.image && user.name.slice(0, 1)}
              />
            </Tooltip>
          </EmployeeLink>
        )
      })}
      {data.length > numOfVisibleAvatar ? (
        <Tooltip
          color="white"
          title={
            <Space direction="vertical">
              {data.slice(numOfVisibleAvatar).map((user) => {
                return <AvatarWithName key={user.id} user={user} />
              })}
            </Space>
          }
        >
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
        </Tooltip>
      ) : null}
    </Space>
  )
}
