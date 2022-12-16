import { Space, Tag, Tooltip } from 'antd'

interface Props<T> {
  value?: T[]
  key?: (each: T) => React.Key | undefined
  content?: (each: T) => React.ReactNode | undefined
  emptyContent?: React.ReactNode
  maxWidth?: number
  maxTag?: number
  color?: string
}

export const TagArray = <T extends { id?: React.Key; name?: React.ReactNode }>({
  value = [],
  key = (each) => each.id,
  content = (each) => each.name,
  emptyContent = '-',
  maxWidth,
  maxTag,
  color,
}: Props<T>) => {
  const displayValue = maxTag ? value.slice(0, maxTag) : value
  const remainValue = maxTag && value.length > maxTag ? value.slice(maxTag) : []

  if (!value.length) {
    return <span>{emptyContent}</span>
  }

  return (
    <Space
      size={[0, 8]}
      style={{ maxWidth, flexWrap: maxWidth ? 'wrap' : undefined }}
    >
      {displayValue.map((each) => (
        <Tag key={key(each)} color={color}>
          {content(each)}
        </Tag>
      ))}
      {!!remainValue.length && (
        <Tooltip
          color="white"
          title={
            <Space size={[0, 8]} style={{ marginLeft: 8 }}>
              {remainValue.map((each) => (
                <Tag key={key(each)} color={color}>
                  {content(each)}
                </Tag>
              ))}
            </Space>
          }
        >
          <Tag color={color}>{`+${remainValue.length} more`}</Tag>
        </Tooltip>
      )}
    </Space>
  )
}
