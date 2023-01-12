import { Icon } from '@iconify/react'
import { Layout, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { FEATURES } from 'constants/features'
import { pagePermissions, Permission } from 'constants/permission'
import { pageRoles, Role } from 'constants/roles'
import { ROUTES } from 'constants/routes'
import { LOGIN_REDIRECTION_KEY, useAuthContext } from 'context/auth'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { WithChildren } from 'types/common'
import { isActivePath } from 'utils/link'
import { AuthenticatedPage } from '../AuthenticatedPage'
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
  role?: string
  feature?: string
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
    content: getItem(
      'Dashboard',
      ROUTES.DASHBOARD,
      <Icon icon="icon-park-outline:chart-line" width={20} />,
    ),
    feature: FEATURES.DASHBOARD,
    role: Role.ADMIN,
  },
  {
    content: getItem(
      'Projects',
      ROUTES.PROJECTS,
      <Icon icon="icon-park-outline:all-application" width={20} />,
    ),
    permission: Permission.PROJECTS_READ,
  },
  {
    content: getItem(
      'Employees',
      ROUTES.EMPLOYEES,
      <Icon icon="icon-park-outline:every-user" width={20} />,
    ),
    permission: Permission.EMPLOYEES_READ,
  },
  {
    content: getItem(
      'Feedbacks',
      ROUTES.FEEDBACKS,
      <Icon icon="icon-park-outline:mail" width={20} />,
      [
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
      ],
    ),
  },
  {
    content: getItem(
      'Config',
      ROUTES.CONFIG,
      <Icon icon="icon-park-outline:setting" width={20} />,
    ),
    feature: FEATURES.CONFIG,
  },
]

const filterItems = (
  items: MenuItem[],
  userPermissions: string[],
  userRole: string,
  flags?: Record<string, boolean>,
): ItemType[] => {
  return items.flatMap(
    ({ permission, role, feature = '', content: { children, ...item } }) =>
      (permission && !userPermissions.includes(permission)) ||
      (role && userRole !== role) ||
      (flags && flags[feature] === false)
        ? []
        : [
            {
              ...item,
              children: children
                ? filterItems(children, userPermissions, userRole)
                : undefined,
            },
          ],
  )
}

interface Props extends WithChildren {}

export const AuthenticatedLayout = (props: Props) => {
  const { children } = props

  const {
    isAuthenticated,
    isAuthenticating,
    permissions: userPermissions,
    role: userRole,
  } = useAuthContext()
  const { replace, push, pathname } = useRouter()
  const flags = useFlags()

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

      item.children?.forEach(({ content: subItem }) => {
        if (!subItem) return
        if (isActivePath(subItem.key as string, pathname)) {
          activeKeys.push(subItem.key as string)
        }
      })
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
          items={filterItems(items, userPermissions, userRole, flags)}
          onClick={({ key }) => push(key)}
          selectedKeys={activeMenuKeys}
          defaultOpenKeys={activeMenuKeys}
        />
      </Sider>
      <Layout style={{ overflow: 'hidden' }}>
        <Header />
        <Content style={{ overflow: 'auto' }}>
          <div style={{ padding: 24 }}>
            <AuthenticatedPage
              permission={pagePermissions[pathname]}
              role={pageRoles[pathname]}
            >
              {children}
            </AuthenticatedPage>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
