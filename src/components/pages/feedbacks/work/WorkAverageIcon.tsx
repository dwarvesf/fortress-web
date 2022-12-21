import { Avatar } from 'antd'

interface Props {
  color: string
  label?: number
}

export const WorkAverageIcon = (props: Props) => {
  const { color, label } = props
  return (
    <Avatar
      style={{ backgroundColor: color, opacity: 0.5 }}
      size={28}
      icon={typeof label === 'number' ? String(label) : ''}
    />
  )
}
