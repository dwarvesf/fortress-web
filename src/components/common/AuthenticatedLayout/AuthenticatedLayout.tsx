import {
  AllApplication,
  ChartLine,
  EveryUser,
  Mail,
  Setting,
} from '@icon-park/react'
import { MenuProps, Layout, Menu } from 'antd'
import { ROUTES } from 'constants/routes'
import { LOGIN_REDIRECTION_KEY, useAuthContext } from 'context/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { WithChildren } from 'types/common'
import { isActivePath } from 'utils/link'
import { Header } from '../Header'
import { PageSpinner } from '../PageSpinner'
import { SidebarLogo } from './SidebarLogo'

const {
  Content,
  // Footer,
  Sider,
} = Layout

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
  getItem('Dashboard', ROUTES.DASHBOARD, <ChartLine size={24} />),
  getItem('Projects', ROUTES.PROJECTS, <AllApplication size={24} />),
  getItem('Employees', ROUTES.EMPLOYEES, <EveryUser size={24} />),
  getItem('Feedbacks', ROUTES.FEEDBACKS, <Mail size={24} />, [
    getItem('Inbox', ROUTES.INBOX),
    getItem('Peer review', ROUTES.PEER_REVIEW),
    getItem('Engagement', ROUTES.ENGAGEMENT),
    getItem('Work', ROUTES.WORK),
  ]),
  getItem('Config', ROUTES.CONFIG, <Setting size={24} />),
]

interface Props extends WithChildren {}

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

  const activeMenuKeys = useMemo(() => {
    const activeKeys: string[] = []

    items.forEach((item) => {
      if (isActivePath(item!.key as string, pathname)) {
        activeKeys.push(item!.key as string)
      }

      // @ts-ignore
      if (item.children) {
        // @ts-ignore
        item.children.forEach((subItem) => {
          if (isActivePath(subItem!.key as string, pathname)) {
            activeKeys.push(subItem!.key as string)
          }
        })
      }
    })

    return activeKeys
  }, [pathname])

  if (isAuthenticating || (!isAuthenticated && pathname !== ROUTES.LOGIN)) {
    return <PageSpinner />
  }

  if (!isAuthenticated || pathname === ROUTES.LOGIN) {
    return <Layout>{children}</Layout>
  }

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider style={{ top: 0 }}>
        <SidebarLogo />
        <Menu
          mode="inline"
          items={items}
          onClick={({ key }) => push(key)}
          selectedKeys={activeMenuKeys}
        />
      </Sider>
      <Layout style={{ overflow: 'hidden' }}>
        <Header />
        <Content style={{ overflow: 'auto' }}>
          <div style={{ padding: 24 }}>{children}</div>
          {/* <Footer>Dwarves, LLC © 2015 - 2022 All rights reserved.</Footer> */}
        </Content>
      </Layout>
    </Layout>
  )
}
