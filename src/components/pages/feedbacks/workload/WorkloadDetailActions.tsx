import { PreviewOpen } from '@icon-park/react'
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
          icon={<PreviewOpen size={20} />}
          onClick={() => console.log(record)}
        />
      </Tooltip>
    </Row>
  )
}
