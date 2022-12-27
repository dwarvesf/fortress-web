import { Avatar, Space, Tooltip } from 'antd'
import { ROUTES } from 'constants/routes'
import Link from 'next/link'
import { theme } from 'styles'
import { ViewEmployeeData, ViewProjectMember } from 'types/schema'
import { getFirstLetterCapitalized } from 'utils/string'
import { UserAvatar } from '../AvatarWithName'

interface Props {
  size?: number
  data?: (ViewEmployeeData & ViewProjectMember)[]
  numOfVisibleAvatar?: number
}

export const AvatarArray = (props: Props) => {
  const { size = 24, data = [], numOfVisibleAvatar = 3 } = props

  const offset = -size / 3

  return (
    <Space direction="horizontal" size={0}>
      {data.slice(0, numOfVisibleAvatar).map((user, index: number) => {
        return (
          <Link
            href={ROUTES.EMPLOYEE_DETAIL(user.username || '')}
            key={user.id || user.employeeID}
          >
            <a>
              <Tooltip
                title={
                  <span style={{ color: theme.colors.black }}>
                    {user.displayName}
                  </span>
                }
                color="white"
              >
                <span
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
                      getFirstLetterCapitalized(
                        user.displayName || user.fullName,
                      )
                    }
                  />
                </span>
              </Tooltip>
            </a>
          </Link>
        )
      })}
      {data.length > numOfVisibleAvatar ? (
        <Tooltip
          color="white"
          title={
            <Space direction="vertical">
              {data.slice(numOfVisibleAvatar).map((user) => {
                return (
                  <UserAvatar key={user.id || user.employeeID} user={user} />
                )
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
