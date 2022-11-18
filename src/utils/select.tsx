import { DefaultOptionType } from 'antd/lib/select'

export function transformMetadataToSelectOption(metaItem: {
  id?: string
  name?: string
}): DefaultOptionType {
  return { label: metaItem.name, value: metaItem.id }
}

export function transformMetadataToFilterOption(metaItem: {
  code?: string
  name?: string
}) {
  return { text: metaItem.name, value: metaItem.code }
}

export const searchFilterOption = (
  input: string,
  option?: DefaultOptionType,
) => {
  if (
    !option?.value ||
    !option.label ||
    typeof option.label !== 'string' ||
    typeof option.value !== 'string'
  )
    return false

  return (
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
    option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
  )
}
