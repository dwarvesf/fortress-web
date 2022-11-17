export function transformMetadataToSelectOption(metaItem: {
  code?: string
  name?: string
}) {
  return { label: metaItem.name, value: metaItem.code }
}

export function transformMetadataToFilterOption(metaItem: {
  code?: string
  name?: string
}) {
  return { text: metaItem.name, value: metaItem.code }
}
