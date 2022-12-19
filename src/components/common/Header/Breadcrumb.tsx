import Link from 'next/link'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
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
