import { Avatar } from 'antd'

interface Props {
  backgroundColor: string
  textColor?: string
  point?: number
  size?: number
}

export const WorkAverageIcon = (props: Props) => {
  const { backgroundColor, point, textColor, size = 32 } = props
  return (
    <Avatar
      style={{ backgroundColor, opacity: 0.65 }}
      size={size}
      icon={
        point !== undefined && (
          <span style={{ color: textColor, fontSize: 14 }}>
            {Number(point.toFixed(1))}
          </span>
        )
      }
    />
  )
}
