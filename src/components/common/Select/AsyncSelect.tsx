import { notification, Select, SelectProps } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { Response } from 'libs/apis'
import { useEffect, useState } from 'react'
import { theme } from 'styles'
import useSWR from 'swr'
import { SelectOption } from 'types/common'
import { transformSelectMetaToOption } from 'utils/select'

interface Props extends SelectProps {
  optionGetter: () => Promise<Response<SelectOption[]>>
  swrKeys: string[] | string
  placeholder?: string
}

export const AsyncSelect = (props: Props) => {
  const { optionGetter, swrKeys, placeholder = '', onChange } = props
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentValue, setCurrentValue] = useState<string>()
  const [options, setOptions] = useState<SelectOption[]>([])

  const { data: optionsData, error } = useSWR<Response<SelectOption[]>, Error>(
    typeof swrKeys === 'string' ? [swrKeys] : swrKeys,
    optionGetter,
    {
      revalidateOnFocus: false,
    },
  )

  useEffect(() => {
    if (optionsData) {
      setOptions(optionsData.data)
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
      bordered={false}
      style={{ background: theme.colors.white }}
      options={options?.map(transformSelectMetaToOption)}
      value={currentValue}
      onSelect={(value: string, option: DefaultOptionType) => {
        setCurrentValue(value)
        onChange?.(value, option)
      }}
      placeholder={isLoading ? 'Fetching data' : placeholder}
      loading={isLoading}
      disabled={isLoading}
      showSearch
    />
  )
}
