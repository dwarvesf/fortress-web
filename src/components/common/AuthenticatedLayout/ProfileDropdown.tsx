import { Avatar, Menu, Space, Image, Dropdown, Typography } from 'antd'
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
            <Link href={ROUTES.PROFILE} style={{ width: '100%' }}>
              <a style={{ textDecoration: 'none' }}>Profile</a>
            </Link>
          ),
        },
        {
          key: 'logout',
          label: (
            <Typography.Link
              role="button"
              onClick={logout}
              style={{ width: '100%' }}
            >
              Logout
            </Typography.Link>
          ),
        },
      ]}
    />
  )

  return (
    <Dropdown overlay={menuRender} trigger={['click']}>
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
