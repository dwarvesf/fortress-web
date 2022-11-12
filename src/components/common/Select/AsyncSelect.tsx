import { useAsyncEffect } from '@dwarvesf/react-hooks'
import { Select, SelectProps } from 'antd'
import { DefaultOptionType } from 'antd/lib/select'
import { useState } from 'react'
import { theme } from 'styles'
import { SelectOption, SelectOptionResponse } from 'types/schema'

interface Props extends SelectProps {
  optionGetter: () => Promise<SelectOptionResponse>
  value: string
}

export const AsyncSelect = (props: Props) => {
  const { optionGetter, value, onChange } = props
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [option, setOption] = useState<SelectOption[]>()

  useAsyncEffect(async () => {
    try {
      const optionData = await optionGetter()

      if (optionData) {
        setOption(optionData.data)
        setIsLoading(false)
      }
    } catch (error) {
      return error
    }
  }, [])

  return (
    <Select
      bordered={false}
      style={{ background: theme.colors.white }}
      options={
        option?.map((o) => {
          return {
            value: o.code,
            label: o.name || '-',
          }
        }) || []
      }
      value={isLoading ? 'Fetching data' : value}
      onSelect={(value: string, option: DefaultOptionType) =>
        onChange?.(value, option)
      }
      loading={isLoading}
      disabled={isLoading}
    />
  )
}
