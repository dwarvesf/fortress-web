import {
  AllApplication,
  ChartLine,
  EveryUser,
  Mail,
  Setting,
} from '@icon-park/react'
import { Layout, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { pagePermissions, Permission } from 'constants/permission'
import { ROUTES } from 'constants/routes'
import { LOGIN_REDIRECTION_KEY, useAuthContext } from 'context/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { WithChildren } from 'types/common'
import { isActivePath } from 'utils/link'
import { AuthenticatedContent } from '../AuthenticatedContent'
import { Header } from '../Header'
import { PageSpinner } from '../PageSpinner'
import { SidebarLogo } from './SidebarLogo'

const {
  Content,
  // Footer,
  Sider,
} = Layout

interface MenuItem {
  content: ItemType & { children?: MenuItem[] }
  permission?: string
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
) {
  return {
    key,
    icon,
    children,
    label,
  }
}

const items: MenuItem[] = [
  {
    content: getItem('Dashboard', ROUTES.DASHBOARD, <ChartLine size={24} />),
  },
  {
    content: getItem('Projects', ROUTES.PROJECTS, <AllApplication size={24} />),
    permission: Permission.PROJECTS_READ,
  },
  {
    content: getItem('Employees', ROUTES.EMPLOYEES, <EveryUser size={24} />),
    permission: Permission.EMPLOYEES_READ,
  },
  {
    content: getItem('Feedbacks', ROUTES.FEEDBACKS, <Mail size={24} />, [
      {
        content: getItem('Inbox', ROUTES.INBOX),
        permission: Permission.FEEDBACKS_READ,
      },
      {
        content: getItem('Peer review', ROUTES.PEER_REVIEW),
        permission: Permission.SURVEYS_READ,
      },
      {
        content: getItem('Engagement', ROUTES.ENGAGEMENT),
        permission: Permission.SURVEYS_READ,
      },
      {
        content: getItem('Work', ROUTES.WORK),
        permission: Permission.SURVEYS_READ,
      },
    ]),
  },
  {
    content: getItem('Config', ROUTES.CONFIG, <Setting size={24} />),
  },
]

const filterItems = (items: MenuItem[], permissions: string[]): ItemType[] => {
  return items.flatMap(({ permission, content: { children, ...item } }) => {
    return permission && !permissions.includes(permission)
      ? []
      : [
          {
            ...item,
            children: children ? filterItems(children, permissions) : undefined,
          },
        ]
  })
}

interface Props extends WithChildren {}

export const AuthenticatedLayout = (props: Props) => {
  const { children } = props

  const { isAuthenticated, isAuthenticating, permissions } = useAuthContext()

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

    items.forEach(({ content: item }) => {
      if (!item) return

      if (isActivePath(item.key as string, pathname)) {
        activeKeys.push(item.key as string)
      }

      if (item.children) {
        item.children.forEach(({ content: subItem }) => {
          if (!subItem) return
          if (isActivePath(subItem.key as string, pathname)) {
            activeKeys.push(subItem.key as string)
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
          items={filterItems(items, permissions)}
          onClick={({ key }) => push(key)}
          selectedKeys={activeMenuKeys}
          defaultOpenKeys={activeMenuKeys}
        />
      </Sider>
      <Layout style={{ overflow: 'hidden' }}>
        <Header />
        <Content style={{ overflow: 'auto' }}>
          <div style={{ padding: 24 }}>
            <AuthenticatedContent
              permission={pagePermissions[pathname]}
              fallback="403"
            >
              {children}
            </AuthenticatedContent>
          </div>
          {/* <Footer>Dwarves, LLC © 2015 - 2022 All rights reserved.</Footer> */}
        </Content>
      </Layout>
    </Layout>
  )
}
