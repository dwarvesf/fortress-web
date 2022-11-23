import { useRouter } from 'next/router'
import { useState } from 'react'

export const useTabWithQuery = ({
  queryKey = 'tab',
}: {
  queryKey?: string
} = {}) => {
  const { pathname, query, replace } = useRouter()
  const [tabKey, _setTabKey] = useState((query[queryKey] as string) || '')

  const setTabKey = (tab: string) => {
    _setTabKey(tab)
    replace({ pathname, query: { ...query, [queryKey]: tab } })
  }

  return {
    tabKey,
    setTabKey,
  }
}
