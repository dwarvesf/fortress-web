import {
  AppstoreFilled,
  LayoutFilled,
  SettingFilled,
  UserOutlined,
  WechatFilled,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { ROUTES } from 'constants/routes'
import { LOGIN_REDIRECTION_KEY, useAuthContext } from 'context/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { WithChildren } from 'types/common'
import { Logo } from '../Logo'

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

  const { isAuthenticated } = useAuthContext()

  const { push, pathname } = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      if (!window.location.href.includes(ROUTES.LOGIN)) {
        window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
      }

      if (pathname !== '/login') {
        push(ROUTES.LOGIN)
      }
    }
  }, [push, isAuthenticated, pathname])

  const [collapsed, setCollapsed] = useState(false)

  if (pathname === '/login') {
    return <Layout>{children}</Layout>
  }

  return isAuthenticated ? (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 30, width: '100vw' }}>
        <div style={{ maxWidth: 'max-content' }}>
          <Link href={ROUTES.DASHBOARD}>
            <LogoLink>
              <Logo hasText />
            </LogoLink>
          </Link>
        </div>
      </Header>
      <Layout style={{ paddingTop: 64, height: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          style={{ position: 'sticky', top: 0 }}
        >
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
            mode="inline"
            items={items}
            onClick={({ key }) => push(key)}
          />
        </Sider>
        <Layout>
          <Content className="layout-main">
            <div className="layout-main-content">{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Dwarves, LLC © 2015 - 2022 All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  ) : null
}
