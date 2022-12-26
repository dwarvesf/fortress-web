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
      style={{ backgroundColor, opacity: 0.65 }}
      size={typeof label === 'number' ? 32 : 28}
      icon={
        typeof label === 'number' ? (
          <span style={{ color: textColor, fontSize: 14 }}>
            {String(label)}
          </span>
        ) : (
          ''
        )
      }
    />
  )
}
