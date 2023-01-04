import { notification, Select, SelectProps } from 'antd'
import { DefaultOptionType as BaseDefaultOptionType } from 'antd/lib/select'
import { useFetchWithCache } from 'hooks/useFetchWithCache'
import { useEffect } from 'react'
import { theme } from 'styles'
import { searchFilterOption } from 'utils/select'

type DefaultOptionType = Omit<BaseDefaultOptionType, 'label'> & { label: any }

interface Props extends SelectProps {
  swrKeys: string[] | string
  optionGetter: () => Promise<DefaultOptionType[]>
  customOptionRenderer?: (metaItem: any) => JSX.Element
}

export const AsyncSelect = (props: Props) => {
  const {
    optionGetter,
    swrKeys,
    customOptionRenderer,
    placeholder = '',
    style,
    value,
    ...rest
  } = props
  const {
    data: options = [],
    error,
    loading,
  } = useFetchWithCache<DefaultOptionType[], Error>(
    typeof swrKeys === 'string' ? [swrKeys] : swrKeys,
    optionGetter,
    {
      revalidateOnFocus: false,
    },
  )

  useEffect(() => {
    if (error) {
      notification.error({
        message: error.message || 'Could not fetch data!',
      })
    }
  }, [error])

  return (
    <Select
      style={{ background: theme.colors.white, ...style }}
      placeholder={loading ? 'Fetching data' : placeholder}
      loading={loading}
      disabled={loading}
      showSearch
      showArrow
      options={typeof customOptionRenderer === 'function' ? undefined : options}
      filterOption={searchFilterOption}
      maxTagCount="responsive"
      // Do not show value when it's loading
      value={loading ? undefined : value}
      {...rest}
    >
      {typeof customOptionRenderer === 'function' &&
        options.map(customOptionRenderer)}
    </Select>
  )
}
