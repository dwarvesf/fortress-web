import { EyeOutlined } from '@ant-design/icons'
import { Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'

interface Props {
  record: any
}

export const Actions = (props: Props) => {
  const { record } = props
  console.log(record)

  return (
    <Row justify="end" gutter={[8, 8]}>
      <Tooltip title="View">
        <Button type="text-primary" size="small" icon={<EyeOutlined />} />
      </Tooltip>
    </Row>
  )
}
