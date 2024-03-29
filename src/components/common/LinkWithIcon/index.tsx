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

  const textRender = href ? (
    <Link href={href}>
      <a className="styled" {...rest}>
        {children}
      </a>
    </Link>
  ) : (
    <span>{children}</span>
  )

  return icon ? (
    <Space>
      {icon}
      {textRender}
    </Space>
  ) : (
    textRender
  )
}
