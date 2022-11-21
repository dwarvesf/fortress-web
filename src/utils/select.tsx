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
  if (!option?.label) {
    return false
  }

  return String(option.label).toLowerCase().indexOf(input.toLowerCase()) >= 0
}
