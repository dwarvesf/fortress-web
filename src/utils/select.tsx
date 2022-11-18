export function transformMetadataToSelectOption(metaItem: {
  id?: string
  name?: string
}) {
  return { label: metaItem.name, value: metaItem.id }
}

export function transformMetadataToFilterOption(metaItem: {
  code?: string
  name?: string
}) {
  return { text: metaItem.name, value: metaItem.code }
}
