import { Avatar } from 'antd'

interface Props {
  color: string
}

export const WorkloadAverageIcon = (props: Props) => {
  const { color } = props
  return (
    <Avatar style={{ backgroundColor: color, opacity: 0.5 }} size="small" />
  )
}
