import { notification, Select, SelectProps } from 'antd'
import { DefaultOptionType as BaseDefaultOptionType } from 'antd/lib/select'
import { useEffect, useState } from 'react'
import { theme } from 'styles'
import useSWR from 'swr'
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
    ...rest
  } = props
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [options, setOptions] = useState<DefaultOptionType[]>([])

  const { data: optionsData, error } = useSWR<DefaultOptionType[], Error>(
    typeof swrKeys === 'string' ? [swrKeys] : swrKeys,
    optionGetter,
    {
      revalidateOnFocus: false,
    },
  )

  useEffect(() => {
    if (optionsData) {
      setOptions(optionsData)
      setIsLoading(false)
    }
    if (error) {
      setIsLoading(false)
      notification.error({
        message: error.message || 'Could not fetch data!',
      })
    }
  }, [error, optionsData])

  return (
    <Select
      style={{ background: theme.colors.white, overflow: 'auto', ...style }}
      placeholder={isLoading ? 'Fetching data' : placeholder}
      loading={isLoading}
      disabled={isLoading}
      showSearch
      maxTagCount={2}
      options={typeof customOptionRenderer === 'function' ? undefined : options}
      filterOption={searchFilterOption}
      {...rest}
    >
      {typeof customOptionRenderer === 'function' &&
        options.map(customOptionRenderer)}
    </Select>
  )
}
