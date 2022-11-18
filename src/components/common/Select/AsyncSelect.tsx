import { notification, Select, SelectProps } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { useEffect, useState } from 'react'
import { theme } from 'styles'
import useSWR from 'swr'
import { searchFilterOption } from 'utils/select'

interface Props extends SelectProps {
  optionGetter: () => Promise<DefaultOptionType[]>
  swrKeys: string[] | string
  placeholder?: string
  mode?: 'multiple' | 'tags'
  customOptionRenderer?: (metaItem: any) => JSX.Element
}

export const AsyncSelect = (props: Props) => {
  const {
    optionGetter,
    swrKeys,
    mode,
    placeholder = '',
    customOptionRenderer,
    onChange,
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
        message: 'Error',
        description: error.message || "Couldn't fetch data!",
      })
    }
  }, [error, optionsData])

  return (
    <Select
      mode={mode}
      bordered={false}
      style={{ background: theme.colors.white, overflow: 'auto' }}
      placeholder={isLoading ? 'Fetching data' : placeholder}
      loading={isLoading}
      disabled={isLoading}
      showSearch
      maxTagCount={2}
      options={typeof customOptionRenderer === 'function' ? undefined : options}
      onChange={(
        value: string | string[],
        option: DefaultOptionType | DefaultOptionType[],
      ) => {
        onChange?.(value, option)
      }}
      filterOption={searchFilterOption}
    >
      {typeof customOptionRenderer === 'function' &&
        options.map(customOptionRenderer)}
    </Select>
  )
}
