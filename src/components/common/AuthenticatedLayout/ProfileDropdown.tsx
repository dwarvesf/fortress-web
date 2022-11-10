import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Col, Dropdown, Menu, Row } from 'antd'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import Link from 'next/link'
import { theme } from 'styles'

const iconStyle = {
  color: theme.colors.gray500,
}

export const ProfileDropdown = () => {
  const { logout } = useAuthContext()

  const menuRender = (
    <Menu
      items={[
        {
          key: 'profile',
          label: (
            <Link href={ROUTES.PROFILE}>
              <a style={{ textDecoration: 'none' }}>
                <Row gutter={8}>
                  <Col>
                    <UserOutlined style={iconStyle} />
                  </Col>
                  <Col>Profile</Col>
                </Row>
              </a>
            </Link>
          ),
        },
        {
          key: 'logout',
          label: (
            <Row gutter={8} role="button" onClick={logout}>
              <Col>
                <LogoutOutlined style={iconStyle} />
              </Col>
              <Col>Logout</Col>
            </Row>
          ),
        },
      ]}
    />
  )

  return (
    <Dropdown overlay={menuRender}>
      <Row gutter={8} align="middle">
        <Col>
          <Avatar size={32} icon={<UserOutlined />} />
        </Col>
        <Col>John Doe</Col>
      </Row>
    </Dropdown>
  )
}
