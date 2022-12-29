import { Result } from 'antd'
import { useAuthContext } from 'context/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { WithChildren } from 'types/common'
import { Button } from '../Button'
import { Breadcrumb } from '../Header/Breadcrumb'

const getBreadcrumbItems = (pathname: string) => {
  if (pathname.startsWith('/employees')) {
    return [{ label: 'Employees' }]
  }
  if (pathname.startsWith('/projects')) {
    return [{ label: 'Projects' }]
  }
  if (pathname.startsWith('/feedbacks')) {
    return [{ label: 'Feedbacks' }]
  }
  return []
}

interface Props extends WithChildren {
  permission?: string
  fallback?: '403' | null
  as?: React.ElementType
}

export const AuthenticatedContent = (props: Props) => {
  const {
    children,
    permission,
    fallback = null,
    as: Wrapper = Fragment,
  } = props
  const { permissions } = useAuthContext()
  const { pathname } = useRouter()

  if (permission && !permissions.includes(permission)) {
    return !fallback ? null : (
      <>
        <Breadcrumb items={getBreadcrumbItems(pathname)} />
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link href="/">
              <Button type="primary">Back Home</Button>
            </Link>
          }
        />
      </>
    )
  }

  return <Wrapper>{children}</Wrapper>
}
