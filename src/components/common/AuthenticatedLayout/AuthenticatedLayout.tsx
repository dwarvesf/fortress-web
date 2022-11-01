import {
  AppstoreFilled,
  LayoutFilled,
  SettingFilled,
  UserOutlined,
  WechatFilled,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
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
  getItem('Dashboard', '/', <LayoutFilled />),
  getItem('Projects', '/projects', <AppstoreFilled />),
  getItem('Members', '/members', <UserOutlined />),
  getItem('Feedbacks', '/feedbacks', <WechatFilled />),
  getItem('Config', '/config', <SettingFilled />),
]

interface Props extends WithChildren {}

export const AuthenticatedLayout = (props: Props) => {
  const { children } = props

  const { push } = useRouter()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Logo hasText />
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
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
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Dwarves, LLC © 2015 - 2022 All rights reserved.
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}
