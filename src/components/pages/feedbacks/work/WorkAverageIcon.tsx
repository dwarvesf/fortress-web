import { Avatar } from 'antd'

interface Props {
  backgroundColor: string
  textColor?: string
  label?: number
}

export const WorkAverageIcon = (props: Props) => {
  const { backgroundColor, label, textColor } = props
  return (
    <Avatar
      style={{ backgroundColor, opacity: 0.5 }}
      size={28}
      icon={
        typeof label === 'number' ? (
          <span style={{ color: textColor }}>{String(label)}</span>
        ) : (
          ''
        )
      }
    />
  )
}
