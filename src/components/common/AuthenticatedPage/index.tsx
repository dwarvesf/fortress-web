import { Result } from 'antd'
import { ROUTES } from 'constants/routes'
import { useAuthContext } from 'context/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { WithChildren } from 'types/common'
import { Button } from '../Button'
import { Breadcrumb } from '../Header/Breadcrumb'

const getBreadcrumbItems = (pathname: string) => {
  if (pathname.startsWith(ROUTES.EMPLOYEES)) {
    return [{ label: 'Employees' }]
  }
  if (pathname.startsWith(ROUTES.PROJECTS)) {
    return [{ label: 'Projects' }]
  }
  if (pathname.startsWith(ROUTES.INBOX)) {
    return [{ label: 'Feedbacks' }, { label: 'Inbox' }]
  }
  if (pathname.startsWith(ROUTES.PEER_REVIEW)) {
    return [{ label: 'Feedbacks' }, { label: 'Peer Review' }]
  }
  if (pathname.startsWith(ROUTES.ENGAGEMENT)) {
    return [{ label: 'Feedbacks' }, { label: 'Engagement' }]
  }
  if (pathname.startsWith(ROUTES.WORK)) {
    return [{ label: 'Feedbacks' }, { label: 'Work' }]
  }
  return []
}

interface Props extends WithChildren {
  permission?: string
  as?: React.ElementType
}

export const AuthenticatedPage = (props: Props) => {
  const { children, permission, as: Wrapper = Fragment } = props
  const { permissions } = useAuthContext()
  const { pathname } = useRouter()

  if (permission && !permissions.includes(permission)) {
    return (
      <>
        <Breadcrumb items={getBreadcrumbItems(pathname)} />
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Link href="/">
              <a>
                <Button type="primary">Back Home</Button>
              </a>
            </Link>
          }
        />
      </>
    )
  }

  return <Wrapper>{children}</Wrapper>
}
