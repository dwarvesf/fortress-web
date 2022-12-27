import { Avatar, Menu, Space, Image, Dropdown } from 'antd'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import Link from 'next/link'

export const ProfileDropdown = () => {
  const { logout, user } = useAuthContext()

  const menuRender = (
    <Menu
      items={[
        {
          key: 'profile',
          label: (
            <Link href={ROUTES.PROFILE}>
              <a style={{ textDecoration: 'none' }}>Profile</a>
            </Link>
          ),
        },
        {
          key: 'logout',
          label: (
            <Space role="button" onClick={logout}>
              Logout
            </Space>
          ),
        },
      ]}
    />
  )

  return (
    <Dropdown overlay={menuRender}>
      <Space align="center" style={{ cursor: 'pointer' }}>
        <span>{user?.displayName}</span>
        <Avatar
          size={32}
          icon={
            <Image
              src={user?.avatar}
              preview={false}
              height="100%"
              width="100%"
              style={{ objectFit: 'cover' }}
            />
          }
        />
      </Space>
    </Dropdown>
  )
}
