import { GET_PATHS } from 'libs/apis'
import { useRouter } from 'next/router'
import React from 'react'
import { SWRConfig } from 'swr'
import { WithChildren } from 'types/common'

const parseKey = (value: string) => {
  return ['@', JSON.stringify(value)].join('')
}

const ErrorBoundary = ({ children }: WithChildren) => {
  const { push } = useRouter()

  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          if (![403, 404].includes(error?.response?.status)) return
          if (
            [GET_PATHS.getProjects, GET_PATHS.getEmployees].some((path) =>
              key.startsWith(parseKey(path)),
            )
          ) {
            push('/404')
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default ErrorBoundary
