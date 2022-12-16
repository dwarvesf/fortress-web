import { EyeOutlined } from '@ant-design/icons'
import { Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'

interface Props {
  record: any
}

export const WorkloadDetailActions = (props: Props) => {
  const { record } = props

  return (
    <Row justify="end" gutter={[8, 8]}>
      <Tooltip title="View">
        <Button
          type="text-primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => console.log(record)}
        />
      </Tooltip>
    </Row>
  )
}
