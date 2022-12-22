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

  return icon ? (
    <Space>
      {icon}
      <Link href={href}>
        <a className="link" {...rest}>
          {children}
        </a>
      </Link>
    </Space>
  ) : (
    <Link href={href}>
      <a className="link" {...rest}>
        {children}
      </a>
    </Link>
  )
}
