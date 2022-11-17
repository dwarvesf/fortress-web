import { useState } from 'react'

export const useFilter = <T>(initialValues: T) => {
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

  return { filter, setFilter }
}
