import { Result } from 'antd'
import { useAuthContext } from 'context/auth'
import Link from 'next/link'
import { Fragment } from 'react'
import { WithChildren } from 'types/common'
import { Button } from '../Button'

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

  if (permission && !permissions.includes(permission)) {
    return !fallback ? null : (
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
    )
  }

  return <Wrapper>{children}</Wrapper>
}
