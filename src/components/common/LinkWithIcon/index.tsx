import { Space } from 'antd'
import Link from 'next/link'
import { AnchorHTMLAttributes } from 'react'
import { UrlObject } from 'url'

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string | UrlObject
  icon?: React.ReactNode
}

export const LinkWithIcon = (props: Props) => {
  const { href, children, icon, ...rest } = props

  const childrenRender = children ? (
    <Link href={href}>
      <a className="styled" {...rest}>
        {children}
      </a>
    </Link>
  ) : (
    <span>-</span>
  )

  return icon ? (
    <Space>
      {icon}
      {childrenRender}
    </Space>
  ) : (
    childrenRender
  )
}
