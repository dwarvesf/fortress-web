import { Space } from 'antd'
import { Button } from 'components/common/Button'

export const ActionColumn = () => {
  return (
    <Space>
      <Button type="text-primary" size="small">
        View
      </Button>
      <Button type="text-primary" size="small">
        Delete
      </Button>
    </Space>
  )
}
