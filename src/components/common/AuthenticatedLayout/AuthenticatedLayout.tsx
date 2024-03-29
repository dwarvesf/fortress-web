import { Icon } from '@iconify/react'
import { Layout, Menu } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { FEATURES } from 'constants/features'
import { pagePermissions, Permission } from 'constants/permission'
import { ROUTES } from 'constants/routes'
import { LOGIN_REDIRECTION_KEY, useAuthContext } from 'context/auth'
import Link from 'next/link'
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
  content: ItemType & { children?: MenuItem[]; icon?: React.ReactNode }
  permission?: string
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
    label: children ? (
      label
    ) : (
      <Link href={key.toString()} target="_blank">
        {label}
      </Link>
    ),
  }
}

const filterItems = (items: MenuItem[], permissions: string[]): ItemType[] => {
  return items
    .flatMap(({ permission, content: { children, ...item } }) =>
      permission && !permissions.includes(permission)
        ? []
        : [
            {
              ...item,
              children: children
                ? filterItems(children, permissions)
                : undefined,
            },
          ],
    )
    .map((item) => {
      // If the item has sub-items, check if it only has one sub-item.
      // If that's the case, we need to move this sub-item up 1 level.
      // No sense for a sub-menu that only has 1 item
      if (item.children && item.children.length === 1) {
        return {
          ...item,
          ...item.children[0],
          content: {
            ...item.children[0],
          },
          icon: item.icon,
        }
      }

      return item
    })
}

interface Props extends WithChildren {}

export const AuthenticatedLayout = (props: Props) => {
  const { children } = props

  const { isAuthenticated, isAuthenticating, permissions } = useAuthContext()
  const { replace, push, pathname } = useRouter()

  // Get menu items
  const items: MenuItem[] = useMemo(() => {
    return [
      {
        content: getItem(
          'Dashboard',
          ROUTES.DASHBOARD,
          <Icon icon="icon-park-outline:chart-line" width={20} />,
        ),
        feature: FEATURES.DASHBOARD,
        permission: Permission.DASHBOARDS_READ,
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
      // {
      //   content: getItem(
      //     'Config',
      //     ROUTES.CONFIG,
      //     <Icon icon="icon-park-outline:setting" width={20} />,
      //   ),
      //   feature: FEATURES.CONFIG,
      // },
      {
        content: getItem(
          'Invoices',
          ROUTES.INVOICES,
          <Icon icon="nimbus:invoice" width={20} />,
          [
            {
              content: getItem('Create Invoice', ROUTES.ADD_INVOICE),
              permission: Permission.INVOICES_CREATE,
            },
          ],
        ),
        permission: Permission.INVOICES_READ,
      },
    ]
  }, [])

  useEffect(() => {
    if (!isAuthenticated && !isAuthenticating) {
      if (!window.location.href.includes(ROUTES.LOGIN)) {
        window.localStorage.setItem(LOGIN_REDIRECTION_KEY, window.location.href)
      }
      if (pathname === ROUTES.ONBOARDING) {
        return
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
  }, [pathname, items])

  // Show loading page if
  if (
    // Is authenticating
    isAuthenticating ||
    // Not authenticated yet & pathname is not login (meaning we are loading the authentication, e.g. from cookie)
    (!isAuthenticated &&
      pathname !== ROUTES.LOGIN &&
      pathname !== ROUTES.ONBOARDING)
  ) {
    return <PageSpinner />
  }

  if (
    !isAuthenticated ||
    pathname === ROUTES.LOGIN ||
    pathname === ROUTES.ONBOARDING
  ) {
    return <Layout>{children}</Layout>
  }

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      <Sider style={{ top: 0 }}>
        <SidebarLogo />
        <Menu
          mode="inline"
          items={filterItems(items, permissions)}
          onClick={(e) => {
            if (!e.domEvent.ctrlKey && !e.domEvent.metaKey) {
              push(e.key)
            }
          }}
          selectedKeys={activeMenuKeys}
          defaultOpenKeys={activeMenuKeys}
        />
      </Sider>
      <Layout style={{ overflow: 'hidden' }}>
        <Header />
        <Content style={{ overflow: 'auto' }}>
          <div style={{ padding: 24 }}>
            <AuthenticatedPage permission={pagePermissions[pathname]}>
              {children}
            </AuthenticatedPage>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
