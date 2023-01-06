import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const useFilter = <T extends {}>(
  initialValues: T,
  { shouldUpdateToQuery = false }: { shouldUpdateToQuery?: boolean } = {},
) => {
  const { pathname, query, replace } = useRouter()

  const [filter, _setFilter] = useState(initialValues)

  const setFilter = (value: Partial<T>) => {
    // Default page to 1
    // If we specify the page when we call this function, we can bypass this default value
    // @ts-ignore
    // eslint-disable-next-line
    if (initialValues.hasOwnProperty('page')) {
      _setFilter((o) => ({
        ...o,
        page: 1,
        ...value,
      }))
    } else {
      _setFilter((o) => ({ ...o, ...value }))
    }
  }

  useEffect(() => {
    if (shouldUpdateToQuery) {
      // Skip null & empty values
      const filterToUpdate = Object.keys(filter).reduce(
        (result, currentKey) => {
          // @ts-ignore filter should be object
          const currentValue = filter[currentKey]
          if (
            !currentValue ||
            (Array.isArray(currentValue) && currentValue.length === 0)
          ) {
            return result
          }

          return {
            ...result,
            [currentKey]: currentValue,
          }
        },
        {} as Partial<T>,
      )

      const oldFilter = query.filter as string
      const newFilter = JSON.stringify(filterToUpdate)

      // only do replace if filter is updated
      if (oldFilter === newFilter) return

      replace(
        {
          pathname,
          query: { ...query, filter: JSON.stringify(filterToUpdate) },
        },
        undefined,
        { shallow: true },
      )
    }
  }, [filter, pathname, query, replace, shouldUpdateToQuery])

  return { filter, setFilter }
}
