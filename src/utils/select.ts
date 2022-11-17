export function transformSelectMetaToOption(metaItem: {
  code?: string
  name?: string
}) {
  return { label: metaItem.name, value: metaItem.code }
}
