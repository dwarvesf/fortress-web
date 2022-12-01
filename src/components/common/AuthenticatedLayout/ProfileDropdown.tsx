import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu, Space, Image } from 'antd'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import Link from 'next/link'
import { theme } from 'styles'

const iconStyle = {
  color: theme.colors.gray500,
}

export const ProfileDropdown = () => {
  const { logout, user } = useAuthContext()

  const menuRender = (
    <Menu
      items={[
        {
          key: 'profile',
          label: (
            <Link href={ROUTES.PROFILE}>
              <a style={{ textDecoration: 'none' }}>
                <Space>
                  <UserOutlined style={iconStyle} />
                  <span>Profile</span>
                </Space>
              </a>
            </Link>
          ),
        },
        {
          key: 'logout',
          label: (
            <Space role="button" onClick={logout}>
              <LogoutOutlined style={iconStyle} />
              <span>Logout</span>
            </Space>
          ),
        },
      ]}
    />
  )

  return (
    <Dropdown overlay={menuRender}>
      <Space align="center">
        <Avatar
          size={32}
          icon={
            <Image
              src={user?.avatar}
              preview={false}
              style={{ objectFit: 'cover', height: 32 }}
            />
          }
        />
        <span>{user?.displayName}</span>
      </Space>
    </Dropdown>
  )
}
