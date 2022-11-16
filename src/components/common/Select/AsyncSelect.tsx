import { notification, Select, SelectProps } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { SelectOption, Response } from 'libs/apis'
import { useEffect, useState } from 'react'
import { theme } from 'styles'
import useSWR from 'swr'

interface Props extends SelectProps {
  optionGetter: () => Promise<Response<SelectOption[]>>
  swrKeys: string[] | string
  placeholder?: string
}

export const AsyncSelect = (props: Props) => {
  const { optionGetter, swrKeys, placeholder = '', onChange } = props
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentValue, setCurrentValue] = useState<string>()
  const [option, setOption] = useState<SelectOption[]>([])

  const { data: optionData } = useSWR<Response<SelectOption[]>, Error>(
    typeof swrKeys === 'string' ? [swrKeys] : swrKeys,
    optionGetter,
    {
      revalidateOnFocus: false,
      onError: (error) => {
        setIsLoading(false)
        return notification.error({
          message: 'Error',
          description: error.message || "Couldn't fetch data!",
        })
      },
    },
  )

  useEffect(() => {
    if (optionData) {
      setOption(optionData.data)
      setIsLoading(false)
    }
  }, [optionData])

  return (
    <Select
      bordered={false}
      style={{ background: theme.colors.white }}
      options={option?.map((o) => {
        return {
          value: o.code,
          label: o.name,
        }
      })}
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
