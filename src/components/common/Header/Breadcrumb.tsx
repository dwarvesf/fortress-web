import Link from 'next/link'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { ROUTES } from 'constants/routes'
import { Icon } from '@iconify/react'
import { Portal } from '../Portal'

interface Props {
  items: {
    href?: string
    label: React.ReactNode
  }[]
}

export const Breadcrumb = (props: Props) => {
  const { items } = props

  return (
    <Portal selector="#breadcrumb">
      <AntdBreadcrumb>
        <AntdBreadcrumb.Item>
          <Link href={ROUTES.HOME}>
            <a>
              <Icon icon="icon-park-outline:home" width={16} />
            </a>
          </Link>
        </AntdBreadcrumb.Item>
        {items.map((item, index) => {
          if (item.href) {
            return (
              <AntdBreadcrumb.Item key={index}>
                <Link href={item.href}>
                  <a>{item.label}</a>
                </Link>
              </AntdBreadcrumb.Item>
            )
          }

          return (
            <AntdBreadcrumb.Item key={index}>{item.label}</AntdBreadcrumb.Item>
          )
        })}
      </AntdBreadcrumb>
    </Portal>
  )
}
