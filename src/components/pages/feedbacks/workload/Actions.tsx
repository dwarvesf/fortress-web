import { EyeOutlined } from '@ant-design/icons'
import { Row, Tooltip } from 'antd'
import { Button } from 'components/common/Button'
import { ROUTES } from 'constants/routes'
import { useRouter } from 'next/router'

interface Props {
  record: any
}

export const Actions = (props: Props) => {
  const { record } = props
  const { push } = useRouter()

  return (
    <Row justify="end" gutter={[8, 8]}>
      <Tooltip title="View">
        <Button
          type="text-primary"
          size="small"
          icon={<EyeOutlined />}
          onClick={() => push(ROUTES.WORKLOAD_DETAIL(record.id))}
        />
      </Tooltip>
    </Row>
  )
}
