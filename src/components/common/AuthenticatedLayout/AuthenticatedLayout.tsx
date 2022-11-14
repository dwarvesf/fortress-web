import {
  AppstoreFilled,
  LayoutFilled,
  SettingFilled,
  UserOutlined,
  WechatFilled,
} from '@ant-design/icons'
import { Col, MenuProps, Row, Layout, Menu, Spin } from 'antd'
import { ROUTES } from 'constants/routes'
import { LOGIN_REDIRECTION_KEY, useAuthContext } from 'context/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { WithChildren } from 'types/common'
import { isActivePath } from 'utils/link'
import { Logo } from '../Logo'
import { ProfileDropdown } from './ProfileDropdown'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('Dashboard', ROUTES.DASHBOARD, <LayoutFilled />),
  getItem('Projects', ROUTES.PROJECTS, <AppstoreFilled />),
  getItem('Employees', ROUTES.EMPLOYEES, <UserOutlined />),
  getItem('Feedbacks', ROUTES.FEEDBACKS, <WechatFilled />),
  getItem('Config', ROUTES.CONFIG, <SettingFilled />),
]

interface Props extends WithChildren {}

const LogoLink = styled.a`
  text-decoration: none !important;
`

export const AuthenticatedLayout = (props: Props) => {
  const { children } = props

  const { isAuthenticated, isAuthenticating } = useAuthContext()

  const { replace, push, pathname } = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      if (!window.location.href.includes(ROUTES.LOGIN)) {
        window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
      }

      if (pathname !== ROUTES.LOGIN) {
        replace(ROUTES.LOGIN)
      }
    }
  }, [replace, isAuthenticated, pathname, isAuthenticating])

  const [collapsed, setCollapsed] = useState(false)

  const activeMenuKey = useMemo(() => {
    return items.find((item) => {
      return isActivePath(item?.key as string, pathname)
    })?.key as string
  }, [pathname])

  if (isAuthenticating || (!isAuthenticated && pathname !== ROUTES.LOGIN)) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }

  if (!isAuthenticated || pathname === ROUTES.LOGIN) {
    return <Layout>{children}</Layout>
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="layout-header">
        <Row justify="space-between">
          <Col>
            <Link href={ROUTES.DASHBOARD}>
              <LogoLink>
                <Logo hasText />
              </LogoLink>
            </Link>
          </Col>
          <Col>
            <ProfileDropdown />
          </Col>
        </Row>
      </Header>
      <Layout style={{ paddingTop: 64, height: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          style={{ top: 0 }}
        >
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            items={items}
            onClick={({ key }) => push(key)}
            activeKey={activeMenuKey}
          />
        </Sider>
        <Layout className="layout-main">
          <Content className="layout-main-content">
            <div className="layout-main-content-body">{children}</div>
            <Footer>Dwarves, LLC © 2015 - 2022 All rights reserved.</Footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
